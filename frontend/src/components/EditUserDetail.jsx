import { useEffect, useState } from "react"
import Avatar from "./Avatar"
import uploadFile from "../helpers/uploadFile"
import Divider from "./Divider"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { setUser } from "../redux/userSlice"
function EditUserDetail({ onClose }) {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const [data, setData] = useState({
    name: "",
    profileImg: "",
  })

  const [imgFile, setImageFile] = useState(null)

  useEffect(() => {
    setData({
      name: user.name,
      profileImg: user.profileImg,
    })
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = function (event) {
      const imageUrl = event.target.result
      setImageFile(file)
      setData({
        ...user,
        profileImg: imageUrl,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let uploadPhotoUrl = data.profileImg

      if (imgFile) {
        const uploadPhoto = await uploadFile(imgFile)
        uploadPhotoUrl = uploadPhoto.url
      }

      const updatedData = { ...data, profileImg: uploadPhotoUrl }
      const URL = `${import.meta.env.VITE_APP_BACKEND_API}/update-user`

      axios.defaults.withCredentials = true
      const res = await axios.post(URL, updatedData)
      console.log(res.data)

      if (res.status === 200) {
        dispatch(setUser(res.data.data))

        toast.success("User updated successfully")
        onClose()
      } else {
        toast.error("Failed to update user.")
      }
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : err.message
      toast.error(errorMessage)
      console.error(err)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 m-1 rounded w-full max-w-sm shadow-lg">
        <h2 className="font-semibold mb-3">個人資料</h2>
        <p className="text-sm mb-3">編輯個人資料</p>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">姓名:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleChange}
              className="w-full py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="photo">大頭貼:</label>
            <div className="flex items-center gap-4">
              <Avatar
                width={100}
                height={100}
                profileImg={data.profileImg}
                name={data.name}
              />
              <label
                htmlFor="uploadPhoto"
                type="button"
                className="font-bold text-cyan-500 hover:text-cyan-700 cursor-pointer"
              >
                更換大頭貼
              </label>
            </div>
            <input
              id="uploadPhoto"
              type="file"
              className="hidden"
              onChange={handleUploadPhoto}
            />
          </div>
          <Divider />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUserDetail
