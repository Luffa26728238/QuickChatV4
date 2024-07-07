import { Conversations } from "../models/Conversations"

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user._id

    const conversation = await Conversations.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages")

    if (!conversation) return res.status(200).json([])

    const messages = conversation.messages

    res.status(200).json(messages)
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}

export default getMessages
