import React, { useEffect, useState } from "react";
import { Grid, Paper, Button, TextField, MenuItem, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Typography } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { makeStyles } from "@material-ui/core/styles";
import BotaoUploadImagem from "../../../Components/BotaoUploadImagem"
import "../styles.css"
import ApiService from "../../../variables/ApiService";
import storage, { getAtleticaId } from "../../../utils/storage"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function acertaNome(nome, genero) {

    var modalidade;

    if (genero === 'M') modalidade = nome + " Masculino";
    if (genero === 'F') modalidade = nome + " Feminino";
    if (genero === 'O') modalidade = nome;

    return modalidade;
}

function acertaHora(data) {
    var dataCerta = data + ':00'
    return dataCerta;
}

function exibirHora(hora) {
    var horaCerta = hora.slice(0, 5)
    return horaCerta;
}

function acertaDia(dia) {

    var diaCerto

    if (dia === "Domingo") diaCerto = "Dom"
    else if (dia === "Segunda-feira") diaCerto = "Seg"
    else if (dia === "Terça-feira") diaCerto = "Ter"
    else if (dia === "Quarta-feira") diaCerto = "Qua"
    else if (dia === "Quinta-feira") diaCerto = "Qui"
    else if (dia === "Sexta-feira") diaCerto = "Sex"
    else if (dia === "Sábado") diaCerto = "Sab"

    return diaCerto;
}

const Dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

const useStyles = makeStyles((theme) => ({

    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paperA: {
        width: "85%",
        marginTop: 20,
        padding: "2%",
        backgroundColor: "#BBB8CC",
    },
    formControl: {
        margin: theme.spacing(3),
    },

}));


const generos = [
    {
        nome: "Feminino",
        value: 'F'
    },
    {
        nome: "Masculino",
        value: 'M'
    },
    {
        nome: "Outro",
        value: "O"
    }
]

