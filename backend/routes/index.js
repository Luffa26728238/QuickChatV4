import express from "express"
import register from "../controller/register.js"
import checkEmail from "../controller/checkEmail.js"
import checkPassword from "../controller/checkPassword.js"
import userDetail from "../controller/userDetail.js"
import logout from "../controller/logout.js"
import updateUser from "../controller/updateUer.js"
import searchUser from "../controller/searchUser.js"
import sendMessage from "../controller/sendMessage.js"
import protectRoute from "../middleware/protectRoute.js"
import getMessages from "../controller/getMessage.js"
import getConversations from "../controller/getConversations.js"

const router = express.Router()

//註冊新用戶
router.post("/register", register)

//檢查信箱
router.post("/email", checkEmail)

//檢查密碼
router.post("/password", checkPassword)

//獲取用戶信息
router.get("/user-detail", userDetail)

//更新用戶訊息
router.post("/update-user", updateUser)

//登出
router.post("/logout", logout)

//搜尋其他用戶
router.post("/search-user", searchUser)

//獲取聊天對象
router.get("/conversations", protectRoute, getConversations)

//獲取聊天信息
router.get("/:id", protectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessage)

export default router
