import React, { useState } from "react";
import { Grid, Paper, Button, TextField, MenuItem, Dialog, DialogActions, DialogTitle, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

const membros = [
    {
        value: 'Beatriz Calazans',
    },
    {
        value: 'Fernanda Lisboa',
    },
    {
        value: 'Maria Antônia',
    },
    {
        value: 'Ana Paula',
    },
    {
        value: 'Davi Costa',
    },
]

export default function CardModalidade(props) {


    const { item, index, DeleteModalidade } = props;

    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);
    const [expendedEditar, setexpandedEdtitar] = useState(false);
    const [expandedAtletaDelete, setexpandedAtletaDelete] = useState(false);
    const [expandedAtletaAdd, setexpandedAtletaAdd] = useState(false);
    const [expandedModalidade, setExpandedModalidade] = useState(false);
    const [imagem, setImagem] = useState(null);
    const [path, setPath] = useState();
    const [coordenador, setCorrdenador] = useState('')
    const [openSalvo, setOpenSalvo] = useState(false)
    const [openExcluir, setOpenExcluir] = useState(false)
    const [openExcluido, setOpenExcluido] = useState(false)
    const [array, setArray] = useState(item.atletas)

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

        let newArray = [...array];
        newArray.splice(index, 1);
        setArray(newArray);


    };

    // const AddAtleta = () => {
    //     item.atletas.Add()
    // }

    const Deletar = () => {

        DeleteModalidade(index);

        if (expanded === true) setExpanded(false);
        if (expandedAtletaAdd === true) setexpandedAtletaAdd(false);
        if (expandedAtletaDelete === true) setexpandedAtletaDelete(false);
        if (expandedModalidade === true) setExpandedModalidade(false);
        if (expendedEditar === true) setexpandedEdtitar(false);

        setOpenExcluir(false)
        setOpenExcluido(true)
    };

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

            <Paper className={classes.paperA} >

                <div className="relativeCard">

                    <Grid container>

                        <Grid item xs={8}>

                            <h4 className="MySubtitle">{item.nome}</h4>
                            <br />
                            <p className="MySubtitle2">Coordenador: {item.coordenador}</p>

                        </Grid>

                        <Grid item xs={2}>

                            <div className="absoluteCard2">

                                <IconButton style={{ marginTop: -10 }} onClick={handleExpandEditarClick}>
                                    <EditIcon />
                                </IconButton>

                            </div>

                        </Grid>

                        <Grid item xs={2}>

                            <div className="absoluteCard">

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

                            {item.atletas.map((atleta) =>
                                <CardAtleta atleta={atleta} />
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

                            {item.atletas.map((atleta, index) =>
                                <CardAtletaDelete
                                    atleta={atleta}
                                    index={index}
                                    DeleteAtleta={DeleteAtleta} />
                            )}

                        </Grid>
                    </div>

                </Collapse>

                <Collapse in={expandedAtletaAdd} timeout="auto" unmountOnExit>
                    <div className='scroll'>
                        <Grid container spacing={2} style={{ marginTop: 20, maxHeight: 200 }}>

                            {item.atletas.map((atleta) =>
                                <CardAtletaAdd atleta={atleta} />
                            )}

                        </Grid>
                    </div>

                </Collapse>

                <Collapse in={expandedModalidade} timeout="auto" unmountOnExit>

                    <form>
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

                                <Grid item xs={12}>
                                    <TextField
                                        id="standard-select-coordenador"
                                        select
                                        label="Coordenador"
                                        value={coordenador}
                                        onChange={handleMembroChange}
                                        helperText="Selecione o membro que coordena essa modalidade"
                                    >
                                        {membros.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>

                                    <Button onClick={() => setOpenSalvo(true)} style={{ width: "45%", marginTop: 50 }} variant='contained' color='secondary'>Salvar Alterações</Button>

                                </Grid>

                                <Grid item xs={12}>

                                    <Button onClick={handleExcluir} style={{ width: "45%", marginTop: 50 }} variant='outlined' color='primary'>Excluir Modalidade</Button>

                                </Grid>

                            </Grid>

                        </Grid>
                    </form>

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

        </>

    );
}