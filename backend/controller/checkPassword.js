import Users from "../models/Users.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import generateTokenAndSetCookie from "../helper/generateToken.js"

const checkPassword = async (req, res) => {
  try {
    const { password, userId } = req.body
    const user = await Users.findById(userId)

    const verifiedPwd = await bcryptjs.compare(password, user.password)

    if (!verifiedPwd) {
      return res.status(400).json({
        message: "密碼錯誤",
        error: true,
      })
    }
    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      message: "用戶成功登入",
      success: true,
      data: user,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
    })
  }
}

export default checkPassword
