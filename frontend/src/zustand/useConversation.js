import { create } from "zustand"

const useConversation = create((set, get) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  messages: [],
  setMessages: (messages) => set({ messages }), //set({messages: messages})

  chatUser: [],
  setChatUser: (chatUser) => set({ chatUser }),

  findChatUserById: (id) => {
    const state = get()
    return state.chatUser.find((user) => user._id === id)
  },
}))

export default useConversation
