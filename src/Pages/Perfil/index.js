import React, { useState, useEffect } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Grid, Paper, Button, Checkbox, FormGroup, FormLabel } from "@material-ui/core";
import Navbar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import fotoCapa from "../../assets/imagem/fotoCapa.png"
import CardMembro from "./Components/CardMembro"
import contactImage from "../../assets/imagem/undraw_contact_u.svg"
import InputMask from 'react-input-mask';
import { Input } from 'reactstrap';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PerfilBackground from '../../assets/imagem/fundo_pagina.png'
import FotoPerfil from "../../assets/imagem/fotoPerfil.png"
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
  paperBackgroud: {
    width: "100%",
    marginTop: -30,
    padding: "2%",
    backgroundColor: "#020431",
    // borderRadius: 30
  },
  paperBackgroudMobile: {
    width: "100%",

    padding: "2%",
    backgroundColor: "#020431",
    // borderRadius: 30
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
  formControl: {
    margin: theme.spacing(3),
  },

}));

export default function Perfil() {


  const Membros = [
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei",
      imagem: "https://www.oliberal.com/image/contentid/policy:1.163651:1590412540/Gretchen.jpg?f=2x1&$p$f=ee801a7&w=1500&$w=f075b93"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei",
      imagem: "https://www.oliberal.com/image/contentid/policy:1.163651:1590412540/Gretchen.jpg?f=2x1&$p$f=ee801a7&w=1500&$w=f075b93"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei",
      imagem: "https://www.oliberal.com/image/contentid/policy:1.163651:1590412540/Gretchen.jpg?f=2x1&$p$f=ee801a7&w=1500&$w=f075b93"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei",
      imagem: "https://www.oliberal.com/image/contentid/policy:1.163651:1590412540/Gretchen.jpg?f=2x1&$p$f=ee801a7&w=1500&$w=f075b93"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei",
      imagem: "https://www.oliberal.com/image/contentid/policy:1.163651:1590412540/Gretchen.jpg?f=2x1&$p$f=ee801a7&w=1500&$w=f075b93"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei",
      imagem: "https://www.oliberal.com/image/contentid/policy:1.163651:1590412540/Gretchen.jpg?f=2x1&$p$f=ee801a7&w=1500&$w=f075b93"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei",
      imagem: "https://www.oliberal.com/image/contentid/policy:1.163651:1590412540/Gretchen.jpg?f=2x1&$p$f=ee801a7&w=1500&$w=f075b93"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei",
      imagem: "https://www.oliberal.com/image/contentid/policy:1.163651:1590412540/Gretchen.jpg?f=2x1&$p$f=ee801a7&w=1500&$w=f075b93"
    },
    {
      nome: "Beatriz Calazans",
      funcao: "Coordenadora de volei",
      imagem: "https://www.oliberal.com/image/contentid/policy:1.163651:1590412540/Gretchen.jpg?f=2x1&$p$f=ee801a7&w=1500&$w=f075b93"
    },
  ]

  const cursos = ["Engenharia da computação", "Análise de sistemas", "Engenharia de software", "Tecnologia da informação"]

  const modalidades = [
    "Futebol", "Vôlei", "Basquete", "Atletismo", "Futsal", "Vôlei de Praia", "Natação",
  ]

  const generos = [
    "Feminino", "Masculino", "Misto"
  ]

  const classes = useStyles();

  const [atleta, setAtleta] = useState({
    Nome: "",
    Sobrenome: "",
    Email: "",
    Telefone: "",
    Curso: "",
    AnoIngresso: "",
    Genero: "",
    modalidades: []
  })

  const [opcao, setOpcao] = useState('Atleta')

  const handleEmail = (e) => {
    setAtleta({ ...atleta, Email: e.target.value })
  }

  const handleNome = (e) => {
    setAtleta({ ...atleta, Nome: e.target.value })
  }

  const handleSobrenome = (e) => {
    setAtleta({ ...atleta, Sobrenome: e.target.value })
  }

  const handleTelefone = (e) => {
    setAtleta({ ...atleta, Telefone: e.target.value })
  }

  const handleCurso = (e) => {
    setAtleta({ ...atleta, Curso: e.target.value })
  }

  const handleData = (e) => {
    setAtleta({ ...atleta, AnoIngresso: e.target.value })
  }

  const handleGenero = (e) => {
    setAtleta({ ...atleta, Genero: e.target.value })
  }



  const handleModalidades = (e) => {

    if (atleta.modalidades.indexOf(e.target.name) === -1) {

      atleta.modalidades.push(e.target.name)
    }
    else {

      var aux = atleta.modalidades.filter(function (nome) { return nome !== e.target.name })

      atleta.modalidades = aux;
    }


    console.log(atleta.modalidades)

  }






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


            <Grid container justify='center'>

              <Grid item xs={12} >

                <div className='relativeCard'>

                  <div className="containerCapa">

                    <img className="imageCapa" src={fotoCapa} alt="fotoCapa" />

                  </div>

                  <div className="circle">

                    <Grid style={{ marginTop: 10 }} container justify='center'>

                      <img className='imagePerfil' src={FotoPerfil} alt="fotoPerfil" />

                    </Grid>

                  </div>


                  <Grid container justify='center'>

                    <Paper className={classes.paperBackgroud}>

                      <h3 className="MyTitle">Cimatlética - Atlética do SENAI CIMATEC</h3>

                      <br />


                      <p className='subtitleW' >SOBRE NÒS</p>

                      <p className="subtitle2W">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


                    </Paper>

                  </Grid>

                </div>
              </Grid>



              <Paper className={classes.paperA}>

                <h4 className="subtitle">NOSSOS MEMBROS</h4>

                <Grid container spacing={3}>

                  {Membros.map((item) =>
                    <CardMembro item={item} />
                  )}


                </Grid>

              </Paper>

            </Grid>



            <Grid item xs={12}  >

              <Grid container justify='center'>

                <Paper className={classes.paperB}>

                  <h4 className="subtitle">FAÇA PARTE</h4>

                  <FormControl component="fieldset">
                    <RadioGroup row aria-label="gender" name="gender1" value={opcao}  >
                      <FormControlLabel value="Atleta" control={<Radio />} onClick={() => setOpcao('Atleta')} label="Como Atleta" />
                      <FormControlLabel value="Membro" control={<Radio />} onClick={() => setOpcao('Membro')} label="Como Membro" />

                    </RadioGroup>
                  </FormControl>

                  {opcao === 'Atleta' ? (


                    <AvForm>

                      <Grid container spacing={1}>


                        <Grid item xs={4}>


                          <AvField style={{ width: "90%" }} name="nome" label="Nome" type="text" onChange={handleNome} validate={{
                            required: { value: true, errorMessage: "Campo obrigatório" },
                            pattern: { value: '[a - zA - Z]', errorMessage: "Utilize apenas letras" },
                            minLength: { value: 2, errorMessage: 'Nome inválido' },
                            maxLength: { value: 45, errorMessage: 'Nome inválido' }
                          }} />


                          <AvField style={{ width: "90%" }} name="sobrenome" label="Sobrenome" onChange={handleSobrenome} type="text" validate={{
                            required: { value: true, errorMessage: "Campo obrigatório" },
                            pattern: { value: '[a - zA - Z]', errorMessage: "Utilize apenas letras" },
                            minLength: { value: 2, errorMessage: 'Sobrenome inválido' },
                            maxLength: { value: 45, errorMessage: 'Sobrenome inválido' }
                          }} />



                          <AvField style={{ width: "90%" }} name="email" label="E-mail" type="text" onChange={handleEmail} validate={{
                            required: { value: true, errorMessage: "Campo obrigatório" },
                            minLength: { value: 10, errorMessage: 'E-mail inválido' },
                            maxLength: { value: 254, errorMessage: 'E-mail inválido' }
                          }} />



                        </Grid>

                        <Grid item xs={4}>

                          <AvField style={{ width: "90%" }} name="whatsapp" label="WhatsApp" type="text" tag={[Input, InputMask]}
                            onChange={handleTelefone} mask="(99) 99999-9999" validate={{
                              required: { value: true, errorMessage: "Campo obrigatório" },
                              pattern: { value: "[0-9]", errorMessage: "Utilize apenas números" },
                              minLength: { value: 10, errorMessage: 'Número inválido' },
                              maxLength: { value: 17, errorMessage: 'Número inválido' }
                            }} />



                          <AvField style={{ width: "90%" }} name="dataIngresso" label="Ano de ingresso na faculdade" type="text" onChange={handleEmail} validate={{
                            required: { value: true, errorMessage: "Campo obrigatório" },
                            pattern: { value: '[0-9]', errorMessage: "Utilize apenas números" },
                            minLength: { value: 4, errorMessage: 'Ano inválido' },
                            maxLength: { value: 4, errorMessage: 'Ano inválido' }
                          }} />


                          <TextField
                            id="standard-select-currency"
                            select

                            label="Curso"
                            value={atleta.Curso}
                            onChange={handleCurso}
                            style={{ width: "90%", marginTop: 15 }}


                          >
                            {cursos.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>

                          <TextField
                            id="standard-select-genero"
                            select

                            label="Gênero"
                            value={atleta.genero}
                            onChange={handleGenero}
                            style={{ width: "90%", marginTop: 15 }}

                          >
                            {generos.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>


                        </Grid>

                        <Grid item xs={4}>

                          <div className='scroll'>



                            <FormControl component="fieldset" className={classes.formControl}>
                              <FormLabel component="legend">Modalidades que deseja participar</FormLabel>
                              <FormGroup>
                                {modalidades.map((option) => (
                                  <FormControlLabel
                                    control={<Checkbox onChange={handleModalidades} name={option} />}
                                    label={option}
                                  />

                                ))}

                              </FormGroup>
                            </FormControl>


                          </div>

                        </Grid>

                        <Grid item xs={12}  >

                          <Grid container justify="flex-end">

                            <Button style={{ backgroundColor: "#DB4922", width: 300, marginTop: 20 }} variant="contained">Enviar</Button>

                          </Grid>

                        </Grid>

                      </Grid>



                    </AvForm>


                  ) : (

                      <Grid item xs={12} >


                        <p className="subtitle2">PROCESSO SELETIVO</p>

                        <p className="subtitle2">Para participar do procecesso seletivo clique no botão abaixo</p>

                        <Button color="primary" style={{ width: 300, marginTop: 10 }} variant="outlined"> Participar</Button>


                      </Grid>

                    )}



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

              <Paper className={classes.paperBackgroudMobile}>

                <Grid style={{ marginTop: 10, }} container justify='center'>

                  <img className='imagePerfilMobile' src={FotoPerfil} alt="fotoPerfil" />

                  <h3 className="MyTitleMobile">Cimatlética - Atlética do SENAI CIMATEC</h3>

                </Grid>

              </Paper>

              <Paper className={classes.paperBMobile}>

                <Grid container justify="flex-start">

                  <p className='subtitleWMobile' >SOBRE NÒS</p>

                  <p className="subtitle2W">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


                </Grid>
              </Paper>

            </Grid>


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

                <FormControl component="fieldset">
                  <RadioGroup row aria-label="gender" name="gender1" value={opcao}  >
                    <FormControlLabel value="Atleta" control={<Radio />} onClick={() => setOpcao('Atleta')} label="Como Atleta" />
                    <FormControlLabel value="Membro" control={<Radio />} onClick={() => setOpcao('Membro')} label="Como Membro" />

                  </RadioGroup>
                </FormControl>

                {opcao === 'Atleta' ? (


                  <AvForm>

                    <Grid container spacing={1}>

                      <Grid item xs={12} style={{ width: "100%", marginTop: 10 }}>

                        <AvField name="nome" label="Nome" type="text" onChange={handleNome} validate={{
                          required: { value: true, errorMessage: "Campo obrigatório" },
                          pattern: { value: '[a - zA - Z]', errorMessage: "Utilize apenas letras" },
                          minLength: { value: 2, errorMessage: 'Nome inválido' },
                          maxLength: { value: 45, errorMessage: 'Nome inválido' }
                        }} />

                      </Grid>

                      <Grid item xs={12} style={{ width: "100%", marginTop: 10 }}>

                        <AvField name="sobrenome" label="Sobrenome" type="text" onChange={handleSobrenome} validate={{
                          required: { value: true, errorMessage: "Campo obrigatório" },
                          pattern: { value: '[a - zA - Z]', errorMessage: "Utilize apenas letras" },
                          minLength: { value: 2, errorMessage: 'Sobrenome inválido' },
                          maxLength: { value: 45, errorMessage: 'Sobrenome inválido' }
                        }} />


                      </Grid>

                      <Grid item xs={12} style={{ width: "100%", marginTop: 10 }}>

                        <AvField name="email" label="E-mail" type="text" onChange={handleEmail} validate={{
                          required: { value: true, errorMessage: "Campo obrigatório" },
                          minLength: { value: 10, errorMessage: 'E-mail inválido' },
                          maxLength: { value: 254, errorMessage: 'E-mail inválido' }
                        }} />


                      </Grid>


                      <Grid item xs={12} style={{ width: "100%", marginTop: 10 }}>

                        <AvField name="whatsapp" label="WhatsApp" type="text" onChange={handleTelefone}
                          tag={[Input, InputMask]} mask="(99) 99999-9999" validate={{
                            required: { value: true, errorMessage: "Campo obrigatório" },
                            pattern: { value: "\d*", errorMessage: "Utilize apenas números" },
                            minLength: { value: 10, errorMessage: 'Número inválido' },
                            maxLength: { value: 17, errorMessage: 'Número inválido' }
                          }} />


                      </Grid>

                      <Grid container justify='center'>

                        <TextField
                          id="standard-select-currency"
                          select

                          label="Curso"
                          value={atleta.Curso}
                          onChange={handleCurso}
                          style={{ width: "90%" }}


                        >
                          {cursos.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>

                      </Grid>

                      <Grid container justify='center'>

                        <TextField
                          id="standard-select-genero"
                          select

                          label="Gênero"
                          value={atleta.genero}
                          onChange={handleGenero}
                          style={{ width: "90%", marginTop: 15 }}

                        >
                          {generos.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>

                      </Grid>

                      <Grid container justify='center'>


                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel component="legend">Modalidades que deseja participar</FormLabel>
                          <FormGroup>
                            {modalidades.map((option) => (
                              <FormControlLabel
                                control={<Checkbox onChange={handleModalidades} name={option} />}
                                label={option}
                              />

                            ))}

                          </FormGroup>
                        </FormControl>

                      </Grid>

                      <Grid item xs={12}  >


                        <Button style={{ backgroundColor: "#DB4922", width: "100%", marginTop: 10 }} variant="contained">Enviar</Button>


                      </Grid>

                    </Grid>

                  </AvForm>

                ) : (


                    <Grid container xs={12} style={{ marginTop: 20 }}>

                      <p className="subtitle2">PROCESSO SELETIVO</p>

                      <p className="subtitle2">Para participar do procecesso seletivo clique no botão abaixo</p>

                      <Button color="primary" style={{ width: "100%", marginTop: 10 }} variant='outlined'> Participar</Button>

                    </Grid>

                  )}


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
    </div >


  );
}
