// import axios from "axios"
// import { useEffect, useState } from "react"

// const useGetUser = (id) => {
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     setLoading(true)

//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_APP_BACKEND_API}/${id}`,
//           {
//             withCredentials: true,
//           }
//         )

//         console.log(res)
//       } catch (err) {
//         console.log(err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchData()
//   })
// }

// export default useGetUser
