import { LuUser2 } from "react-icons/lu"
import { PiUserCircle } from "react-icons/pi"
import { useSocketContext } from "../context/SocketContext"
// import { useSelector } from "react-redux"
function Avatar({ userId, fullName, profileImg, width, height }) {
  const { onlineUsers } = useSocketContext()

  // const onlineUser = useSelector((state) => state?.user?.onlineUser)
  const isOnline = onlineUsers.includes(userId)

  return (
    <div
      className={`text-slate-800  rounded-full font-bold relative`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {profileImg ? (
        <img
          src={profileImg}
          style={{ width: width + "px", height: height + "px" }}
          alt={fullName}
          className="overflow-hidden rounded-full flex justify-center items-center text-lg bg-blue-200"
        />
      ) : fullName ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`overflow-hidden rounded-full flex justify-center items-center text-lg bg-blue-200`}
        >
          {fullName}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}

      {isOnline && (
        <div className="bg-green-600 p-1 absolute bottom-1 -right-1 z-10 rounded-full"></div>
      )}
    </div>
  )
}

export default Avatar
