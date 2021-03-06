import React, { useState, useEffect } from 'react';
import NavBar from "../../Components/NavBar"
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Fade, TextField, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { AvField, AvForm } from "availity-reactstrap-validation"
import "./styles.css"
import cep from 'cep-promise'
import ImageCadastro from "../../assets/imagem/undraw_digital_nomad.svg"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputMask from 'react-input-mask';
import BotaoUploadImagem from "../../Components/BotaoUploadImagem"
import { Input } from 'reactstrap';
import ProfileUndraw from '../../assets/imagem/undraw_profile.svg'
import ApiService from "../../variables/ApiService"
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
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

    const [cursos, setCursos] = useState([]);
    const generos = [
        "Feminino", "Masculino", "Outro"
    ]

    const classes = useStyles();

    const [showMembro, setShowMembro] = useState(true)
    const [showAtletica, setShowAtletica] = useState(false)
    const [opcao, setOpcao] = useState('Membro')
    const [openCadastrado, setOpenCadastrado] = useState(false)
    const [openErro, setOpenErro] = useState(false)

    const [imagemPerfil, setImagemPerfil] = useState(null);
    const [pathPerfil, setPathPerfil] = useState();

    const [cepcp, setCepcp] = useState('');
    const [street, setStreet] = useState('');
    const [neighbourhood, setNeighbourhood] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');

    const [nomeCampus, setNomeCampus] = useState('');
    const [nomeFaculdade, setNomeFaculdade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [senhaAtletica, setSenhaAtletica] = useState('')

    const [cursosIds, setCursosIds] = useState([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && cursos.length === 0;

    const [cursosMembro, setCursosMembro] = useState([]);
    const [cursoMembroId, setCursoIdMembro] = useState([]);
    const [imagemId, setImagemId] = useState();

    const [nomeAtletica, setNomeAtletica] = useState('');


    const [atletica, setAtletica] = useState({
        //Nome: "",
        Email: "",
        faculdade: "",
        Username: "",
        cursos: []
    });

    const [membro, setMembro] = useState({
        Nome: "",
        Sobrenome: "",
        Email: "",
        Telefone: "",
        Senha: "",
        Pin: "",
        Curso: "",
        Genero: "",
        ImagemId: null
    });


    const handleAtleticaNome = (event) => {
        //setAtletica({ ...atletica, Nome: event.target.value });
        setNomeAtletica(event.target.value);
    };

    const handleAtleticaUsername = (event) => {
        console.log(event.target.value)
        setAtletica({ ...atletica, Username: event.target.value });
    };

    const handleAtleticaEmail = (event) => {
        setAtletica({ ...atletica, Email: event.target.value });
    };

    const handleAtleticaSenha = (event) => {
        setSenhaAtletica(event.target.value)
    };


    const handleAtleticaComplemento = (event) => {
        //setComplemento({ ...atletica, Complemento: event.target.value });
        setComplemento(event.target.value)
    };



    const handleChangeAtleticaCursos = (event) => {
        var cursosAux = []

        event.map(function (curso) {
            cursosAux.push(curso.cursoId)
        });
        //setAtletica({ ...atletica, cursos: cursosAux });
        setCursosIds(cursosAux);
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

    const handleCloseCadastrado = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenCadastrado(false);
    };

    const handleCloseErro = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenErro(false);
    };

    const handleMembroCurso = (event) => {

        console.log(event.target.value)
        setCursoIdMembro(event.target.value)
    };

    const handleMembroGenero = (event) => {
        if (event.target.value === "Masculino") setMembro({ ...membro, Genero: 'M' });
        if (event.target.value === "Feminino") setMembro({ ...membro, Genero: 'F' });
        if (event.target.value === "Outro") setMembro({ ...membro, Genero: 'I' });

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
        console.log(e.target.value)
        setNomeCampus(e.target.value);
    };


    const handleNomeFaculdadeChange = (e) => {
        e.preventDefault();
        setNomeFaculdade(e.target.value);
    };


    function showAdicionarImagemMembro() {
        if (imagemPerfil === null) {
            return <p>Adicione sua foto de perfil</p>
        } else return <div><br /><br /></div>;
    }

    async function getCursosMembro() {
        await ApiService.GetTodosCurso().then((res) => {
            console.log(res);
            setCursosMembro(res.data);
        });
    }

    useEffect(() => {
        getCursosMembro()
    }, []);

    useEffect(() => {
        if (!open) {
            setCursos([]);
        }
    }, [open]);

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await ApiService.GetTodosCurso();
            await sleep(1e3); // For demo purposes.

            if (active) {
                setCursos(response.data);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    async function envioImagem() {
        let file = new FormData();
        file.append('value', imagemPerfil);

        await ApiService.UploadImagem(file)
            .then((res) => {
                console.log(res)
                setImagemId(res.data.imagemId)
            })
            .catch((error) => {
                console.log(error)
            });
    }


    const onFormSubmit = async (e) => {
        e.preventDefault();

        let Atletica = {
            Nome: nomeAtletica,
            Email: atletica.Email,
            senha: senhaAtletica,
            Username: atletica.Username,
            Descricao: " ",
            CursosIds: cursosIds,
            Campus: {
                Cidade: city,
                Bairro: neighbourhood,
                Rua: street,
                Estado: state,
                CEP: cepcp,
                Nome: nomeCampus,
                Complemento: complemento,
                Faculdade: {
                    Nome: nomeFaculdade
                }

            }
        }

        console.log(Atletica)
        console.log(typeof (Atletica))


        await ApiService.CadastroAtletica(Atletica)

            .then(res => {
                setOpenCadastrado(true)
                setTimeout(function () { window.location.href = '/login' }, 3000)
            })
            .catch(error => {
                setOpenErro(true)

            })

    }

    useEffect(() => {

        const onFormSubmitMembro = async () => {

            let Membro = {
                senha: membro.Senha,
                pessoa: {
                    nome: membro.Nome,
                    sobrenome: membro.Sobrenome,
                    email: membro.Email,
                    whatsapp: membro.Telefone,
                    tipo: "M",
                    genero: membro.Genero,
                    cursoId: cursoMembroId
                },
                ImagemId: imagemId
            }

            console.log(Membro)

            await ApiService.CadastroMembro(Membro, membro.Pin)
                .then(res => {
                    setOpenCadastrado(true)
                    setTimeout(function () { window.location.href = '/login' }, 3000)

                })
                .catch(error => {
                    if (error.status !== 200) {
                        setOpenErro(true)

                    }

                })
        }
        if (imagemId !== null && imagemId !== undefined) {

            onFormSubmitMembro();
        }

    }, [imagemId]);


    return (
        <>

            <Snackbar
                open={openCadastrado}
                autoHideDuration={4000}
                onClose={handleCloseCadastrado}
            >
                <Alert onClose={handleCloseCadastrado} severity="success">
                    Usuário cadastrado com sucesso, faça login para começar a explorar o sistema!
        </Alert>
            </Snackbar>

            <Snackbar
                open={openErro}
                autoHideDuration={4000}
                onClose={handleCloseErro}
            >
                <Alert onClose={handleCloseErro} severity="error">
                    Ocorreu um erro ao cadastrar o usuário, revise os dados e tente novamente
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

                                            <h1 className="MyTitleC">CADASTRE-SE</h1>

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
                                                                minLength: { value: 6, errorMessage: "E-mail muito pequeno" },

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


                                                            <AvField onChange={handleMembroPIN} name="pin" label="PIN da sua Atlética" type="password" validate={{
                                                                required: { value: true, errorMessage: "Campo obrigatório" },


                                                            }} />

                                                            <TextField
                                                                id="standard-select-curso"
                                                                select
                                                                fullWidth
                                                                label="Curso"
                                                                value={membro.cursoId}
                                                                onChange={handleMembroCurso}
                                                                style={{ marginTop: 15, marginBottom: 20 }}

                                                            >
                                                                {cursosMembro.map((option) => (
                                                                    <MenuItem key={option.nome} value={option.cursoId}>
                                                                        {option.nome}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>


                                                            <TextField
                                                                id="standard-select-genero"
                                                                select
                                                                fullWidth
                                                                label="Gênero"
                                                                value={membro.genero}
                                                                onChange={handleMembroGenero}
                                                                style={{ marginTop: 15, marginBottom: 20 }}

                                                            >
                                                                {generos.map((option) => (
                                                                    <MenuItem key={option} value={option}>
                                                                        {option}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>

                                                            <Grid container spacing={1}>
                                                                <Grid item xs={6}>
                                                                    {showAdicionarImagemMembro()}
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

                                                            <AvField name="senha" label="Senha" type="password" validate={{
                                                                required: { value: true, errorMessage: "Campo obrigatório" },
                                                                minLength: { value: 6, errorMessage: "A senha precisa ter no mínimo 6 caracteres" },

                                                            }} />
                                                            <AvField onChange={handleMembroSenha} name="ConfirmarSenha" label="Confirme sua senha" type="password" validate={{
                                                                required: { value: true, errorMessage: "Campo obrigatório" },
                                                                match: { value: "senha", errorMessage: "Senhas diferentes" }

                                                            }} />




                                                            <Grid item xs={12}>
                                                                <Button fullWidth style={{ marginTop: 20 }}
                                                                    variant="contained" color="secondary" onClick={envioImagem}>cadastrar</Button>
                                                            </Grid>

                                                            {/* </Grid> */}
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

                                                                <AvField onChange={handleAtleticaUsername} name="Username" label="Username" type="text" validate={{
                                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                                    minLength: { value: 2, errorMessage: "Nome muito pequeno" },
                                                                    maxLength: { value: 20, errorMessage: "Nome muito grande" }

                                                                }} />

                                                                {/* <TextField
                                                                fullWidth
                                                                id="standard-select-coordenador"
                                                                select
                                                                label="Faculdade"
                                                                style={{ marginBottom: 20 }}
                                                                // value={coordenador}
                                                                onChange={handleAtleticaFaculdade}
                                                            >
                                                                {membros.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.value}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField> */}
                                                                <AvField label="Faculdade" name="faculdade" type="text" onChange={handleNomeFaculdadeChange}
                                                                    validate={{ maxLength: { value: 255, errorMessage: "Muito grande" } }} />

                                                                <p className='subtitle2'>Cursos presentes na sua atlética</p>

                                                                <Autocomplete
                                                                    id="asynchronous-demo"
                                                                    multiple
                                                                    fullWidth
                                                                    open={open}
                                                                    onOpen={() => {
                                                                        setOpen(true);
                                                                    }}
                                                                    onClose={() => {
                                                                        setOpen(false);
                                                                    }}
                                                                    getOptionSelected={(option, value) =>
                                                                        option.cursoId == value.cursoId
                                                                    }
                                                                    getOptionLabel={(option) => option.nome}
                                                                    options={cursos}
                                                                    loading={loading}
                                                                    onChange={(event, values) => handleChangeAtleticaCursos(values)}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            style={{ marginBottom: 15 }}
                                                                            {...params}
                                                                            label="Cursos"
                                                                            variant="outlined"
                                                                            InputProps={{
                                                                                ...params.InputProps,
                                                                                endAdornment: (
                                                                                    <React.Fragment>
                                                                                        {loading ? (
                                                                                            <CircularProgress
                                                                                                color="inherit"
                                                                                                size={20}
                                                                                            />
                                                                                        ) : null}
                                                                                        {params.InputProps.endAdornment}
                                                                                    </React.Fragment>
                                                                                ),
                                                                            }}
                                                                        />
                                                                    )}
                                                                />


                                                                {/* <div className='scroll'>

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


                                                            </div> */}

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

                                                                    <Grid item xs={12}>

                                                                        <AvField value={complemento} label="Complemento" name="complemento" type="text" onChange={handleAtleticaComplemento}
                                                                            validate={{
                                                                                maxLength: { value: 255, errorMessage: "Muito grande" }
                                                                            }} />

                                                                    </Grid>

                                                                    <Grid item xs={12} style={{ marginBottom: 20 }}>

                                                                        <AvField value={nomeCampus} label="Nome do Campus" name="campus" type="text" onChange={handleNomeCampusChange}
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
                                    <h1 className="MyTitleC">CADASTRE-SE</h1>

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

                                                    <TextField
                                                        id="standard-select-curso"
                                                        select
                                                        fullWidth
                                                        label="Curso"
                                                        value={membro.cursoId}
                                                        onChange={handleMembroCurso}
                                                        style={{ marginTop: 15, marginBottom: 20 }}

                                                    >
                                                        {cursosMembro.map((option) => (
                                                            <MenuItem key={option.nome} value={option.cursoId}>
                                                                {option.nome}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>

                                                    {/* <TextField
                                                    id="standard-select-currency"
                                                    select
                                                    fullWidth
                                                    label="Curso"
                                                    value={membro.Curso}
                                                    onChange={handleMembroCurso}
                                                style={{ width: "90%", marginTop: 15 }}


                                                >
                                                    {cursos.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </TextField> */}

                                                    <TextField
                                                        id="standard-select-genero"
                                                        select
                                                        fullWidth
                                                        label="Gênero"
                                                        value={membro.genero}
                                                        onChange={handleMembroGenero}
                                                        style={{ marginTop: 15, marginBottom: 20 }}

                                                    >
                                                        {generos.map((option) => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>


                                                    <AvField name="senha" label="Senha" type="password" validate={{
                                                        required: { value: true, errorMessage: "Campo obrigatório" },
                                                        minLength: { value: 6, errorMessage: "A senha precisa ter no mínimo 6 caracteres" },

                                                    }} />
                                                    <AvField onChange={handleMembroSenha} name="ConfirmarSenha" label="Confirme sua senha" type="password" validate={{
                                                        required: { value: true, errorMessage: "Campo obrigatório" },
                                                        match: { value: "senha", errorMessage: "Senhas diferentes" }

                                                    }} />



                                                    <Grid container spacing={1}>

                                                        {/* <Grid item xs={12}>

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

                                                    </Grid> */}

                                                        <Grid item xs={12}>

                                                            <Button type='submit' style={{ width: "100%", marginTop: 20 }} variant="contained" color="secondary">cadastrar</Button>
                                                        </Grid>
                                                    </Grid>
                                                </AvForm>

                                            </Fade>

                                        ) : (

                                                <Fade in={showAtletica}>


                                                    <AvForm onValidSubmit={onFormSubmit}>
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

                                                        {/* <TextField
                                                        fullWidth
                                                        id="standard-select-coordenador"
                                                        select
                                                        label="Faculdade"
                                                        style={{ marginBottom: 20 }}
                                                        // value={coordenador}
                                                        onChange={handleAtleticaFaculdade}
                                                    >
                                                        {membros.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.value}
                                                                    </MenuItem>
                                                                ))}
                                                    </TextField> */}



                                                        <AvField value={nomeFaculdade} label="Faculdade" name="faculdade" type="text" onChange={handleNomeFaculdadeChange}
                                                            validate={{ maxLength: { value: 255, errorMessage: "Muito grande" } }} />


                                                        <p className='subtitle2'>Cursos presentes na sua atlética</p>

                                                        <Autocomplete
                                                            id="asynchronous-demo"
                                                            multiple
                                                            fullWidth
                                                            open={open}
                                                            onOpen={() => {
                                                                setOpen(true);
                                                            }}
                                                            onClose={() => {
                                                                setOpen(false);
                                                            }}
                                                            getOptionSelected={(option, value) =>
                                                                option.cursoId == value.cursoId
                                                            }
                                                            getOptionLabel={(option) => option.nome}
                                                            options={cursos}
                                                            loading={loading}
                                                            onChange={(event, values) => handleChangeAtleticaCursos(values)}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    style={{ marginBottom: 15 }}
                                                                    {...params}
                                                                    label="Cursos"
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        ...params.InputProps,
                                                                        endAdornment: (
                                                                            <React.Fragment>
                                                                                {loading ? (
                                                                                    <CircularProgress
                                                                                        color="inherit"
                                                                                        size={20}
                                                                                    />
                                                                                ) : null}
                                                                                {params.InputProps.endAdornment}
                                                                            </React.Fragment>
                                                                        ),
                                                                    }}
                                                                />
                                                            )}
                                                        />



                                                        {/* <div className='scroll'>

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


                                                    </div> */}

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
                                                            <AvField value={complemento} label="Complemento" name="complemento" type="text" onChange={handleAtleticaComplemento}
                                                                validate={{
                                                                    maxLength: { value: 255, errorMessage: "Muito grande" }
                                                                }} />
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
        </>

    );
}