import api from "./axios";

// Register
export const registerUser = (data) => {
    return api.post('/auth/register', data);
}

export const loginUser = (data) => {
    return api.post('/auth/login', data);
}