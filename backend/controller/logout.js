const logout = async (req, res) => {
  try {
    const cookieOption = {
      http: true,
      secure: true,
    }

    return res.cookie("token", "", cookieOption).status(200).json({
      message: "session out",
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
