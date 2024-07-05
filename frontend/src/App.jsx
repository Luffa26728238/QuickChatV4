import { Navigate, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
import Register from "./pages/Register"
import CheckEmailPage from "./pages/CheckEmailPage"
import CheckPasswordPage from "./pages/CheckPasswordPage"
import Intro from "./pages/Intro"
import { useAuthContext } from "./context/AuthContext"

function App() {
  const { authUser } = useAuthContext()

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Intro />} />

        <Route path="/home" element={<Home />} />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="/checkEmail"
          element={authUser ? <Navigate to="/home" /> : <CheckEmailPage />}
        />
        <Route
          path="/password"
          element={authUser ? <Navigate to="/home" /> : <CheckPasswordPage />}
        />
      </Routes>
    </>
  )
}
export default App
