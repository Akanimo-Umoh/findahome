import uploadIcon from "@/assets/images/icon-file-upload.svg";

type UploadImagesProps = {
  value: File[];
  onChange: (files: File[]) => void;
};

export default function UploadImages({ value, onChange }: UploadImagesProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    // merge with existing, cap at 10
    const merged = [...value, ...selected].slice(0, 10);
    onChange(merged);
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-col justify-center gap-2">
        <label
          htmlFor="upload-images"
          className="bg-button-disabled rounded-lg border border-dashed border-text-secondary"
        >
          <div className="flex flex-col items-center justify-center gap-2 py-6 rounded-lg">
            <input
              type="file"
              id="upload-images"
              accept="image/png, image/jpeg, image/webp"
              multiple
              className="hidden"
              onChange={handleChange}
            />

            <div className="w-10 h-10 rounded-full bg-[#4F95FF] flex items-center justify-center">
              <img src={uploadIcon} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-[14px] text-[#4F95FF]">Tap to upload photos</p>
              <p className="text-[12px] leading-4 text-text-secondary md:text-[14px]">
                Add up to 10 photos. PNG, JPG, WEBP up to 10MB.
              </p>
              <p className="text-[12px] leading-4 text-button-bg md:text-[14px]">
                Add clear, well-lit photos for better visibility
              </p>
            </div>
          </div>
        </label>

        {/* preview */}
        {value.length > 0 && (
          <div className="">
            <div className="flex flex-wrap gap-2">
              {value.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-text-secondary self-end">
              {value.length}/10
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
