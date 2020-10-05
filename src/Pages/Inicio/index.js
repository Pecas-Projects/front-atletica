import React from "react";

import Navbar from "../../Components/NavbarInicio";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import "./styles.css";

import Logo from "../../assets/imagem/logo_temp.PNG";
import Tecladinho from "../../assets/icons/transcript.svg";
import Sacola from "../../assets/icons/shopping-bag.svg";
import Trofeu from "../../assets/icons/trophy.svg";
import Bell from "../../assets/icons/bell.svg";

export default function PaginaInicial() {
  return (
    <>
      <Navbar />
      <Container>
        <Box my={2}>
          <Grid container direction="row" justify="center" spacing={3}>
            <Grid item md={6} container justify="center">
              <img src={Logo} />
            </Grid>
            <Grid item md={6} container justify="center" alignItems="center">
              <Grid>
                <Typography
                  color="primary"
                  variant="h3"
                  style={{ fontFamily: "Roboto Condensed" }}
                >
                  <b>
                    Um sistema que vai levar a sua Atlética para um próximo
                    nível
                  </b>
                </Typography>
                <div style={{ paddingTop: 80 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                  >
                    <span>Fazer cadastro</span>
                  </Button>
                  <Button variant="outlined" style={{ marginLeft: 20 }}>
                    Fazer Login
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            spacing={3}
            style={{
              marginTop: 100,
              backgroundColor: "#E19822",
              borderRadius: 10,
            }}
          >
            <Grid
              item
              md={8}
              container
              justify="flex-start"
              style={{ color: "black", paddingLeft: 60, paddingTop: 70 }}
            >
              <Typography
                variant="h4"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                <b>Nosso Sistema</b>
              </Typography>
              <Typography
                paragraph
                style={{ fontFamily: "Roboto", paddingTop: 80 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Grid>
            <Grid
              item
              md={4}
              container
              justify="flex-start"
              style={{ color: "white", fontFamily: "Roboto" }}
            >
              {/* COMPONENTIZAR ESSES ICONES E LEGENDAS */}

              <Grid
                container
                direction="row"
                style={{ paddingTop: 70 }}
                spacing={1}
              >
                <Grid item>
                  <img src={Tecladinho} style={{ width: "90%" }} />
                </Grid>
                <Grid item style={{ padding: 20 }}>
                  <Typography>Divulgue sua Atlética</Typography>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                style={{ marginTop: 20 }}
                spacing={4}
              >
                <Grid item>
                  <img src={Sacola} style={{ width: "90%" }} />
                </Grid>
                <Grid item style={{ padding: 20 }}>
                  <Typography>Exiba os Seus produtos</Typography>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                style={{ marginTop: 20 }}
                spacing={3}
              >
                <Grid item>
                  <img src={Trofeu} style={{ width: "90%" }} />
                </Grid>
                <Grid item style={{ padding: 20 }}>
                  <Typography>Gerencie os seus jogos</Typography>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                style={{ marginTop: 20 }}
                spacing={3}
              >
                <Grid item>
                  <img src={Bell} style={{ width: "90%" }} />
                </Grid>
                <Grid item style={{ padding: 20 }}>
                  <Typography>Anuncie seus eventos</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
