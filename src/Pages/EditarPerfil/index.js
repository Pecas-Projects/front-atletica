import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Paper, Button, Typography, TextField, } from "@material-ui/core";
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import cep from "cep-promise";
import BotaoUploadImagem from "../../Components/BotaoUploadImagem";
import BotaoAuxiliar from "./Components/ButaoUploadAuxiliar";
import ApiService from "../../variables/ApiService";
import AlertComponents from "./Components/Alert";
import { getAtleticaId, atleticaUsername, atleticaUsernamePesquisada } from "../../utils/storage";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./styles.css";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paperA: {
    width: "85%",
    marginTop: 20,
    padding: "2%",
    backgroundColor: "#BBB8CC",
  },
  paperB: {
    width: "85%",
    marginTop: -10,
    padding: "2%",
    backgroundColor: "#807D8E",
  },
  paperAMobile: {
    width: "100%",
    marginTop: -10,
    padding: "5%",
    backgroundColor: "#BBB8CC",
  },
  paperBMobile: {
    width: "100%",
    marginTop: -10,
    padding: "5%",
    backgroundColor: "#807D8E",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function EditarPerfil(props) {
  const classes = useStyles();

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [notification, setNotification] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");
  const [pinMsg, setPinMsg] = useState("");
  const [pinStatus, setPinStatus] = useState();
  const [verificacaoMsg, setVerificacaoMsg] = useState("");
  const [statusVerificacao, setStatusVerificacao] = useState("");
  const [mostrarVerificacao, setMostrarVerificacao] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [atletica, setAtletica] = useState();
  const [cepcp, setCepcp] = useState("");
  const [street, setStreet] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [complemento, setComplemento] = useState("");
  const [pin, setPin] = useState();
  const [descricao, setDescricao] = useState("");
  const [link, setLink] = useState("");
  const [imagemPerfil, setImagemPerfil] = useState(null);
  const [pathPerfil, setPathPerfil] = useState();
  const [imagemCapa, setImagemCapa] = useState(null);
  const [pathCapa, setPathCapa] = useState();
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [typePin, setTypePin] = useState(true);
  const [email, setEmail] = useState("");
  const [nomeCampus, setNomeCampus] = useState("");
  const [nomeFaculdade, setNomeFaculdade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cursosIds, setCursosIds] = useState();
  const [avisoPin, setAvisoPin] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await ApiService.GetTodosCurso();
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions(response.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChangeCursos = (e) => {
    setCursosIds(e);
  };

  const changeTypePin = () => {
    setTypePin(!typePin);
  };

  const handleCepChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setCepcp(value);
    if (value.length === 8) {
      cep(value).then(function (endereco) {
        setCity(endereco.city);
        setStreet(endereco.street);
        setNeighbourhood(endereco.neighborhood);
        setState(endereco.state);
      });
    }
  };

  const handleComplementoChange = (e) => {
    e.preventDefault();
    setComplemento(e.target.value);
  };

  const handleTelegoneChange = (e) => {
    e.preventDefault();
    setTelefone(e.target.value);
  };

  const handleChangeDescricao = (e) => {
    e.preventDefault();
    setDescricao(e.target.value);
  };

  const handleChangeLink = (e) => {
    e.preventDefault();
    setLink(e.target.value);
  };
  const handleChangeNome = (e) => {
    e.preventDefault();
    setNome(e.target.value);
  };
  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleChangeCampus = (e) => {
    e.preventDefault();
    setNomeCampus(e.target.value);
  };
  const handleChangeFaculdade = (e) => {
    e.preventDefault();
    setNomeFaculdade(e.target.value);
  };
  const handleChangeAtleticaUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleClickPIN = async (e) => {
    e.preventDefault();
    await ApiService.ResetPin(atletica.atleticaId)
      .then((res) => {
        setPin(res.data.pin);
        setPinMsg("PIN atualizado com sucesso");
        setPinStatus("success");
      })
      .catch(() => {
        setPinMsg("Erro ao resetar o PIN tente novamente mais tarde");
        setPinStatus("error");
      });
    setAvisoPin(true);
  };

  const changeUsername = async (e) => {
    e.preventDefault();
    if (atletica.username === username) {
      setVerificacaoMsg("Esta já é seu username");
      setStatusVerificacao("info");
      setMostrarVerificacao(true);
    } else {
      await ApiService.VerificaUsername(username)
        .then(() => {
          setVerificacaoMsg("Username disponivel");
          setStatusVerificacao("success");
          setMostrarVerificacao(true);
        })
        .catch(() => {
          setVerificacaoMsg("Username em uso");
          setStatusVerificacao("error");
          setMostrarVerificacao(true);
        });
    }
  };

  function showAdicionarImagemPerfil() {
    if (imagemPerfil === null) {
      return <p>Primeiro adicione a foto de perfil da sua atlética</p>;
    } else
      return (
        <div>
          <br />
          <br />
        </div>
      );
  }

  function showAdicionarImagemCapa() {
    if (imagemCapa === null) {
      return <p>Agora Adicione a foto de capa da sua atlética</p>;
    } else
      return (
        <div>
          <br />
          <br />
        </div>
      );
  }

  const buscaAtleticaPorId = async (id) => {
    await ApiService.PesquisaAtleticaPorId(id)
      .then((res) => {
        console.log(res.data);
        setAtletica(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setNome(res.data.nome);
        setDescricao(res.data.descricao);
        setLink(res.data.linkProsel);
        setCepcp(res.data.campus.cep);
        setState(res.data.campus.estado);
        setCity(res.data.campus.cidade);
        setStreet(res.data.campus.rua);
        setNeighbourhood(res.data.campus.bairro);
        setComplemento(res.data.campus.complemento);
        setPin(res.data.pin);
        setTelefone(res.data.telefone);
        setNomeCampus(res.data.campus.nome);
        setNomeFaculdade(res.data.campus.faculdade.nome);
        setCursosIds(res.data.cursos);

        if (res.data.atleticaImagens !== null) {
          if (res.data.atleticaImagens.length > 0) {
            res.data.atleticaImagens.map((img) => {
              if (img.tipo === "P") {
                setImagemPerfil(img);
                setPathPerfil(img.imagem.path);
              } else {
                setImagemCapa(img);
                setPathCapa(img.imagem.path);
              }
            });
          }

        }

        setLoadingPage(false);
      })
      .catch(() => {
        setUpdateMsg("Erro ao carregar as informações");
        setUpdateStatus("error");
      });
  };

  useEffect(() => {
    buscaAtleticaPorId(getAtleticaId());
  }, []);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    if (imagemPerfil !== null && imagemPerfil.imagemId === undefined) {
      let file = new FormData();
      file.append("value", imagemPerfil);

      await ApiService.UploadImagem(file)
        .then((res) => {
          console.log(res.data);
          setImagemPerfil(res.data);
          if (imagemCapa !== null && imagemCapa.imagemId === undefined) {
            UploadCapa();
          } else {
            UpdateInfo(res.data, null);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoadingUpdate(false);
        });
    } else if (imagemCapa !== null && imagemCapa.imagemId === undefined) {
      UploadCapa();
    } else {
      UpdateInfo(null, null);
    }
  };

  const UploadCapa = async () => {
    if (imagemCapa !== null) {
      let file = new FormData();
      file.append("value", imagemCapa);

      await ApiService.UploadImagem(file)
        .then((res) => {
          setImagemCapa(res.data);
          console.log(res.data);
          UpdateInfo(null, res.data);
        })
        .catch((error) => {
          console.log(error);
          setLoadingUpdate(false);
        });
    }
  };

  const UpdateInfo = async (imgPerfil, imgCapa) => {
    let capa = { tipo: "C", imagemId: 0 };
    let perfil = { tipo: "P", imagemId: 0 };

    let imgs = [];

    if (imagemPerfil !== null && imagemCapa !== null) {

      if (imgPerfil !== null) perfil.imagemId = imgPerfil.imagemId;
      else if (imagemPerfil.imagemId !== undefined)
        perfil.imagemId = imagemPerfil.imagemId;
      else perfil = null;

      if (imgCapa !== null) capa.imagemId = imgCapa.imagemId;
      else if (imagemCapa.imagemId !== undefined)
        capa.imagemId = imagemCapa.imagemId;
      else perfil = null;


      if (capa !== null && perfil !== null) imgs = [capa, perfil];
      else if (capa === null && perfil !== null) imgs = [perfil];
      else if (capa !== null && perfil === null) imgs = [capa];


    }


    let idsCursos = cursosIds.map(function (curso) {
      return curso.cursoId;
    });

    let atleticaDados = {
      nome: nome,
      email: email,
      username: username,
      descricao: descricao,
      senha: "*",
      telefone: telefone,
      linkProsel: link,
      campus: {
        nome: nomeCampus,
        cidade: city,
        bairro: neighbourhood,
        rua: street,
        estado: state,
        cep: cepcp,
        complemento: complemento,
        faculdade: {
          nome: nomeFaculdade,
        },
      },
      imagens: imgs,
      cursosIds: idsCursos,
    };

    console.log(atleticaDados);

    ApiService.AtualizarAtletica(getAtleticaId(), atleticaDados)
      .then((res) => {
        // console.log(res.data);

        atleticaUsername(res.data.username);
        atleticaUsernamePesquisada(res.data.username)
        setUpdateMsg("Suas informações foram atualizadas com sucesso!");
        setUpdateStatus("success");
        setNotification(true);
        setLoadingUpdate(false);

      })
      .catch((err) => {
        setUpdateMsg("Erro ao atualizar as informações");
        setUpdateStatus("error");
        setNotification(true);
        setLoadingUpdate(false);
        console.log(err)
      });
  };

  return (
    <>
      {loadingPage ? (
        <>
          <div style={{ marginTop: 250 }}>
            <Grid container justify="center">
              <CircularProgress size={100} color="primary" />
            </Grid>
          </div>
        </>

      ) : (
          <div className={classes.root}>
            <NavBar />

            <main className={classes.content}>
              <div className={classes.toolbar} />

              {/*
        
        
        
        DESKTOP
        
        
        
        */}


              <>
                <Snackbar
                  open={notification}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity={updateStatus}>
                    {updateMsg}
                  </Alert>
                </Snackbar>
                <div className={classes.sectionDesktop}>
                  <Grid container justify="center">
                    <Paper className={classes.paperA}>
                      <Grid container>
                        <Grid item xs={6}>
                          <h4 className="MyTitleEP">Editar Perfil</h4>
                        </Grid>

                        <Grid item xs={6}>
                          <Grid container justify="flex-end">
                            <Button
                              onClick={(e) => handleClickPIN(e)}
                              color="secondary"
                              variant="outlined"
                            >
                              Reset PIN
                          </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      {avisoPin && (
                        <AlertComponents status={pinStatus} mensagem={pinMsg} />
                      )}
                      <br />
                      <AvForm onSubmit={onFormSubmit}>
                        <p className="MySubtitleEP">PIN</p>
                        <p className="MySubtitle2EP">
                          Codigo para os membros entrarem em sua atletica, esta em
                          constante mudança por questões de segurança
                      </p>
                        <Grid container direction="row">
                          <Grid item>
                            <AvField
                              name="Nome da Atletica"
                              type={typePin ? "password" : "text"}
                              disabled
                              value={pin}
                            />
                          </Grid>
                          <Grid item>
                            <Button onClick={changeTypePin}>Mostrar</Button>
                          </Grid>
                        </Grid>

                        <p className="MySubtitleEP">Nome da sua atletica</p>
                        <AvField
                          style={{ marginBottom: 20 }}
                          name="Nome da Atletica"
                          type="text"
                          errorMessage="Nome muito grande"
                          onChange={handleChangeNome}
                          validate={{
                            maxLength: { value: 700 },
                          }}
                          value={nome}
                        />

                        <p className="MySubtitleEP">Username</p>
                        <p className="MySubtitle2EP">
                          Identificador da sua atletica dentro do nosso sistema,
                          para mudar este campo é aconselhado chegar sua
                          disponibilidade
                      </p>
                        <Grid container spacing={1}>
                          <Grid item xs={8}>
                            <AvField
                              name="username"
                              type="text"
                              onChange={handleChangeAtleticaUsername}
                              value={username}
                            />

                          </Grid>

                          <Grid item xs={4}>
                            <Grid container justify='flex-end'>
                              <Button
                                style={{ width: 300 }}
                                variant="contained"
                                type="submit"
                                color="secondary"
                                onClick={changeUsername}
                              >
                                Validar username
                      </Button>
                            </Grid>

                          </Grid>

                        </Grid>


                        {mostrarVerificacao && (
                          <AlertComponents
                            status={statusVerificacao}
                            mensagem={verificacaoMsg}
                          />
                        )}
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <p className="MySubtitleEP" style={{ marginTop: 15 }}>
                              Email
                          </p>
                            <AvField
                              style={{ width: "90%" }}
                              name="email"
                              type="text"
                              onChange={handleChangeEmail}
                              value={email}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <p className="MySubtitleEP" style={{ marginTop: 15 }}>
                              Telefone
                          </p>
                            <AvField
                              name="Telefone"
                              type="text"
                              onChange={handleTelegoneChange}
                              value={telefone}
                            />
                          </Grid>
                        </Grid>

                        <p className="MySubtitleEP">Descrição</p>
                        <p className="MySubtitle2EP">
                          Fale um pouco sobre sua atlética
                      </p>

                        <AvField
                          name="descricao"
                          type="textarea"
                          errorMessage="Descrição muito grande"
                          onChange={handleChangeDescricao}
                          validate={{
                            maxLength: { value: 300 },
                          }}
                          value={descricao}
                        />
                        <br />
                        <p className="MySubtitleEP">Link do processo seletivo</p>
                        <p className="MySubtitle2EP">
                          Disponibilize no perfil o link para o processo seletivo
                          da sua atlética
                      </p>
                        <AvField
                          value={link}
                          name="link"
                          type="text"
                          onChange={handleChangeLink}
                        />
                        <br />

                        <Autocomplete
                          id="asynchronous-demo"
                          multiple
                          fullWidth
                          open={open}
                          onOpen={() => {
                            setOpen(true);
                          }}
                          onClose={() => {
                            setOpen(false);
                          }}
                          getOptionSelected={(option, value) =>
                            option.cursoId == value.cursoId
                          }
                          getOptionLabel={(option) => option.nome}
                          options={options}
                          loading={loading}
                          defaultValue={atletica.cursos}
                          onChange={(event, values) => handleChangeCursos(values)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Cursos"
                              variant="outlined"
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <React.Fragment>
                                    {loading ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </React.Fragment>
                                ),
                              }}
                            />
                          )}
                        />
                        <br />
                        <p className="MySubtitleEP">Endereço</p>
                        <p className="MySubtitle2EP">
                          O campus que sua atlética está sediada
                      </p>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <AvField
                              style={{ width: "90%" }}
                              value={nomeCampus}
                              onChange={handleChangeCampus}
                              name="campus"
                              label="Campus"
                              type="text"
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <AvField
                              style={{ width: "90%" }}
                              value={nomeFaculdade}
                              onChange={handleChangeFaculdade}
                              name="faculdade"
                              label="Faculdade"
                              type="text"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <AvField
                              style={{ width: "90%" }}
                              data-cy="cep-input"
                              value={cepcp}
                              onChange={handleCepChange}
                              name="cep"
                              label="CEP"
                              type="text"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: "Campo obrigatório",
                                },
                                pattern: {
                                  value: "[0-9]",
                                  errorMessage: "Use apenas números",
                                },
                                minLength: {
                                  value: 8,
                                  errorMessage: "CEP inválido",
                                },
                                maxLength: {
                                  value: 8,
                                  errorMessage: "CEP inválido",
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <AvField
                              style={{ width: "90%" }}
                              value={state}
                              name="estado"
                              label="Estado"
                              type="text"
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <AvField
                              style={{ width: "90%" }}
                              value={city}
                              name="cidade"
                              label="Cidade"
                              type="text"
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <AvField
                              style={{ width: "90%" }}
                              value={neighbourhood}
                              name="bairro"
                              label="Bairro"
                              type="text"
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <AvField
                              style={{ width: "90%" }}
                              value={street}
                              name="rua"
                              label="Rua"
                              type="text"
                            />
                          </Grid>

                          <Grid item xs={6} style={{ marginBottom: 20 }}>
                            <AvField
                              style={{ width: "90%" }}
                              value={complemento}
                              label="Complemento"
                              name="complemento"
                              type="text"
                              onChange={handleComplementoChange}
                              validate={{
                                maxLength: {
                                  value: 255,
                                  errorMessage: "Muito grande",
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid>
                          <p className="MySubtitleEP" style={{ marginTop: 20 }}>
                            Adicionar fotos
                        </p>
                          <p className="MySubtitle2EP">
                            Adicione imagens de perfil e capa da sua atlética
                        </p>

                          {imagemPerfil === null && imagemCapa === null ? (
                            <Grid item xs={4} style={{ marginTop: 20 }}>
                              {showAdicionarImagemPerfil()}
                              <Paper
                                style={{
                                  backgroundColor: "#636363",
                                  width: 250,
                                }}
                              >
                                <Grid
                                  container
                                  justify="center"
                                  alignContent="center"
                                  style={{ height: 250, marginTop: -7 }}
                                >
                                  <BotaoUploadImagem
                                    setPath={setPathPerfil}
                                    setImagem={setImagemPerfil}
                                    imagem={imagemPerfil}
                                    path={pathPerfil}
                                  />
                                </Grid>
                              </Paper>
                            </Grid>
                          ) : (
                              <Grid container style={{ paddingTop: 30 }}>
                                <Grid item xs={4}>
                                  {showAdicionarImagemPerfil()}
                                  <Paper
                                    style={{
                                      backgroundColor: "#636363",
                                      width: 250,
                                    }}
                                  >
                                    <Grid
                                      container
                                      justify="center"
                                      alignContent="center"
                                      style={{ height: 250, marginTop: -7 }}
                                    >
                                      <BotaoUploadImagem
                                        setPath={setPathPerfil}
                                        setImagem={setImagemPerfil}
                                        imagem={imagemPerfil}
                                        path={pathPerfil}
                                      />
                                    </Grid>
                                  </Paper>
                                </Grid>

                                <Grid item xs={4}>
                                  {showAdicionarImagemCapa()}
                                  <Paper
                                    style={{
                                      backgroundColor: "#636363",
                                      width: 450,
                                    }}
                                  >
                                    <Grid
                                      container
                                      justify="center"
                                      alignContent="center"
                                      style={{ height: 250, marginTop: -7 }}
                                    >
                                      <Grid item>
                                        <BotaoAuxiliar
                                          setPath={setPathCapa}
                                          setImagem={setImagemCapa}
                                          imagem={imagemCapa}
                                          path={pathCapa}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Paper>
                                </Grid>
                              </Grid>
                            )}
                          <Grid container justify="center">
                            {loadingUpdate ? (
                              <>
                                <CircularProgress style={{ marginTop: 60 }} />

                              </>
                            ) : (
                                <Button
                                  type="submit"
                                  style={{ marginTop: 60, width: 400 }}
                                  variant="contained"
                                  color="secondary"
                                >
                                  Salvar Alterações
                                </Button>
                              )}
                          </Grid>
                        </Grid>
                      </AvForm>
                    </Paper>
                  </Grid>
                </div>
              </>


              {/*
                        
                        
                        
                        
                        MOBILE 
                        
                        
                        
                        
                      */}

              <div className={classes.sectionMobile}>
                <Grid container justify="center">
                  <Grid container spacing={1} style={{ marginTop: 20 }}>
                    <Grid container justify="center">
                      <Paper className={classes.paperAMobile}>


                        <p className="MySubtitle">Não é possível editar o perfil pelo celular, utilize um computador para isso</p>

                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </main>
          </div>
        )}
    </>

  );
}
