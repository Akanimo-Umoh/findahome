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

// saves what the buyer typed (backend field is `address`)
export const updateProfile = async (payload: {
  name: string
  phoneNumber: string
  location: string
}) => {
  const { data } = await api.put("/user/update-profile", {
    name: payload.name,
    phoneNumber: payload.phoneNumber,
    address: payload.location,
  })
  return data
}

// only marks onboarding as done
export const onboardUser = async () => {
  const { data } = await api.patch("/user/onboard-user")
  return data
}
