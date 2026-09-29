import axios from "axios";

const API_URL = "http://localhost:5050/auth";

// =========================
// SIGNUP
// =========================
export const signupUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/signup`, {
    username,
    password,
  });

  return response.data;
};


// =========================
// LOGIN
// =========================
export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  return response.data;
};


// =========================
// SAVE LOGIN SESSION
// =========================
export const saveAuthSession = (token, user) => {
  sessionStorage.setItem("heaven_token", token);
  sessionStorage.setItem("heaven_user", JSON.stringify(user));

  // Navbar ko batana ke login state change ho gayi hai
  window.dispatchEvent(new Event("heaven-auth-change"));
};


// =========================
// GET TOKEN
// =========================
export const getToken = () => {
  return sessionStorage.getItem("heaven_token");
};


// =========================
// GET USER
// =========================
export const getCurrentUser = () => {
  const user = sessionStorage.getItem("heaven_user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
};


// =========================
// LOGOUT
// =========================
export const logoutUser = () => {
  sessionStorage.removeItem("heaven_token");
  sessionStorage.removeItem("heaven_user");

  // Navbar ko batana ke logout ho gaya hai
  window.dispatchEvent(new Event("heaven-auth-change"));
};


// =========================
// CHECK LOGIN
// =========================
export const isLoggedIn = () => {
  return Boolean(sessionStorage.getItem("heaven_token"));
};