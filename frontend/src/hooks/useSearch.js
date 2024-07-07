import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useSearch = () => {
  const [loading, setLoading] = useState(false)

  const searchUser = async (search, setSearchedUser) => {
    setLoading(true)

    console.log(search)

    try {
      const res = await axios.post(
        "http://localhost:3000/api/search-user",
        { search },
        {
          withCredentials: true,
        }
      )

      console.log(res.data.data)
      setSearchedUser(res.data.data)
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, searchUser }
}
export default useSearch
