import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, Snackbar } from "@material-ui/core";
import BotaoUploadImagem from "../../../Components/BotaoUploadImagem";
import ApiService from "../../../variables/ApiService";
import { atleticaUsername, getAtleticaId } from "../../../utils/storage";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function FormularioPost() {
  const [imagem, setImagem] = useState(null);
  const [path, setPath] = useState();
  const [post, setPost] = useState({
    Titulo: "",
    Descricao: "",
    AtleticaId: parseInt(getAtleticaId()),
    ImagemId: null
  });

  const [openAceito, setOpenAceito] = useState(false)
  const [openRecusado, setOpenRecusado] = useState(false)

  const handleCloseAceito = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAceito(false);
  };

  const handleCloseRecusado = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenRecusado(false);
  };


  const handleTitleChange = (event) => {
    event.preventDefault();
    setPost({ ...post, Titulo: event.target.value })
  };

  const handleTextoChange = (event) => {
    event.preventDefault();
    setPost({ ...post, Descricao: event.target.value })
  };

  function showAdicionarImagem() {
    if (imagem === null) {
      return <p>Adicione uma Imagem</p>;
    } else
      return (
        <div>
          <br />
          <br />
        </div>
      );
  }

  async function envioImagem() {
    let file = new FormData();
    file.append('value', imagem);

    await ApiService.UploadImagem(file)
      .then((res) => {
        console.log(res)
        setPost({ ...post, ImagemId: res.data.imagemId })
      })
      .catch((error) => {
        console.log(error)
      });
  }

  async function criarPost() {
    await ApiService.EnviarPost(post)
      .then((res) => {
        setOpenAceito(true)
        setTimeout(function () { window.location.href = '/feed/' + atleticaUsername() }, 3000)
      })
      .catch((err) => {
        setOpenRecusado(true)
      });
  }

  useEffect(() => {
    if (post.ImagemId !== null)
      criarPost();
  }, [post]);

  async function submit() {
    envioImagem();
  }

  return (
    <>
      <Snackbar
        open={openAceito}
        autoHideDuration={4000}
        onClose={handleCloseAceito}
      >
        <Alert onClose={handleCloseAceito} severity="success">
          Post criado com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openRecusado}
        autoHideDuration={4000}
        onClose={handleCloseRecusado}
      >
        <Alert onClose={handleCloseRecusado} severity="error">
          Ocorreu um erro ao criar o post, revise os dados e tente novamente
        </Alert>
      </Snackbar>

      <Grid container justify="center" style={{ marginBottom: 25 }}>
        <Grid item xs={9}>
          <Paper style={{ backgroundColor: "#D2CFE5", padding: 30 }}>
            <h4 className="MyTitleEP">Novo Post</h4>
            <Typography variant="h8" style={{ color: "#454256" }}>
              Adicione uma postagem ao blog da sua atlética
            </Typography>
            <AvForm>
              <Grid container spacing={5} style={{ paddingTop: 30 }}>
                <Grid item xs={4}>
                  {showAdicionarImagem()}
                  <Paper style={{ backgroundColor: "#636363", width: 250 }}>
                    <Grid
                      container
                      justify="center"
                      alignContent="center"
                      style={{ height: 250, marginTop: -7 }}
                      s
                    >
                      <BotaoUploadImagem
                        setPath={setPath}
                        setImagem={setImagem}
                        imagem={imagem}
                        path={path}
                      />
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={8}>
                  <AvField
                    name="Título:"
                    label="Título do post"
                    type="text"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Campo obrigatório",
                      },
                      minLength: { value: 2, errorMessage: "Título inválido" },
                      maxLength: { value: 45, errorMessage: "Título inválido" },
                    }}
                    style={{ color: "E2E2E2" }}
                    onChange={handleTitleChange}
                  />
                  <AvField
                    name="Texto:"
                    label="Texto do post"
                    type="textarea"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Campo obrigatório",
                      },
                      minLength: { value: 2, errorMessage: "Texto inválido" },
                    }}
                    onChange={handleTextoChange}
                  />
                </Grid>
                <Grid container style={{ paddingRight: 20 }} justify="flex-end">
                  <Button
                    style={{
                      background: "#DB4922",
                      width: 200,
                      marginTop: 24,
                    }}
                    onClick={submit}
                  >
                    Postar
                    </Button>
                </Grid>
              </Grid>
            </AvForm>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
