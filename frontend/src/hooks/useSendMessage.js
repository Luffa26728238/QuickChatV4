import axios from "axios"
import { useState } from "react"
const useSendMessage = () => {
  const [loading, setLoading] = useState(false)

  const sendMessage = async (message, receiverId) => {
    try {
      setLoading(true)
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_API}/send/${receiverId}`,

        message,

        { withCredentials: true }
      )
      const data = res.data.data
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, sendMessage }
}

export default useSendMessage
