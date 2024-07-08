import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_API}/conversations`,
          {
            withCredentials: true,
          }
        )

        setConversations(res.data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    getConversations()
  }, [])

  return { loading, conversations }
}
export default useGetConversations
