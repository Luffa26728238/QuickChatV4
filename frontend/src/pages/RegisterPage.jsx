import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"

import uploadFile from "../helpers/uploadFile"
import axios from "axios"
import toast from "react-hot-toast"

function RegisterPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profileImg: "",
  })

  const [photo, setPhoto] = useState("")

  const navigate = useNavigate()

  const [imgFile, setImgFile] = useState(null)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // 檢查檔案類型是否為圖片
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"]
    if (!validImageTypes.includes(file.type)) {
      toast.error("請上傳圖片類型的檔案! ")
      return
    }

    const reader = new FileReader()

    reader.onload = function (event) {
      const imageUrl = event.target.result

      setImgFile(file)
      setData({
        ...data,
        profileImg: imageUrl,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleClearPhoto = (e) => {
    e.preventDefault()

    setPhoto(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let uploadPhoto = ""

    if (imgFile) {
      // Check if the file is an image
      const validImageTypes = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/webp",
      ]
      if (!validImageTypes.includes(imgFile.type)) {
        toast.error("File type must be an image (gif, jpeg, png, webp)")
        throw new Error("只能上傳圖片類型的檔案!因為這是大頭貼!")
      }

      uploadPhoto = await uploadFile(imgFile)
    }

    const URL = `${import.meta.env.VITE_APP_BACKEND_API}/register`

    try {
      const res = await axios.post(URL, {
        ...data,
        profileImg: uploadPhoto.url,
      })

      console.log(res)
      toast.success(res.data.message)

      if (res.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profileImg: "",
        })
        console.log("註冊成功")
        navigate("/login")
      }

      console.log(res)
    } catch (err) {
      toast.error(err.response.data.message)
      console.error(err)
    }
  }

  return (
    <div className="text-black bg-gradient-to-r from-violet-500 to-fuchsia-500 h-[100vh] flex justify-center items-center">
      <div className="fixed top-10 left-10">
        <Link to="/">
          {" "}
          <img
            src="https://cdn3.iconfinder.com/data/icons/essential-rounded/66/Rounded-40-512.png"
            alt=""
            className="w-20 h-20"
          />
        </Link>
      </div>
      <div className="bg-[rgba(17,25,40,0.75)]  w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-2 rounded p-10 mx-auto shadow-lg shadow-lg shadow-blue-500/50 p-20">
        <h3 className="text-center text-3xl font-bold  text-white">
          註冊新用戶
        </h3>
        <form className="grid gap-3 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            {" "}
            <div className="flex flex-col gap-1">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="使用者名稱"
                className=" px-2 py-2 rounded transition-all duration-500 focus:outline"
                value={data.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="電子信箱"
                className=" px-2 py-1 rounded transition-all duration-500 focus:outline"
                value={data.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="密碼"
                className=" px-2 py-1 rounded transition-all duration-500 focus:outline"
                value={data.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="profileImg">
                {" "}
                <div className=" flex justify-center items-center h-14   rounded border hover:border-blue-500 cursor-pointer">
                  <p className=" text-white text-sm max-w-[300] text-ellipsis line-clamp-1">
                    {photo?.name ?? "上傳大頭照"}
                  </p>
                  {photo?.name && (
                    <button
                      className="text-lg ml-2 hover:text-red-500"
                      onClick={handleClearPhoto}
                    >
                      <IoClose size={20} />
                    </button>
                  )}
                </div>
              </label>
              <div className="flex flex-row">
                <input
                  type="file"
                  id="profileImg"
                  name="profileImg"
                  placeholder="上傳大頭照"
                  className="bg-slate-100 px-2 py-1 rounded transition-all duration-500 focus:outline hidden"
                  onChange={handleUploadPhoto}
                />
              </div>
              {data.profileImg && (
                <div className="flex justify-center">
                  <img
                    src={data.profileImg}
                    className="block overflow-hidden rounded-full w-20 h-20 object-fill"
                    alt="Profile"
                  />
                </div>
              )}
            </div>
            {/* from-violet-900 to-purple-400  原定按鈕顏色(紫色) */}
            <button className="text-white bg-[#9370b2] flex justify-center items-center p-2 rounded cursor-pointer mb-1">
              註冊
            </button>
          </div>
        </form>
        <p className="text-center my-3">
          <Link
            to={"/login"}
            className=" text-blue-600  hover:text-blue-900 hover:underline "
          >
            已經有帳號了? 立即登入
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
