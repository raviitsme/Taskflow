import api from "./axios";

// Register
export const registerUser = (data) => {
    return api.post('/auth/register', data);
}

export const loginUser = (data) => {
    return api.post('/auth/login', data);
}

export const verifyOtp = (data) => {
  return api.post("/auth/verify-otp", data);
};

export const resetPassword = (data) => {
  return api.post("/auth/reset-password", data);
};