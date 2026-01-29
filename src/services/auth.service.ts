import api from "./api";

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  // role: "buyer" | "seller";
};

type LoginPayload = {
  email: string;
  password: string;
};

type VerifyEmailPayload = {
  email: string;
  code: string;
};

export const signup = async (payload: SignupPayload) => {
  const { data } = await api.post("/api/auth/register", payload);
  return data;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post("/api/auth/login", payload);
  return data;
};

export const verifyEmail = async (payload: VerifyEmailPayload) => {
  const { data } = await api.post("/api/auth/verify", payload);
  return data;
};

export const googleAuth = async (
  tokenId: string,
  mode: "register" | "login",
) => {
  const { data } = await api.post("/api/auth/google", {
    tokenId,
    mode,
  });
  return data;
};
