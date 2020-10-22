import React, { useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import AddFile from "../../../assets/imagem/file-add.svg";

export default function FormularioProduto() {
  return (
    <>
      <Grid container justify="center" style={{ marginBottom: 25 }}>
        <Grid item xs={9}>
          <Paper style={{ backgroundColor: "#D2CFE5", padding: 30 }}>
            <h4 className="MyTitle">Adicionar Produto</h4>
            <Typography variant="h8" style={{ color: "#454256" }}>
              Adicione um produto a aba produtos da sua atlética
            </Typography>
            <AvForm>
              <Grid container spacing={5} style={{ paddingTop: 20 }}>
                <Grid item xs={4}>
                  <Typography>Adicione uma Imagem</Typography>
                  <Paper style={{ backgroundColor: "#636363" }}>
                    <Grid container justify="center" style={{ height: 140 }}>
                      <img src={AddFile} alt="adicionar imagem" />
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={8}>
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
                    style={{color:"E2E2E2"}}
                  />
                  <AvField
                    name="nome"
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
                <Grid container spacing={9} style={{ paddingLeft: 20 }}>
                  <Grid item xs={3}>
                    <AvField name="nome" label="Preço" type="number" />
                  </Grid>
                  <Grid item xs={3}>
                    <AvField name="nome" label="Categoria" type="select">
                      <option>Volei</option>
                    </AvField>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container justify="flex-end" style={{ paddingRight: 20 }}>
                      <Button
                        style={{
                          background: "#DB4922",
                          width: 200,
                          marginTop: 24,
                        }}
                      >
                        Postar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AvForm>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
