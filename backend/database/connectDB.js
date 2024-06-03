import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log("連結到mongoDB...")
  } catch (err) {
    console.error(err)
  }
}

export default connectDB
