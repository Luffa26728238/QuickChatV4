import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import Avatar from "./Avatar"
import EditUserDetail from "./EditUserDetail"
import SearchBar from "./SearchBar"
import { logout } from "../redux/userSlice"

//icons
import { HiMiniArrowUpLeft } from "react-icons/hi2"
import { IoChatboxOutline } from "react-icons/io5"
import { FiUserPlus } from "react-icons/fi"
import { SlLogout } from "react-icons/sl"
import { BsImage } from "react-icons/bs"
import { RxVideo } from "react-icons/rx"
import { useAuthContext } from "../context/AuthContext"

function Sidebar() {
  const { authUser } = useAuthContext()
  const socketConnection = useSelector((state) => state.user.socketConnection)

  const [allUser, setAllUser] = useState([])
  const [openSearch, setOpenSearch] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user.userId)
      const handleConversation = (data) => setAllUser(data)

      socketConnection.on("conversation", handleConversation)

      return () => {
        socketConnection.off("conversation", handleConversation)
      }
    }
  }, [socketConnection, user.userId])

  //登出
  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
    localStorage.clear()
  }

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-6 text-slate-700 flex flex-col justify-between">
        <div>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `w-full h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${
                isActive ? "bg-red-500" : ""
              }`
            }
            title="聊天"
          >
            <IoChatboxOutline size={30} />
          </NavLink>
          <div
            className="w-full h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
            title="新增好友"
            onClick={() => setOpenSearch(true)}
          >
            <span className="ml-2">
              <FiUserPlus size={30} />
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="cursor-pointer mx-auto"
            title={user.name}
            onClick={() => setEditUserOpen(true)}
          >
            <Avatar
              width={50}
              height={50}
              profileImg={user.profileImg}
              name={user.name}
              userId={user.userId}
            />
          </button>
          <button
            className="w-12 h-12 flex flex-col justify-center items-center cursor-pointer hover:bg-slate-300 rounded "
            title="登出"
            onClick={handleLogout}
          >
            <SlLogout size={25} />
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-2xl font-bold p-4 text-slate-800">訊息</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-scroll scrollbar">
          {allUser.length === 0 ? (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-400">
                <HiMiniArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-500">
                尋找用戶來聊天吧
              </p>
            </div>
          ) : (
            allUser.map((conv) => {
              let otherUser =
                conv.sender._id === user.userId ? conv.receiver : conv.sender

              if (otherUser.name == user.name) {
                otherUser = null
              }
              console.log(conv.lastMsg?.text)

              return (
                conv.lastMsg?.text && (
                  <NavLink
                    to={"/home/" + otherUser?._id}
                    key={conv._id}
                    className="flex items-center gap-2 p-2 px-2 border border-transparent hover:bg-slate-100 hover:border-blue-200 cursor-pointer duration-200 ease-in rounded"
                  >
                    <Avatar
                      profileImg={otherUser?.profileImg}
                      name={otherUser?.name}
                      width={70}
                      height={70}
                    />
                    <div className="flex-1">
                      <h3 className="text-ellipsis line-clamp-2 font-semibold text-base">
                        {otherUser?.name}
                      </h3>
                      <div className="text-slate-500 text-xs flex items-center gap-1">
                        {conv.lastMsg?.imageUrl && (
                          <div className="flex gap-2 items-center">
                            <BsImage />
                            {!conv.lastMsg.text && <span>圖片</span>}
                          </div>
                        )}
                        {conv.lastMsg?.videoUrl && (
                          <div className="flex gap-2 items-center">
                            <RxVideo />
                            {!conv.lastMsg?.text && <span>影片</span>}
                          </div>
                        )}
                        <p className="italic text-ellipsis line-clamp-1 w-[200px]">
                          {conv.lastMsg?.text}
                        </p>
                      </div>
                    </div>
                    {/* {conv?.unSeenMsg && (
                      <p className="flex justify-center items-center text-xs w-10 h-10 font-semibold ml-auto p-1 bg-yellow-200 text-white rounded-full">
                        {conv.unSeenMsg}
                      </p>
                    )} */}
                  </NavLink>
                )
              )
            })
          )}
        </div>
      </div>

      {editUserOpen && (
        <EditUserDetail onClose={() => setEditUserOpen(false)} />
      )}

      {openSearch && <SearchBar onClose={() => setOpenSearch(false)} />}
    </div>
  )
}

export default Sidebar
