import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import Avatar from "../components/Avatar"
import useLogin from "../hooks/useLogin"

function CheckPasswordPage() {
  const [userData, setUserData] = useState({
    userId: "",
    password: "",
  })

  const { loading, login } = useLogin()
  const navigate = useNavigate()
  const location = useLocation() //其他地方使用用 navigate("./password",{ data: }) 後面傳遞的參數可以用location.data獲取:)

  console.log(location)

  // 把個人訊息解構出來
  const { _id, email, fullName, profileImg } = location.state || {}

  useEffect(() => {
    if (!fullName) {
      navigate("/checkEmail")
    } else {
      setUserData((prevData) => ({
        ...prevData,
        userId: _id,
      }))
    }
  }, [fullName, _id, navigate])

  const handleChange = (e) => {
    // 每當輸入密碼
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(userData)
      login(userData)
      // axios.defaults.withCredentials = true

      // const res = await axios.post(URL, userData)

      // const { email, message, success, token } = res.data

      // toast.success(message)
      return
      if (success) {
        setUserData({
          password: "",
          userId: "", // 重置userId
        })

        navigate("/home")
      }
    } catch (err) {
      console.log(err)
      // toast.error(err.response.data.message)
    }
  }

  return (
    <div className="text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 h-[100vh] flex justify-center items-center">
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
      <div className="w-[50vw] h-[70vh] rounded-md bg-[rgba(17,25,40,0.75)] backdrop-blur-lg saturate-150 flex justify-center items-center">
        <div className="w-[40vh] flex flex-col  ">
          <div className="w-[70px] h-[70px] mx-auto mb-3">
            <Avatar
              width={70}
              height={70}
              name={name}
              profileImg={profileImg}
            />
          </div>
          <h3 className="text-center text-3xl font-semibold ">{email}</h3>
          <form className="grid gap-3 mt-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">密碼: </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="請輸入您的密碼"
                className="bg-slate-100  text-black px-2 py-1 rounded transition-all duration-500 focus:outline mb-3"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="bg-[#9370b2] py-2 rounded hover:bg-green-300 mt-2 font-bold text-white">
              登入
            </button>
          </form>
          <p className="text-center my-3">
            <Link
              to={"/forgotPassword"}
              className="text-blue-600 hover:text-blue-900 hover:underline"
            >
              忘記密碼?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckPasswordPage
