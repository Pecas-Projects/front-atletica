import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Snackbar, Typography } from "@material-ui/core";
import { AvField, AvForm } from "availity-reactstrap-validation";
import "./styles.css";
import ImagePassword from "../../assets/imagem/undraw_my_password.svg";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ApiService from "../../variables/ApiService";
import { atleticaUsername } from "../../utils/storage";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  paperA: {
    width: "85%",
    marginTop: 20,
    padding: "2%",
    backgroundColor: "#BBB8CC",
  },
  paperAMobile: {
    width: "100%",
    marginTop: -10,
    padding: "5%",
    backgroundColor: "#BBB8CC",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Login(props) {
  const [logado, setLogado] = useState(false);
  const [erroLogin, setErroLogin] = useState(false);
  const classes = useStyles();
  const [senha, setSenha] = useState({
    Senha: " ",
    ConfirmarSenha: " ",
  });

  const handleConfirmaSenha = (e) => {
    setSenha({ ...senha, Senha: e.target.value });
  };

  const handleSenha = (e) => {
    setSenha({ ...senha, ConfirmarSenha: e.target.value });
  };

  const handleCloseLogado = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setLogado(false);
  };

  const handleErro = () => {
    setErroLogin(true);
  };

  const handleCloseErro = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErroLogin(false);
  };

  const OnFormSubmit = async (e) => {
    e.preventDefault();

    let value = { senha: senha.Senha };

    await ApiService.MudarSenha(value, props.match.params.token)
      .then(() => setLogado(true))
      .catch(() => setErroLogin(true));
  };

  return (
    <>
      <Snackbar
        open={logado}
        autoHideDuration={4000}
        onClose={handleCloseLogado}
      >
        <Alert onClose={handleCloseLogado} severity="success">
          Senha redefinida com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={erroLogin}
        autoHideDuration={4000}
        onClose={handleCloseErro}
      >
        <Alert onClose={handleCloseErro} severity="error">
          As senhas devem ser iguais ou seu link expirou!
        </Alert>
      </Snackbar>

      <div className={classes.root}>
        <NavBar />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          {/*
    
    
    
                 DESKTOP
    
    
    
                */}

          <div className={classes.sectionDesktop}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Paper className={classes.paperA}>
                    <h1 className="MyTitleLogin">REDEFINIR SENHA</h1>

                    <Grid container spacing={1}>
                      <Grid item xs={6} style={{ marginTop: 40 }}>
                        <AvForm onSubmit={(e) => OnFormSubmit(e)}>
                          <AvField
                            onChange={handleSenha}
                            style={{ width: "80%" }}
                            name="Nova senha"
                            label="Senha"
                            type="password"
                            errorMessage="Campo obrigatório"
                            validate={{
                              required: { value: true },
                            }}
                          />

                          <AvField
                            onChange={handleConfirmaSenha}
                            style={{ width: "80%" }}
                            name="Confirmar senha"
                            label="Confirmar Senha"
                            type="password"
                            errorMessage="Campo obrigatório"
                            validate={{
                              required: { value: true },
                            }}
                          />

                          <Grid item xs={9}>
                            <Grid
                              container
                              justify="center"
                              style={{ marginTop: 20 }}
                            >
                              <Button
                                type="submit"
                                style={{ width: 300 }}
                                variant="contained"
                                color="secondary"
                              >
                                Confirmar
                              </Button>
                            </Grid>
                          </Grid>
                        </AvForm>
                      </Grid>

                      <Grid item xs={6}>
                        <img
                          style={{ width: "80%" }}
                          src={ImagePassword}
                          alt="undraw my password"
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </div>

          {/* 




            MOBILE




                */}

          <div className={classes.sectionMobile}>
            <Grid container>
              <Grid item xs={12}>
                <Paper className={classes.paperAMobile}>
                  <h1 className="MyTitleLogin">REDEFINIR SENHA</h1>

                  <AvForm onValidSubmit={OnFormSubmit}>
                    <AvField
                      onChange={handleSenha}
                      name="Nova senha"
                      label="Senha"
                      type="password"
                      errorMessage="Campo obrigatório"
                      validate={{
                        required: { value: true },
                      }}
                    />

                    <AvField
                      onChange={handleSenha}
                      name="Confirmar senha"
                      label="Confirmar Senha"
                      type="password"
                      errorMessage="Campo obrigatório"
                      validate={{
                        required: { value: true },
                      }}
                    />

                    <Grid container justify="center" style={{ marginTop: 10 }}>
                      <Button
                        type="submit"
                        style={{ width: "100%" }}
                        variant="contained"
                        color="secondary"
                        fullWidth
                      >
                        Confirmar
                      </Button>
                    </Grid>
                  </AvForm>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </main>
      </div>
    </>
  );
}
