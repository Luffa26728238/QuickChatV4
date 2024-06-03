import { useEffect, useState, useCallback } from "react"
import Loading from "./Loading"
import UserCard from "./UserCard"
import toast from "react-hot-toast"
import axios from "axios"
import "../App.css"
import { useSelector } from "react-redux"

// icons
import { IoSearchOutline } from "react-icons/io5"
import { GrClose } from "react-icons/gr"

function SearchBar({ onClose }) {
  const currentUser = useSelector((state) => state?.user)
  const [searchUser, setSearchUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const handleSearchUser = useCallback(async () => {
    const URL = `${import.meta.env.VITE_APP_BACKEND_API}/search-user`
    try {
      setLoading(true)

      axios.defaults.withCredentials = true
      const res = await axios.post(URL, {
        search: search,
      })
      setSearchUser(res.data.data)
    } catch (err) {
      toast.error(err.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    if (search.trim()) {
      handleSearchUser()
    } else {
      setSearchUser([])
    }
  }, [search, handleSearchUser])

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10">
      <div className="w-full max-w-lg mx-auto mt-10 m-1">
        <div className="bg-white rounded h-14 overflow-hidden flex">
          <input
            type="text"
            placeholder="透過用戶名稱 email 搜尋..."
            className="w-full outline-none p-1 h-full px-4 bg-white"
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center cursor-pointer">
            <IoSearchOutline size={25} />
          </div>
        </div>
        {/* 顯示搜尋結果 */}
        <div className="bg-white h-[800px] mt-2 w-full p-4 rounded overflow-y-scroll scrollbar">
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">沒有匹配的用戶!</p>
          )}

          {loading && <Loading />}

          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user) => {
              if (user._id !== currentUser.userId) {
                return <UserCard key={user._id} user={user} onClose={onClose} />
              }
            })}
        </div>
      </div>
      <div>
        <button
          className="absolute top-0 right-0 text-2xl p-5 lg:text-3xl hover:text-4xl duration-300 ease-in-out"
          onClick={onClose}
        >
          <GrClose />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
