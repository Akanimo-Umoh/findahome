import { useEffect, useState, type ChangeEvent } from "react"
import { toast } from "sonner"
import uploadIcon from "@/assets/images/icon-file-upload.svg"
import { compressImage } from "@/lib/compressImage"

type UploadImagesProps = {
  value: File[]
  onChange: (files: File[]) => void
  onProcessingChange?: (isProcessing: boolean) => void
}

const MAX_IMAGES = 10
const MAX_FILE_SIZE = 10 * 1024 * 1024

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"]

export default function UploadImages({
  value,
  onChange,
  onProcessingChange,
}: UploadImagesProps) {
  const [isCompressing, setIsCompressing] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  // Generate previews and clean up object URLs when files change.
  useEffect(() => {
    const urls = value.map((file) => URL.createObjectURL(file))

    setPreviewUrls(urls)

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [value])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const selected = Array.from(input.files ?? [])

    // Allow selecting the same image again if it was removed.
    input.value = ""

    if (selected.length === 0) return

    const remainingSlots = MAX_IMAGES - value.length

    if (remainingSlots <= 0) {
      toast.error("You can upload a maximum of 10 photos.")
      return
    }

    // Reject unsupported image formats.
    const validTypes = selected.filter((file) =>
      ALLOWED_TYPES.includes(file.type)
    )

    if (validTypes.length !== selected.length) {
      toast.error("Only PNG, JPG and WEBP images are allowed.")
    }

    // Reject files larger than 10MB before compression.
    const oversizedFiles = validTypes.filter(
      (file) => file.size > MAX_FILE_SIZE
    )

    if (oversizedFiles.length > 0) {
      toast.error(`${oversizedFiles.length} image(s) exceed the 10MB limit.`)
    }

    const withinSizeLimit = validTypes.filter(
      (file) => file.size <= MAX_FILE_SIZE
    )

    if (withinSizeLimit.length === 0) return

    // Ensure the total number of images never exceeds 10.
    if (withinSizeLimit.length > remainingSlots) {
      toast.info(`You can only add ${remainingSlots} more photo(s).`)
    }

    const imagesToProcess = withinSizeLimit.slice(0, remainingSlots)

    setIsCompressing(true)
    onProcessingChange?.(true)

    try {
      const compressedImages = await Promise.all(
        imagesToProcess.map(async (file) => {
          try {
            return await compressImage(file)
          } catch (error) {
            console.error(`Image compression failed for ${file.name}:`, error)

            toast.error(
              `${file.name} could not be compressed. The original will be used.`
            )

            return file
          }
        })
      )

      onChange([...value, ...compressedImages].slice(0, MAX_IMAGES))

      toast.success("Photos are ready to upload.")
    } catch (error) {
      console.error("Image processing error:", error)
      toast.error("Something went wrong while processing your photos.")
    } finally {
      setIsCompressing(false)
      onProcessingChange?.(false)
    }
  }

  const removeImage = (index: number) => {
    if (isCompressing) return

    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex flex-col justify-center gap-2">
        <label
          htmlFor="upload-images"
          className={`rounded-lg border border-dashed border-text-secondary bg-button-disabled ${
            isCompressing || value.length >= MAX_IMAGES
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg py-6">
            <input
              type="file"
              id="upload-images"
              accept="image/png, image/jpeg, image/webp"
              multiple
              disabled={isCompressing || value.length >= MAX_IMAGES}
              className="hidden"
              onChange={handleChange}
            />

            {isCompressing ? (
              <div className="flex h-10 w-10 items-center justify-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#4F95FF] border-t-transparent" />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4F95FF]">
                <img src={uploadIcon} alt="" />
              </div>
            )}

            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-[14px] text-[#4F95FF]">
                {isCompressing
                  ? "Compressing photos..."
                  : value.length >= MAX_IMAGES
                    ? "Maximum photos reached"
                    : "Tap to upload photos"}
                <span className="text-red-500">*</span>
              </p>

              <p className="text-[12px] leading-4 text-text-secondary md:text-[14px]">
                Add up to 10 photos. PNG, JPG, WEBP up to 10MB.
              </p>

              <p className="text-[12px] leading-4 text-button-bg md:text-[14px]">
                Add clear, well-lit photos for better visibility
              </p>
            </div>
          </div>
        </label>

        {isCompressing && (
          <p className="text-center text-[12px] text-text-secondary">
            Please wait while your photos are being optimized.
          </p>
        )}

        {/* Image previews */}
        {value.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-2">
              {previewUrls.map((url, index) => (
                <div
                  key={`${value[index]?.name}-${index}`}
                  className="relative"
                >
                  <img
                    src={url}
                    alt={value[index]?.name ?? `Property photo ${index + 1}`}
                    className="h-16 w-16 rounded-lg object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={isCompressing}
                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-1 text-right text-[11px] text-text-secondary">
              {value.length}/10
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
