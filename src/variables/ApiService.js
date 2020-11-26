import api from "../services/api";
import { login } from "../utils/storage";

const ApiService = {
  LoginAtletica: (crecencial) => {
    return api
      .post("/api/Login/Atletica", crecencial)
      .then((res) => {
        login(res.data.token, 'A', res.data.atletica.atleticaId)
        return res
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
        login(res.data.token, 'A', res.data.atletica.membroId)
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
};

export default ApiService;