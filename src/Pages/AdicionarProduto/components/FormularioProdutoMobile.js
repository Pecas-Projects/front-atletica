import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, IconButton } from "@material-ui/core";
import BotaoUploadImagemMobile from "../../../Components/BotaoUploadImagemMobile";

export default function FormularioProdutoMobile() {
  const [imagem, setImagem] = useState(null);
  const [path, setPath] = useState();

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
        <h4 className="MyTitle">Adicionar Produto</h4>
        <Typography
          variant="h8"
          style={{ color: "#454256", paddingBottom: 50 }}
        >
          Adicione um produto a aba produtos da sua atlética
        </Typography>
        <AvForm>
          <Grid container justify="center">
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
                name="nome"
                label="Nome do Produto"
                type="text"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Campo obrigatório",
                  },
                  minLength: { value: 2, errorMessage: "Nome inválido" },
                  maxLength: { value: 45, errorMessage: "Nome inválido" },
                }}
                style={{ color: "E2E2E2" }}
              />
            </Grid>
            <Grid item xs={12}>
              <AvField
                name="descrição"
                label="Descrição"
                type="textarea"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Campo obrigatório",
                  },
                  minLength: { value: 2, errorMessage: "Nome inválido" },
                  maxLength: { value: 45, errorMessage: "Nome inválido" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <AvField name="preço" label="Preço" type="number" />
            </Grid>
            <Grid item xs={12}>
              <AvField name="categoria" label="Categoria" type="select">
                <option>Roupa</option>
              </AvField>
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
