import api from "../services/api";
import { login } from "../utils/storage";

const ApiService = {
  LoginAtletica: (crecencial) => {
    return api
      .post("/api/Login/Atletica", crecencial)
      .then((res) => {
        login(
          res.data.token,
          "A",
          res.data.atletica.atleticaId,
          res.data.atletica.username
        );
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
        login(res.data.token, "A", res.data.atletica.membroId, null);
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

  CadastroMembro: (Membro, PIN) => {
    return (
      api
        // .post(`/api​/Registro​/Membro​/${PIN}`, Membro)
        .post(`/api/Registro/Membro/${PIN}`, Membro)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((error) => {
          console.error(error);
          return Promise.reject(error);
        })
    );
  },
  PesquisaAtleticaPorUsername: (username) => {
    return api
      .get(`/api/Atletica/BuscaPorUsername/${username}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
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

  AtualizarAtletica: (atleticaId, atleticaDados) => {
    return api
      .put(`/api/Atletica/${atleticaId}`, atleticaDados)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  UploadImagem: (data) => {
    return api
      .post(`/api/Imagem/Upload`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
};

export default ApiService;
