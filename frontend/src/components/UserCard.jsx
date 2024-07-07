import { Link } from "react-router-dom"
import Avatar from "./Avatar"

function UserCard({ user, onClose }) {
  return (
    <Link
      to={"/home/" + user?._id}
      state={user}
      onClick={onClose}
      className="flex items-center gap-3 mt-2 p-2 lg:p-4 border border-transparent border-t-slate-100 hover:border hover:border-cyan-500"
    >
      <div>
        <Avatar
          width={50}
          height={50}
          name={user.fullName}
          userId={user?._id}
          profileImg={user.profileImg}
        />
      </div>
      <div className="font-semibold text-ellipsis line-clamp-1">
        <div>{user?.full}</div>
        <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
      </div>
    </Link>
  )
}

export default UserCard
