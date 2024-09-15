import { Link } from "react-router-dom"

function AuthLayouts({ children }) {
  return (
    <div className="">
      <header className="flex justify-center items-center p-3 ">
        {/* <img src={logo} alt="暫時logo" width={180} height={60} /> */}
        <h1 className="text-red-500 text-[90px]">
          {" "}
          <Link to="/">LOGO</Link>
        </h1>
      </header>

      {children}
    </div>
  )
}

export default AuthLayouts
