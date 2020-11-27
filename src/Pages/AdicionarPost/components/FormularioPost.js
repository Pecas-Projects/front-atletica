import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, IconButton } from "@material-ui/core";
import AddFile from "../../../assets/imagem/file-add.svg";
import BotaoUploadImagem from "../../../Components/BotaoUploadImagem";
import ApiService from "../../../variables/ApiService";

import api from "../../../services/api";

export default function FormularioPost() {
  const [imagem, setImagem] = useState(null);
  const [path, setPath] = useState();
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();

  const handleTitleChange = (event) => {
    event.preventDefault();
    setTitulo(event.target.value);
  };

  const handleTextoChange = (event) => {
    event.preventDefault();
    setDescricao(event.target.value);
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

  async function envioImagem(){
    let file = new FormData();
    file.append('value', imagem);

    await ApiService.UploadImagem(file)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  async function submit() {

    envioImagem();

    /*let data = {
      titulo: titulo,
      descricao: descricao,
      atleticaId: 1,
      imagemId: 
    }

    ApiService.EnviarPost(data, config)
      .then((res) => {
        console.log(res)
      })
      .catch((err) =>
        console.log(err)
      )
      */

  }

  return (
    <>
      <Grid container justify="center" style={{ marginBottom: 25 }}>
        <Grid item xs={9}>
          <Paper style={{ backgroundColor: "#D2CFE5", padding: 30 }}>
            <h4 className="MyTitle">Novo Post</h4>
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
