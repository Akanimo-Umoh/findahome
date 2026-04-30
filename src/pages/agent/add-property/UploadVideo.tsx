import uploadIcon from "@/assets/agentImages/icon-upload-video.svg";
import { useState } from "react";

type UploadVideoProps = {
  value: File | null;
  onChange: (file: File | null) => void;
};

export default function UploadVideo({ value, onChange }: UploadVideoProps) {
  const [durationError, setDurationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    setDurationError(null);

    // create a temporary video element to check duration
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url); // clean up
      if (video.duration > 120) {
        setDurationError(
          "Video exceeds 2 minutes. Please upload a shorter clip.",
        );
        e.target.value = ""; // reset the input
        return;
      }
      onChange(file);
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      setDurationError("Could not read video file. Please try another.");
      e.target.value = "";
    };

    video.src = url;
  };

  const removeVideo = () => {
    onChange(null);
    setDurationError(null);
  };

  return (
    <div>
      <div className="flex flex-col justify-center gap-2">
        <label
          htmlFor="upload-video"
          className="bg-button-disabled rounded-lg border border-dashed border-text-secondary cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center gap-2 py-6 rounded-lg">
            <input
              type="file"
              id="upload-video"
              accept="video/mp4"
              className="hidden"
              onChange={handleChange}
            />
            <div className="w-10 h-10 rounded-full bg-[#4F95FF] flex items-center justify-center">
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
          <p className="text-[12px] text-center text-red-500 leading-4">
            {durationError}
          </p>
        )}

        {/* preview */}
        {value && (
          <div className="flex items-center justify-between px-3 py-2 bg-bg-accent rounded-lg">
            <p className="text-[12px] text-text-primary line-clamp-1 flex-1">
              {value.name}
            </p>
            <button
              type="button"
              onClick={removeVideo}
              className="text-red-500 text-[11px] ml-2 shrink-0"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
