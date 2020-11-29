import React, { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import CardProduto from "./Components/CardProduto"
import productImage from "../../assets/imagem/productImage.svg"
import "./styles.css"
import ApiService from "../../variables/ApiService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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

export default function Produtos(props) {
  const classes = useStyles();
  const username = props.match.params.username;
  const [atleticaId, setAtleticaId] = useState();
  const [produtos, setProdutos] = useState([]);

  const products = [
    {
      imagem: productImage,
      titulo: "Camisa da Atlética",
      descricao: "Tamanhos disponíveis: P-M-G",
      preco: "24,00",
    },
    {
      imagem: productImage,
      titulo: "Camisa da Atlética",
      descricao: "Tamanhos disponíveis: P-M-G",
      preco: "24,00",
    },
    {
      imagem: productImage,
      titulo: "Camisa da Atlética",
      descricao: "Tamanhos disponíveis: P-M-G",
      preco: "24,00",
    },
    {
      imagem: productImage,
      titulo: "Camisa da Atlética",
      descricao: "Tamanhos disponíveis: P-M-G",
      preco: "24,00",

    },

    {
      imagem: productImage,
      titulo: "Camisa da Atlética",
      descricao: "Tamanhos disponíveis: P-M-G",
      preco: "24,00",
    },
  ];

  useEffect(() => {
    buscaAtletica();
    if(atleticaId !== undefined && atleticaId !== null)
      buscarProdutos();
  }, [atleticaId]);

  async function buscaAtletica(){
    await ApiService.PesquisaAtleticaPorUsername(username)
        .then((res) => {
            setAtleticaId(res.data.atleticaId)
        })
        .catch((err) => {
            console.log(err)
        })
  }

  async function buscarProdutos(){
    await ApiService.BuscarProdutosAtletica(atleticaId)
      .then((res) => {
        setProdutos(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <div className={classes.root}>
      <NavBar />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div className={classes.sectionDesktop}>
          <Grid container justify="center">
            <Paper className={classes.paperA}>
              <h4 className="MyTitle">Nossos Produtos</h4>

              <Grid container spacing={1} style={{ marginTop: 20 }}>
                {products.map((item) => (
                  <CardProduto item={item} />
                ))}
              </Grid>
            </Paper>
          </Grid>
        </div>

        <div className={classes.sectionMobile}>
          <Grid item xs={1}></Grid>
          <Grid container spacing={1} style={{ marginTop: 20 }}>
            <h4 className="MyTitle">Nossos Produtos</h4>
            {products.map((item) => (
              <CardProduto item={item} />
            ))}
          </Grid>
          <Grid item xs={1}></Grid>
        </div>

      </main>
    </div>
  );
}
