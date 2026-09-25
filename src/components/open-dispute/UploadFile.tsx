import { useState } from "react"
import { FileText, ImagePlus, Loader2, X } from "lucide-react"
import { compressImage } from "@/lib/compressImage"

type UploadFileProps = {
  onFilesSelected: (files: File[]) => void
}

const MAX_FILES = 10
const MAX_SIZE_MB = 10

export default function UploadFile({ onFilesSelected }: UploadFileProps) {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const addFiles = async (incoming: File[]) => {
    setError(null)

    const withinSize = incoming.filter(
      (f) => f.size <= MAX_SIZE_MB * 1024 * 1024
    )
    if (withinSize.length < incoming.length) {
      setError(`Some files were skipped — max size is ${MAX_SIZE_MB}MB each.`)
    }

    setIsProcessing(true)
    let compressed: File[]
    try {
      compressed = await Promise.all(withinSize.map((f) => compressImage(f)))
    } catch (err) {
      console.error("compressImage error:", err)
      compressed = withinSize
    }
    setIsProcessing(false)

    setFiles((prev) => {
      const combined = [...prev]
      for (const file of compressed) {
        const exists = combined.some((f) => f.name === file.name)
        if (!exists) combined.push(file)
      }
      const capped = combined.slice(0, MAX_FILES)
      if (combined.length > MAX_FILES) {
        setError(`Only the first ${MAX_FILES} files were kept.`)
      }
      onFilesSelected(capped)
      return capped
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files ?? [])
    addFiles(incoming)
    e.target.value = ""
  }

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index)
      onFilesSelected(updated)
      return updated
    })
  }

  return (
    <div>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="upload" className="text-[14px] md:text-[16px]">
            Upload Evidence
          </label>
          <span className="text-[12px] text-text-secondary">Optional</span>
        </div>

        <label
          htmlFor="upload"
          className="group cursor-pointer rounded-xl border border-bg-accent bg-white p-3 transition-colors hover:border-button-hover"
        >
          <div className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-button-hover/50 bg-bg-accent/35 px-4 py-5 transition-colors group-hover:bg-bg-accent/60">
            <input
              type="file"
              id="upload"
              multiple
              accept="image/png,image/jpeg,application/pdf"
              onChange={handleChange}
              className="hidden"
              disabled={isProcessing}
            />
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-button-bg">
              {isProcessing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ImagePlus className="h-5 w-5" />
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-[14px] font-semibold text-button-bg">
                {isProcessing ? "Processing..." : "Choose photos or documents"}
              </p>
              <p className="text-center text-[12px] leading-4 text-text-secondary">
                PNG, JPG or PDF · up to {MAX_SIZE_MB}MB each · {MAX_FILES} files
              </p>
            </div>
          </div>
        </label>

        {error && <p className="text-[12px] text-destructive">{error}</p>}

        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-bg-accent bg-white px-3 py-2 text-[12px] text-text-secondary"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <FileText className="h-4 w-4 shrink-0 text-button-bg" />
                  <span className="truncate">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="shrink-0 cursor-pointer rounded-md p-1 text-text-secondary transition-colors hover:bg-button-disabled hover:text-destructive"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
