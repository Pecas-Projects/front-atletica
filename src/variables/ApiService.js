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

  BuscarTodosPosts: (atleticaId) => {
    return api
      .get("api/PublicacaoAtletica/" + atleticaId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  CadastroMembro: (Membro, PIN) => {
    return api
      .post(`/api/Registro/Membro/${PIN}`, Membro)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },

  GetModalidadeId: (modalidadeId)=>{
    return api
      .get(`​/api/modalidade/${modalidadeId}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  GetSolicitacoesJogo: (atleticaId)=>{
    return api
      .get(`/api/SolicitacaoJogo/${atleticaId}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  GetSolicitacoesAtleta: (atleticaId)=>{
    return api
      .get(`/api/SolicitacaoAtleta/${atleticaId}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  AprovarSolicitacaoAtleta: (solicitacaoAtletaId)=>{
    return api
      .delete(`/api/SolicitacaoAtleta/${solicitacaoAtletaId}/aprovado`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  ReprovarSolicitacaoAtleta: (solicitacaoAtletaId)=>{
    return api
      .delete(`/api/SolicitacaoAtleta/${solicitacaoAtletaId}/reprovado`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  AprovarSolicitacaoJogo: (solicitacaoJogoId)=>{
    return api
      .delete(`/api/SolicitacaoJogo/${solicitacaoJogoId}/aprovado`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  ReprovarSolicitacaoJogo: (solicitacaoJogoId)=>{
    return api
      .delete(`/api/SolicitacaoJogo/${solicitacaoJogoId}/reprovado`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },


  PesquisaAtleticaPorUsername: (username) => {
    return api
      .get("/api/Atletica/BuscaPorUsername/" + username)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

};

export default ApiService;

