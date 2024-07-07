import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const login = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_API}/password`,
        data,
        {
          withCredentials: true,
        }
      )
      toast.success(res.data.message)

      const userData = res.data.data

      localStorage.setItem("chat-user", JSON.stringify(userData))
      setAuthUser(userData)
    } catch (err) {
      toast.error(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}

export default useLogin
