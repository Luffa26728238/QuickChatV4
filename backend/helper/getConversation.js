import { Conversations } from "../models/Conversations.js"

export const getConversation = async (currentUserId) => {
  if (currentUserId) {
    try {
      const currentUserConversation = await Conversations.find({
        $or: [{ sender: currentUserId }, { receiver: currentUserId }],
      })
        .sort({ updatedAt: -1 })
        .populate("messages")
        .populate("sender")
        .populate("receiver")

      const conversation = currentUserConversation.map((message) => {
        const unSeenMsgs = message.messages.reduce(
          (prev, cur) => prev + (cur.isSeen ? 0 : 1),
          0
        )
        return {
          id: message?._id,
          sender: message?.sender,
          receiver: message?.receiver,
          unSeenMsg: unSeenMsgs,
          lastMsg: message?.messages[message?.messages?.length - 1],
        }
      })

      return conversation
    } catch (error) {
      console.error("Error fetching sidebar conversations:", error)
    }
  }

  return []
}
