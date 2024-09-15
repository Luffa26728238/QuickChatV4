import express from "express"
import http from "http"
import getToken from "../helper/getToken.js"

//socket.io
import { Server } from "socket.io"

//models
import Users from "../models/Users.js"
import { Conversations, Messages } from "../models/Conversations.js"
import { getConversation } from "../helper/getConversation.js"

export const app = express()
export const server = http.createServer(app)

// 正在線上的用戶  Set只會儲存唯一值
const onlineUser = new Set()

//創建一socket server實例
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})

io.on("connection", async (socket) => {
  console.log("成功連結socket", socket.id)

  const token = socket.handshake.auth.token

  // 用戶信息
  const user = await getToken(token)
  if (!user) {
    socket.disconnect()
    return
  }

  // 創建聊天室
  socket.join(user._id.toString())
  onlineUser.add(user._id.toString())

  io.emit("onlineUser", Array.from(onlineUser))

  socket.on("message-page", async (userId, sender) => {
    console.log("進入message-page")
    console.log("UserId:", userId)
    console.log("Sender:", sender)

    try {
      let conversation = await Conversations.findOne({
        $or: [
          { sender, receiver: userId },
          { sender: userId, receiver: sender },
        ],
      })
      console.log("Conversation found:", conversation)

      // 如果不存在 創建一個新的conversation
      if (!conversation) {
        conversation = new Conversations({ sender, receiver: userId })
        await conversation.save()
        console.log("New conversation created:", conversation)
      }

      const userDetails = await Users.findById(userId).select("-password")
      const payload = {
        _id: userDetails?._id,
        name: userDetails?.name,
        email: userDetails?.email,
        profileImg: userDetails?.profileImg,
        online: onlineUser.has(userId),
      }

      socket.emit("message-user", payload)

      // 取得過去訊息
      const getConversationMessage = await Conversations.findOne({
        $or: [
          { sender: sender, receiver: userId },
          { sender: userId, receiver: sender },
        ],
      })
        .populate("messages")
        .sort({ updatedAt: -1 })
      console.log("Messages found:", getConversationMessage)

      if (getConversationMessage) {
        const { messages } = getConversationMessage
        socket.emit("message", messages || [])
      }
    } catch (error) {
      console.error("Error in message-page:", error)
    }
  })

  // 新訊息
  socket.on("new message", async (data) => {
    try {
      const { sender, receiver, text, imageUrl, videoUrl } = data

      // 檢查conversation是否已經存在
      let conversation = await Conversations.findOne({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      })

      // 如果不存在 創建一個新的conversation
      if (!conversation) {
        conversation = new Conversations({ sender, receiver })
        await conversation.save()
      }

      const message = new Messages({ text, imageUrl, videoUrl, sender })
      const savedMessage = await message.save()

      await Conversations.updateOne(
        { _id: conversation._id },
        { $push: { messages: savedMessage._id } }
      )

      const getConversationMessage = await Conversations.findOne({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      })
        .populate("messages")
        .sort({ updatedAt: -1 })

      const { messages } = getConversationMessage
      io.to(sender).emit("message", messages || [])
      io.to(receiver).emit("message", messages || [])

      //send conversation
      const conversationSender = await getConversation(sender)
      const conversationReceiver = await getConversation(receiver)

      io.to(sender).emit("conversation", conversationSender)
      io.to(receiver).emit("conversation", conversationReceiver)
    } catch (error) {
      console.error("Error handling new message:", error)
    }
  })

  // sidebar
  socket.on("sidebar", async (currentUserId) => {
    console.log(123)
    const conversation = await getConversation(currentUserId)
    socket.emit("conversation", conversation)
  })

  socket.on("isSeen", async (senderId) => {
    try {
      const conversation = await Conversations.findOne({
        $or: [
          { sender: user._id, receiver: senderId },
          { sender: senderId, receiver: user._id },
        ],
      })

      if (conversation) {
        const conversationMsgId = conversation.messages || []
        await Messages.updateMany(
          { _id: { $in: conversationMsgId }, sender: senderId },
          { $set: { isSeen: true } }
        )

        const conversationSender = await getConversation(user._id.toString())
        const conversationReceiver = await getConversation(senderId)

        io.to(user._id.toString()).emit("conversation", conversationSender)
        io.to(senderId).emit("conversation", conversationReceiver)
      }
    } catch (error) {
      console.error("Error updating message seen status:", error)
    }
  })

  // 終止連線
  socket.on("disconnect", () => {
    onlineUser.delete(user._id.toString())
    console.log("終止連結", socket.id)
  })
})
