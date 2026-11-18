export async function compressImage(
  file: File,
  maxWidth = 1600,
  quality = 0.75
): Promise<File> {
  // Only compress actual images.
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
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)

      const ctx = canvas.getContext("2d")

      if (!ctx) {
        resolve(file)
        return
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file)
            return
          }

          const fileName = `${file.name.replace(/\.[^.]+$/, "")}.jpg`

          const compressed = new File([blob], fileName, {
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
