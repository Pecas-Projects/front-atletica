import React, { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import CardTime from "./Components/CardTime";
import CardTimeMobile from "./Components/CardTimeMobile";
import imagemTime from "../../assets/imagem/imagemTime.png";
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


export default function Times(props) {
  const classes = useStyles();
  const username = props.match.params.username;
  const [userId, setUserId] = useState();
  const [times, setTimes] = useState([]);

  useEffect(() => {
    buscaAtletica();
    if(userId !== undefined && userId !== null)
      buscarTimes();
  }, [userId]);

  async function buscaAtletica() {
    await ApiService.PesquisaAtleticaPorUsername(username)
        .then((res) => {
            setUserId(res.data.atleticaId)
        })
        .catch((err) => {
            console.log(err)
        })
  }

  async function buscarTimes() {
    await ApiService.ModalidadesAtletica(userId)
      .then((res) => {
        console.log(res.data)
        setTimes(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={classes.root}>
      <NavBar />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div className={classes.sectionDesktop}>
              <Grid container justify="center">
                  <Grid container spacing={1} style={{ marginTop: 20 }}>
                    {times.map((time) => (
                      <CardTime time={time} />
                    ))}
                  </Grid>
              </Grid>
        </div>

        <div className={classes.sectionMobile}>
              <Grid container justify="center">
                  <Grid container spacing={1} style={{ marginTop: 20 }}>
                    {times.map((time) => (
                      <CardTimeMobile time={time}  />
                    ))}
                  </Grid>
              </Grid>
        </div>
        
      </main>
    </div>
  );
}
