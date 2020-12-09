import React, { useEffect, useState } from "react";
import {
    Grid, Paper, Button, TextField, MenuItem, Dialog, DialogActions, DialogTitle, Snackbar, DialogContent,
    DialogContentText, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CardAtleta from "./CardAtleta"
import CardAtletaDelete from "./CardAtletaDelete"
import BotaoUploadImagem from "../../../Components/BotaoUploadImagem"
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import "../styles.css"
import CardAtletaAdd from "./CardAtletaAdd";
import ApiService from "../../../variables/ApiService"
import { getAtleticaId } from "../../../utils/storage"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({

    paperA: {
        width: "85%",
        marginTop: 20,
        padding: "2%",
        backgroundColor: "#BBB8CC",
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },

}));



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

export default function CardModalidade(props) {


    const { item, index, DeleteModalidade } = props;

    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);
    const [expendedEditar, setexpandedEdtitar] = useState(false);
    const [expandedAtletaDelete, setexpandedAtletaDelete] = useState(false);
    const [expandedAtletaAdd, setexpandedAtletaAdd] = useState(false);
    const [expandedModalidade, setExpandedModalidade] = useState(false);
    const [imagem, setImagem] = useState(item.imagemModalidade);
    const [path, setPath] = useState(item.imagemModalidade.path);
    const [coordenador, setCorrdenador] = useState(item.coordenadorId)
    const [openSalvo, setOpenSalvo] = useState(false)
    const [openExcluir, setOpenExcluir] = useState(false)
    const [openExcluido, setOpenExcluido] = useState(false)
    const [horaTreino, setHoraTreino] = useState(false)
    const [diaTreino, setDiaTreino] = useState(false)
    const [atletas, setAtletas] = useState()
    const [atletasAdd, setAtletasAdd] = useState()
    const [openAgenda, setopenAgenda] = useState(false)
    const [membros, setMembros] = useState()
    const [enviar, setEnviar] = useState(false)
    const [imagemId, setImagemId] = useState()
    const [agendaTreinos, setAgendaTreinos] = useState(item.agendaTreinos)
    const [openErro, setOpenErro] = useState(false)


    useEffect(() => {


        ApiService.BuscarAtletaModalidade(item.atleticaModalidadeId)
            .then(res => {

                setAtletas(res.data)
            })
            .catch(error => {

            })



    }, [])

    useEffect(() => {
        if (atletas !== undefined) {

        }
    }, [atletas])

    useEffect(() => {

        ApiService.BuscarAddAtletas(JSON.parse(getAtleticaId()), item.modalidadeId)
            .then(res => {

                setAtletasAdd(res.data)
            })


    }, [])

    useEffect(() => {
        if (atletasAdd !== undefined) {

        }
    }, [atletasAdd])

    useEffect(() => {

        ApiService.BuscarMembros(getAtleticaId())
            .then(res => {

                setMembros(res.data)
            })
            .catch(error => {

            })

    }, [])

    useEffect(() => {

        async function AtualizarAtleticaModalidade() {


            var AtleticaModalidade = {
                modalidadeId: item.modalidadeId,
                coordenadorId: coordenador,
                imagemId: imagemId,
                agendaTreinos: agendaTreinos
            }



            await ApiService.AtualizarAtleticaModalidade(item.atleticaModalidadeId, AtleticaModalidade)
                .then(res => {

                    setOpenSalvo(true)
                    setTimeout(function () { window.location.href = '/modalidades' }, 3000)
                })
                .catch(error => {
                    setOpenErro(true)

                })

        }


        if (enviar === true) {
            AtualizarAtleticaModalidade()
        }
    }, [enviar])

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

    const DeleteAtleta = (index) => {

        let newArray = [...atletas];
        newArray.splice(index, 1);
        setAtletas(newArray);

    };

    const DeleteAtletaADD = (index) => {

        let newArray = [...atletasAdd];
        newArray.splice(index, 1);
        setAtletasAdd(newArray);

    };

    async function envioImagem() {

        if (imagem === null) {
            setEnviar(true)
            if (item.imagemModalidade !== null)
                setImagemId(item.imagemModalidade.imagemId)
        }
        else {

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

    }

    const Deletar = () => {

        ApiService.DeletarAtleticaModalidade(item.atleticaModalidadeId)
            .then(res => {


                DeleteModalidade(index);

                if (expanded === true) setExpanded(false);
                if (expandedAtletaAdd === true) setexpandedAtletaAdd(false);
                if (expandedAtletaDelete === true) setexpandedAtletaDelete(false);
                if (expandedModalidade === true) setExpandedModalidade(false);
                if (expendedEditar === true) setexpandedEdtitar(false);

                setOpenExcluir(false)
                setOpenExcluido(true)

            })

    };

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
            setOpenErro(true)
        }


    }

    const handleCloseSalvo = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSalvo(false);
    };

    const handleCloseExcluido = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenExcluido(false);
    };

    const handleExcluir = () => {
        setOpenExcluir(true);
    };

    const handleCloseExcluir = () => {
        setOpenExcluir(false);
    };


    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (expandedAtletaAdd === true) setexpandedAtletaAdd(false);
        if (expandedAtletaDelete === true) setexpandedAtletaDelete(false);
        if (expandedModalidade === true) setExpandedModalidade(false);
        if (expendedEditar === true) setexpandedEdtitar(false);
    };

    const handleExpandEditarClick = () => {
        setexpandedEdtitar(!expendedEditar)
        if (expanded === true) setExpanded(false);
        if (expandedAtletaAdd === true) setexpandedAtletaAdd(false);
        if (expandedAtletaDelete === true) setexpandedAtletaDelete(false);
        if (expandedModalidade === true) setExpandedModalidade(false);

    };

    const handleExpandAtletaDeleteClick = () => {
        setexpandedAtletaDelete(!expandedAtletaDelete)
        if (expanded === true) setExpanded(false);
        if (expandedAtletaAdd === true) setexpandedAtletaAdd(false);
        if (expandedModalidade === true) setExpandedModalidade(false);

    };

    const handleExpandAtletaAddClick = () => {
        setexpandedAtletaAdd(!expandedAtletaAdd)
        if (expanded === true) setExpanded(false);
        if (expandedAtletaDelete === true) setexpandedAtletaDelete(false);
        if (expandedModalidade === true) setExpandedModalidade(false);
    };

    const handleExpandedModalidadeClick = () => {
        setExpandedModalidade(!expandedModalidade)
        if (expanded === true) setExpanded(false);
        if (expandedAtletaAdd === true) setexpandedAtletaAdd(false);
        if (expandedAtletaDelete === true) setexpandedAtletaDelete(false);
    }

    const handleMembroChange = (e) => {
        setCorrdenador(e.target.value)
    }

    const handleHorarioChange = (e) => {
        setHoraTreino(e.target.value)
    }

    const handleDiaChange = (e) => {
        setDiaTreino(e.target.value)
    }
    const handleOpenAgenda = () => {
        setopenAgenda(true)
    };

    const handleCloseAgenda = () => {
        setopenAgenda(false)
    };

    const handleCloseErro = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErro(false);
    };


    return (

        <>

            <Snackbar open={openSalvo} autoHideDuration={4000} onClose={handleCloseSalvo}>
                <Alert onClose={handleCloseSalvo} severity="success">
                    Alterações salvas com sucesso!
                </Alert>
            </Snackbar>

            <Snackbar open={openExcluido} autoHideDuration={4000} onClose={handleCloseExcluido}>
                <Alert onClose={handleCloseExcluido} severity="success">
                    Modalidade excluida com sucesso!
                </Alert>
            </Snackbar>


            <Snackbar open={openErro} autoHideDuration={4000} onClose={handleCloseErro}>
                <Alert onClose={handleCloseErro} severity="error">
                    Ocorreu um erro, revise os dados e tente novamente
                </Alert>
            </Snackbar>

            <Paper className={classes.paperA} >

                <div className="relativeCardM">

                    <Grid container>

                        <Grid item xs={8}>

                            <h4 className="MySubtitleM">{item.modalidade}</h4>
                            <br />
                            <p className="MySubtitle2M">Coordenador: {item.coordenador}</p>

                        </Grid>

                        <Grid item xs={2}>

                            <div className="absoluteCardM">

                                <IconButton style={{ marginTop: -10 }} onClick={handleExpandEditarClick}>
                                    <EditIcon />
                                </IconButton>

                            </div>

                        </Grid>

                        <Grid item xs={2}>

                            <div className="absoluteCard2M">

                                <IconButton
                                    style={{ marginTop: -10 }}
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>


                            </div>
                        </Grid>
                    </Grid>
                </div>

                <Collapse in={expanded} timeout="auto" unmountOnExit>

                    <div className='scroll'>

                        <Grid container spacing={2} style={{ maxHeight: 200 }}>

                            {atletas !== undefined ? (
                                <>
                                    {atletas.length !== 0 ? (
                                        <>
                                            {atletas.map((atleta) =>
                                                <CardAtleta atleta={atleta} />
                                            )}
                                        </>

                                    ) : (
                                            <Grid style={{ padding: 20 }}>
                                                <Typography>Essa modalidade ainda não possui jogadores adicionados</Typography>
                                            </Grid>
                                        )}
                                </>

                            ) : (
                                    <>
                                    </>


                                )}



                        </Grid>
                    </div>

                </Collapse>

                <Collapse in={expendedEditar} timeout="auto" unmountOnExit>

                    <Grid container style={{ marginTop: 20 }}>

                        <Grid item xs={4}>
                            <Button style={{ width: "95%" }} onClick={handleExpandAtletaAddClick} color='primary' variant="contained">Adicionar Atletas</Button>
                        </Grid>

                        <Grid item xs={4}>
                            <Button style={{ width: "95%" }} onClick={handleExpandAtletaDeleteClick} color='secondary' variant="contained">Excluir Atletas</Button>
                        </Grid>

                        <Grid item xs={4}>
                            <Button style={{ color: "F3BF3A", width: "95%" }} onClick={handleExpandedModalidadeClick} variant="contained">Editar Modalidade</Button>
                        </Grid>


                    </Grid>

                </Collapse>

                <Collapse in={expandedAtletaDelete} timeout="auto" unmountOnExit>
                    <div className="scroll">
                        <Grid container spacing={2} style={{ marginTop: 20, maxHeight: 200 }}>

                            {atletas !== undefined ? (
                                <>
                                    {atletas.map((atleta, index) =>
                                        <CardAtletaDelete
                                            atleta={atleta}
                                            index={index}
                                            DeleteAtleta={DeleteAtleta} />
                                    )}

                                </>

                            ) : (
                                    <>
                                    </>
                                )}



                        </Grid>
                    </div>

                </Collapse>

                <Collapse in={expandedAtletaAdd} timeout="auto" unmountOnExit>
                    <div className='scroll'>
                        <Grid container spacing={2} style={{ marginTop: 20, maxHeight: 200 }}>

                            {atletasAdd !== undefined ? (
                                <>
                                    {
                                        atletasAdd.map((atleta, index) =>
                                            <CardAtletaAdd
                                                atleta={atleta}
                                                index={index}
                                                AtleticaModalidadeId={item.atleticaModalidadeId}
                                                DeleteAtletaAdd={DeleteAtletaADD} />
                                        )}
                                </>

                            ) : (
                                    <>

                                    </>
                                )}


                        </Grid>
                    </div>

                </Collapse>

                <Collapse in={expandedModalidade} timeout="auto" unmountOnExit>

                    <AvForm >
                        <Grid container style={{ marginTop: 30 }}>

                            <Grid item xs={4}>
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

                            <Grid item xs={8}>

                                <Grid item xs={8} style={{ marginTop: 10, marginTop: 80 }}>

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

                                        <Grid item xs={8} xs={{ marginTop: 10 }}>
                                            <Grid container >
                                                <TextField
                                                    style={{ width: "70%" }}

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

                            <Grid container >

                                <Grid item xs={6}>

                                    <Button onClick={handleExcluir} style={{ width: "85%", marginTop: 50 }} variant='outlined' color='primary'>Excluir Modalidade</Button>

                                </Grid>

                                <Grid item xs={6}>

                                    <Grid container justify='flex-end'>

                                        <Button onClick={envioImagem} style={{ width: "85%", marginTop: 50 }} variant='contained' color='secondary'>Salvar Alterações</Button>

                                    </Grid>

                                </Grid>

                            </Grid>

                        </Grid>
                    </AvForm>

                </Collapse>

            </Paper >

            <div>

                <Dialog
                    open={openExcluir}
                    onClose={handleCloseExcluir}

                >
                    <DialogTitle id="alert-dialog-excluir">{"Tem certeza que deseja excluir essa modalidade?"}</DialogTitle>

                    <DialogActions>
                        <Button onClick={Deletar} color="primary">
                            Excluir
          </Button>
                        <Button variant='outlined' onClick={handleCloseExcluir} color="primary" autoFocus>
                            Cancelar
          </Button>
                    </DialogActions>
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