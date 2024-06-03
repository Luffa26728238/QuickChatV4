import mongoose from "mongoose"
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "請提供名稱"] },
    email: { type: String, required: [true, "請提供電子信箱"], unique: true },
    password: { type: String, required: [true, "請提供密碼"] },
    profileImg: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

const Users = mongoose.model("Users", userSchema)

export default Users
