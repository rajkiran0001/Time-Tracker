import http from "../http-common";

const getAll = () => {
  return http.get("/trackers?limit=10");
};

const create = (data) => {
  return http.post("/trackers", data);
};

const findByDesc = (description) => {
  return http.get(`/trackers?description=${description}&limit=10`);
};

export default {
  getAll,
  create,
  findByDesc,
};
