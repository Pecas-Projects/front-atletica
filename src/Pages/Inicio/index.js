import React from "react";

import Navbar from "../../Components/NavbarInicio";
import Footer from "../../Components/Footer";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconList from "./components/iconsList";
import AvatarList from "./components/avatarList";

import "./styles.css";

import Logo from "../../assets/imagem/logo_temp.PNG";
import Tecladinho from "../../assets/icons/transcript.svg";
import Sacola from "../../assets/icons/shopping-bag.svg";
import Trofeu from "../../assets/icons/trophy.svg";
import Bell from "../../assets/icons/bell.svg";
import Home from "../../assets/icons/home.svg";
import Bloquinho from "../../assets/icons/today.svg";
import Calendario from "../../assets/icons/calendar-today.svg";
import Sacola2 from "../../assets/icons/shopping-bag2.svg";

import Basquete from "../../assets/imagem/undraw_basketball_agx4 1.svg";
import Controle from "../../assets/imagem/undraw_gaming_6oy3 1.svg";
import { isLogin, atleticaUsername } from '../../utils/storage'

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
                  {isLogin() ?
                    <Link to={"/Perfil/" + atleticaUsername()}>
                      <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                      >
                        <span>Meu Perfil</span>
                      </Button>
                    </Link>
                    :
                    <>
                      <Link to="/cadastro">
                        <Button
                          variant="contained"
                          color="secondary"
                          disableElevation
                        >
                          <span>Fazer cadastro</span>
                        </Button>
                      </Link>

                      <Link to="/login">
                        <Button variant="outlined" style={{ marginLeft: 20 }}>
                          Fazer Login
                    </Button>
                      </Link>
                    </>
                  }
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
                style={{ fontFamily: "Roboto", paddingTop: 60 }}
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

              <IconList
                icon={Tecladinho}
                leganda={"Divulgue sua Atlética"}
                NumPadding={70}
              />

              <IconList
                icon={Sacola}
                leganda={"Exiba os Seus produtos"}
                NumPadding={50}
              />

              <IconList
                icon={Trofeu}
                leganda={"Gerencie os seus jogos"}
                NumPadding={50}
              />

              <IconList
                icon={Bell}
                leganda={"Anuncie seus eventos"}
                NumPadding={50}
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            spacing={3}
            style={{
              marginTop: 100,
            }}
          >
            <Grid
              item
              md={7}
              container
              justify="flex-start"
              style={{ color: "black", paddingLeft: 60, paddingTop: 70 }}
            >
              <Typography
                variant="h4"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                Motive os seus atletas
              </Typography>
              <Typography
                paragraph
                style={{ fontFamily: "Roboto", paddingTop: 50 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </Typography>
            </Grid>

            <Grid
              item
              md={5}
              container
              justify="flex-start"
              style={{ color: "black", paddingLeft: 60, paddingTop: 70 }}
            >
              <img
                src={Basquete}
                alt="Imagem de um moço jogando basquete"
                style={{ width: 500 }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            spacing={3}
            style={{
              marginTop: 100,
            }}
          >
            <AvatarList
              imagem={Home}
              legenda={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor"
              }
            />
            <AvatarList
              imagem={Bloquinho}
              legenda={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor"
              }
            />
            <AvatarList
              imagem={Calendario}
              legenda={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor"
              }
            />
            <AvatarList
              imagem={Sacola2}
              legenda={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor"
              }
            />
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            spacing={3}
            style={{
              marginTop: 100,
            }}
          >
            <Grid
              item
              md={5}
              container
              justify="flex-start"
              style={{ color: "black", paddingLeft: 60 }}
            >
              <img
                src={Controle}
                alt="Imagem de um moço segurando o controle"
                style={{ width: 500 }}
              />
            </Grid>

            <Grid
              item
              md={7}
              container
              justify="flex-end"
              style={{ color: "black", paddingLeft: 60, paddingTop: 70 }}
            >
              <Typography
                variant="h4"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                Administre os seus Jogos
              </Typography>
              <Typography
                paragraph
                style={{ fontFamily: "Roboto", paddingTop: 50 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
