import Users from "../models/Users.js"

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body

    //.selected("-password")  在返回結果中 排除密碼
    const checkedEmail = await Users.findOne({ email }).select("-password")

    if (!checkedEmail) {
      return res.status(400).json({ message: "此用戶不存在", error: true })
    }

    return res.status(200).json({
      message: "信箱通過驗證",
      success: true,
      data: checkedEmail,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message || err, error: true })
  }
}

export default checkEmail
