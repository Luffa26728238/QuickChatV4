function Contact() {
  return (
    <div className="w-full py-16 text-white px-4 mt-[-60px]">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center items-center  gap-8">
        <div>
          <h1
            className="text-3xl  md:text-4xl  text-center font-bold py-2"
            id="contact"
          >
            訂閱電子報，隨時獲取最新消息
          </h1>
          <p className="text-center">
            電子報會提供個性化的內容推薦，讓您獲取最相關的信息
          </p>
        </div>
        <div className="my-4 sm:w-[70%] w-full">
          <div className="flex flex-col items-center md:flex-row w-full">
            <input
              className="text-black p-4 w-full rounded-md sm-w-[70%]"
              type="email"
              placeholder="輸入您的Email"
            />
            <button className="  text-black  text-md bg-[#9370b2] w-full md:w-[200px] md:ml-4 px-auto py-4 rounded-md font-medium mt-4 md:mt-0">
              訂閱
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
