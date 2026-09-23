import { useState } from "react"
import uploadIcon from "@/assets/images/icon-file-upload.svg"

type UploadFileProps = {
  onFilesSelected: (files: File[]) => void
}

export default function UploadFile({ onFilesSelected }: UploadFileProps) {
  const [fileNames, setFileNames] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 10)
    setFileNames(files.map((f) => f.name))
    onFilesSelected(files)
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
                Add up to 10 photos. PNG, JPG, PDF up to 10MB.
              </p>
            </div>
          </div>
        </label>

        {fileNames.length > 0 && (
          <ul className="text-[12px] text-text-secondary">
            {fileNames.map((name) => (
              <li key={name} className="truncate">
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
