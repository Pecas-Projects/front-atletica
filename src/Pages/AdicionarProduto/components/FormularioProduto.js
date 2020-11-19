import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, Switch, FormControlLabel, TextField, MenuItem } from "@material-ui/core";
import AddFile from "../../../assets/imagem/file-add.svg";
import BotaoUploadImagem from "../../../Components/BotaoUploadImagem"


export default function FormularioProduto() {
  const [imagem, setImagem] = useState(null);
  const [path, setPath] = useState();
  const [estoque, setEstoque] = useState(false)
  const [ctegoria, setCategoria] = useState('')

  const categorias = ["categoria 1", "categoria 2", "categoria 3"];

  function showAdicionarImagem() {
    if (imagem === null) {
      return <p>Adicione uma Imagem</p>
    } else return <div><br /><br /></div>;
  }

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
              <Grid container spacing={5} style={{ paddingTop: 30 }}>
                <Grid item xs={4}>
                  {showAdicionarImagem()}
                  <Paper style={{ backgroundColor: "#636363", width: 250 }}>
                    <Grid
                      container
                      justify="center"
                      alignContent="center"
                      style={{ height: 250, marginTop: -7 }} s
                    >
                      <BotaoUploadImagem setPath={setPath} setImagem={setImagem} imagem={imagem} path={path} />
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
                    style={{ color: "E2E2E2" }}
                  />
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

                  <Grid container spacing={2}>

                    <Grid item xs={4}>
                      <AvField name="preço" label="Preço" type="number" />
                    </Grid>

                    <Grid item xs={4}>

                      <TextField
                        fullWidth
                        id="standard-select-categoria"
                        select
                        label="Categoria"
                        style={{ marginTop: 5, marginLeft: 5 }}
                      // value={coordenador}
                      // onChange={handleMembroChange}
                      >
                        {categorias.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>

                    </Grid>

                    <Grid item xs={4}>

                      <FormControlLabel
                        style={{ marginTop: 25, marginLeft: 10 }}
                        control={<Switch name="estoque" />}
                        label="Em estoque"
                      />

                    </Grid>

                  </Grid>

                </Grid>


                <Grid item xs={12}>
                  <Grid
                    container
                    justify="flex-end"
                  // style={{ paddingRight: 20 }}
                  >
                    <Button
                      color='secondary'
                      variant='contained'
                      style={{ width: 300 }}
                    >
                      Postar
                      </Button>

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
