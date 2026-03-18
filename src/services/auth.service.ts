import api from "./api";

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  // role: "user" | "agent";
};

type LoginPayload = {
  email: string;
  password: string;
};

type VerifyEmailPayload = {
  email: string;
  code: string;
};

type ResendVerificationPayload = {
  email: string;
};

type ForgotPasswordPayload = {
  email: string;
};

type ResetPasswordPayload = {
  email: string;
  code: string;
  newPassword: string;
};

export const signup = async (payload: SignupPayload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const verifyEmail = async (payload: VerifyEmailPayload) => {
  const { data } = await api.post("/auth/verify", payload);
  return data;
};

export const resendVerificationEmail = async (
  payload: ResendVerificationPayload,
) => {
  const { data } = await api.post("/auth/resend-verification", payload);
  return data;
};

export const googleAuth = async (
  tokenId: string,
  mode: "register" | "login",
) => {
  const { data } = await api.post("/auth/google", {
    tokenId,
    mode,
  });
  return data;
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const { data } = await api.post("/auth/forget-password", payload);
  return data;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data } = await api.post("/auth/change-password", payload);
  return data;
};