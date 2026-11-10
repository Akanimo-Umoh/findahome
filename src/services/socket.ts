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
    })
  }
  return socket
}
