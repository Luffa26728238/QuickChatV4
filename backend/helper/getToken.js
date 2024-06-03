import jwt from "jsonwebtoken"
import Users from "../models/Users.js"

const getToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: "true",
    }
  }
  const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)

  const user = await Users.findById(decode.id).select("-password")

  return user
}

export default getToken
