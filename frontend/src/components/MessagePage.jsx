import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { Link, NavLink, useParams } from "react-router-dom"
import Avatar from "./Avatar"
import moment from "moment"
import EmojiPicker from "emoji-picker-react"
import { HiOutlineEmojiHappy } from "react-icons/hi"

// icons
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaAngleLeft } from "react-icons/fa"
import { FaPlus } from "react-icons/fa"
import { ImImage } from "react-icons/im"
import { MdOndemandVideo } from "react-icons/md"
import { IoCloseOutline } from "react-icons/io5"
import { IoMdSend } from "react-icons/io"
import uploadFile from "../helpers/uploadFile"

function MessagePage() {
  const params = useParams()

  const socketConnection = useSelector((state) => state.user.socketConnection)
  const user = useSelector((state) => state.user)
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    profileImg: "",
    online: false,
  })

  const [file, setFile] = useState({
    img: null,
    video: null,
  })
  const [openUpload, setOpenUpload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allMessages, setAllMessages] = useState([])
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  })
  //Emojis
  const [openEmoji, setOpenEmoji] = useState(false)

  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const messagesEndRef = useRef(null)

  const handleUploadOpen = () => {
    setOpenUpload((prev) => !prev)
  }

  const handleUploadImage = (e) => {
    setOpenUpload(false)
    const file = e.target.files[0]
    if (!file) return

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"]
    const isVideo = file.type === "video/mp4" && "videoUrl"
    const isImage = validImageTypes.includes(file.type) && "imageUrl"

    const isValidType = isVideo || isImage

    if (!isValidType) {
      console.log("文件類型無效，僅支持 MP4 或圖像")
      return
    }

    if (isVideo) {
      setFile({
        video: file,
      })
    } else {
      setFile({
        img: file,
      })
    }
    const reader = new FileReader()

    reader.onload = function (event) {
      const fileUrl = event.target.result
      setMessage((prev) => {
        return {
          ...prev,
          [isImage || isVideo]: fileUrl,
        }
      })
    }
    reader.readAsDataURL(file)
  }

  console.log(`messages!!!!${message.text}`)

  const handleUploadVideo = (e) => {
    handleClearImage()
    setOpenUpload(false)

    const file = e.target.files[0]
    if (!file) return

    setFile({
      video: file,
    })

    setOpenUpload(false)

    const reader = new FileReader()

    reader.onload = function (event) {
      const videoUrl = event.target.result
      setMessage((prev) => {
        return {
          ...prev,
          videoUrl: videoUrl,
        }
      })
    }
    reader.readAsDataURL(file)
  }

  console.log(file)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const uploadedImgUrl = await uploadFile(file?.img)
    const uploadedVideoUrl = await uploadFile(file?.video)

    if (socketConnection) {
      socketConnection.emit("new message", {
        sender: user.userId,
        receiver: params.userId,
        text: message.text,
        imageUrl: uploadedImgUrl?.url,
        videoUrl: uploadedVideoUrl?.url,
      })
    }
    setMessage({
      text: "",
      imageUrl: "",
      videoUrl: "",
    })

    setFile(null)
    scrollToBottom()
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleClearImage = () => {
    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: "",
      }
    })
    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }
  }

  const handleClearVideo = () => {
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: "",
      }
    })
    if (videoInputRef.current) {
      videoInputRef.current.value = ""
    }
  }

  useEffect(() => {
    if (socketConnection) {
      setAllMessages([])
      console.log(params.userId)
      socketConnection.emit("message-page", params.userId, user.userId)

      socketConnection.emit("isSeen", params.userId)

      //正在聊天的對象
      socketConnection.on("message-user", (data) => {
        setUserData(data)
      })
      console.log("聊天天訊息")

      socketConnection.on("message", (data) => {
        console.log("聊天天訊息")
        console.log(data)
        setAllMessages(data)
      })
    }
  }, [socketConnection, params.userId, user])

  useEffect(() => {
    scrollToBottom()
  }, [allMessages])

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setMessage((prev) => {
      return {
        ...prev,
        text: value,
      }
    })
  }
  const handleEmojiClick = () => {
    setOpenEmoji((prev) => {
      return !prev
    })
  }

  return (
    <div className="">
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link to={"/home"} className="lg:hidden">
            <FaAngleLeft size={20} />
          </Link>
          <Avatar
            width={50}
            height={50}
            profileImg={userData?.profileImg}
            name={userData?.name}
            userId={userData?._id}
          />
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              {userData?.name}
            </h3>
            <p className="-my-2 text-sm">{userData.online ? "線上" : "離線"}</p>
          </div>
        </div>

        <div>
          <button className="cursor-pointer hover:text-blue-600">
            <BsThreeDotsVertical />
          </button>
        </div>
      </header>

      {/* 聊天室 */}
      <section className="h-[calc(80vh)] overflow-hidden  overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50">
        {/* 顯示上傳的圖片 */}
        {/* {message.imageUrl && (
          <div className="w-full h-full  sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer"
              onClick={handleClearImage}
            >
              <IoCloseOutline size={30} />
            </div>
            <div className=" bg-white p-3">
              <img
                src={message.imageUrl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                alt="上傳的圖片"
              />
            </div>
          </div>
        )} */}
        {/* 顯示上傳的影片 */}
        {message.videoUrl && (
          <div className="w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer"
              onClick={handleClearVideo}
            >
              <IoCloseOutline size={30} />
            </div>
            <div className=" bg-white p-3">
              <video
                src={message.videoUrl}
                className="aspect-video w-full h-full max-w-sm m-2"
                controls
                muted
                autoPlay
              ></video>
            </div>
          </div>
        )}
        {/* 顯示所有訊息 */}
        <div className="flex flex-col gap-2">
          {allMessages.map((message, index) => {
            return (
              <nav
                className={`bg-white p-1 py-1 rounded w-fit ${
                  user.userId == message.sender ? "ml-auto bg-teal-200" : ""
                }`}
                key={index}
              >
                {/* 圖片 */}
                <div>
                  {message.imageUrl && (
                    <img
                      src={message?.imageUrl}
                      className="w-[300px] h-[200px] oject-scale-down"
                    ></img>
                  )}
                </div>
                <div>
                  {message.videoUrl && (
                    <video
                      src={message?.videoUrl}
                      className="w-[300px] h-[300px] object-scale-down"
                      controls
                      muted
                      autoPlay
                    ></video>
                  )}
                </div>
                <p className="p-2">{message.text}</p>
                <p className="text-xs ml-auto w-fit">
                  {moment(message.createdAt).format("hh:mm")}
                </p>
              </nav>
            )
          })}

          <div ref={messagesEndRef} />
        </div>
      </section>
      <section className=" w-auto  bg-white flex items-center px-4 mt-10">
        <div className="relative">
          <button
            onClick={handleUploadOpen}
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-blue-600 hover:text-white"
          >
            <FaPlus size={20} />
          </button>
          {/* 上傳檔案按鈕 */}
          {openUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-blue-800">
                    <ImImage size={18} />
                  </div>
                  <p>圖片</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-red-700">
                    <MdOndemandVideo size={18} />
                  </div>
                  <p>影片</p>
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  ref={imageInputRef}
                  onChange={handleUploadImage}
                  className="hidden"
                />
                <input
                  type="file"
                  id="uploadVideo"
                  ref={videoInputRef}
                  onChange={handleUploadVideo}
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>

        {/* 文字訊息 */}
        <form
          action=""
          className="w-full h-full grid grid-cols-3 items-center justify-between gap-2"
          onSubmit={handleSubmit}
        >
          <div className="col-span-3 flex items-center gap-2">
            {message.imageUrl && (
              <img
                src={message.imageUrl}
                className="w-20 h-20 rounded"
                alt="Preview"
              />
            )}
            {message.videoUrl && (
              <video
                src={message.videoUrl}
                className="w-20 h-20 rounded object-scale-down"
                alt="Preview"
              />
            )}
            {openEmoji && (
              <div
                className="fixed bottom-[9.5vh] right-[5vh]"
                onClick={() => {
                  setOpenEmoji(false)
                }}
              >
                {" "}
                <EmojiPicker
                  onEmojiClick={(e) => {
                    const { emoji } = e
                    setMessage((prev) => {
                      return {
                        ...prev,
                        text: (prev.text += emoji),
                      }
                    })
                  }}
                />
              </div>
            )}
            <div className="flex flex-grow border rounded justify-center items-center px-2">
              <input
                type="text"
                placeholder="在想甚麼......"
                value={message.text}
                onChange={handleOnchange}
                className="px-3 py-2 outline-none  flex-grow"
              />
              <HiOutlineEmojiHappy
                size={25}
                className="cursor-pointer"
                onClick={handleEmojiClick}
              />
            </div>

            <button className="col-span-1 hover:text-blue-700 flex-shrink-0">
              <IoMdSend size={30} />
            </button>
          </div>
        </form>
      </section>

      {/* 傳訊息 */}
    </div>
  )
}

export default MessagePage
