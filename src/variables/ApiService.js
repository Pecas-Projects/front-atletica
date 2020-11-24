import api from "../services/api";

let userId;

export function SetUserId(id) {
  userId = id;
}

const ApiService = {
  LoginAtletica: (crecencial) => {
    return api
      .post("/api/Login/Atletica", crecencial)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
};

export default ApiService;
