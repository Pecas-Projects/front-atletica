import React from "react";

import Navbar from "../../Components/NavbarInicio";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import "./styles.css";

import Logo from "../../assets/imagem/logo_temp.PNG";

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
                <div style={{ paddingTop: 40 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                  >
                    <span>Fazer cadastro</span>
                  </Button>
                  <Button variant="outlined" style={{ marginLeft: 10 }}>
                    Fazer Login
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
