import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, IconButton, TextField, MenuItem } from "@material-ui/core";
import BotaoUploadImagemMobile from "../../../Components/BotaoUploadImagemMobile";
import ApiService from "../../../variables/ApiService";
import { getAtleticaId } from "../../../utils/storage";

export default function FormularioProdutoMobile() {
  const [imagem, setImagem] = useState(null);
  const [path, setPath] = useState();
  const [categoria, setCategoria] = useState();
  const categorias = [
    {
      produtoCategoriaId: 1,
      nome: "Roupa"
    },
    {
      produtoCategoriaId: 2,
      nome: "Caneca"
    },
    {
      produtoCategoriaId: 3,
      nome: "Tirante"
    }
  ];

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
                onChange={handleNomeChange}
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
                onChange={handleDescricaoChange}
              />
            </Grid>
            <Grid item xs={12}>
              <AvField name="preço" label="Preço" type="number" onChange={handlePrecoChange} />
            </Grid>
            <Grid item xs={12}>
            <TextField
                      fullWidth
                      id="standard-select-categoria"
                      select
                      label="Categoria"
                      style={{ marginTop: 5, marginLeft: 5 }}
                      value={categoria}
                      onChange={handleCategoriaChange}
                    >
                      {categorias.map((option) => (
                        <MenuItem value={option.produtoCategoriaId} key={option.nome}>
                          {option.nome}
                        </MenuItem>
                      ))}
                    </TextField>
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
