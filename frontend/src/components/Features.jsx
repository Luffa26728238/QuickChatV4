import { Link } from "react-router-dom"
import { ReactTyped } from "react-typed"

function Features() {
  return (
    // <div className="w-full  mt-[20vh] py-16 px-4 text-white">
    //   {/* <div className="max-w-[1240px] mx-auto"> */}
    //   <div className="h-[80vh] flex flex-col-reverse justify-center gap-[10vw] lg:flex-row">
    //     <img
    //       src="https://i.ibb.co/G5M1j9r/192167134-8205eb89-a71d-4463-8f3a-940e844917d5.gif"
    //       alt="展示表情符號功能的圖片"
    //       className="object-fill "
    //     />

    //     <div className="flex flex-col justify-center  items-center   gap-4 px-10 ">
    //       <p className=" text-xl text-[#e5c34a] font-bold">表情符號</p>
    //       <h1 className="md:text-5xl sm:text-3xl py-4">傳達你的好心情</h1>
    //       <p className="text-xl">
    //         感覺像是創造的一天？ 讓我們一起開啟新的旅程😆
    //       </p>
    //     </div>
    //   </div>
    //   <div className="h-[80vh] flex justify-center gap-[10vw] mt-20">
    //     <div className="flex flex-col justify-center gap-4 px-10 ">
    //       <p className=" text-xl text-[#e5c34a] font-bold">上傳</p>
    //       <h1 className="md:text-5xl sm:text-3xl py-4">
    //         分享你喜歡的影片與圖片
    //       </h1>
    //       <p className="text-xl">把你看到的美好事物分享給朋友吧😜😜</p>
    //     </div>
    //     <img
    //       src="https://i.ibb.co/G5M1j9r/192167134-8205eb89-a71d-4463-8f3a-940e844917d5.gif"
    //       alt="展示表情符號功能的圖片"
    //       className="object-fill"
    //     />
    //   </div>
    //   <div className="h-[80vh] flex justify-center gap-[10vw] mt-20">
    //     <img
    //       src="https://images.unsplash.com/photo-1552068751-34cb5cf055b3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //       alt="展示表情符號功能的圖片"
    //       className="object-fill"
    //     />
    //     <div className="flex flex-col justify-center gap-4 px-10 ">
    //       <p className=" text-xl text-[#e5c34a] font-bold">想聊就聊</p>
    //       <h1 className="md:text-5xl sm:text-3xl py-4">隨時隨地聊天</h1>
    //       <p className="text-xl">把你看到的美好事物分享給朋友吧😜😜</p>
    //     </div>
    //   </div>

    //   {/* <div className="flex flex-col justify-center gap-4 px-10">
    //       <p className="text-xl text-[#e5c34a] font-bold">影音</p>
    //       <h1 className="md:text-5xl sm:text-3xl py-4 w-50">
    //         分享你喜歡的影片與圖片
    //       </h1>
    //       <p>把你看到的美好事物分享給朋友吧😜😜</p>
    //     </div>

    //     <img
    //       src="https://media.istockphoto.com/id/1044387612/vector/mobile-chat-app-vector-mockup.jpg?s=612x612&w=0&k=20&c=7di6UEf7r_c3LQ3msgr4kk48KJ7gqJR2nMCjhGF9Z_o="
    //       alt=""
    //     />
    //     <img
    //       src="https://media.designrush.com/articles/404640/conversions/CHAT-details.jpg"
    //       alt="展示表情符號功能的圖片"
    //       className="w-[500px] mx-auto my-4"
    //     />

    //     <div className="flex flex-col justify-center gap-4 px-10">
    //       <p className=" text-xl text-[#e5c34a] font-bold">表情符號</p>
    //       <h1 className="md:text-5xl sm:text-3xl py-4">傳達你的好心情</h1>
    //       <p className="">感覺像是創造的一天？✨🎉 讓我們一起開啟新的旅程😆</p>
    //     </div> */}
    // </div>
    // ---------------------------------

    <div className="w-full  text-white py-16 px-4 flex-col gap-20">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2" id="homePage">
        <div className="flex flex-col justify-center  md:mr-10 items-center lg:items-start order-1">
          <p className="text-3xl sm:text-5xl md:text-7xl font-serif py-6 tracking-wide">
            隨時隨地都可暢聊
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl text-[#8942c7] font-semibold">
            簡單 方便 快速
          </h1>
          <div className=" h-20 flex flex-col gap-5 justify-center ">
            <ReactTyped
              className="text-lg sm:text-xl md:text-2xl font-bold pl-2"
              strings={[
                "直觀的界面設計，讓您輕鬆上手",
                "只需幾次點擊，即可發送訊息或進行視訊通話",
                "毫無延遲，確保您不會錯過任何重要時刻",
              ]}
              typeSpeed={40}
              backSpeed={20}
              loop
            />
          </div>
          <Link to="./login">
            <button className="bg-[#8942c7] rounded px-10 py-4 mt-6 font-bold hover:bg-[#b17bde] shadow-2xl shadow-[#d0b88aa5] ease-in-out duration-200">
              立即登入
            </button>
          </Link>
        </div>
        <img
          className="w-[500px] mx-auto my-4  order-2"
          src={
            "https://plus.unsplash.com/premium_photo-1669740216429-f7cbec44cb08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNoYXR8ZW58MHx8MHx8fDA%3D"
          }
          alt="/"
        />
      </div>
      <div
        className="max-w-[1240px] mx-auto grid  md:grid-cols-2"
        id="features"
      >
        <img
          className="w-[500px] mx-auto my-4 order-2 md:order-1"
          src={
            "https://i.ibb.co/G5M1j9r/192167134-8205eb89-a71d-4463-8f3a-940e844917d5.gif"
          }
          alt="/"
        />
        <div className="flex flex-col justify-center  items-center  order-1 md:order-2 ml-10">
          <p className="text-[#e5c34a] font-bold ">表情符號</p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            傳達你的好心情
          </h1>
          <p>感覺像是新的的一天？ 讓我們一起開啟新的旅程😆</p>
        </div>
      </div>{" "}
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <div className="flex flex-col justify-center items-center  lg:ml-20 mr-10">
          <p className="text-[#e5c34a] font-bold ">想聊就聊</p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            隨時隨地聊天
          </h1>
          <p>把你看到的美好事物分享給朋友吧😜😜</p>
        </div>
        <img
          className="w-[500px] mx-auto my-4"
          src={
            "https://images.unsplash.com/photo-1552068751-34cb5cf055b3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="/"
        />
      </div>{" "}
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img
          className="w-[500px] mx-auto my-4 order-2 md:order-1"
          src={
            "https://media.istockphoto.com/id/1044387612/vector/mobile-chat-app-vector-mockup.jpg?s=612x612&w=0&k=20&c=7di6UEf7r_c3LQ3msgr4kk48KJ7gqJR2nMCjhGF9Z_o="
          }
          alt="/"
        />
        <div className="flex flex-col justify-center items-center lg:ml-20 order-1 md:order-2 ml-10">
          <p className="text-[#e5c34a] font-bold ">影音</p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            分享你喜歡的影片與圖片
          </h1>
          <p>把你看到的美好事物分享給朋友吧😜😜</p>
        </div>
      </div>{" "}
      {/* end */}
    </div>
  )
}

export default Features
