import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, IconButton } from "@material-ui/core";
import AddFile from "../../../assets/imagem/file-add.svg";
import BotaoUploadImagemMobile from "../../../Components/BotaoUploadImagemMobile";

import { getUserId } from "../../../utils/storage";

export default function FormularioPostMobile() {
  const [imagem, setImagem] = useState(null);
  const [path, setPath] = useState();
  const [post, setPost] = useState({
    Titulo: "",
    Descricao: "",
    AtleticaId: parseInt(getUserId()),
    ImagemId: null
  });

  const handleTitleChange = (event) => {
    event.preventDefault();
    setPost({...post, Titulo: event.target.value})
  };

  const handleTextoChange = (event) => {
    event.preventDefault();
    setPost({...post, Descricao: event.target.value})
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

  return (
    <>
      <Grid container style={{ marginBottom: 25 }}>
        <h4 className="MyTitle">Novo Post</h4>
        <Typography variant="h8" style={{ color: "#454256", paddingBottom:50 }}>
          Adicione uma postagem ao blog da sua atlética
        </Typography>
        <AvForm>
          <Grid container justify="center" >
          {showAdicionarImagem()}
          <Paper style={{ backgroundColor: "#636363"}}>
            <Grid
              container
              justify="center"
              alignContent="center"
              style={{ height: 250, width: 250  }}
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
            >
              Postar
            </Button>
          </Grid>
        </AvForm>
      </Grid>
    </>
  );
}
