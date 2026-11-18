import { io, Socket } from "socket.io-client"

// The API base URL ends in /api, but Socket.IO treats a URL path as a
// namespace, so connect to the server's origin only.
const SOCKET_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/api\/?$/, "")

let socket: Socket

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
      // The server refuses connections without a valid JWT and puts the
      // socket in that user's room. A function (not a fixed object) so every
      // connect and reconnect sends the token of whoever is logged in now.
      auth: (cb) => cb({ token: localStorage.getItem("token") }),
    })
  }
  return socket
}
