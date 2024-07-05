import axios from "axios"
import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import Sidebar from "../components/Sidebar"
import io from "socket.io-client"
import { useAuthContext } from "../context/AuthContext"

function Home() {
  // socket.io

  return (
    <div className="grid lg:grid-cols-6 h-screen max-h-screen">
      <section className={`bg-white col-span-2 lg:block`}>
        {/* <Sidebar /> */}
      </section>
      <section className={`col-span-4 `}></section>

      <div
        className={`justify-center items-center flex-col gap-2 ${"lg:flex"}`}
      >
        <div className="ml-[50vw] flex  flex-col items-center">
          <p className="text-blue-300 text-[60px]">QuickChat</p>
          <p className="text-red-300 text-lg mt-2">傳送訊息給朋友吧!</p>
        </div>
      </div>
    </div>
  )
}

export default Home
