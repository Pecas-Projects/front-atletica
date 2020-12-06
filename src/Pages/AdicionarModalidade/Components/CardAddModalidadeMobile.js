import React, { useState } from "react";
import { Grid, Paper, Button, TextField, MenuItem, Snackbar } from "@material-ui/core";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { makeStyles } from "@material-ui/core/styles";
import BotaoUploadImagem from "../../../Components/BotaoUploadImagem"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MuiAlert from '@material-ui/lab/Alert';
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
    paperAMobile: {
        width: "100%",
        marginTop: -10,
        padding: "5%",
        backgroundColor: "#BBB8CC",
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


    return (

        <>

            <Paper className={classes.paperAMobile}>

                <p className="SubtitleM">Não é posível adicionar modalidade pelo celular, utilize um computador para isso</p>

            </Paper>

        </>

    );
}