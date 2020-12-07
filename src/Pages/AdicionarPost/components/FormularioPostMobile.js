import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, Snackbar } from "@material-ui/core";
import BotaoUploadImagemMobile from "../../../Components/BotaoUploadImagemMobile";
import ApiService from "../../../variables/ApiService";
import { getAtleticaId } from "../../../utils/storage";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FormularioPostMobile() {
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

      <Grid container style={{ marginBottom: 25 }}>
        <h4 className="MyTitleEP">Novo Post</h4>
        <Typography variant="h8" style={{ color: "#454256", paddingBottom: 50 }}>
          Adicione uma postagem ao blog da sua atlética
        </Typography>
        <AvForm>
          <Grid container justify="center" >
            {showAdicionarImagem()}
            <Paper style={{ backgroundColor: "#636363" }}>
              <Grid
                container
                justify="center"
                alignContent="center"
                style={{ height: 250, width: 250 }}
              >
                <BotaoUploadImagemMobile
                  setPath={setPath}
                  setImagem={setImagem}
                  imagem={imagem}
                  path={path}
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid container style={{ paddingTop: 50 }}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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

            <Button
              style={{
                background: "#DB4922",
              }}
              fullWidth={true}
              onClick={submit}
            >
              Postar
            </Button>
          </Grid>
        </AvForm>
      </Grid>
    </>
  );
}
