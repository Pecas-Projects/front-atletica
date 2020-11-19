import React, { useState } from "react";
import { Grid, Paper, Button, TextField, MenuItem, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { makeStyles } from "@material-ui/core/styles";
import BotaoUploadImagem from "../../../Components/BotaoUploadImagem"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "../styles.css"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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

const modalidades = [
    "Futebol", "Vôlei", "Basquete", "Atletismo", "Futsal", "Vôlei de Praia", "Natação", "Outro"
]

const generos = [
    "Feminino", "Masculino", "Misto"
]

export default function CardAddModalidade() {

    const classes = useStyles();

    const [imagem, setImagem] = useState(null);
    const [path, setPath] = useState();
    const [coordenador, setCoordenador] = useState('')
    const [modalidade, setModalidade] = useState('')
    const [genero, setGenero] = useState('')
    const [openCriado, setOpenCriado] = useState(false)
    const [openErro, setOpenErro] = useState(false)
    const [horaTreino, setHoraTreino] = useState(false)
    const [diaTreino, setDiaTreino] = useState(false)

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

    const handleClickCriado = () => {
        setOpenCriado(true);
    };

    const handleCloseCriado = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenCriado(false);
    };

    const handleClickErro = () => {
        setOpenErro(true);
    };

    const handleCloseErro = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErro(false);
    };

    return (

        <>
            <Snackbar open={openCriado} autoHideDuration={4000} onClose={handleCloseCriado}>
                <Alert onClose={handleCloseCriado} severity="success">
                    Modalidade criada com sucesso!
                </Alert>
            </Snackbar>

            <Snackbar open={openErro} autoHideDuration={4000} onClose={handleCloseErro}>
                <Alert onClose={handleCloseCriado} severity="error">
                    Ocorreu um erro na criação da modalidade, revise os dados e tente novamente
                </Alert>
            </Snackbar>

            <Paper className={classes.paperA}>
                <AvForm>
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

                        <Grid item xs={4} style={{ marginTop: 20, marginLeft: -50 }}>

                            <div className='scroll'>

                                <Grid item xs={12} style={{ maxHeight: 250 }}>

                                    <FormControl component="fieldset" style={{ marginLeft: 90 }}>
                                        <FormLabel component="legend">Escolha a modalidade</FormLabel>
                                        <RadioGroup aria-label="modalidade" name="Modalidade" value={modalidade} onChange={handleModalidadeChange}>
                                            {modalidades.map((item) =>
                                                <FormControlLabel value={item} control={<Radio />} label={item} />
                                            )}
                                        </RadioGroup>
                                    </FormControl>

                                </Grid>
                            </div>

                            {modalidade === "Outro" ? (

                                <Grid item xs={12}>

                                    <Grid container justify='center'>

                                        <AvField style={{ width: "100%", marginLeft: 30 }} name="name" type="text" validate={{
                                            pattern: { value: '[A-Za-z]', errorMessage: 'Utilize apenas letras' },
                                            maxLength: { value: 25, errorMessage: 'Nome muito grande' }
                                        }} />

                                    </Grid>


                                </Grid>

                            ) : (
                                    <>
                                    </>
                                )}



                        </Grid>

                        <Grid item xs={4} style={{ marginLeft: 50 }}>

                            <Grid item xs={12} style={{ marginTop: 10 }}>


                                <AvField style={{ width: "100%" }} onChange={handleDiaChange} name="name" type="date" label="Dia do treino" validate={{
                                }} />


                            </Grid>

                            <Grid item xs={12} style={{ marginTop: 10 }}>


                                <AvField style={{ width: "100%" }} onChange={handleHorarioChange} name="name" type="time" label="Horário do treino" validate={{}} />


                            </Grid>


                            <Grid item xs={12}>
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
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>


                            <Grid item xs={12} >

                                <TextField
                                    id="standard-select-genero"
                                    select
                                    label="Gênero"
                                    value={genero}
                                    onChange={handleGeneroChange}
                                    fullWidth

                                >
                                    {generos.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </Grid>


                            <Grid item xs={12} style={{ marginTop: 40 }}>

                                <Grid container justify="flex-end">

                                    <Button onClick={handleClickErro} style={{ width: "100%" }} variant='contained' color='secondary' >Salvar</Button>

                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>
                </AvForm>
            </Paper>

        </>

    );
}