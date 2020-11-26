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

  BuscarTodosPosts: (id) => {
    return api
      .get("api/PublicacaoAtletica/" + id)
      .then((res) => {
        console.log(id)
        console.log(res)
        return res;
      })
      .catch((err) => {
        console.log(id)
        console.log(err)
        return err;
      });
  },

};

export default ApiService;
