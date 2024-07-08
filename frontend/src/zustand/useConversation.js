import { create } from "zustand"

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  messages: [],
  setMessages: (messages) => set({ messages }), //set({messages: messages})

  chatUser: [],
  setChatUser: (chatUser) => set({ chatUser }),
}))

export default useConversation
