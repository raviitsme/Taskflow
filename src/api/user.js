import api from "./axios";

export const getMe = () => api.get('/me/');

export const updateProfile = (data) => {
    api.put('/me/update', data);
} 