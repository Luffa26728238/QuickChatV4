import Users from "../models/Users.js"
import bcryptjs from "bcryptjs"

const register = async (req, res) => {
  try {
    const { name, email, password, profileImg } = req.body

    //檢查信箱
    const checkEmail = await Users.findOne({ email })

    if (checkEmail) {
      return res
        .status(400)
        .json({ message: "此信箱已經註冊過，請使用其他信箱", error: true })
    }

    //密碼加密
    const salt = await bcryptjs.genSalt(10)

    const hashedPwd = await bcryptjs.hash(password, salt)

    const payload = {
      name,
      email,
      profileImg,
      password: hashedPwd,
    }

    const user = new Users(payload)
    const savedData = await user.save()

    return res.status(201).json({
      message: "用戶成功註冊",
      data: savedData,
      success: true,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message || err, error: true })
  }
}

export default register
