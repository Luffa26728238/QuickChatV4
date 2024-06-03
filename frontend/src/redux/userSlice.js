import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: "",
  name: "",
  email: "",
  profileImg: "",
  token: "",
  onlineUser: [],
  socketConnection: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload)
      const { _id, name, email, profileImg } = action.payload
      state.userId = _id
      state.name = name
      state.email = email
      state.profileImg = profileImg
    },

    setToken: (state, action) => {
      state.token = action.payload
    },
    logout: (state) => {
      return initialState
    },

    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload
    },
    setSocketConnection: (state, action) => {
      console.log(action.payload, "123213")
      state.socketConnection = action.payload
    },
  },
})

export const { setUser, setToken, logout, setOnlineUser, setSocketConnection } =
  userSlice.actions

export default userSlice.reducer
