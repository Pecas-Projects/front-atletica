import api from "../services/api";

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
  PesquisaAtleticas: (nomeAtletica) => {
    return api
      .get("/api/AtleticaNome/" + nomeAtletica)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};

export default ApiService;
