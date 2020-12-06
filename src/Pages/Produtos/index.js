import React, { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Fab, Typography } from "@material-ui/core";
import CardProduto from "./Components/CardProduto";
import "./styles.css";
import ApiService from "../../variables/ApiService";
import { getAtleticaId } from "../../utils/storage";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

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
  const atleticaLoginId = getAtleticaId();
  const [logada, setLogada] = useState(false);
  const [produtos, setProdutos] = useState([]);

  const DeleteProduto = (index) => {
    let newArray = [...produtos];
    newArray.splice(index, 1);
    setProdutos(newArray);
  };

  useEffect(() => {
    buscaAtletica();
    if (atleticaId !== undefined && atleticaId !== null) {
      buscarProdutos();
      if (atleticaLoginId === atleticaId) {
        setLogada(true);
      }
    }
  }, [atleticaId, atleticaLoginId]);

  async function buscaAtletica() {
    await ApiService.PesquisaAtleticaPorUsername(username)
      .then((res) => {
        setAtleticaId(res.data.atleticaId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function buscarProdutos() {
    await ApiService.BuscarProdutosAtletica(atleticaId)
      .then((res) => {
        console.log(res.data);
        console.log(atleticaId);
        setProdutos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={classes.root}>
      <NavBar />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div className={classes.sectionDesktop}>
          <div className="page-container-post">
            <div className="content-wrap-post">
              <Grid container justify="center">
                <Paper className={classes.paperA}>
                  {produtos !== undefined &&
                  produtos !== null &&
                  produtos.length !== 0 ? (
                    <h4 className="MyTitle">Nossos Produtos</h4>
                  ) : (
                    <h4 className="MyTitle">
                      Essa atlética não possui produtos cadastrados!
                    </h4>
                  )}
                  <Grid container spacing={1} style={{ marginTop: 20 }}>
                    {produtos.map((item, index) => (
                      <CardProduto
                        item={item}
                        atletica={logada}
                        index={index}
                        DeleteProduto={DeleteProduto}
                      />
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </div>
          </div>
        </div>

        <div className={classes.sectionMobile}>
          <div className="page-container-post">
            <div className="content-wrap-post">
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                {produtos !== undefined &&
                produtos !== null &&
                produtos.length !== 0 ? (
                  <Grid container justify="center">
                    <Typography
                      variant="h6"
                      align="center"
                      style={{ color: "white" }}
                    >
                      Nossos Produtos
                    </Typography>
                  </Grid>
                ) : (
                  <Grid container justify="center">
                    <Paper className={classes.paperA}>
                      <Typography
                        variant="h6"
                        align="center"
                        style={{ color: "white" }}
                      >
                        Essa atlética não possui produtos cadastrados!
                      </Typography>
                    </Paper>
                  </Grid>
                )}
                {produtos.map((item, index) => (
                  <CardProduto
                    item={item}
                    atletica={logada}
                    index={index}
                    DeleteProduto={DeleteProduto}
                  />
                ))}
              </Grid>
            </div>
          </div>
        </div>

        <Grid container justify="flex-end">
          <Link to="/AdicionarProduto">
            <Fab color="secondary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </Grid>
      </main>
    </div>
  );
}
