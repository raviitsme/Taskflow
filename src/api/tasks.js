import api from "./axios";

export const getTasks = () => {
    return api.get('/tasks');
}

export const createTask = (data) => {
    return api.post('/tasks', data);
}

export const deleteTask = (id) => {
    return api.delete(`/tasks/${id}`);
}

export const toggleTask = (id) => {
    return api.patch(`/tasks/${id}/toggle`)
}