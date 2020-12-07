import React, { useState, useEffect } from "react";
import ApiService from "../../variables/ApiService";
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  CircularProgress,
  MenuItem,
  TextField
} from "@material-ui/core";
import CardAtletica from "./Components/CardAtletica";
import AtleticaMobile from "./Components/AtleticaMobile";
import "./styles.css";

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
    width: "75%",
    marginTop: 20,
    padding: "2%",
    backgroundColor: "#D2CFE5",
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControlMobile: {
    margin: theme.spacing(1),
    width: 300,
  },
}));

function Ranking() {
  const classes = useStyles();
  const [modalidades, setModalidades] = useState([]);
  const [atleticasRanking, setAtleticasRanking] = useState([]);
  const [modalidadeId, setModalidadeId] = useState(1);
  const [loading, setLoading] = useState(true)

  async function getModalidades() {
    await ApiService.BuscarModalidades().then((res) => {
      setModalidades(res.data);
      console.log(res.data)
      setLoading(false)
    });
  }

  useEffect(() => {
    getModalidades();
  }, []);

  async function getRankingModalidade(modalidadeId) {
    console.log(modalidadeId)
    await ApiService.BuscarRankingModalidade(modalidadeId)
      .then((res) => {

        console.log(res);
        setAtleticasRanking(res.data);

      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getRankingModalidade(modalidadeId);

  }, [modalidadeId]);

  const modalidadeSelecionada = (event) => {
    setModalidadeId(event.target.value);
  };

  function exibeRanking() {
    if (atleticasRanking.length > 0) {
      return atleticasRanking.map((item) => <CardAtletica item={item} />);
    } else {
      return <div></div>;
    }
  }

  function exibeRankingMobile() {
    if (atleticasRanking.length > 0) {
      return atleticasRanking.map((item) => <AtleticaMobile item={item} />);
    } else {
      return <div></div>;
    }
  }

  return (
    <>
      {loading ? (
        <>
          <div style={{ marginTop: 250 }}>
            <Grid container justify="center">
              <CircularProgress size={100} color="primary" />
            </Grid>
          </div>
        </>

      ) : (
          <div className={classes.root}>
            <NavBar />

            <main className={classes.content}>
              <div className={classes.toolbar} />

              {/*
        
        
        
        DESKTOP
        
        
        
        */}

              <div className={classes.sectionDesktop}>
                <Grid container justify="center">
                  <Paper className={classes.paperA}>
                    <h4 className="MyTitleEP">Ranking das Atléticas</h4>
                    <Grid container spacing={3} xs={12} style={{ marginTop: 20 }}>
                      <Grid item xs={3}>

                        <TextField
                          select
                          value={modalidadeId}
                          onChange={modalidadeSelecionada}
                          label="Modalidades"

                        >
                          {modalidades.map((modalidade) => (
                            <MenuItem value={modalidade.modalidadeId}>
                              {modalidade.nome}
                            </MenuItem>
                          ))}
                        </TextField>

                      </Grid>
                      <Grid item xs={1} />

                      <Grid item xs={8}>
                        <Grid container justify="center">
                          {exibeRanking()}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </div>

              <div className={classes.sectionMobile}>
                <Grid
                  container
                  justify="center"
                  spacing={1}
                  style={{ marginTop: 20 }}
                >
                  <h4 className="MyTitleEP">Ranking das Atléticas</h4>

                  <Grid item xs={12}>
                    <Grid container justify="center">

                      <TextField
                        select
                        value={modalidadeId}
                        onChange={modalidadeSelecionada}
                        label="Modalidades"

                      >
                        {modalidades.map((modalidade) => (
                          <MenuItem value={modalidade.modalidadeId}>
                            {modalidade.nome}
                          </MenuItem>
                        ))}
                      </TextField>

                    </Grid>
                  </Grid>
                  <Grid item>{exibeRankingMobile()}</Grid>
                </Grid>
              </div>
            </main>
          </div>
        )}
    </>
  );
}

export default Ranking;
