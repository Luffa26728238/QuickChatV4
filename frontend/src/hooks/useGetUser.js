import axios from "axios"
import { useEffect, useState } from "react"

const useGetUser = () => {
  const [loading, setLoading] = useState(false)
  const [receiver, setReceiver] = useState(null)

  useEffect(() => {
    setLoading(true)
try{

const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API}/`)

}


  }, [])
}
