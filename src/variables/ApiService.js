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
  BuscarTodosCursos: () => {
    return api
      .get("/api/Cursos")
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  BuscarAtleticaModalidades: (atleticaId) => {
    return api
      .get("/api/AtleticaModalidade/" + atleticaId)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  CriarSolicitacaoAtleta: (atleticaId, atleta) => {
    return api
      .post("/api/SolicitacaoAtleta/" + atleticaId, atleta)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
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
};

export default ApiService;
