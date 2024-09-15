import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  logout,
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "../redux/userSlice"
import Sidebar from "../components/Sidebar"
import io from "socket.io-client"
import toast from "react-hot-toast"

function Home() {
  // 取得到user數據
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_API}/user-detail`

      axios.defaults.withCredentials = true

      const res = await axios.get(URL)

      //將使用者資料儲存在Redux
      dispatch(setUser(res.data.data))

      if (res.data.data.logout) {
        toast.error("請先登入!")
        navigate("/")
      } else {
        const socketConnection = io(import.meta.env.VITE_APP_BACKEND, {
          auth: {
            token: localStorage.getItem("token"),
          },
        })

        //聆聽後端事件
        socketConnection.on("onlineUser", (data) => {
          dispatch(setOnlineUser(data))
        })

        dispatch(setSocketConnection(socketConnection))

        return () => {
          socketConnection.disconnect()
        }
      }
    } catch (err) {
      console.error(`error:${err}`)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  useEffect(() => {
    // 建立socket連線
  }, [])

  const basePath = location.pathname === "/home"
  return (
    <div className="grid lg:grid-cols-6 h-screen max-h-screen">
      <section
        className={`bg-white col-span-2 ${!basePath && "hidden"} lg:block`}
      >
        <Sidebar />
      </section>
      <section className={`col-span-4 ${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div className="ml-[50vw] flex  flex-col items-center">
          <p className="text-blue-300 text-[60px]">QuickChat</p>
          <p className="text-red-300 text-lg mt-2">傳送訊息給朋友吧!</p>
        </div>
      </div>
    </div>
  )
}

export default Home
