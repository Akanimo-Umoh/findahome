import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// jwt for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// handle expired/invalid/missing token globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthEndpoint = error.config?.url?.includes("/auth/")

      if (!isAuthEndpoint) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        // avoid redirect loop if already on login
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login"
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
