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
        login(res.data.token, 'A', res.data.atletica.membroId)
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
  }

};

export default ApiService;

