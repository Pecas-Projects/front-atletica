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

  GetSolicitacoesAtleta: (atleticaId)=>{
    return api
      .get(`/api/SolicitacaoAtleta/${atleticaId}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        console.error(error);
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
        console.error(error);
        return Promise.reject(error);
      });
  },

  GetModalidadeId: (modalidadeId)=>{
    return api
      .get(`​/api​/Modalidade​/${modalidadeId}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },

};

export default ApiService;