import api from "./axios";

export const getTasks = (
  page = 1,
  search = "",
  priority = "All",
  status = "All",
) => {
  return api.get(
    `/tasks?page=${page}&search=${search}&priority=${priority}&status=${status}`,
  );
};
export const createTask = (data) => {
  return api.post("/tasks", data);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

export const toggleTask = (id) => {
  return api.patch(`/tasks/${id}/toggle`);
};

export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}/update`, data);
};
