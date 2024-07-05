// import { createBrowserRouter } from "react-router-dom"
// import RegisterPage from "../pages/RegisterPage"
// import CheckEmailPage from "../pages/CheckEmailPage"
// import CheckPasswordPage from "../pages/CheckPasswordPage"
// import MessagePage from "../components/MessagePage"
// import App from "../App"
// import AuthLayouts from "../layout/AuthLayouts"
// import Intro from "../pages/Intro"
// import ForgotPassword from "../pages/ForgotPassword"
// import Home from "../pages/Home"

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "register",
//         element: <RegisterPage />,
//       },
//       {
//         path: "login",
//         element: <CheckEmailPage />,
//       },
//       {
//         path: "password",
//         element: <CheckPasswordPage />,
//       },
//       {
//         path: "forgotPassword",
//         element: (
//           <AuthLayouts>
//             <ForgotPassword />
//           </AuthLayouts>
//         ),
//       },
//       {
//         path: "home",
//         element: <Home />,
//         children: [
//           {
//             path: ":userId",
//             element: <MessagePage />,
//           },
//         ],
//       },
//       {
//         // "" =  如果都沒匹配到
//         path: "",
//         element: <Intro />,
//       },
//     ],
//   },
// ])

// export default router
