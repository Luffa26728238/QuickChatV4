import Users from "../models/Users.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

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
    const tokenData = {
      id: user._id,
      email: user.email,
    }
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    const cookieOption = {
      http: true,
      secure: true,
    }

    return res.cookie("token", token, cookieOption).status(200).json({
      message: "用戶成功登入",
      token: token,
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
