import uploadIcon from "@/assets/agentImages/icon-upload-document.svg";

type UploadDocumentsProps = {
  value: File[];
  onChange: (files: File[]) => void;
};

export default function UploadDocuments({
  value,
  onChange,
}: UploadDocumentsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const merged = [...value, ...selected].slice(0, 3);
    onChange(merged);
  };

  const removeDocument = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-col justify-center gap-2">
        <label
          htmlFor="upload-documents"
          className="bg-button-disabled rounded-lg border border-dashed border-text-secondary cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg py-6">
            <input
              type="file"
              id="upload-documents"
              accept="application/pdf"
              multiple
              className="hidden"
              onChange={handleChange}
            />
            <div className="w-10 h-10 rounded-full bg-[#4F95FF] flex items-center justify-center">
              <img src={uploadIcon} alt="" />
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-[14px] text-[#4F95FF]">
                Upload Property Legal Document
              </p>
              <p className="text-[12px] leading-4 text-text-secondary md:text-[14px]">
                Max 3 files • PDF format
              </p>
            </div>
          </div>
        </label>

        {/* preview */}
        {value.length > 0 && (
          <div className="flex flex-col gap-1">
            {value.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 bg-bg-accent rounded-lg"
              >
                <p className="text-[12px] text-text-primary line-clamp-1 flex-1">
                  {file.name}
                </p>
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-red-500 text-[11px] ml-2 shrink-0"
                >
                  Remove
                </button>
              </div>
            ))}
            <p className="text-[11px] text-text-secondary">
              {value.length}/3 documents
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
