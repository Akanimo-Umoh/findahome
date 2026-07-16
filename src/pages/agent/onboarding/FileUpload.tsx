import { useRef, useState } from "react"
import uploadIcon from "@/assets/images/icon-file-upload.svg"
import inputError from "@/assets/images/icon-email-error.svg"
import fileIcon from "@/assets/images/icon-file-upload.svg"

const MAX_SIZE_MB = 2
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "application/pdf"]
const ACCEPTED_EXTENSIONS = ".png,.jpg,.jpeg,.pdf"

type FileUploadProps = {
  id: string
  label: string
  hint: string
  optional?: boolean
  value: File | null
  onChange: (file: File | null) => void
  error?: string
}

export default function FileUpload({
  id,
  label,
  hint,
  optional = false,
  value,
  onChange,
  error,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [localError, setLocalError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const displayError = error ?? localError

  const validate = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only PNG, JPG, and PDF files are accepted."
    }
    if (file.size > MAX_SIZE_BYTES) {
      return `File is too large. Maximum size is ${MAX_SIZE_MB}MB.`
    }
    return null
  }

  const handleFile = (file: File) => {
    const validationError = validate(file)
    if (validationError) {
      setLocalError(validationError)
      onChange(null)
      return
    }
    setLocalError(null)
    onChange(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    // reset so re-selecting the same file triggers onChange
    e.target.value = ""
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleRemove = () => {
    setLocalError(null)
    onChange(null)
  }

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)}KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)}MB`

  return (
    <div className="rounded-xl border border-bg-accent bg-white p-4">
      {/* header */}
      <div className="mb-3">
        <p className="text-[14px] font-semibold text-text-primary">
          {label}
          {optional && (
            <span className="ml-1 text-[12px] font-normal text-text-secondary">
              (Optional)
            </span>
          )}
        </p>
        <p className="text-[12px] leading-4 text-text-secondary">{hint}</p>
      </div>

      {value ? (
        /* ── uploaded state ── */
        <div className="flex items-center gap-3 rounded-xl border border-bg-accent bg-bg-accent px-4 py-3">
          <img
            src={fileIcon}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-text-primary">
              {value.name}
            </p>
            <p className="text-[11px] text-text-secondary">
              {formatSize(value.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 cursor-pointer text-[12px] font-semibold text-state-error"
            aria-label={`Remove ${value.name}`}
          >
            Remove
          </button>
        </div>
      ) : (
        /* ── drop zone ── */
        <div
          role="button"
          tabIndex={0}
          aria-label={`Upload ${label}`}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-4 py-8 transition-colors ${
            isDragging
              ? "border-button-bg bg-[#EEF1FC]"
              : displayError
                ? "border-state-error bg-[#FFF0F0]"
                : "border-[#BFC2CC] bg-[#F5F6FA]"
          }`}
        >
          <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-button-bg">
            <img
              src={uploadIcon}
              alt=""
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>
          <p className="text-[13px] font-semibold text-button-bg">
            Tap to upload file
          </p>
          <p className="text-[12px] text-text-secondary">
            PNG, JPG, PDF up to {MAX_SIZE_MB}MB
          </p>
        </div>
      )}

      {/* error */}
      {displayError && (
        <div className="mt-2 flex items-center gap-1" role="alert">
          <img src={inputError} alt="" aria-hidden="true" />
          <p className="text-[12px] text-state-error">{displayError}</p>
        </div>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        className="hidden"
        onChange={handleInputChange}
        aria-hidden="true"
      />
    </div>
  )
}
