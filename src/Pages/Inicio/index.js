import React from "react";

import Navbar from "../../Components/NavbarInicio";
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
                    Um sistema que vai levar a sua Atlética para o próximo
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
                        fullWidth
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
                style={{ fontFamily: "Roboto Condensed", color: "white" }}
              >
                <b>Nosso Sistema</b>
              </Typography>
              <Typography
                paragraph
                style={{ fontFamily: "Roboto", color: "white" }}
              >
                O sistema Olympos é um gerenciador de atléticas completo, com diversas funcionalidades
                que vão de divulgar a sua atlética a administrar seus jogos.
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
                NumPadding={50}
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
                Organize seus atletas
              </Typography>
              <Typography
                paragraph
                style={{ fontFamily: "Roboto", paddingTop: 50 }}
              >
                Na págiana de perfil é disponibilazado um formulário para quem tiver interesse em se tornar atleta,
                sendo possível recusar ou aceitar a solicitação. Ainda é possível vizualizar, adicionar e remover os atletas
                das modalidades de sua atlética.
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
                "Perfil totalmente editável"
              }
            />
            <AvatarList
              imagem={Bloquinho}
              legenda={
                "Feed da atlética"
              }
            />
            <AvatarList
              imagem={Bell}
              legenda={
                "Notificações de jogos e solicitação para se tornar atleta"
              }
            />
            <AvatarList
              imagem={Sacola2}
              legenda={
                "Aba de produtos"
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
                Crie novos jogo, aceite jogos de outras atléticas e nosso sistema guarda tudo para você. Salve os jogadores
                que participaram do jogo, sua pontuação, posição e infrações que cometeu.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
