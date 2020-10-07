import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Navbar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import fotoCapa from "../../assets/imagem/fotoCapa.png"
import CardMembro from "./Components/CardMembro"
import "./styles.css"

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
  paper: {
    width: "85%",
    marginTop: -10,
    padding: "2%",
    backgroundColor: "#BBB8CC"
  }
}));

export default function Perfil() {

  const Membros = [
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
  ]


  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {/* <Grid container xs={12} justify="center">

          <img className="capa" src={fotoCapa} alt="foto capa" />

        </Grid> */}

        <Grid xs={12} container justify="center">

          <Paper className={classes.paper}>

            <h4 className="subtitle">Nossos Membros</h4>

            <Grid container spacing={3}>

              {Membros.map((item) =>
                <CardMembro item={item} />
              )}


            </Grid>

          </Paper>


        </Grid>

      </main>
    </div>
  );
}
