import getToken from "../helper/getToken.js"
import Users from "../models/Users.js"

const updateUser = async (req, res) => {
  try {
    const token = req.cookies.token || ""

    //驗證JWT
    const user = await getToken(token)
    const { name, profileImg } = req.body
    const updatedUser = await Users.updateOne(
      { _id: user._id },
      {
        name,
        profileImg,
      }
    )

    const userInfo = await Users.findById(user._id).select("-password")

    return res.status(200).json({
      message: "成功更新用戶訊息",
      data: userInfo,
      success: true,
    })
  } catch (err) {
    res.status(500).json({ message: err.message || err, error: true })
  }
}

export default updateUser
