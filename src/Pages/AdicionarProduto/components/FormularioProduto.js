import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, Switch, FormControlLabel, TextField, MenuItem } from "@material-ui/core";
import BotaoUploadImagem from "../../../Components/BotaoUploadImagem"
import ApiService from "../../../variables/ApiService";
import { getAtleticaId } from "../../../utils/storage";

const useStyles = makeStyles((theme) => ({

  paperA: {
    width: "85%",
    marginTop: 20,
    padding: "2%",
    backgroundColor: "#BBB8CC",
  },

}));


export default function FormularioProduto() {

  const classes = useStyles();

  const [imagem, setImagem] = useState(null);
  const [path, setPath] = useState();
  const [categorias, setCategorias] = useState([]);
  const [produto, setProduto] = useState({
    Nome: "",
    Descricao: "",
    Preco: "",
    ProdutoCategoriaId: undefined,
    Estoque: false,
    AtleticaId: getAtleticaId(),
    ImagemId: null
  });

  const handleCategoriaChange = (e) => {
    setProduto({...produto, ProdutoCategoriaId: e.target.value})
  }

  const handleNomeChange = (e) => {
    e.preventDefault();
    setProduto({...produto, Nome: e.target.value})
  }

  const handleDescricaoChange = (e) => {
    e.preventDefault();
    setProduto({...produto, Descricao: e.target.value})
  }

  const handlePrecoChange = (e) => {
    e.preventDefault();
    setProduto({...produto, Preco: e.target.value})
  }

  const handleEstoqueChange = (e) => {
    e.preventDefault();
    setProduto({...produto, Estoque: !produto.Estoque})
  };

  useEffect(() => {
    buscarTodasCategorias();
    if(produto.ImagemId !== null && produto.ImagemId !== undefined)
      criarProduto();
  },[produto.ImagemId]);

  async function envioImagem(){
    let file = new FormData();
    file.append('value', imagem);

    await ApiService.UploadImagem(file)
      .then((res) => {
        console.log(res)
        setProduto({...produto, ImagemId: res.data.imagemId})
      })
      .catch((error) => {
        console.log(error)
      });
  }

  async function buscarTodasCategorias(){
    ApiService.BuscarTodasCategorias()
      .then((response) => {
        setCategorias(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function criarProduto(){
    ApiService.CriarProduto(produto)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })  
  }

  function showAdicionarImagem() {
    if (imagem === null) {
      return <p>Adicione uma Imagem</p>
    } else return <div><br /><br /></div>;
  }

  function submit(){
    envioImagem();
  }

  return (
    <>
      <Grid container justify="center" style={{ marginBottom: 25 }}>


        <Paper className={classes.paperA}>

          <h4 className="MyTitle">Adicionar Produto</h4>

          <Typography variant="h8" style={{ color: "#454256" }}>
            Adicione um produto a aba produtos da sua atlética
            </Typography>

          <AvForm>
            <Grid container spacing={1} style={{ paddingTop: 20 }}>
              <Grid item xs={4}>

                {showAdicionarImagem()}
                <Paper style={{ backgroundColor: "#636363", width: 250 }}>
                  <Grid
                    container
                    justify="center"
                    alignContent="center"
                    style={{ height: 250, marginTop: -7 }}
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
                  onChange={handleNomeChange}
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
                  onChange={handleDescricaoChange}
                />

                <Grid container spacing={2}>

                  <Grid item xs={4}>
                    <AvField name="preço" label="Preço" type="number" onChange={handlePrecoChange}/>
                  </Grid>

                  <Grid item xs={4}>

                    <TextField
                      fullWidth
                      id="standard-select-categoria"
                      select
                      label="Categoria"
                      style={{ marginTop: 5, marginLeft: 5 }}
                      value={produto.ProdutoCategoriaId}
                      onChange={handleCategoriaChange}
                    >
                      {categorias.map((option) => (
                        <MenuItem value={option.produtoCategoriaId} key={option.nome}>
                          {option.nome}
                        </MenuItem>
                      ))}
                    </TextField>

                  </Grid>

                  <Grid item xs={4}>

                    <FormControlLabel
                      style={{ marginTop: 25, marginLeft: 10 }}
                      control={<Switch name="estoque" />}
                      label="Em estoque"
                      onChange={handleEstoqueChange}
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
                    onClick={submit}
                  >
                    Postar
                      </Button>

                </Grid>
              </Grid>
            </Grid>
          </AvForm>
        </Paper>
      </Grid>

    </>
  );
}
