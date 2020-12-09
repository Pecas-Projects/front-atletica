import React, { useState, useEffect } from "react";
import ApiService from "../../../variables/ApiService";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Snackbar
} from "@material-ui/core";
import "../styles.css";

import atleta_icon from "../../../assets/imagem/atleta_icon.svg";
import jogo_icon from "../../../assets/imagem/jogo_icon.svg";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  paper: {
    width: "100%",
    padding: "2%",
    backgroundColor: "#C4C4C4",
  },
}));

function AcertarData(data) {
  var ano = "",
    mes = "",
    dia = "",
    hora = "",
    minuto = "";
  for (var i = 0; i < 4; i++) {
    ano = ano + data[i];
  }
  for (var j = 5; j < 7; j++) {
    mes = mes + data[j];
  }
  for (var t = 8; t < 10; t++) {
    dia = dia + data[t];
  }
  for (var k = 11; k < 13; k++) {
    hora = hora + data[k];
  }
  for (var l = 14; l < 16; l++) {
    minuto = minuto + data[l];
  }

  return dia + "/" + mes + "/" + ano + ", " + hora + ":" + minuto;
}

function PaperNotificacao(props) {
  const classes = useStyles();
  const { item } = props;

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

  async function aprovaSolicitacaoAtleta(solicitacaoAtletaId) {
    await ApiService.AprovarSolicitacaoAtleta(solicitacaoAtletaId)
      .then((res) => {

        setOpenAceito(true)

      })

    props.getSolicitacoes()
  }

  async function reprovaSolicitacaoAtleta(solicitacaoAtletaId) {
    await ApiService.ReprovarSolicitacaoAtleta(solicitacaoAtletaId)
      .then((res) => {

        setOpenRecusado(true)

      })
      .catch((error) => {

      });
    props.getSolicitacoes()
  }

  async function aprovaSolicitacaoJogo(solicitacaoJogoId) {
    await ApiService.AprovarSolicitacaoJogo(solicitacaoJogoId)
      .then((res) => {

        setOpenAceito(true)

      })

    props.getSolicitacoes()
  }

  async function reprovaSolicitacaoJogo(solicitacaoJogoId) {
    await ApiService.ReprovarSolicitacaoJogo(solicitacaoJogoId)
      .then((res) => {

        setOpenRecusado(true)

      })
      .catch((error) => {

      });
    props.getSolicitacoes()
  }

  function handleAceitarSolicitacao() {
    if (props.tipo === "atletas") {
      aprovaSolicitacaoAtleta(item.solicitacaoAtletaId);
    } else if (props.tipo === "jogos") {
      aprovaSolicitacaoJogo(item.solicitacaoJogoId);
    }
  }

  function handleRecusarSolicitacao() {
    if (props.tipo === "atletas") {
      reprovaSolicitacaoAtleta(item.solicitacaoAtletaId);
    } else if (props.tipo === "jogos") {
      reprovaSolicitacaoJogo(item.solicitacaoJogoId);
    }
  }

  function modalidadesInteresse(modalidades) {
    var listaModalidades = "";
    modalidades.map(
      (modalidade) =>
        (listaModalidades = listaModalidades + modalidade.nome + ", ")
    );
    listaModalidades = listaModalidades.slice(0, listaModalidades.length - 2);
    return listaModalidades;
  }

  function corpo() {
    if (props.tipo === "atletas") {
      return (
        <>
          <Typography gutterBottom style={{ fontSize: 18 }}>
            {item.nome} {item.sobrenome} quer participar como atleta!
          </Typography>
          <Typography variant="body2" component="p">
            Modalidades de interesse:{" "}
            {modalidadesInteresse(item.modalidadesInteresse)}
          </Typography>
        </>
      );
    } else if (props.tipo === "jogos") {
      return (
        <>
          <Typography gutterBottom style={{ fontSize: 18 }}>
            A atlética {item.atleticaAdversaria.nome} está te convidando para um
            jogo!
          </Typography>
          <Typography variant="body2" component="p">
            Modalidade: {item.modalidade.nome}
          </Typography>
          <Typography variant="body2" component="p">
            Data e Horário: {AcertarData(item.dataHora)}
          </Typography>
          <Typography variant="body2" component="p">
            Local: {item.local}
          </Typography>
        </>
      );
    }
  }

  return (
    <>
      <Snackbar
        open={openAceito}
        autoHideDuration={4000}
        onClose={handleCloseAceito}
      >
        <Alert onClose={handleCloseAceito} severity="success">
          Solicitação aceita com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openRecusado}
        autoHideDuration={4000}
        onClose={handleCloseRecusado}
      >
        <Alert onClose={handleCloseRecusado} severity="success">
          Solicitação recusada com sucesso!
        </Alert>
      </Snackbar>

      <Grid item style={{ marginBottom: 20 }} xs={12}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={2}>
              <Avatar
                alt="Remy Sharp"
                src={
                  item.solicitacaoAtletaId !== undefined
                    ? atleta_icon
                    : jogo_icon
                }
                className={classes.large}
              />
            </Grid>

            <Grid item xs={6} style={{ paddingTop: 10 }}>
              {corpo()}
            </Grid>

            <Grid item xs={2} justify="flex-end" style={{ paddingRight: 20 }}>
              <Button
                style={{
                  background: "#F3BF3A",
                  width: 114,
                  marginTop: 20,
                  color: "black",
                }}
                onClick={handleAceitarSolicitacao}
              >
                Aceitar
              </Button>
            </Grid>
            <Grid item xs={2} justify="flex-end">
              <Button
                style={{
                  color: "black",
                  border: "2px solid #F3BF3A",
                  height: 35,
                  width: 114,
                  marginTop: 20,
                }}
                onClick={handleRecusarSolicitacao}
              >
                Recusar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default PaperNotificacao;
