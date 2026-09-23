import { useState } from "react"
import { X } from "lucide-react"
import uploadIcon from "@/assets/images/icon-file-upload.svg"

type UploadFileProps = {
  onFilesSelected: (files: File[]) => void
}

const MAX_FILES = 10
const MAX_SIZE_MB = 10

export default function UploadFile({ onFilesSelected }: UploadFileProps) {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const addFiles = (incoming: File[]) => {
    setError(null)

    const validFiles = incoming.filter(
      (f) => f.size <= MAX_SIZE_MB * 1024 * 1024
    )
    if (validFiles.length < incoming.length) {
      setError(`Some files were skipped — max size is ${MAX_SIZE_MB}MB each.`)
    }

    setFiles((prev) => {
      // CHANGED: merges with existing selection instead of replacing it,
      // and dedupes by name+size so picking the same file twice doesn't duplicate it
      const combined = [...prev]
      for (const file of validFiles) {
        const exists = combined.some(
          (f) => f.name === file.name && f.size === file.size
        )
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
    e.target.value = "" // allows picking the same file again after removing it
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
        <label htmlFor="upload" className="text-[14px] md:text-[16px]">
          Upload Evidence (Optional)
        </label>

        <label htmlFor="upload" className="rounded-lg bg-button-disabled p-3">
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-text-secondary bg-white py-5">
            <input
              type="file"
              id="upload"
              multiple
              accept="image/png,image/jpeg,application/pdf"
              onChange={handleChange}
              className="hidden"
            />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4F95FF]">
              <img src={uploadIcon} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-[14px] text-[#4F95FF]">
                Tap to upload photos or documents
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Add up to {MAX_FILES} photos. PNG, JPG, PDF up to {MAX_SIZE_MB}
                MB.
              </p>
            </div>
          </div>
        </label>

        {error && <p className="text-[12px] text-destructive">{error}</p>}

        {files.length > 0 && (
          <ul className="mt-1 space-y-1">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}`}
                className="flex items-center justify-between rounded-lg border border-bg-accent px-2 py-1.5 text-[12px] text-text-secondary"
              >
                <span className="truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-2 shrink-0 cursor-pointer text-text-secondary hover:text-destructive"
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
