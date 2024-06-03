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

function Home() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_API}/user-detail`

      axios.defaults.withCredentials = true

      const res = await axios.get(URL)

      dispatch(setUser(res.data.data))
      // console.log(user)

      if (res.data.logout) {
        // dispatch(logout())
        navigate("/")
      }
    } catch (err) {
      console.error(`error:${err}`)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  // socket.io

  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_APP_BACKEND, {
      auth: {
        token: localStorage.getItem("token"),
      },
    })

    socketConnection.on("onlineUser", (data) => {
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return () => {
      socketConnection.disconnect()
    }
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
