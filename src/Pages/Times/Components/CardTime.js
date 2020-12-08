import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  imagem: {
    width: 300,
  },
  info: {
    width: 400,
    height: 200,
  },
}));

export default function CardTime(props) {
  const { time } = props;
  const classes = useStyles();

  function apresentaFoto() {
    if (time.imagemModalidade !== null && time.imagemModalidade !== undefined) {
      return (
        <CardMedia
          className={classes.imagem}
          image={time.imagemModalidade.path}
          title={time.modalidade}
        />
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }

  function acertaDia(dia) {

    var diaCerto

    if (dia === "Dom") diaCerto = "Domingo"
    else if (dia === "Seg") diaCerto = "Segunda-feira"
    else if (dia === "Ter") diaCerto = "Terça-feira"
    else if (dia === "Qua") diaCerto = "Quarta-feira"
    else if (dia === "Qui") diaCerto = "Quinta-feira"
    else if (dia === "Sex") diaCerto = "Sexta-feira"
    else if (dia === "Sab") diaCerto = "Sábado"
    
    return diaCerto;
  }

  function acertaHorario(horario){

    let horarioCerto = horario.slice(0,5);

    return horarioCerto;
  }

  function apresentaTreinos() {
    if (time.agendaTreinos !== null && time.agendaTreinos !== undefined && time.agendaTreinos.length !== 0) {
      return (
        <>
          <Typography
            variant="body2"
            component="p"
            style={{ paddingBottom: 10 }}
          >
            Horário dos treinos:
        </Typography>
          {
            time.agendaTreinos.map((treino) => (
              <Typography
                variant="body2"
                component="p"
                style={{ paddingBottom: 10 }}
              >
               {acertaDia(treino.diaSemana)}  {acertaHorario(treino.horaInicio)}

              </Typography>
            ))
          }
        </>
      );
    }
    else {
      return (
        <Typography
          variant="body2"
          component="p"
          style={{ paddingBottom: 10 }}
        >
          Sem treinos definidos
        </Typography>
      );
    }
  }

  return (
    <>
      <Grid container justify="center" style={{ marginBottom: 25 }}>
        <Card
          className={classes.root}
          color="primary"
          style={{ backgroundColor: "#D2CFE5" }}
        >
          {apresentaFoto()}
          <div>
            <CardContent className={classes.info}>
              <Typography
                gutterBottom
                style={{ color: "#020431", fontSize: 18 }}
              >
                {time.modalidade}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  {apresentaTreinos()}
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ paddingBottom: 10 }}
                  >
                    Coordenador: {time.coordenador}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </div>
        </Card>
      </Grid>
    </>
  );
}
