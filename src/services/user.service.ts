import api from "./api"

export const getMe = async () => {
  const { data } = await api.get("/user/me")
  return data // { success, user }
}

export const onboardAgent = async (payload: FormData) => {
  const { data } = await api.patch("/user/onboard-agent", payload, {
    headers: {
      "Content-Type": undefined,
    },
  })
  return data
}

export const onboardUser = async (payload: {
  name: string
  phoneNumber: string
  location: string
}) => {
  const { data } = await api.patch("/user/onboard-user", payload)
  return data
}
