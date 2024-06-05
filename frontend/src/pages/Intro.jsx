import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

function Intro() {
  return (
    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-5">
      <div className="bg-[rgba(17,25,40,0.9)] backdrop-blur-lg rounded-lg p-8">
        <Navbar />
        <Features />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default Intro
