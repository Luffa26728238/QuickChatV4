import { Messages, Conversations } from "../models/Conversations.js"

const sendMessage = async (req, res) => {
  try {
    const message = req.body

    const { id: receiverId } = req.params
    const senderId = req.user._id
    let conversation = await Conversations.findOne({
      participants: { $all: [senderId, receiverId] },
    })

    if (!conversation) {
      conversation = await Conversations.create({
        participants: [senderId, receiverId],
      })
    }

    const newMessage = new Messages({
      ...message,
      senderId,
      receiverId,
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save(), newMessage.save()])
    res.status(201).json(newMessage)
  } catch (err) {
    console.log("error in send Message", err)
  }
}

export default sendMessage
