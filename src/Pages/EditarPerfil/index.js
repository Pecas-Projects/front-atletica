import React, { useState } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Grid, Paper, Button } from "@material-ui/core";
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import cep from 'cep-promise'
import BotaoUploadImagem from "../../Components/BotaoUploadImagem"
import BotaoUploadImagemMobile from "../../Components/BotaoUploadImagemMobile"
import BotaoAuxiliar from "./Components/ButaoUploadAuxiliar"
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
        marginTop: 20,
        padding: "2%",
        backgroundColor: "#BBB8CC",
    },
    paperB: {
        width: "85%",
        marginTop: -10,
        padding: "2%",
        backgroundColor: "#807D8E",
    },
    paperAMobile: {
        width: "100%",
        marginTop: -10,
        padding: "5%",
        backgroundColor: "#BBB8CC",
    },
    paperBMobile: {
        width: "100%",
        marginTop: -10,
        padding: "5%",
        backgroundColor: "#807D8E",
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

export default function EditarPerfil() {

    const classes = useStyles();

    const [cepcp, setCepcp] = useState('');
    const [street, setStreet] = useState('');
    const [neighbourhood, setNeighbourhood] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [complemento, setComplemento] = useState('');

    const [descricao, setDescricao] = useState('')

    const [imagemPerfil, setImagemPerfil] = useState(null);
    const [pathPerfil, setPathPerfil] = useState();

    const [imagemCapa, setImagemCapa] = useState(null);
    const [pathCapa, setPathCapa] = useState();

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

    const handleComplementoChange = (e) => {
        e.preventDefault();
        setComplemento(e.target.value);
    };

    const handleChangeNumber = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
    };

    const handleChangeDescricao = (e) => {
        e.preventDefault();
        setDescricao(e.target.value);
    };


    function showAdicionarImagemPerfil() {
        if (imagemPerfil === null) {
            return <p>Primeiro adicione a foto de perfil da sua atlética</p>
        } else return <div><br /><br /></div>;
    }

    function showAdicionarImagemCapa() {
        if (imagemCapa === null) {
            return <p>Agora Adicione a foto de capa da sua atlética</p>
        } else return <div><br /><br /></div>;
    }


    return (
        <>
            <div className={classes.root}>
                <NavBar />

                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    {/*
        
        
        
        DESKTOP
        
        
        
        */}

                    <div className={classes.sectionDesktop}>
                        <Grid container justify="center">
                            <Paper className={classes.paperA}>

                                <h4 className="MyTitle">Editar Perfil</h4>

                                <br />

                                <p className="MySubtitle">Descrição</p>
                                <p className="MySubtitle2">Fale um pouco sobre sua atlética</p>

                                <AvForm>
                                    <AvField
                                        name="descricao" type="textarea" errorMessage="Descrição muito grande" onChange={handleChangeDescricao} validate={{
                                            maxLength: { value: 300 }
                                        }} />


                                    <br />

                                    <p className="MySubtitle">Endereço</p>
                                    <p className="MySubtitle2">O campus que sua atlética está sediada</p>

                                    <Grid container spacing={1}>

                                        <Grid item xs={6} >

                                            <AvField style={{ width: "90%" }} data-cy='cep-input' value={cepcp} onChange={handleCepChange} name="cep" label="CEP" type="text"
                                                placeholder="00000000" validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    pattern: { value: '[0-9]', errorMessage: "Use apenas números" },
                                                    minLength: { value: 8, errorMessage: "CEP inválido" },
                                                    maxLength: { value: 8, errorMessage: "CEP inválido" }

                                                }} />

                                        </Grid>

                                        <Grid item xs={6}>

                                            <AvField style={{ width: "90%" }} value={number} onChange={handleChangeNumber} name="num" label="Número"
                                                validate={{
                                                    required: { value: true, errorMessage: "Campo obrigatório" },
                                                    pattern: { value: '[0-9]', errorMessage: "Senha inválida" },
                                                }}
                                            />

                                        </Grid>

                                        <Grid item xs={6} >

                                            <AvField style={{ width: "90%" }} value={state} name="estado" label="Estado" type="text" />

                                        </Grid>

                                        <Grid item xs={6}>

                                            <AvField style={{ width: "90%" }} value={city} name="cidade" label="Cidade" type="text" />

                                        </Grid>

                                        <Grid item xs={6}>

                                            <AvField style={{ width: "90%" }} value={neighbourhood} name="bairro" label="Bairro" type="text" />

                                        </Grid>

                                        <Grid item xs={6}>

                                            <AvField style={{ width: "90%" }} value={street} name="rua" label="Rua" type="text" />

                                        </Grid>

                                        <Grid item xs={12} style={{ marginBottom: 20 }}>

                                            <AvField style={{ width: "95%" }} value={complemento} label="Complemento" name="complemento" type="text" onChange={handleComplementoChange}
                                                validate={{
                                                    maxLength: { value: 255, errorMessage: "Muito grande" }

                                                }} />

                                        </Grid>

                                    </Grid>


                                    <p className="MySubtitle">Adicionar fotos</p>
                                    <p className="MySubtitle2">Adicione imagens de perfil e capa da sua atlética</p>


                                    {imagemPerfil === null && imagemCapa === null ? (


                                        <Grid item xs={4}>
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



                                    ) : (

                                            <Grid container style={{ paddingTop: 30 }}>

                                                <Grid item xs={4}>
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

                                                <Grid item xs={4}>
                                                    {showAdicionarImagemCapa()}
                                                    <Paper style={{ backgroundColor: "#636363", width: 450 }}>
                                                        <Grid
                                                            container
                                                            justify="center"
                                                            alignContent="center"
                                                            style={{ height: 250, marginTop: -7 }}
                                                        >
                                                            <Grid item>
                                                                <BotaoAuxiliar setPath={setPathCapa} setImagem={setImagemCapa} imagem={imagemCapa} path={pathCapa} />

                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                </Grid>
                                            </Grid>

                                        )}



                                    <Grid container justify="center">
                                        <Button style={{ marginTop: 60, width: 400 }} variant="contained" color="secondary">Salvar Alterações</Button>
                                    </Grid>


                                </AvForm>

                            </Paper>
                        </Grid>

                        {/*
                        
                        
                        
                        
                        MOBILE 
                        
                        
                        
                        
                        */}

                    </div>
                    <div className={classes.sectionMobile}>
                        <Grid container justify="center">
                            <Grid container spacing={1} style={{ marginTop: 20 }}>
                                <Grid container justify="center">
                                    <Paper className={classes.paperAMobile}>

                                        <h4 className="MyTitle">Editar Perfil</h4>

                                        <br />

                                        <p className="MySubtitle">Descrição</p>
                                        <p className="MySubtitle2">Fale um pouco sobre sua atlética</p>

                                        <AvForm>
                                            <AvField
                                                name="descricao" type="textarea" errorMessage="Descrição muito grande" onChange={handleChangeDescricao} validate={{
                                                    maxLength: { value: 300 }
                                                }} />


                                            <br />

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

                                                <Grid item xs={12}>

                                                    <AvField value={number} onChange={handleChangeNumber} name="num" label="Número"
                                                        validate={{
                                                            required: { value: true, errorMessage: "Campo obrigatório" },
                                                            pattern: { value: '[0-9]', errorMessage: "Senha inválida" },
                                                        }}
                                                    />

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

                                                <Grid item xs={12}>

                                                    <AvField value={complemento} label="Complemento" name="complemento" type="text" onChange={handleComplementoChange}
                                                        validate={{
                                                            maxLength: { value: 255, errorMessage: "Muito grande" }

                                                        }} />

                                                </Grid>

                                            </Grid>

                                            {/* {imagemPerfil === null && imagemCapa === null ? (


                                                <Grid item xs={4}>
                                                    {showAdicionarImagemPerfil()}
                                                    <Paper style={{ backgroundColor: "#636363", width: 250 }}>
                                                        <Grid
                                                            container
                                                            justify="center"
                                                            alignContent="center"
                                                            style={{ height: 250, marginTop: -7 }}
                                                        >
                                                            <BotaoUploadImagemMobile setPath={setPathPerfil} setImagem={setImagemPerfil} imagem={imagemPerfil} path={pathPerfil} />

                                                        </Grid>
                                                    </Paper>
                                                </Grid>



                                            ) : (

                                                    <Grid container >

                                                        <Grid item xs={12}>
                                                            {showAdicionarImagemPerfil()}
                                                            <Paper style={{ backgroundColor: "#636363", width: 250 }}>
                                                                <Grid
                                                                    container
                                                                    justify="center"
                                                                    alignContent="center"
                                                                    style={{ height: 250, marginTop: -7 }}
                                                                >
                                                                    <BotaoUploadImagemMobile setPath={setPathPerfil} setImagem={setImagemPerfil} imagem={imagemPerfil} path={pathPerfil} />

                                                                </Grid>
                                                            </Paper>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            {showAdicionarImagemCapa()}
                                                            <Paper style={{ backgroundColor: "#636363", width: 450 }}>
                                                                <Grid
                                                                    container
                                                                    justify="center"
                                                                    alignContent="center"
                                                                    style={{ height: 250, marginTop: -7 }}
                                                                >
                                                                    <Grid item>
                                                                        <BotaoAuxiliar setPath={setPathCapa} setImagem={setImagemCapa} imagem={imagemCapa} path={pathCapa} />

                                                                    </Grid>
                                                                </Grid>
                                                            </Paper>
                                                        </Grid>
                                                    </Grid>

                                                )} */}


                                            <Grid container justify="center">
                                                <Button fullWidth style={{ marginTop: 20 }} variant="contained" color="secondary">Salvar Alterações</Button>
                                            </Grid>


                                        </AvForm>

                                    </Paper>
                                </Grid>

                            </Grid>
                        </Grid>
                    </div>
                </main>
            </div>
        </>
    );
}