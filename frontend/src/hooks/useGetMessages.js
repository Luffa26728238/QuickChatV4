import axios from "axios"
import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast, { Toaster } from "react-hot-toast"
import { useParams } from "react-router-dom"

const useGetMessages = () => {
  const { messages, setMessages } = useConversation()
  const [loading, setLoading] = useState(false)

  const receiverId = useParams().id
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_API}/${receiverId}`,
          {
            withCredentials: true,
          }
        )
        setMessages(res.data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    // if (selectedConversation?._id) getMessages()
    getMessages()
  }, [])
  return { messages, loading }
}
export default useGetMessages
