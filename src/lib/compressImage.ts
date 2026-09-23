export async function compressImage(
  file: File,
  maxWidth = 1600,
  quality = 0.75
): Promise<File> {
  // only compress actual images — PDFs pass through untouched
  if (!file.type.startsWith("image/")) return file

  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = () => {
      img.src = reader.result as string
    }
    reader.onerror = () => reject(new Error("Failed to read file"))

    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width)
      const canvas = document.createElement("canvas")
      canvas.width = img.width * scale
      canvas.height = img.height * scale

      const ctx = canvas.getContext("2d")
      if (!ctx) return resolve(file) // fallback — don't block upload on a canvas failure

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(file)
          const compressed = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          })
          resolve(compressed)
        },
        "image/jpeg",
        quality
      )
    }

    img.onerror = () => reject(new Error("Failed to load image"))
    reader.readAsDataURL(file)
  })
}
