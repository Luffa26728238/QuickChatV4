import { Conversations } from "../models/Conversations.js"
import Users from "../models/Users.js"

const getConversations = async (req, res) => {
  try {
    // const { id: userToChatId } = req.params
    const senderId = req.user._id

    const conversations = await Conversations.find({
      participants: { $all: [senderId] },
    }).populate({
      path: "participants",
      match: { _id: { $ne: senderId } },
      select: "-password",
    })

    let allUsers = []
    conversations.forEach((conversation) => {
      allUsers.push(...conversation.participants)
    })

    res.status(200).json(allUsers)
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}

export default getConversations