export default function CardAddModalidade() {

    const classes = useStyles();

    const [imagem, setImagem] = useState(null);
    const [path, setPath] = useState();
    const [coordenador, setCoordenador] = useState('')
    const [modalidade, setModalidade] = useState()
    const [genero, setGenero] = useState('')
    const [openCriado, setOpenCriado] = useState(false)
    const [openErro, setOpenErro] = useState(false)
    const [criarModalidade, setCriarModalidade] = useState(false)
    const [horaTreino, setHoraTreino] = useState('')
    const [diaTreino, setDiaTreino] = useState()
    const [agendaTreinos, setAgendaTreinos] = useState([])
    const [modalidades, setModalidades] = useState()
    const [membros, setMembros] = useState()
    const [nomeModalidade, setNomeModaliade] = useState('')
    const [openNovaModalidade, setOpenNovaModalidade] = useState(false)
    const [openAgenda, setopenAgenda] = useState(false)
    const [imagemId, setImagemId] = useState()
    const [enviar, setEnviar] = useState(false)
    const [msgErro, setMsgErro] = useState("Ocorreu um erro, revise os dados e tente novamente")

    function showAdicionarImagem() {
        if (imagem === null) {
            return <p>Selecione a imagem dessa modalidade</p>;
        } else
            return (
                <div>
                    <br />
                    <br />
                </div>
            );
    }

    useEffect(() => {

        ApiService.BuscarModalidades()
            .then(res => {

                setModalidades(res.data)
            })

    }, [])


    useEffect(() => {

        ApiService.BuscarMembros(getAtleticaId())
            .then(res => {

                setMembros(res.data)
            })


    }, [])

    useEffect(() => {

        async function criarAtleticaModalidade() {

            let AtleticaModalidade = {
                agendaTreinos: agendaTreinos,
                coordenadorId: coordenador,
                modalidadeId: parseInt(modalidade),
                imagemId: imagemId

            }


            await ApiService.CadastrarAtleticaModalidade(getAtleticaId(), AtleticaModalidade)
                .then(res => {

                    setOpenCriado(true)
                    setTimeout(function () { window.location.href = '/modalidades' }, 3000)
                })
                .catch(error => {
                    if (error.response && error.response.data === "Esta modalidade já foi adicionada à sua atlética")
                        setMsgErro("Esta modalidade já foi adicionada à sua atlética")
                    else
                        setMsgErro("Ocorreu um erro, revise os dados e tente novamente")
                    setOpenErro(true)

                })

        }

        if (enviar === true) {
            criarAtleticaModalidade()
        }
    }, [enviar])


    async function envioImagem() {

        let file = new FormData();
        file.append('value', imagem);

        await ApiService.UploadImagem(file)
            .then((res) => {

                setImagemId(res.data.imagemId)
                setEnviar(true)
            })
            .catch((error) => {

            });

    }

    const onModalidadeSubmit = () => {

        if (nomeModalidade !== '' && genero !== '') {
            let _modalidade = {
                nome: nomeModalidade,
                genero: genero
            }

            ApiService.CadastrarModalidade(_modalidade)
                .then(res => {

                    setOpenNovaModalidade(true)
                    setTimeout(function () { window.location.href = '/modalidades' }, 3000)

                })
                .catch(error => {
                    setMsgErro("Ocorreu um erro, revise os dados e tente novamente")

                    setOpenErro(true)
                })

        }
        else {
            setMsgErro("Ocorreu um erro, revise os dados e tente novamente")
            setOpenErro(true)
        }


    }

    const criarTreino = () => {

        if (diaTreino !== null && horaTreino !== null) {

            let treino = {
                diaSemana: acertaDia(diaTreino),
                horaInicio: acertaHora(horaTreino)
            }

            agendaTreinos.push(treino)

            setopenAgenda(false)
        }
        else {
            setMsgErro("Ocorreu um erro, revise os dados e tente novamente")
            setOpenErro(true)
        }


    }

    const handleMembroChange = (e) => {
        setCoordenador(e.target.value)

    }

    const handleGeneroChange = (e) => {
        setGenero(e.target.value)
    }

    const handleModalidadeChange = (e) => {
        setModalidade(e.target.value)

    }

    const handleHorarioChange = (e) => {
        setHoraTreino(e.target.value)
    }

    const handleDiaChange = (e) => {
        setDiaTreino(e.target.value)

    }

    const handleNomeModalidadeChange = (e) => {
        setNomeModaliade(e.target.value)
    }



    const handleCloseCriado = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenCriado(false);
    };

    const handleCloseNovaModalidadeCriada = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNovaModalidade(false);
    };

    const handleCloseErro = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErro(false);
    };

    const handleNovaModalidade = () => {
        setCriarModalidade(true)
    };

    const handleCloseNovaModalidade = () => {
        setCriarModalidade(false)
    };

    const handleOpenAgenda = () => {
        setopenAgenda(true)
    };

    const handleCloseAgenda = () => {
        setopenAgenda(false)
    };

    return (

        <>
            <Snackbar open={openCriado} autoHideDuration={4000} onClose={handleCloseCriado}>
                <Alert onClose={handleCloseCriado} severity="success">
                    Modalidade adicionada com sucesso!
                </Alert>
            </Snackbar>

            <Snackbar open={openNovaModalidade} autoHideDuration={4000} onClose={handleCloseNovaModalidadeCriada}>
                <Alert onClose={handleCloseNovaModalidadeCriada} severity="success">
                    Modalidade criada com sucesso!
                </Alert>
            </Snackbar>

            <Snackbar open={openErro} autoHideDuration={4000} onClose={handleCloseErro}>
                <Alert onClose={handleCloseErro} severity="error">
                    {msgErro}
                </Alert>
            </Snackbar>

            <Paper className={classes.paperA}>
                <AvForm >
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            {showAdicionarImagem()}
                            <Paper style={{ backgroundColor: "#636363", width: 250 }}>
                                <Grid
                                    container
                                    justify="center"
                                    alignContent="center"
                                    style={{ height: 250, marginTop: -7 }}
                                    s
                                >
                                    <BotaoUploadImagem
                                        setPath={setPath}
                                        setImagem={setImagem}
                                        imagem={imagem}
                                        path={path}
                                    />
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={8} style={{ marginLeft: 40 }}>

                            <Grid container style={{ marginLeft: 30 }} >

                                <Grid item xs={5} style={{ marginRight: 20 }}>

                                    <Grid item xs={12} >

                                        <Grid container justify='center'>
                                            <Button fullWidth color='primary' variant='outlined' onClick={handleNovaModalidade}>Nova modalidade</Button>
                                        </Grid>


                                    </Grid>




                                    {modalidades !== undefined ? (

                                        <Grid item xs={12} style={{ marginTop: 50 }}>

                                            <TextField
                                                fullWidth
                                                id="standard-select-modalidade"
                                                select
                                                label="Modalidade"
                                                value={modalidade}
                                                onChange={handleModalidadeChange}
                                                helperText="Selecione a modalidade que deseja adicionar a sua atletica, caso ela não esteja cadastrada clique em Nova Modalidade"

                                            >

                                                {modalidades.map((item) =>
                                                    <MenuItem value={item.modalidadeId}>
                                                        {acertaNome(item.nome, item.genero)}
                                                    </MenuItem>

                                                )}
                                            </TextField>



                                        </Grid>

                                    ) : (
                                            <>
                                            </>
                                        )}



                                </Grid>

                                <Grid item xs={5} style={{}}>



                                    <Grid item xs={12} style={{}}>

                                        <Grid container justify='center'>
                                            <Button fullWidth color='secondary' variant='outlined' onClick={handleOpenAgenda}>Novo Treino </Button>
                                        </Grid>


                                    </Grid>

                                    {agendaTreinos.length !== 0 ? (
                                        <>
                                            <Typography style={{ marginTop: 7 }}>Treinos</Typography>
                                            {agendaTreinos.map((treino) => (
                                                <Typography style={{ color: "gray" }}>{treino.diaSemana} {exibirHora(treino.horaInicio)}h</Typography>
                                            ))}

                                        </>
                                    ) : (
                                            <>
                                            </>
                                        )}

                                    {membros !== undefined ? (
                                        <>

                                            <Grid item xs={12} style={{ marginTop: 50 }}>
                                                <Grid container justify='flex-end'>
                                                    <TextField
                                                        fullWidth
                                                        id="standard-select-coordenador"
                                                        select
                                                        label="Coordenador"
                                                        value={coordenador}
                                                        onChange={handleMembroChange}
                                                        helperText="Selecione o membro que coordena essa modalidade"
                                                    >

                                                        {membros.map((option) => (
                                                            <MenuItem value={option.membroId}>
                                                                {option.pessoa.nome + " " + option.pessoa.sobrenome}
                                                            </MenuItem>
                                                        ))}


                                                    </TextField>
                                                </Grid>
                                            </Grid>
                                        </>
                                    ) : (
                                            <>
                                            </>
                                        )}



                                </Grid>
                            </Grid>


                            <Grid item xs={12} style={{ marginTop: 40 }}>

                                <Grid container justify="flex-end">

                                    <Button onClick={envioImagem} style={{ width: "100%" }} variant='contained' color='secondary' >Salvar</Button>

                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </AvForm>
            </Paper>

            <div>

                <Dialog
                    open={criarModalidade}
                    onClose={handleCloseNovaModalidade}

                >
                    <DialogTitle id="alert-dialog-excluir">{"Cadastrar nova modalidade"}</DialogTitle>

                    <AvForm onValidSubmit={onModalidadeSubmit}>
                        <DialogContent>
                            <DialogContentText>
                                Para cadastrar uma nova modalidade no sistema digite seu nome e selecione o gênero
                        </DialogContentText>

                            <AvField onChange={handleNomeModalidadeChange} name="nome" label="Nome" type="text" validate={{
                                required: { value: true, errorMessage: 'Campo obrigatório' },

                            }} />

                            <TextField
                                id="standard-select-genero"
                                select
                                label="Gênero"
                                value={genero}
                                onChange={handleGeneroChange}
                                fullWidth

                            >
                                {generos.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.nome}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </DialogContent>

                        <DialogActions>
                            <Button type='submit' color="primary">
                                Salvar
        </Button>
                            <Button variant='outlined' onClick={handleCloseNovaModalidade} color="primary" autoFocus>
                                Cancelar
        </Button>
                        </DialogActions>
                    </AvForm>
                </Dialog>

            </div>

            <div>

                <Dialog
                    open={openAgenda}
                    onClose={handleCloseAgenda}

                >
                    <DialogTitle id="alert-dialog-excluir">{"Cadastrar novo treino"}</DialogTitle>

                    <AvForm onValidSubmit={criarTreino}>
                        <DialogContent>
                            <DialogContentText>
                                Selecione um dia da semana e um horário para adicionar a agenda de trinos dessa modalidade
        </DialogContentText>

                            <AvField style={{ width: "100%" }} onChange={handleHorarioChange} name="name" type="time" label="Horário do treino" validate={{}} />


                            <TextField
                                id="standard-select-dia"
                                select
                                label="Dia do treino"
                                value={diaTreino}
                                onChange={handleDiaChange}
                                fullWidth

                            >
                                {Dias.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </DialogContent>

                        <DialogActions>
                            <Button type='submit' color="primary">
                                Salvar
</Button>
                            <Button variant='outlined' onClick={handleCloseAgenda} color="primary" autoFocus>
                                Cancelar
</Button>
                        </DialogActions>
                    </AvForm>
                </Dialog>

            </div>


        </>

    );
}