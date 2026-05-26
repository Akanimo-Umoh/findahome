import uploadIcon from "@/assets/agentImages/icon-upload-video.svg"
import { useState } from "react"

type UploadVideoProps = {
  value: File | null
  onChange: (file: File | null) => void
}

export default function UploadVideo({ value, onChange }: UploadVideoProps) {
  const [durationError, setDurationError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return

    setDurationError(null)

    // create a temporary video element to check duration
    const url = URL.createObjectURL(file)
    const video = document.createElement("video")
    video.preload = "metadata"

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url) // clean up
      if (video.duration > 120) {
        setDurationError(
          "Video exceeds 2 minutes. Please upload a shorter clip."
        )
        e.target.value = "" // reset the input
        return
      }
      onChange(file)
    }

    video.onerror = () => {
      URL.revokeObjectURL(url)
      setDurationError("Could not read video file. Please try another.")
      e.target.value = ""
    }

    video.src = url
  }

  const removeVideo = () => {
    onChange(null)
    setDurationError(null)
  }

  return (
    <div>
      <div className="flex flex-col justify-center gap-2">
        <label
          htmlFor="upload-video"
          className="cursor-pointer rounded-lg border border-dashed border-text-secondary bg-button-disabled"
        >
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg py-6">
            <input
              type="file"
              id="upload-video"
              accept="video/mp4"
              className="hidden"
              onChange={handleChange}
            />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4F95FF]">
              <img src={uploadIcon} alt="" />
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-[14px] text-[#4F95FF]">
                Add video tour <span className="text-red-500">*</span>
              </p>
              <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
                Max 2 minutes • MP4 format
              </p>
            </div>
          </div>
        </label>

        {/* duration error */}
        {durationError && (
          <p className="text-center text-[12px] leading-4 text-red-500">
            {durationError}
          </p>
        )}

        {/* preview */}
        {value && (
          <div className="flex items-center justify-between rounded-lg bg-bg-accent px-3 py-2">
            <p className="line-clamp-1 flex-1 text-[12px] text-text-primary">
              {value.name}
            </p>
            <button
              type="button"
              onClick={removeVideo}
              className="ml-2 shrink-0 text-[11px] text-red-500"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
