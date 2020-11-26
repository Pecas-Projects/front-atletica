import api from "../services/api";

export const isLogin = () => {
  if (localStorage.getItem("@Olympos:token")) {
    return true;
  }
  return false;
};

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

  LoginMembro: (credencial) => {
    return api
      .post("/api/Login/Membro", credencial)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },

  Logout: () => {
    localStorage.removeItem("@Olympos:token");
  },

  ModalidadesAtletica: (atleticaId) => {
    return api
      .get(`/api/AtleticaModalidade/${atleticaId}`)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });

  }
};

export default ApiService;
