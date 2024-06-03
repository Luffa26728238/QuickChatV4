const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/auto/upload`

const uploadFile = async (file) => {
  if (!file) return
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "QuickChat")

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("File upload error:", error)
    throw error
  }
}

export default uploadFile
