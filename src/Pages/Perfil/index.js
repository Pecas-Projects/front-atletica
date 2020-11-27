import React, { useState, useEffect } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Grid, Paper, Button, Checkbox, FormGroup, FormLabel } from "@material-ui/core";
import Navbar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
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
import ApiService from '../../variables/ApiService'
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

export default function Perfil(props) {

  const cursos = ["Engenharia da computação", "Análise de sistemas", "Engenharia de software", "Tecnologia da informação"]

  const modalidades = [
    "Futebol", "Vôlei", "Basquete", "Atletismo", "Futsal", "Vôlei de Praia", "Natação",
  ]

  const generos = [
    "Feminino", "Masculino", "Misto"
  ]

  const classes = useStyles();

  const [opcao, setOpcao] = useState('Atleta')
  const [capa, setCapa] = useState("https://lh3.googleusercontent.com/proxy/s1Yj8lBK43z3VjbJD0ttWFnaMdKPl1XTfPK4iygPSVYlOZGAVl-T6rFBvNU_wbfOjilcyHXiWuTH8nWs5a6n6TLCM1-s11F2SuWpZtHd3IhbrY9LWJ-H4E2uGWp7jaREdw")
  const [perfil, setPerfil] = useState("https://lh3.googleusercontent.com/proxy/s1Yj8lBK43z3VjbJD0ttWFnaMdKPl1XTfPK4iygPSVYlOZGAVl-T6rFBvNU_wbfOjilcyHXiWuTH8nWs5a6n6TLCM1-s11F2SuWpZtHd3IhbrY9LWJ-H4E2uGWp7jaREdw")

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

  const [atletica, setAtletica] = useState({
    atleticaId: 0,
    nome: "",
    email: "",
    username: "",
    descricao: "",
    pin: "",
    telefone: "",
    linkProsel: "",
    atleticaImagens: [],
    campus: {
      cidade: "",
      bairro: "",
      rua: "",
      estado: "",
      cep: "",
      nome: "",
      complemento: "",
      faculdade: {
        nome: ""
      }
    },
    membros: []
  })

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

  const concatenaEndereco = () => {

    let endereco = ""

    if (atletica.campus.faculdade.nome)
      endereco += atletica.campus.faculdade.nome + ", "
    if (atletica.campus.nome)
      endereco += atletica.campus.nome + ", "
    if (atletica.campus.bairro)
      endereco += atletica.campus.bairro + ", "
    if (atletica.campus.rua)
      endereco += atletica.campus.rua + ", "
    if (atletica.campus.complemento)
      endereco += atletica.campus.complemento + ", "
    if (atletica.campus.cidade)
      endereco += atletica.campus.cidade + " - "
    if (atletica.campus.estado)
      endereco += atletica.campus.estado + ". "
    if (atletica.campus.cep)
      endereco += atletica.campus.cep

    return endereco
  }

  const buscaAtleticaPorUsername = async (username) => {
    await ApiService.PesquisaAtleticaPorUsername(username)
      .then((res) => {
        setAtletica(res.data)
        if (res.data.atleticaImagens !== null)
          res.data.atleticaImagens.forEach(img => {
            if (img.tipo === "C")
              setCapa(img.imagem.path)
            else if (img.tipo === "P")
              setPerfil(img.imagem.path)
          });
      }).catch((err) =>
        console.log(err)
      )
  }

  useEffect(() => {
    buscaAtleticaPorUsername(props.match.params.username)
  }, [])

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

                    <img className="imageCapa" src={capa} alt="fotoCapa" />

                  </div>

                  <div className="circle">

                    <Grid style={{ marginTop: 10 }} container justify='center'>

                      <img className='imagePerfil' src={perfil} alt="fotoPerfil" />

                    </Grid>

                  </div>


                  <Grid container justify='center'>

                    <Paper className={classes.paperBackgroud}>

                      <h3 className="MyTitle">{atletica.nome}</h3>
                      <br />
                      <p className='subtitleW' >SOBRE NÒS</p>
                      <p className="subtitle2W">{atletica.descricao}</p>

                    </Paper>

                  </Grid>

                </div>
              </Grid>

              <Paper className={classes.paperA}>

                <h4 className="subtitle">NOSSOS MEMBROS</h4>

                <Grid container spacing={3}>

                  {
                    atletica.membros !== null ?
                      atletica.membros.map((item) =>
                        <CardMembro item={item} />
                      ) : null
                  }


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

                      <p className="subtitle2">EMAIL - {atletica.email}</p>
                      <p className="subtitle2">TELEFONE - {atletica.telefone}</p>
                      <p className="subtitle2">{concatenaEndereco()}</p>

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

                  <img className='imagePerfilMobile' src={perfil} alt="fotoPerfil" />

                </Grid>

                <h3 className="MyTitleMobile">{atletica.nome}</h3>

              </Paper>

              <Paper className={classes.paperBMobile}>

                <p className='subtitleWMobile' >SOBRE NÒS</p>

                <p className="subtitle2W">{atletica.descricao}</p>

              </Paper>

            </Grid>


            <Grid item xs={12}>

              <Paper className={classes.paperAMobile}>

                <h4 className="subtitle">NOSSOS MEMBROS</h4>

                <Grid container spacing={3}>

                  {
                    atletica.membros !== null ?
                      atletica.membros.map((item) =>
                        <CardMembro item={item} />
                      ) : null
                  }


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

                    <p className="subtitle2">EMAIL - {atletica.email}</p>
                    <p className="subtitle2">TELEFONE - {atletica.telefone}</p>
                    <p className="subtitle2">{concatenaEndereco()}</p>

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
