import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Divider, IconButton, Button, Snackbar } from '@material-ui/core';
import { Add } from '@material-ui/icons'
import TabelaJogadores from './TabelaJogadores'
import { FormGroup, Label, Input } from 'reactstrap';
import ApiService from '../../../variables/ApiService'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
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
    timePaper: {
        backgroundColor: '#BBB8CC',
        padding: 20,
        marginBottom: 20
    },
    table: {
        minWidth: 650,
        backgroundColor: "#BBB8CC"
    }
}));

export default function Time(props) {
    const { time, atletasModalidade } = props;
    const classes = useStyles();
    const [atleta, setAtleta] = useState(`{
        atletaAtleticaModalidadeId: null,
        atleticaModalidadeId: null,
        atletaId: null,
        pessoaId: null,
        nome: "",
        sobrenome: ""
    }`)
    const [atletasTime, setAtletasTime] = useState([])
    const [pontos, setPontos] = useState("")
    const [funcao, setFuncao] = useState("")
    const [infracoes, setInfracoes] = useState("")
    const [numero, setNumero] = useState("")
    const [msgAlerta, setMsgAlerta] = useState("Ocorreu um erro, verifique os dados inseridos.")
    const [openAdd, setOpenAdd] = useState(false)
    const [tipoAlerta, setTipoAlerta] = useState('success')
    const [editavel, setEditavel] = useState(false)

    useEffect(() => {

        setEditavel(!time.registrouEscalacao)
        setAtletasTime(time.atletas)
        if (atletasModalidade !== null && atletasModalidade.length > 0)
            setAtleta(JSON.stringify(atletasModalidade[0]))

    }, []);

    const handleCloseAdd = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAdd(false);
    };

    const handleOpenAdd = () => {
        setOpenAdd(true)
    }

    const adicionarTabela = () => {

        const atletaJSON = JSON.parse(atleta)

        const data = {
            atletaAtleticaModalidadeId: atletaJSON.atletaAtleticaModalidadeId,
            funcao: {
                nome: funcao
            },
            numero: numero ? numero : 0,
            pontos: pontos ? pontos : 0,
            infracoes: infracoes ? infracoes : 0,
            nome: atletaJSON.nome + " " + atletaJSON.sobrenome
        }

        setAtletasTime([...atletasTime, data])
    }

    const criarTime = async () => {
        await ApiService.AdicionarAtletasTime(time.timeId, atletasTime)
            .then(res => {
                setMsgAlerta("Sua escalação foi registrada com sucesso!")
                setTipoAlerta('success')
                handleOpenAdd(true)
            })
            .catch(err => {
                console.log(err)
                setMsgAlerta("Ocorreu um erro, verifique os dados inseridos.")
                setTipoAlerta('error')
                handleOpenAdd(true)
            })
    }

    const removeAtletaTime = (index) => {
        atletasTime.splice(index, 1)
        setAtletasTime([...atletasTime])
    }

    return (
        <>
            <Snackbar open={openAdd} autoHideDuration={4000} onClose={handleCloseAdd}>
                <Alert onClose={handleCloseAdd} severity={tipoAlerta}>
                    {msgAlerta}
                </Alert>
            </Snackbar>
            {/* DESKTOP */}
            <div className={classes.sectionDesktop}>

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Divider style={{ marginTop: 20 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{ textAlign: 'center' }}>{"Time " + time.timeId}</Typography>
                    </Grid>
                    {
                        !editavel ? null :
                            <>
                                <Grid item xs={6}>
                                    <FormGroup>
                                        <Label for="exampleSelect">Jogador</Label>
                                        <Input
                                            type="select"
                                            name="select"
                                            id="exampleSelect"
                                            onChange={(e) => setAtleta(e.target.value)}
                                        >
                                            {
                                                atletasModalidade.map((atl) =>
                                                    <option
                                                        key={atl.atletaAtleticaModalidadeId}
                                                        value={JSON.stringify(atl)}
                                                    >
                                                        {atl.nome + " " + atl.sobrenome}
                                                    </option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormGroup>
                                        <Label for="funcao">Função</Label>
                                        <Input
                                            type="text"
                                            id="funcao"
                                            onChange={(e) => setFuncao(e.target.value)}
                                            value={funcao}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormGroup>
                                        <Label for="numero">Número</Label>
                                        <Input
                                            type="number"
                                            id="numero"
                                            onChange={(e) => setNumero(e.target.value)}
                                            value={numero}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormGroup>
                                        <Label for="pontos">Pontos</Label>
                                        <Input
                                            type="number"
                                            id="pontos"
                                            onChange={(e) => setPontos(e.target.value)}
                                            value={pontos}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormGroup>
                                        <Label for="infracoes">Infrações</Label>
                                        <Input
                                            type="number"
                                            id="infracoes"
                                            onChange={(e) => setInfracoes(e.target.value)}
                                            value={infracoes}
                                        >
                                        </Input>
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton
                                        style={{ backgroundColor: "#F68D2E", outline: 'none' }}
                                        color="primary"
                                        aria-label="add"
                                        onClick={adicionarTabela}
                                    >
                                        <Add />
                                    </IconButton>
                                </Grid>
                            </>
                    }
                    <Grid item xs={12}>
                        <TabelaJogadores
                            jogadores={atletasTime}
                            editavel={editavel}
                            removeAtleta={(index) => removeAtletaTime(index)}
                        />
                    </Grid>
                    {
                        !editavel ? null :
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    justify="center"
                                >
                                    <Button
                                        style={{ backgroundColor: "#DB4922", width: 300, marginTop: 20 }}
                                        variant="contained"
                                        onClick={criarTime}
                                    >
                                        Salvar
                            </Button>
                                </Grid>
                            </Grid>
                    }
                </Grid>
            </div>
            {/* CELULAR */}
            <div className={classes.sectionMobile}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item xs={12}>
                        <Divider style={{ marginTop: 20 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{ textAlign: 'center' }}>{"Time " + time.timeId}</Typography>
                    </Grid>
                    {
                        !editavel ? null :
                            <>
                                <Grid item xs={12} style={{ width: '100%' }}>
                                    <FormGroup>
                                        <Label for="exampleSelect">Jogador</Label>
                                        <Input
                                            type="select"
                                            name="select"
                                            id="exampleSelect"
                                            onChange={(e) => setAtleta(e.target.value)}
                                        >
                                            {
                                                atletasModalidade.map((atl) =>
                                                    <option
                                                        key={atl.atletaAtleticaModalidadeId}
                                                        value={JSON.stringify(atl)}
                                                    >
                                                        {atl.nome + " " + atl.sobrenome}
                                                    </option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={8}>
                                    <FormGroup>
                                        <Label for="funcao">Função</Label>
                                        <Input
                                            type="text"
                                            id="funcao"
                                            onChange={(e) => setFuncao(e.target.value)}
                                            value={funcao}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormGroup>
                                        <Label for="numero">Número</Label>
                                        <Input
                                            type="number"
                                            id="numero"
                                            onChange={(e) => setNumero(e.target.value)}
                                            value={numero}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={5} style={{ width: '100%' }}>
                                    <FormGroup>
                                        <Label for="pontos">Pontos</Label>
                                        <Input
                                            type="number"
                                            id="pontos"
                                            onChange={(e) => setPontos(e.target.value)}
                                            value={pontos}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={5} style={{ width: '100%' }}>
                                    <FormGroup>
                                        <Label for="infracoes">Infrações</Label>
                                        <Input
                                            type="number"
                                            id="infracoes"
                                            onChange={(e) => setInfracoes(e.target.value)}
                                            value={infracoes}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        style={{ backgroundColor: "#F68D2E", outline: 'none' }}
                                        color="primary"
                                        aria-label="add"
                                        onClick={adicionarTabela}
                                    >
                                        <Add />
                                    </IconButton>
                                </Grid>
                            </>
                    }
                    <Grid item xs={12}>
                        <TabelaJogadores
                            jogadores={atletasTime}
                            editavel={editavel}
                            removeAtleta={(index) => removeAtletaTime(index)}
                        />
                    </Grid>
                    {
                        !editavel ? null :
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    justify="center"
                                >
                                    <Button
                                        style={{ backgroundColor: "#DB4922", width: 300, marginTop: 20 }}
                                        variant="contained"
                                        onClick={criarTime}
                                    >
                                        Salvar
                            </Button>
                                </Grid>
                            </Grid>
                    }
                </Grid>
            </div>

        </>
    );
}