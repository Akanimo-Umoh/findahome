import uploadIcon from "@/assets/images/icon-file-upload.svg";

export default function UploadImages() {
  return (
    <div>
      <div className="flex flex-col justify-center gap-2">
        <label
          htmlFor="upload"
          className="bg-button-disabled rounded-lg border border-dashed border-text-secondary"
        >
          <div className="flex flex-col items-center justify-center gap-2 py-5 rounded-lg">
            <input type="file" name="" id="upload" className="hidden" />
            <div className="w-10 h-10 rounded-full bg-[#4F95FF] flex items-center justify-center">
              <img src={uploadIcon} alt="" />
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-[14px] text-[#4F95FF]">Tap to upload photos</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Add up to 10 photos. PNG, JPG, PDF up to 10MB.
              </p>
              <p className="text-[12px] leading-4 text-button-bg">
                Add clear, well-lit photos for better visibility
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
