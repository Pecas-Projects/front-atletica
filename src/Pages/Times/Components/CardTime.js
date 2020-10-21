import React from "react";
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

  return (
    <>
      <Grid container justify="center" style={{ marginBottom: 25 }}>
        <Card
          className={classes.root}
          color="primary"
          style={{ backgroundColor: "#D2CFE5" }}
        >
          <CardMedia
            className={classes.imagem}
            image={time.imagem}
            title={time.nome}
          />
          <div>
            <CardContent className={classes.info}>
              <Typography
                gutterBottom
                style={{ color: "#020431", fontSize: 18 }}
              >
                {time.nome}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  {time.treinos.map((treino) => (
                    <Typography
                      variant="body2"
                      component="p"
                      style={{ paddingBottom: 10 }}
                    >
                      {treino.dia} {treino.hora}
                    </Typography>
                  ))}
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
