import api from "../services/api";
import { loginAtletica, loginMembro } from "../utils/storage";

const ApiService = {
  LoginAtletica: (crecencial) => {
    return api
      .post("/api/Login/Atletica", crecencial)
      .then((res) => {
        loginAtletica(res.data.token, "A", res.data.atletica.atleticaId);
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
        loginMembro(res.data.token, "M", res.data.atletica.membroId, null);
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
        return res;
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

  BuscarTodosPosts: (atleticaId) => {
    return api
      .get("api/PublicacaoAtletica/" + atleticaId)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
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
      .post(`/api/Registro/Membro/${PIN}`, Membro)
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
  GetModalidadeId: (modalidadeId) => {
    return api
      .get(`​/api/modalidade/${modalidadeId}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  GetSolicitacoesJogo: (atleticaId) => {
    return api
      .get(`/api/SolicitacaoJogo/${atleticaId}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  GetSolicitacoesAtleta: (atleticaId) => {
    return api
      .get(`/api/SolicitacaoAtleta/${atleticaId}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  AprovarSolicitacaoAtleta: (solicitacaoAtletaId) => {
    return api
      .delete(`/api/SolicitacaoAtleta/${solicitacaoAtletaId}/aprovado`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  ReprovarSolicitacaoAtleta: (solicitacaoAtletaId) => {
    return api
      .delete(`/api/SolicitacaoAtleta/${solicitacaoAtletaId}/reprovado`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  AprovarSolicitacaoJogo: (solicitacaoJogoId) => {
    return api
      .delete(`/api/SolicitacaoJogo/${solicitacaoJogoId}/aprovado`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  ReprovarSolicitacaoJogo: (solicitacaoJogoId) => {
    return api
      .delete(`/api/SolicitacaoJogo/${solicitacaoJogoId}/reprovado`)
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

  GetTodosCurso: () => {
    return api
      .get("api/Cursos")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
  ResetPin: (atleticaId) => {
    return api
      .put(`/api/Atletica/ResetPin/${atleticaId}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },

  VerificaUsername: (username) => {
    return api
      .post(`/api/Atletica/VericiacaoUsername/${username}`)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        // console.log(error);
        return Promise.reject(error);
      });
  },
  BuscarRankingModalidade: (modalidadeId) => {
    return api
      .get(`/api/RankingModalidade/${modalidadeId}`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  BuscarModalidades: () => {
    return api
      .get(`/api/Modalidade`)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  EnviarPost: (dados) => {
    return api
      .post("/api/Publicacao", dados)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  BuscarTodasCategorias: () => {
    return api
      .get("/api/ProdutoCategoria")
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  CriarProduto: (produto) => {
    return api
      .post("api/Produto", produto)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  BuscarProdutosAtletica: (atleticaId) => {
    return api
      .get(`/api/AtleticaProduto/${atleticaId}`)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
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
      .get(`/api/AtletaForaModalidade/${atleticaId}/${modalidadeId}`)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },

  AdicionarAtletaModalidade: (atletaId, atleticaModalidadeId) => {
    return api
      .post(`/api/AtletaModalidade/${atletaId}/${atleticaModalidadeId}`)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },

  DeletarAtletaModalidade: (atletaAtleticaModalidadeId) => {
    return api
      .delete(`/api/AtletaModalidade/${atletaAtleticaModalidadeId}`)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },

  DeletarAtleticaModalidade: (atleticaModalidadeId) => {
    return api
      .delete(`/api/AtleticaModalidade/${atleticaModalidadeId}`)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
      });
  },

  AtualizarAtleticaModalidade: (atleticaModalidadeId, AtleticaModalidade) => {
    return api
      .put(
        `/api/AtleticaModalidade/${atleticaModalidadeId}`,
        AtleticaModalidade
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
};

export default ApiService;
