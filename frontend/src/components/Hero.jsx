import { Link } from "react-router-dom"
import { ReactTyped } from "react-typed"

function Hero() {
  return (
    <div className="text-white mt-[15vh] h-[60vh] flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
      <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:order-2">
        <p className="text-4xl sm:text-5xl md:text-7xl font-serif py-6 tracking-wide">
          隨時隨地都可暢聊
        </p>
        <p className="text-3xl sm:text-4xl md:text-6xl text-[#8942c7] font-semibold">
          簡單 方便 快速
        </p>
        <div className="mt-5 flex flex-col gap-5 justify-center">
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
          <button className="bg-[#8942c7] rounded px-10 py-4 mt-6 font-bold hover:bg-[#8942c7] shadow-2xl shadow-[#16120b59] ease-in-out duration-200">
            立即登入
          </button>
        </Link>
      </div>
      <div className="flex justify-center lg:justify-start items-center lg:order-1 ">
        <img
          src="https://plus.unsplash.com/premium_photo-1669740216429-f7cbec44cb08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNoYXR8ZW58MHx8MHx8fDA%3D"
          alt="展示聊天功能的圖片"
          className="w-full h-full max-w-md object-contain"
        />
      </div>
    </div>
  )
}

export default Hero
