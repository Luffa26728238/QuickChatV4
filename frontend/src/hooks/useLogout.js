import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const navigate = useNavigate()

  const logout = async () => {
    setLoading(true)
    try {
      const res = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        {
          withCredentials: true,
        }
      )

      toast.success(res.data.message)
      console.log(res)
      localStorage.removeItem("chat-user")
      setAuthUser(null)
      navigate("/checkEmail")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, logout }
}
export default useLogout
