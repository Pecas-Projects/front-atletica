import React, { useState } from 'react';
import NavBar from "../../Components/NavBar"
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Fade, TextField, Checkbox, FormGroup } from "@material-ui/core";
import { AvField, AvForm } from "availity-reactstrap-validation"
import "./styles.css"
import cep from 'cep-promise'
import ImageCadastro from "../../assets/imagem/undraw_digital_nomad.svg"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputMask from 'react-input-mask';
import BotaoUploadImagem from "../../Components/BotaoUploadImagem"
import { Input } from 'reactstrap';
import ProfileUndraw from '../../assets/imagem/undraw_profile.svg'
import ApiService from "../../variables/ApiService"

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
        width: 200
    },
    formControlMobile: {
        margin: theme.spacing(1),
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    chip: {
        margin: theme.spacing(0.5),
    },

}));

export default function Cadastro() {

    const cursos = ["curso1", "curso2", "curso3", "curso4", "engenharia", "medicina", "Biologia", "matemática"];

    const classes = useStyles();

    const [showMembro, setShowMembro] = useState(true)
    const [showAtletica, setShowAtletica] = useState(false)
    const [opcao, setOpcao] = useState('Membro')

    const [imagemPerfil, setImagemPerfil] = useState(null);
    const [pathPerfil, setPathPerfil] = useState();

    const [cepcp, setCepcp] = useState('');
    const [street, setStreet] = useState('');
    const [neighbourhood, setNeighbourhood] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [nomeCampus, setNomeCampus] = useState('');
    const [senhaAtletica, setSenhaAtletica] = useState('')


    const [atletica, setAtletica] = useState({
        Nome: "",
        Email: "",
        faculdade: "Faculdade Braba",
        cursos: []
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


    const handleAtleticaNome = (event) => {
        setAtletica({ ...atletica, Nome: event.target.value });
    };

    const handleAtleticaEmail = (event) => {
        setAtletica({ ...atletica, Email: event.target.value });
    };

    const handleAtleticaSenha = (event) => {
        setSenhaAtletica(event.target.value)
    };

    const handleAtleticaFaculdade = (event) => {
        setAtletica({ ...atletica, faculdade: event.target.value });
    };

    const handleAtleticaCursos = (e) => {

        if (atletica.cursos.indexOf(e.target.name) === -1) {

            atletica.cursos.push(e.target.name)
        }
        else {

            var aux = atletica.cursos.filter(function (nome) { return nome !== e.target.name })

            atletica.cursos = aux;
        }

        console.log(atletica.cursos)
    };


    const handleMembroNome = (event) => {
        setMembro({ ...membro, Nome: event.target.value });
    };

    const handleMembroSobrenome = (event) => {
        setMembro({ ...membro, Sobrenome: event.target.value });
    };

    const handleMembroEmail = (event) => {
        setMembro({ ...membro, Email: event.target.value });
    };

    const handleMembroTelefone = (event) => {
        setMembro({ ...membro, Telefone: event.target.value });
    };

    const handleMembroPIN = (event) => {
        setMembro({ ...membro, Pin: event.target.value });
    };

    const handleMembroSenha = (event) => {
        setMembro({ ...membro, Senha: event.target.value });
    };

    const handleMembroAtletica = (event) => {
        setMembro({ ...membro, Atletica: event.target.value });
    };

    const handleFormChange = (e) => {
        setOpcao(e.target.value)
        setShowMembro((prev) => !prev)
        setShowAtletica((prev) => !prev)
        console.log(showAtletica)
    }

    const handleCepChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setCepcp(value);
        if (value.length === 8) {
            cep(value)
                .then(function (endereco) {
                    setCity(endereco.city);
                    setStreet(endereco.street);
                    setNeighbourhood(endereco.neighborhood);
                    setState(endereco.state);
                });
        }
    };

    const handleNomeCampusChange = (e) => {
        e.preventDefault();
        setNomeCampus(e.target.value);
    };

    const handleChangeNumber = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
    };

    function showAdicionarImagemPerfil() {
        if (imagemPerfil === null) {
            return <p>Adicione sua foto de perfil</p>
        } else return <div><br /><br /></div>;
    }


    const onFormSubmit = async (e) => {
        e.preventDefault();

        let Atletica = {
            Nome: atletica.Nome,
            Email: atletica.Email,
            senha: senhaAtletica,
            Descricao: " ",
            CursosIds: [1],
            Campus: {
                Cidade: city,
                Bairro: neighbourhood,
                Rua: street,
                Estado: state,
                CEP: cepcp,
                Nome: "Cimatreco",
                Faculdade: {
                    Nome: "Seiani Cimatec"
                }

            }
        }

        console.log(Atletica)
        console.log(typeof (Atletica))


        ApiService.CadastroAtletica(Atletica)

            .then(res => {
                console.log("01")
                console.log(res)
            })
            .catch(error => {
                console.log("02")
                console.log(error)
            })

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
                                                <RadioGroup row aria-label="gender" name="gender1" value={opcao} onChange={handleFormChange} >
                                                    <FormControlLabel value="Membro" control={<Radio />} label="Membro" />
                                                    <FormControlLabel value="Atletica" control={<Radio />} label="Atlética" />

                                                </RadioGroup>
                                            </FormControl>

                                        </Grid>

                                        <Grid item xs={12} >

                                            {showMembro ? (

                                                <Fade in={showMembro}>

                                                    <AvForm>

                                                        <AvField onChange={handleMembroEmail} name="email" label="E-mail" type="text" validate={{
                                                            required: { value: true, errorMessage: "Campo obrigatório" },
                                                            pattern: { value: '^[A-Za-z0-9]+$', errorMessage: "E-mail inválido" },
                                                            minLength: { value: 10, errorMessage: "E-mail muito pequeno" },

                                                        }} />

                                                        <AvField name="nome" onChange={handleMembroNome} label="Nome" type="text" validate={{
                                                            required: { value: true, errorMessage: "Campo obrigatório" },
                                                            pattern: { value: '[A-Za-z]', errorMessage: "Utilize apenas letras" },
                                                            minLength: { value: 2, errorMessage: "Nome muito pequeno" },
                                                            maxLength: { value: 20, errorMessage: "Nome muito grande" }

                                                        }} />

                                                        <AvField onChange={handleMembroSobrenome} name="sobrenome" label="Sobrenome" type="text" validate={{
                                                            required: { value: true, errorMessage: "Campo obrigatório" },
                                                            pattern: { value: '[A-Za-z]', errorMessage: "Utilize apenas letras" },
                                                            minLength: { value: 2, errorMessage: "Sobremome muito pequeno" },
                                                            maxLength: { value: 20, errorMessage: "Sobrenome muito grande" }

                                                        }} />
                                                        <AvField onChange={handleMembroTelefone} name="telefone" label="Telefone" type="text" mask="(99) 99999-9999"
                                                            tag={[Input, InputMask]} validate={{
                                                                required: { value: true, errorMessage: "Campo obrigatório" }
                                                            }} />

                                                        <AvField name="senha" label="Senha" type="password" validate={{
                                                            required: { value: true, errorMessage: "Campo obrigatório" },
                                                            minLength: { value: 6, errorMessage: "A senha precisa ter no mínimo 6 caracteres" },

                                                        }} />
                                                        <AvField onChange={handleMembroSenha} name="ConfirmarSenha" label="Confirme sua senha" type="password" validate={{
                                                            required: { value: true, errorMessage: "Campo obrigatório" },
                                                            match: { value: "senha", errorMessage: "Senhas diferentes" }

                                                        }} />

                                                        <AvField onChange={handleMembroPIN} name="pin" label="PIN da sua Atlética" type="password" validate={{
                                                            required: { value: true, errorMessage: "Campo obrigatório" },


                                                        }} />





                                                        <Grid container spacing={1}>
                                                            <Grid item xs={6}>
                                                                {showAdicionarImagemPerfil()}
                                                                <Paper style={{ backgroundColor: "#636363", width: 250 }}>
                                                                    <Grid
                                                                        container
                                                                        justify="center"
                                                                        alignContent="center"
                                                                        style={{ height: 250, marginTop: -7 }}
                                                                    >
                                                                        <BotaoUploadImagem setPath={setPathPerfil} setImagem={setImagemPerfil} imagem={imagemPerfil} path={pathPerfil} />

                                                                    </Grid>
                                                                </Paper>
                                                            </Grid>

                                                            <Grid item xs={6}>

                                                                <img style={{ width: 200, marginTop: 50, marginLeft: 20 }} alt='undraw_profile' src={ProfileUndraw} />

                                                            </Grid>

                                                        </Grid>


                                                        <br />

                                                        <Grid container spacing={1}>
                                                            <Grid item xs={6}>

                                                                <FormControl className={classes.formControl}>
                                                                    <InputLabel id="demo-simple-select-outlined-label">Atlética</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-outlined-label"
                                                                        id="demo-simple-select-outlined"
                                                                        value={membro.Atletica}
                                                                        onChange={handleMembroAtletica}
                                                                        label="Atleticas"
                                                                    >

                                                                        <MenuItem value={"Cimatlética"}>Cimatlética</MenuItem>
                                                                        <MenuItem value={"Atlética Bahiana de Medicina"} >Atlética Bahiana de Medicina</MenuItem>
                                                                        <MenuItem value={"Atlética PoliUFBA"}>Atlética PoliUFBA</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>


                                                            <Grid item xs={6}>
                                                                <Button type='submit' style={{ width: 230, marginTop: 20 }} variant="contained" color="secondary">cadastrar</Button>
                                                            </Grid>

                                                        </Grid>
                                                    </AvForm>

                                                </Fade>

                                            ) : (

                                                    <Fade in={showAtletica}>


                                                        <AvForm onValidSubmit={onFormSubmit}>
                                                            <AvField onChange={handleAtleticaEmail} name="email" label="E-mail" type="text" validate={{
                                                                required: { value: true, errorMessage: "Campo obrigatório" },
                                                                minLength: { value: 10, errorMessage: "E-mail muito pequeno" },

                                                            }} />

                                                            <AvField onChange={handleAtleticaNome} name="nome" label="Nome" type="text" validate={{
                                                                required: { value: true, errorMessage: "Campo obrigatório" },
                                                                pattern: { value: '[A-Za-z]', errorMessage: "Utilize apenas letras" },
                                                                minLength: { value: 2, errorMessage: "Nome muito pequeno" },
                                                                maxLength: { value: 20, errorMessage: "Nome muito grande" }

                                                            }} />

                                                            <TextField
                                                                fullWidth
                                                                id="standard-select-coordenador"
                                                                select
                                                                label="Faculdade"
                                                                style={{ marginBottom: 20 }}
                                                                // value={coordenador}
                                                                onChange={handleAtleticaFaculdade}
                                                            >
                                                                {/* {membros.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.value}
                                                                    </MenuItem>
                                                                ))} */}
                                                            </TextField>

                                                            <p className='subtitle2'>Cursos presentes na sua atlética</p>


                                                            <div className='scroll'>

                                                                <FormControl component="fieldset" className={classes.formControl}>

                                                                    <FormGroup>
                                                                        {cursos.map((option) => (
                                                                            <FormControlLabel
                                                                                control={<Checkbox onChange={handleAtleticaCursos} name={option} />}
                                                                                label={option}
                                                                            />

                                                                        ))}

                                                                    </FormGroup>
                                                                </FormControl>


                                                            </div>

                                                            <p className="MySubtitle">Endereço</p>
                                                            <p className="MySubtitle2">O campus que sua atlética está sediada</p>

                                                            <Grid container spacing={1}>

                                                                <Grid item xs={12} >

                                                                    <AvField data-cy='cep-input' value={cepcp} onChange={handleCepChange} name="cep" label="CEP" type="text"
                                                                        placeholder="00000000" validate={{
                                                                            required: { value: true, errorMessage: "Campo obrigatório" },
                                                                            pattern: { value: '[0-9]', errorMessage: "Use apenas números" },
                                                                            minLength: { value: 8, errorMessage: "CEP inválido" },
                                                                            maxLength: { value: 8, errorMessage: "CEP inválido" }

                                                                        }} />

                                                                </Grid>


                                                                <Grid item xs={6} >

                                                                    <AvField value={state} name="estado" label="Estado" type="text" />

                                                                </Grid>

                                                                <Grid item xs={6}>

                                                                    <AvField value={city} name="cidade" label="Cidade" type="text" />

                                                                </Grid>

                                                                <Grid item xs={6}>

                                                                    <AvField value={neighbourhood} name="bairro" label="Bairro" type="text" />

                                                                </Grid>

                                                                <Grid item xs={6}>

                                                                    <AvField value={street} name="rua" label="Rua" type="text" />

                                                                </Grid>

                                                                <Grid item xs={12} style={{ marginBottom: 20 }}>

                                                                    <AvField value={nomeCampus} label="Nome do Campus" name="complemento" type="text" onChange={handleNomeCampusChange}
                                                                        validate={{
                                                                            maxLength: { value: 255, errorMessage: "Muito grande" }
                                                                        }} />

                                                                </Grid>

                                                            </Grid>

                                                            <Grid item xs={12}>

                                                                <AvField name="SENHA" label="Senha" type="password" validate={{
                                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                                    pattern: { value: '^[A-Za-z0-9]+$', errorMessage: "Senha inválida" },
                                                                    minLength: { value: 6, errorMessage: "Senha fraca" },

                                                                }} />

                                                            </Grid>

                                                            <Grid item xs={12}>

                                                                <AvField name="Confirmada" value={atletica.Senha} onChange={handleAtleticaSenha} label="Confirme sua senha" type="password" validate={{
                                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                                    pattern: { value: '^[A-Za-z0-9]+$', errorMessage: "Senha inválida" },
                                                                    match: { value: 'SENHA', errorMessage: "Senhas diferentes" }
                                                                }} />

                                                            </Grid>
                                                            <Grid item xs={12}>

                                                                <Button type='submit' style={{ width: "100%", marginTop: 20 }} variant="contained" color="secondary">cadastrar</Button>
                                                            </Grid>

                                                        </AvForm>



                                                    </Fade>

                                                )}




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
                                <h1 className="MyTitle">CADASTRE-SE</h1>

                                <Grid item xs={12} style={{ marginTop: 20 }}>

                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Como:</FormLabel>
                                        <RadioGroup row aria-label="gender" name="gender1" value={opcao} onChange={handleFormChange} >
                                            <FormControlLabel value="Membro" control={<Radio />} label="Membro" />
                                            <FormControlLabel value="Atletica" control={<Radio />} label="Atlética" />

                                        </RadioGroup>
                                    </FormControl>

                                </Grid>

                                <Grid item xs={12} >

                                    {showMembro ? (

                                        <Fade in={showMembro}>

                                            <AvForm>

                                                <AvField onChange={handleMembroEmail} name="email" label="E-mail" type="text" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    pattern: { value: '^[A-Za-z0-9]+$', errorMessage: "E-mail inválido" },
                                                    minLength: { value: 10, errorMessage: "E-mail muito pequeno" },

                                                }} />

                                                <AvField name="nome" onChange={handleMembroNome} label="Nome" type="text" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    pattern: { value: '[A-Za-z]', errorMessage: "Utilize apenas letras" },
                                                    minLength: { value: 2, errorMessage: "Nome muito pequeno" },
                                                    maxLength: { value: 20, errorMessage: "Nome muito grande" }

                                                }} />

                                                <AvField onChange={handleMembroSobrenome} name="sobrenome" label="Sobrenome" type="text" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    pattern: { value: '[A-Za-z]', errorMessage: "Utilize apenas letras" },
                                                    minLength: { value: 2, errorMessage: "Sobremome muito pequeno" },
                                                    maxLength: { value: 20, errorMessage: "Sobrenome muito grande" }

                                                }} />
                                                <AvField onChange={handleMembroTelefone} name="telefone" label="Telefone" type="text" mask="(99) 99999-9999"
                                                    tag={[Input, InputMask]} validate={{
                                                        required: { value: true, errorMessage: "Campo obrigatório" }
                                                    }} />

                                                <AvField name="senha" label="Senha" type="password" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    minLength: { value: 6, errorMessage: "A senha precisa ter no mínimo 6 caracteres" },

                                                }} />
                                                <AvField onChange={handleMembroSenha} name="ConfirmarSenha" label="Confirme sua senha" type="password" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    match: { value: "senha", errorMessage: "Senhas diferentes" }

                                                }} />

                                                <AvField onChange={handleMembroPIN} name="pin" label="PIN da sua Atlética" type="password" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },


                                                }} />



                                                <Grid container spacing={1}>

                                                    <Grid item xs={12}>

                                                        <FormControl className={classes.formControlMobile}>
                                                            <InputLabel id="demo-simple-select-outlined-label">Atlética</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                value={membro.Atletica}
                                                                onChange={handleMembroAtletica}
                                                                label="Age"
                                                            >

                                                                <MenuItem value={"Cimatlética"}>Cimatlética</MenuItem>
                                                                <MenuItem value={"Atlética Bahiana de Medicina"} >Atlética Bahiana de Medicina</MenuItem>
                                                                <MenuItem value={"Atlética PoliUFBA"}>Atlética PoliUFBA</MenuItem>
                                                            </Select>
                                                        </FormControl>

                                                    </Grid>

                                                    <Grid item xs={12}>

                                                        <Button type='submit' style={{ width: "100%", marginTop: 20 }} variant="contained" color="secondary">cadastrar</Button>
                                                    </Grid>
                                                </Grid>
                                            </AvForm>

                                        </Fade>

                                    ) : (

                                            <Fade in={showAtletica}>


                                                <AvForm>
                                                    <AvField onChange={handleAtleticaEmail} name="email" label="E-mail" type="text" validate={{
                                                        required: { value: true, errorMessage: "Campo obrigatório" },
                                                        pattern: { value: '^[A-Za-z0-9]+$', errorMessage: "E-mail inválido" },
                                                        minLength: { value: 10, errorMessage: "E-mail muito pequeno" },

                                                    }} />

                                                    <AvField onChange={handleAtleticaNome} name="nome" label="Nome" type="text" validate={{
                                                        required: { value: true, errorMessage: "Campo obrigatório" },
                                                        pattern: { value: '[A-Za-z]', errorMessage: "Utilize apenas letras" },
                                                        minLength: { value: 2, errorMessage: "Nome muito pequeno" },
                                                        maxLength: { value: 20, errorMessage: "Nome muito grande" }

                                                    }} />

                                                    <TextField
                                                        fullWidth
                                                        id="standard-select-coordenador"
                                                        select
                                                        label="Faculdade"
                                                        style={{ marginBottom: 20 }}
                                                        // value={coordenador}
                                                        onChange={handleAtleticaFaculdade}
                                                    >
                                                        {/* {membros.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.value}
                                                                    </MenuItem>
                                                                ))} */}
                                                    </TextField>

                                                    <p className='subtitle2'>Cursos presentes na sua atlética</p>


                                                    <div className='scroll'>

                                                        <FormControl component="fieldset" className={classes.formControl}>

                                                            <FormGroup>
                                                                {cursos.map((option) => (
                                                                    <FormControlLabel
                                                                        control={<Checkbox onChange={handleAtleticaCursos} name={option} />}
                                                                        label={option}
                                                                    />

                                                                ))}

                                                            </FormGroup>
                                                        </FormControl>


                                                    </div>

                                                    <Grid item xs={12} >

                                                        <AvField data-cy='cep-input' value={cepcp} onChange={handleCepChange} name="cep" label="CEP" type="text"
                                                            placeholder="00000000" validate={{
                                                                required: { value: true, errorMessage: "Campo obrigatório" },
                                                                pattern: { value: '[0-9]', errorMessage: "Use apenas números" },
                                                                minLength: { value: 8, errorMessage: "CEP inválido" },
                                                                maxLength: { value: 8, errorMessage: "CEP inválido" }

                                                            }} />

                                                    </Grid>


                                                    <Grid item xs={12} >

                                                        <AvField value={state} name="estado" label="Estado" type="text" />

                                                    </Grid>

                                                    <Grid item xs={12}>

                                                        <AvField value={city} name="cidade" label="Cidade" type="text" />

                                                    </Grid>

                                                    <Grid item xs={12}>

                                                        <AvField value={neighbourhood} name="bairro" label="Bairro" type="text" />

                                                    </Grid>

                                                    <Grid item xs={12}>

                                                        <AvField value={street} name="rua" label="Rua" type="text" />

                                                    </Grid>

                                                    <Grid item xs={12} style={{ marginBottom: 20 }}>

                                                        <AvField value={nomeCampus} label="Nome do campus" name="nomeCampus" type="text" onChange={handleNomeCampusChange}
                                                            validate={{
                                                                maxLength: { value: 255, errorMessage: "Muito grande" }

                                                            }} />

                                                    </Grid>


                                                    <AvField name="senha" label="Senha" type="password" validate={{
                                                        required: { value: true, errorMessage: "Campo obrigatório" },
                                                        minLength: { value: 6, errorMessage: "A senha precisa ter no mínimo 6 caracteres" },

                                                    }} />
                                                    <AvField onChange={handleAtleticaSenha} name="ConfirmarSenha" label="Confirme sua senha" type="password" validate={{
                                                        required: { value: true, errorMessage: "Campo obrigatório" },
                                                        match: { value: "senha", errorMessage: "Senhas diferentes" }

                                                    }} />

                                                    <Grid item xs={12}>

                                                        <Button type='submit' style={{ width: "100%", marginTop: 20 }} variant="contained" color="secondary">cadastrar</Button>
                                                    </Grid>

                                                </AvForm>



                                            </Fade>

                                        )}




                                </Grid>




                            </Paper>


                        </Grid>
                    </Grid>

                </div>


            </main >
        </div >


    );
}