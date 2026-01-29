// import api from "./api";

// type SignupPayload = {
//   name: string;
//   email: string;
//   password: string;
//   // role: "buyer" | "seller";
// };

// type LoginPayload = {
//   email: string;
//   password: string;
// };

// type VerifyEmailPayload = {
//   email: string;
//   code: string;
// };

// export const signup = async (payload: SignupPayload) => {
//   const { data } = await api.post("/api/auth/register", payload);
//   return data;
// };

// export const login = async (payload: LoginPayload) => {
//   const { data } = await api.post("/api/auth/login", payload);
//   return data;
// };

// export const verifyEmail = async (payload: VerifyEmailPayload) => {
//   const { data } = await api.post("/api/auth/verify", payload);
//   return data;
// };

// export const googleAuth = async (
//   tokenId: string,
//   mode: "register" | "login",
// ) => {
//   const { data } = await api.post("/api/auth/google", {
//     tokenId,
//     mode,
//   });
//   return data;
// };

import axios from "axios";

const API_BASE_URL = "https://property-listing-api-wreb.vercel.app/api/auth";

// Types matching backend expectations
type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type GoogleAuthPayload = {
  tokenId: string;
  mode: "register" | "login";
};

type VerifyEmailPayload = {
  email: string;
  code: string;
};

// Register with email/password
export const register = async (payload: RegisterPayload) => {
  const { data } = await axios.post(`${API_BASE_URL}/register`, payload);
  return data;
};

// Login with email/password
export const login = async (payload: LoginPayload) => {
  const { data } = await axios.post(`${API_BASE_URL}/login`, payload);
  return data;
};

// Google OAuth (both register and login)
export const googleAuth = async (payload: GoogleAuthPayload) => {
  const { data } = await axios.post(`${API_BASE_URL}/google`, payload);
  return data;
};

// Verify email
export const verifyEmail = async (payload: VerifyEmailPayload) => {
  const { data } = await axios.post(`${API_BASE_URL}/verify`, payload);
  return data;
};

// Get current user (requires token)
export const getCurrentUser = async (token: string) => {
  const { data } = await axios.get(`${API_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
