import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
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

export default function CardTime(props) {
  const { time } = props;
  const classes = useStyles();
  const cordenador = "Coordenador: " + time.cordenador

  return (
    <>
      <Grid container justify="center" style={{ marginBottom: 25 }}>
        <Card color="primary" style={{ backgroundColor: "#D2CFE5" }}>
          <CardHeader title={time.nome}  subheader={cordenador} />
          <CardMedia
            className={classes.imagem}
            image={time.imagem}
            title={time.nome}
            style={{marginLeft:10, marginRight:10}}
          />
          <CardContent className={classes.info}>
            <Typography gutterBottom style={{ color: "#020431", fontSize: 16 , paddingBottom:10}}>
              Horário dos Treinos:
            </Typography>

            {time.treinos.map((treino) => (
              <Typography
                variant="body2"
                component="p"
                style={{ paddingBottom: 10 }}
              >
                {treino.dia} {treino.hora}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
