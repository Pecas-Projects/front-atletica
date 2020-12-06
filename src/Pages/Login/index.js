import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Snackbar, Typography } from "@material-ui/core";
import { AvField, AvForm } from "availity-reactstrap-validation";
import "./styles.css";
import ImageLogin from "../../assets/imagem/undraw_Login.svg";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ApiService from "../../variables/ApiService";
import { atleticaUsername } from "../../utils/storage";
import EsqueceuSenha from "./components/esqueceuSenhaDialog";

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

export default function Login() {
  const [logado, setLogado] = useState(false);
  const [erroLogin, setErroLogin] = useState(false);
  const classes = useStyles();
  const [login, setLogin] = useState({
    Email: " ",
    Senha: " ",
    Type: "Atletica",
  });
  const [esqueceuSenha, setEsqueceuSenha] = useState(false);

  const handleEmail = (e) => {
    setLogin({ ...login, Email: e.target.value });
  };

  const handleSenha = (e) => {
    setLogin({ ...login, Senha: e.target.value });
  };

  const handleType = (e) => {
    setLogin({ ...login, Type: e.target.value });
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

  const handleEsqueceuSenha = () => {
    setEsqueceuSenha(true);
  };

  const OnFormSubmit = async (e) => {
    e.preventDefault();

    if (login.Type === "Atletica") {
      let loginData = {
        credencial: login.Email,
        senha: login.Senha,
      };

      await ApiService.LoginAtletica(loginData)
        .then(() => (window.location.href = "/Perfil/" + atleticaUsername()))
        .catch((err) => console.log(err));
    } else {
      let loginM = {
        senha: login.Senha,
        email: {
          email: login.Email,
        },
      };

      await ApiService.LoginMembro(loginM)
        .then(() => window.location.href = "/Perfil/" + atleticaUsername())
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Snackbar
        open={logado}
        autoHideDuration={4000}
        onClose={handleCloseLogado}
      >
        <Alert onClose={handleCloseLogado} severity="success">
          Usuário logado com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={erroLogin}
        autoHideDuration={4000}
        onClose={handleCloseErro}
      >
        <Alert onClose={handleCloseErro} severity="error">
          E-mail ou senha incorreto!
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
                    <h1 className="MyTitleLogin">LOGIN</h1>

                    <Grid container spacing={1}>
                      <Grid item xs={6} style={{ marginTop: 40 }}>
                        <AvForm onSubmit={(e) => OnFormSubmit(e)}>
                          <AvField
                            onChange={handleEmail}
                            style={{ width: "80%", marginBottom: 30 }}
                            name="email"
                            label="E-mail"
                            type="text"
                            errorMessage="Campo obrigatório"
                            validate={{
                              required: { value: true },
                            }}
                          />

                          <AvField
                            onChange={handleSenha}
                            style={{ width: "80%" }}
                            name="senha"
                            label="Senha"
                            type="password"
                            errorMessage="Campo obrigatório"
                            validate={{
                              required: { value: true },
                            }}
                          />

                          <Button
                            color="primary"
                            size="small"
                            variant="outlined"
                            onClick={handleEsqueceuSenha}
                            style={{ fontSize: 12 }}
                          >
                            Esqueci Minha senha
                          </Button>

                          <EsqueceuSenha
                            aberto={esqueceuSenha}
                            setAberto={setEsqueceuSenha}
                            login={login}
                          />

                          <Grid item xs={12} style={{ marginTop: 20 }}>
                            <FormControl component="fieldset">
                              <FormLabel component="legend">
                                Entrar como:
                              </FormLabel>
                              <RadioGroup
                                row
                                aria-label="gender"
                                name="gender1"
                                value={login.Type}
                                onChange={handleType}
                              >
                                <FormControlLabel
                                  value="Atletica"
                                  control={<Radio />}
                                  label="Atlética"
                                />
                                <FormControlLabel
                                  value="Membro"
                                  control={<Radio />}
                                  label="Membro"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Grid>

                          <Grid item xs={8}>
                            <Grid
                              container
                              justify="flex-end"
                              style={{ marginTop: 20 }}
                            >
                              <Button
                                type="submit"
                                style={{ width: 300 }}
                                variant="contained"
                                color="secondary"
                              >
                                entrar{" "}
                              </Button>
                            </Grid>
                          </Grid>
                        </AvForm>
                      </Grid>

                      <Grid item xs={6}>
                        <img
                          style={{ width: "100%" }}
                          src={ImageLogin}
                          alt="undraw_login"
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
                  <h1 className="MyTitleLogin">Login</h1>

                  <AvForm onValidSubmit={OnFormSubmit}>
                    <AvField
                      style={{ marginBottom: 30 }}
                      onChange={handleEmail}
                      name="email"
                      label="E-mail"
                      type="text"
                      errorMessage="Campo obrigatório"
                      validate={{
                        required: { value: true },
                      }}
                    />

                    <AvField
                      onChange={handleSenha}
                      name="senha"
                      label="Senha"
                      type="password"
                      errorMessage="Campo obrigatório"
                      validate={{
                        required: { value: true },
                      }}
                    />

                    <Button
                      color="primary"
                      size="small"
                      variant="outlined"
                      onClick={handleEsqueceuSenha}
                      style={{ fontSize: 12 }}
                    >
                      Esqueci Minha senha
                    </Button>

                    <EsqueceuSenha
                      aberto={esqueceuSenha}
                      setAberto={setEsqueceuSenha}
                      login={login}
                    />

                    <Grid item xs={12} style={{ marginTop: 20 }}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Entrar como:</FormLabel>
                        <RadioGroup
                          row
                          aria-label="type"
                          name="type1"
                          value={login.Type}
                          onChange={handleType}
                        >
                          <FormControlLabel
                            value="Atletica"
                            control={<Radio />}
                            label="Atlética"
                          />
                          <FormControlLabel
                            value="Membro"
                            control={<Radio />}
                            label="Membro"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid container style={{ marginTop: 10 }}>
                      <Button
                        type="submit"
                        style={{ width: "100%" }}
                        variant="contained"
                        color="secondary"
                      >
                        entrar
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
