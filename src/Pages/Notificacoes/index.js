import React, { useState, useEffect } from "react";
import ApiService from "../../variables/ApiService";
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import PaperNotificacao from "./Components/PaperNotificacao";
import NotificacaoMobile from "./Components/NotificacaoMobile";

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

function Notificacoes() {
  const classes = useStyles();
  const [tipo, setTipo] = useState("atletas");
  const [solicitacoesAtleta, setSolicitacoesAtleta] = useState([]);
  const [solicitacoesJogo, setSolicitacoesJogo] = useState([]);
  const [loding, setLoding] = useState(true);
  const atleticaId = 1;

  function notificacaoAtletas() {
    if (solicitacoesAtleta.length !== 0) {
      return solicitacoesAtleta.map((item) => <PaperNotificacao item={item} tipo={tipo}/>);
    } else {
      return <div></div>;
    }
  }

  function notificacaoJogos() {
    if (solicitacoesAtleta.length !== 0) {
      return solicitacoesJogo.map((item) => <PaperNotificacao item={item} tipo={tipo}/>);
    } else {
      return <div></div>;
    }
  }

  function notificacaoAtletasMobile() {
    if (solicitacoesAtleta.length !== 0) {
      return solicitacoesAtleta.map((item) => <NotificacaoMobile item={item} tipo={tipo}/>);
    } else {
      return <div></div>;
    }
  }

  function notificacaoJogosMobile() {
    if (solicitacoesAtleta.length !== 0) {
      return solicitacoesJogo.map((item) => <NotificacaoMobile item={item} />);
    } else {
      return <div></div>;
    }
  }

  useEffect(() => {
    async function getSolicitacoes() {
      await ApiService.GetSolicitacoesAtleta(atleticaId).then((res) => {
        console.log(res);
        setSolicitacoesAtleta(res.data);
      });

      await ApiService.GetSolicitacoesJogo(atleticaId).then((res) => {
        console.log(res);
        setSolicitacoesJogo(res.data);
      });

      setLoding(false);
    }

    if (loding === true) {
      getSolicitacoes();
    }
  }, []);

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  return (
    <>
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
                <h4 className="MyTitle">Suas Notificações</h4>
                <Grid container spacing={2} style={{ marginTop: 20 }}>
                  <Grid item xs={12}>
                    <RadioGroup
                      row
                      aria-label="tipo"
                      name="notificacoes"
                      value={tipo}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="atletas"
                        control={<Radio />}
                        label="Atletas"
                      />
                      <FormControlLabel
                        value="jogos"
                        control={<Radio />}
                        label="Jogos"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs>
                    {tipo === "atletas"
                      ? notificacaoAtletas()
                      : notificacaoJogos()}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </div>

          <div className={classes.sectionMobile}>
            <Grid container justify="center" spacing={2} xs={12}>
              <Grid item>
                <h4 className="MyTitle">Suas Notificações</h4>
              </Grid>
              <Grid item>
                <RadioGroup
                  row
                  aria-label="tipo"
                  name="notificacoes"
                  value={tipo}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="atletas"
                    control={<Radio />}
                    label="Atletas"
                  />
                  <FormControlLabel
                    value="jogos"
                    control={<Radio />}
                    label="Jogos"
                  />
                </RadioGroup>
              </Grid>

              <Grid item>
                {tipo === "atletas" ? notificacaoAtletasMobile() : notificacaoJogosMobile()}
              </Grid>
            </Grid>
          </div>
        </main>
      </div>
    </>
  );
}

export default Notificacoes;
