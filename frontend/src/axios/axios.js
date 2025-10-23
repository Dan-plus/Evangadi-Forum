import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5500/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// export default axios.create({
//   baseURL: "https://qabackend-nnnx.onrender.com/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });