import api from "../services/api";
import { login, loginAtletica, loginMembro } from "../utils/storage";

const ApiService = {

  LoginAtletica: (crecencial) => {
    return api
      .post("/api/Login/Atletica", crecencial)
      .then((res) => {
        loginAtletica(res.data.token, 'A', res.data.atletica.atleticaId)
        return res
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


  LoginMembro: (credencial) => {
    return api
      .post("/api/Login/Membro", credencial)
      .then((res) => {
        loginMembro(res.data.token, 'A', res.data.atletica.membroId, res.data.atletica.pessoa.atleticaId)
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },

  CadastroAtletica: (Atletica) => {
    return api
      .post("/api/Registro/Atletica", Atletica)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
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
  },

  CadastroMembro: (Membro, PIN) => {
    return api
      // .post(`/api​/Registro​/Membro​/${PIN}`, Membro)
      .post(`/api/Registro/Membro/${PIN}`, Membro)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });

  },

  CadastrarModalidade: (atleticaId, AtleticaModalidade) => {
    return api
      .post(`/api/AtleticaModalidade/${atleticaId}`, AtleticaModalidade)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });

  },

  BuscarAtletaModalidade: (atleticaModalidadeId) => {
    return api
      .get(`/api/AtletaModalidade/${atleticaModalidadeId}`)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },

  BuscarAddAtletas: (atleticaId, modalidadeId) => {
    return api
      .get(`/api/AtletaModalidade/${atleticaId}/${modalidadeId}`)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });

  }
}

export default ApiService;

