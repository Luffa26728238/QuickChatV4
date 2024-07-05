import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"
import axios from "axios"

const useSignUp = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const signup = async (data) => {
    const success = handleInputErrors(data)
    if (!success) return

    setLoading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_API}/register`,
        data,
        {
          withCredentials: true,
        }
      )

      const userData = await res.data

      localStorage.setItem("chat-user", JSON.stringify(userData))
      setAuthUser(userData)

      return true
    } catch (error) {
      //   console.log(error.response.data.message)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, signup }
}
export default useSignUp

function handleInputErrors(data) {
  const { fullName, email, password, profileImg } = data

  if (!fullName || !email || !password) {
    toast.error("請填入所有欄位!")
    return false
  }

  if (password.length < 6) {
    toast.error("密碼必須輸入6個字元以上!")
    return false
  }

  return true
}
