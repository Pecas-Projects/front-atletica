import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  imagem: {
    minWidth: 302,
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

function exibirHora(hora) {
  var horaCerta = hora.slice(0, 5)
  return horaCerta;
}

export default function CardTime(props) {
  const { time } = props;
  const classes = useStyles();
  const coordenador = "Coordenador: " + time.coordenador

  function apresentaFoto() {
    if (time.imagemModalidade !== null && time.imagemModalidade !== undefined) {
      return (
        <CardMedia
          className={classes.imagem}
          image={time.imagemModalidade.path}
          title={time.modalidade}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }

  function apresentaTreinos() {
    if (time.agendaTreinos !== null && time.agendaTreinos !== undefined && time.agendaTreinos.length !== 0) {
      return (
        <>
          <Typography gutterBottom style={{ color: "#020431", fontSize: 18, paddingBottom: 2 }}>
            Horário dos Treinos:
          </Typography>
          {
            time.agendaTreinos.map((treino) => (
              <Typography
                style={{ paddingBottom: 5, color: "gray", fontSize: 14 }}
              >
                {treino.diaSemana} {exibirHora(treino.horaInicio)}h
              </Typography>
            ))
          }
        </>
      );
    }
    else {
      return (
        <Typography gutterBottom style={{ color: "#020431", fontSize: 18, paddingBottom: 10 }}>
          Sem treinos definidos
        </Typography>
      );
    }
  }

  return (
    <>
      <Grid container justify="center" style={{ marginBottom: 25 }}>
        <Card color="primary" style={{ backgroundColor: "#D2CFE5" }}>
          <CardHeader title={time.modalidade} subheader={coordenador} />
          {apresentaFoto()}
          <CardContent className={classes.info}>
            {apresentaTreinos()}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
