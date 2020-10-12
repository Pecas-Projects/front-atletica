import React, { useState } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Grid, Paper, Button, Typography, Divider } from "@material-ui/core";
import Navbar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import fotoCapa from "../../assets/imagem/fotoCapa.png"
import CardMembro from "./Components/CardMembro"
import contactImage from "../../assets/imagem/undraw_contact_u.svg"
import "./styles.css"

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
    marginTop: -10,
    padding: "2%",
    backgroundColor: "#BBB8CC"
  },
  paperB: {
    width: "85%",
    marginTop: -10,
    padding: "2%",
    backgroundColor: "#807D8E"
  },
  paperAMobile: {
    width: "100%",
    marginTop: -10,
    padding: "5%",
    backgroundColor: "#BBB8CC"
  },
  paperBMobile: {
    width: "100%",
    marginTop: -10,
    padding: "5%",
    backgroundColor: "#807D8E"
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

export default function Perfil() {

  const [openForm, setOpenForm] = useState(true)
  const [openProsel, setOpenProsel] = useState(false)

  const Membros = [
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei"
    },
  ]


  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {/*
        
        
        
        DESKTOP
        
        
        
        */}

        <div className={classes.sectionDesktop}>

          {/* <Grid container xs={12} justify="center">

          <img className="capa" src={fotoCapa} alt="foto capa" />

        </Grid> */}

          <Grid container  >

            <Grid item xs={12} >

              <Grid container justify='center'>

                <Paper className={classes.paperA}>

                  <h4 className="subtitle">NOSSOS MEMBROS</h4>

                  <Grid container spacing={3}>

                    {Membros.map((item) =>
                      <CardMembro item={item} />
                    )}


                  </Grid>

                </Paper>

              </Grid>

            </Grid>

            <Grid item xs={12}  >

              <Grid container justify='center'>

                <Paper className={classes.paperB}>

                  <h4 className="subtitle">FAÇA PARTE</h4>

                  <Grid container spacing={3}>

                    <Grid item xs={6}>

                      <p className="subtitle2" >COMO ATLETA</p>


                      <AvForm>

                        <Grid container spacing={1}>

                          <Grid item xs={12} style={{ width: "100%", marginTop: 10, marginLeft: 10 }}>

                            <AvField name="nome" label="Nome" type="text" validate={{
                              required: { value: true, errorMessage: "Campo obrigatório" },
                              pattern: { value: '[a - zA - Z]', errorMessage: "Utilize apenas letras" },
                              minLength: { value: 2, errorMessage: 'Nome inválido' },
                              maxLength: { value: 45, errorMessage: 'Nome inválido' }
                            }} />

                          </Grid>

                          <Grid item xs={12} style={{ width: "100%", marginTop: 10, marginLeft: 10 }}>

                            <AvField name="sobrenome" label="Sobrenome" type="text" validate={{
                              required: { value: true, errorMessage: "Campo obrigatório" },
                              pattern: { value: '[a - zA - Z]', errorMessage: "Utilize apenas letras" },
                              minLength: { value: 2, errorMessage: 'Sobrenome inválido' },
                              maxLength: { value: 45, errorMessage: 'Sobrenome inválido' }
                            }} />


                          </Grid>

                          <Grid item xs={12} style={{ width: "100%", marginTop: 10, marginLeft: 10 }}>

                            <AvField name="email" label="E-mail" type="text" validate={{
                              required: { value: true, errorMessage: "Campo obrigatório" },
                              minLength: { value: 10, errorMessage: 'E-mail inválido' },
                              maxLength: { value: 254, errorMessage: 'E-mail inválido' }
                            }} />


                          </Grid>


                          <Grid item xs={12} style={{ width: "100%", marginTop: 10, marginLeft: 10 }}>

                            <AvField name="whatsapp" label="WhatsApp" type="text" validate={{
                              required: { value: true, errorMessage: "Campo obrigatório" },
                              pattern: { value: "\d*", errorMessage: "Utilize apenas números" },
                              minLength: { value: 10, errorMessage: 'Número inválido' },
                              maxLength: { value: 17, errorMessage: 'Número inválido' }
                            }} />


                          </Grid>

                          <Grid item xs={12}  >

                            <Grid container justify="center">

                              <Button style={{ backgroundColor: "#DB4922", width: 250 }} variant="contained">Enviar</Button>

                            </Grid>

                          </Grid>


                        </Grid>


                      </AvForm>

                    </Grid>

                    <Divider orientation="vertical" flexItem />

                    <Grid item xs={5} >


                      <p className="subtitle2">PROCESSO SELETIVO</p>

                      <p className="subtitle2">Para participar do procecesso seletivo clique no botão abaixo</p>

                      <Button color="primary" style={{ width: 300, marginTop: 10 }} variant="outlined"> Participar</Button>


                    </Grid>

                  </Grid>

                </Paper>
              </Grid>

            </Grid>

            <Grid item xs={12}>

              <Grid container justify="center">

                <Paper className={classes.paperA}>

                  <Grid container spacing={1}>

                    <Grid item xs={8} style={{ marginTop: 20 }}>

                      <h4 className="subtitle">ENTRE EM CONTATO</h4>

                      <p className="subtitle2">EMAIL - atleticabraba@gmail.com</p>
                      <p className="subtitle2">TELEFONE - 71 973673287</p>
                      <p className="subtitle2">Av. Orlando Gomes, 1845 - Piatã, Salvador - BA, 41650-010</p>

                    </Grid>

                    <Grid item xs={4}>

                      <img className="image" src={contactImage} alt="contactUs"></img>

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

          {/* <Grid container xs={12} justify="center">

          <img className="capa" src={fotoCapa} alt="foto capa" />

        </Grid> */}

          <Grid container spacing={1}>


            <Grid item xs={12}>

              <Paper className={classes.paperAMobile}>

                <h4 className="subtitle">NOSSOS MEMBROS</h4>

                <Grid container spacing={3}>

                  {Membros.map((item) =>
                    <CardMembro item={item} />
                  )}


                </Grid>

              </Paper>
            </Grid>


            <Grid item xs={12}>

              <Paper className={classes.paperBMobile}>

                <h4 className="subtitle">FAÇA PARTE</h4>

                <p className="subtitle2">COMO ATLETA</p>


                <AvForm>

                  <Grid container spacing={1}>

                    <Grid item xs={12} style={{ width: "100%", marginTop: 10 }}>

                      <AvField name="nome" label="Nome" type="text" validate={{
                        required: { value: true, errorMessage: "Campo obrigatório" },
                        pattern: { value: '[a - zA - Z]', errorMessage: "Utilize apenas letras" },
                        minLength: { value: 2, errorMessage: 'Nome inválido' },
                        maxLength: { value: 45, errorMessage: 'Nome inválido' }
                      }} />

                    </Grid>

                    <Grid item xs={12} style={{ width: "100%", marginTop: 10 }}>

                      <AvField name="sobrenome" label="Sobrenome" type="text" validate={{
                        required: { value: true, errorMessage: "Campo obrigatório" },
                        pattern: { value: '[a - zA - Z]', errorMessage: "Utilize apenas letras" },
                        minLength: { value: 2, errorMessage: 'Sobrenome inválido' },
                        maxLength: { value: 45, errorMessage: 'Sobrenome inválido' }
                      }} />


                    </Grid>

                    <Grid item xs={12} style={{ width: "100%", marginTop: 10 }}>

                      <AvField name="email" label="E-mail" type="text" validate={{
                        required: { value: true, errorMessage: "Campo obrigatório" },
                        minLength: { value: 10, errorMessage: 'E-mail inválido' },
                        maxLength: { value: 254, errorMessage: 'E-mail inválido' }
                      }} />


                    </Grid>


                    <Grid item xs={12} style={{ width: "100%", marginTop: 10 }}>

                      <AvField name="whatsapp" label="WhatsApp" type="text" validate={{
                        required: { value: true, errorMessage: "Campo obrigatório" },
                        pattern: { value: "\d*", errorMessage: "Utilize apenas números" },
                        minLength: { value: 10, errorMessage: 'Número inválido' },
                        maxLength: { value: 17, errorMessage: 'Número inválido' }
                      }} />


                    </Grid>

                    <Grid item xs={12}  >


                      <Button style={{ backgroundColor: "#DB4922", width: "100%", marginTop: 10 }} variant="contained">Enviar</Button>


                    </Grid>

                  </Grid>

                </AvForm>


                <Grid container xs={12} style={{ marginTop: 20 }}>

                  <p className="subtitle2">PROCESSO SELETIVO</p>

                  <p className="subtitle2">Para participar do procecesso seletivo clique no botão abaixo</p>

                  <Button color="primary" style={{ width: "100%", marginTop: 10 }} variant='outlined'> Participar</Button>

                </Grid>


              </Paper>

            </Grid>

            <Grid item xs={12}>

              <Grid container justify="center">

                <Paper className={classes.paperAMobile}>

                  <Grid container xs={12} style={{ marginTop: 20 }}>

                    <h4 className="subtitle">ENTRE EM CONTATO</h4>

                    <p className="subtitle2">EMAIL - atleticabraba@gmail.com</p>
                    <p className="subtitle2">TELEFONE - 71 973673287</p>
                    <p className="subtitle2">Av. Orlando Gomes, 1845 - Piatã, Salvador - BA, 41650-010</p>

                  </Grid>

                </Paper>

              </Grid>

            </Grid>

          </Grid>

        </div >
      </main >
    </div>


  );
}
