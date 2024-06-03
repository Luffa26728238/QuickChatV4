import getToken from "../helper/getToken.js"

const userDetail = async (req, res) => {
  try {
    const token = req.cookies.token || ""
    //驗證JWT
    const user = await getToken(token)
    return res.status(200).json({
      message: "success",
      data: user,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
    })
  }
}

export default userDetail
