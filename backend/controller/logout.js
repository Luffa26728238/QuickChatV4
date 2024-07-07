const logout = async (req, res) => {
  try {
    const cookieOption = {
      http: true,
      secure: true,
    }

    res.cookie("jwt", "", cookieOption).status(200).json({
      //將名為jwt的cookie值設為""
      message: "用戶成功登出!",
      success: true,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: false,
    })
  }
}

export default logout
