import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5500/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// export default axios.create({
//   baseURL: "https://evangadi-forum-j4d9.onrender.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });