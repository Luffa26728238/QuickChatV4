import { useState } from "react"
import { GrMenu } from "react-icons/gr"
import { MdOutlineClose } from "react-icons/md"
import { Link } from "react-router-dom"
import { Link as ScrollLink } from "react-scroll"
import { useEffect } from "react"

function Navbar() {
  const [nav, setNav] = useState(false)

  const handleNav = () => setNav(!nav)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  console.log(nav)
  return (
    <div className="flex justify-between items-center h-24 max-w-full  mx-auto  text-white sticky top-0 left-0 right-0 ">
      <div className="fixed top-0" id="top"></div>
      {nav && (
        <ul className="whitespace-nowrap  absolute top-12 right-0 mt-5 text-white font-bold t">
          <li className="p-4 cursor-pointer">
            <ScrollLink to="features" smooth={true} duration={500}>
              功能
            </ScrollLink>
          </li>
          <li className="p-4 cursor-pointer ">
            <ScrollLink to="contact" smooth={true} duration={500}>
              聯絡
            </ScrollLink>
          </li>
          <li className="p-4 cursor-pointer">
            <ScrollLink to="about" smooth={true} duration={500}>
              關於
            </ScrollLink>
          </li>
          <li className="p-4">
            <Link to="/register">註冊</Link>
          </li>
        </ul>
      )}
      <h1 className="w-full text-3xl md:text-4xl font-bold text-[#9370b2] cursor-pointer">
        {" "}
        <ScrollLink to="top" smooth={true} duration={500}>
          QuickChat
        </ScrollLink>
      </h1>
      <ul className="whitespace-nowrap hidden  md:flex items-end text-lg text-white font-bold">
        <li className="p-4 cursor-pointer">
          <ScrollLink to="features" smooth={true} duration={500}>
            功能
          </ScrollLink>
        </li>
        <li className="p-4 cursor-pointer">
          <ScrollLink to="contact" smooth={true} duration={500}>
            聯絡
          </ScrollLink>
        </li>
        <li className="p-4 cursor-pointer">
          <ScrollLink to="about" smooth={true} duration={500}>
            關於
          </ScrollLink>
        </li>
        <li className="p-4">
          <Link to="/register">註冊</Link>
        </li>
      </ul>
      <div onClick={handleNav} className=" block md:hidden">
        {nav ? <MdOutlineClose size={30} /> : <GrMenu size={30} />}
      </div>
      {/* <div
        className={
          nav
            ? " sticky left-0 top-30   w-[60%] h-full border-r border-r-gray-900  ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      > */}
      {/* <h1 className="w-full text-3xl font-bold text-[#9370b2] m-4">
          Quick Chat.
        </h1> */}

      {/* <ul className="whitespace-nowrap p-4 z-30">
          <li className="p-4 border-b border-gray-600">首頁</li>
          <li className="p-4 border-b border-gray-600">功能</li>
          <li className="p-4 border-b border-gray-600">關於</li>
          <li className="p-4">聯絡</li>
        </ul> */}
      {/* </div> */}
    </div>
  )
}

export default Navbar
