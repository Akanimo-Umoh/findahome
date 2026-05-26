import { io, Socket } from "socket.io-client"

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

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
