import Users from "../models/Users.js"

const searchUser = async (req, res) => {
  try {
    const { search } = req.body

    // i為 ignore case g為 global match
    const query = new RegExp(search, "i", "g")

    const user = await Users.find({
      //$or 為只須滿足其中一個條件即可返回結果
      $or: [{ name: query }, { email: query }],
    }).select("-password")
    return res.json({
      message: "all user",
      data: user,
      success: true,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
    })
  }
}

export default searchUser
