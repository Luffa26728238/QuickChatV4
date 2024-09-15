const logout = async (req, res) => {
  try {
    const cookieOption = {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    }

    return res.clearCookie("token", cookieOption).status(200).json({
      message: "Logged out successfully",
      success: true,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred during logout",
      success: false,
    })
  }
}

export default logout
