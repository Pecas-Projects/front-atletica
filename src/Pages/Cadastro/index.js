import React, { useState } from 'react';
import NavBar from "../../Components/NavBar"
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Fade } from "@material-ui/core";
import { AvField, AvForm } from "availity-reactstrap-validation"
import "./styles.css"
import ImageCadastro from "../../assets/imagem/undraw_digital_nomad.svg"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
// import fotoPublicacao from "../../assets/imagem/image 6.svg"


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
        padding: "4%",
        backgroundColor: "#BBB8CC"
    },
    paperAMobile: {
        width: "100%",
        marginTop: -10,
        padding: "5%",
        backgroundColor: "#BBB8CC"
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        maxWidth: 200
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}));

export default function Cadastro() {

    const classes = useStyles();

    const [showMembro, setShowMembro] = useState(true)
    const [showAtletica, setShowAtletica] = useState(false)
    const [opcao, setOpcao] = useState('Membro')

    const [atletica, setAtletica] = useState({
        Nome: "",
        Email: "",
        Senha: ""
    });

    const [membro, setMembro] = useState({
        Nome: "",
        Sobrenome: "",
        Email: "",
        Telefone: "",
        Senha: "",
        Pin: "",
        Atletica: ""
    })


    const handleChange = (event) => {
        setAtletica(event.target.value);
    };

    const handleFormChange = (e) => {
        setAtletica(true)
        setMembro(false)
        setOpcao(e.target.value)
    }

    return (

        <div className={classes.root}>
            <NavBar />

            <main className={classes.content}>
                <div className={classes.toolbar} />

                {/*
    
    
    
                 DESKTOP
    
    
    
                */}

                <div className={classes.sectionDesktop}>

                    <Grid container >

                        <Grid item xs={12}>

                            <Grid container justify="center">

                                <Grid item xs={6}>

                                    <Grid container justify="center">

                                        <img style={{ width: "60%" }} src={ImageCadastro} alt="undraw_digital_nomad" />

                                    </Grid>
                                </Grid>

                                <Grid item xs={6}>

                                    <Paper className={classes.paperA}>

                                        <h1 className="MyTitle">CADASTRE-SE</h1>

                                        <Grid item xs={12} style={{ marginTop: 20 }}>

                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Como:</FormLabel>
                                                <RadioGroup row aria-label="gender" name="gender1" onChange={handleFormChange} >
                                                    <FormControlLabel value="Membro" control={<Radio />} label="Membro" />
                                                    <FormControlLabel value="Atletica" control={<Radio />} label="Atlética" />

                                                </RadioGroup>
                                            </FormControl>

                                        </Grid>

                                        <Grid item xs={12}>

                                            <AvForm>

                                                <AvField name="email" label="E-mail" type="text" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    pattern: { value: '^[A-Za-z0-9]+$', errorMessage: "E-mail inválido" },
                                                    minLength: { value: 10, errorMessage: "E-mail muito pequeno" },

                                                }} />

                                                <AvField name="nome" label="Nome" type="text" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    pattern: { value: '[A-Za-z]', errorMessage: "Utilize apenas letras" },
                                                    minLength: { value: 2, errorMessage: "Nome muito pequeno" },
                                                    maxLength: { value: 20, errorMessage: "Nome muito grande" }

                                                }} />

                                                <AvField name="sobrenome" label="Sobrenome" type="text" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    pattern: { value: '[A-Za-z]', errorMessage: "Utilize apenas letras" },
                                                    minLength: { value: 2, errorMessage: "Sobremome muito pequeno" },
                                                    maxLength: { value: 20, errorMessage: "Sobrenome muito grande" }

                                                }} />
                                                <AvField name="telefone" label="Telefone" type="text" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },

                                                }} />
                                                <AvField name="senha" label="Senha" type="password" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    minLength: { value: 6, errorMessage: "A senha precisa ter no mínimo 6 caracteres" },

                                                }} />
                                                <AvField name="ConfirmarSenha" label="Confirme sua senha" type="password" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    match: { value: "senha", errorMessage: "Senhas diferentes" }

                                                }} />

                                                <AvField name="pin" label="PIN da sua Atlética" type="password" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },


                                                }} />

                                                <Grid container spacing={1}>

                                                    <Grid item xs={6}>

                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel id="demo-simple-select-outlined-label">Atlética</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                value={atletica}
                                                                onChange={handleChange}
                                                                label="Age"
                                                            >

                                                                <MenuItem value={"Cimatlética"}>Cimatlética</MenuItem>
                                                                <MenuItem value={"Atlética Bahiana de Medicina"} >Atlética Bahiana de Medicina</MenuItem>
                                                                <MenuItem value={"Atlética PoliUFBA"}>Atlética PoliUFBA</MenuItem>
                                                            </Select>
                                                        </FormControl>

                                                    </Grid>

                                                    <Grid item xs={6}>

                                                        <Button style={{ width: 230, marginTop: 20 }} variant="contained" color="secondary">cadastrar</Button>
                                                    </Grid>
                                                </Grid>
                                            </AvForm>

                                        </Grid>


                                    </Paper>


                                </Grid>

                            </Grid>

                        </Grid>


                    </Grid>

                </div>

                {/* 




            MOBILE




                */}

                <div className={classes.sectionMobile}>


                    <Grid container  >

                        <Grid item xs={12} >

                            <Paper className={classes.paperAMobile}>
                                <h1 className="MyTitle">Login</h1>



                            </Paper>


                        </Grid>
                    </Grid>

                </div>


            </main >
        </div >


    );
}