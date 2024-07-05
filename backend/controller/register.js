import Users from "../models/Users.js"
import bcryptjs from "bcryptjs"
import generateTokenAndSetCookie from "../helper/generateToken.js"

const register = async (req, res) => {
  try {
    const { fullName, email, password, profileImg } = req.body
    const checkEmail = await Users.findOne({ email })
    if (checkEmail) {
      return res
        .status(400)
        .json({ message: "此信箱已經註冊過，請使用其他信箱", error: true })
    }
    //密碼加密
    const salt = await bcryptjs.genSalt(10)

    const hashedPwd = await bcryptjs.hash(password, salt)

    const userData = {
      fullName,
      email,
      profileImg,
      password: hashedPwd,
    }

    const user = new Users(userData)

    if (user) {
      generateTokenAndSetCookie(Users._id, res)
      await user.save()
    }

    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImg: user.profileImg,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message || err, error: true })
  }
}

export default register
