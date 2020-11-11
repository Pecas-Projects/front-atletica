import React, { useState } from "react";
import { Grid, Paper, Button, TextField, MenuItem, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CardAtleta from "./CardAtleta"
import CardAtletaDelete from "./CardAtletaDelete"
import BotaoUploadImagem from "../../../Components/BotaoUploadImagem"
import clsx from 'clsx';
import "../styles.css"
import CardAtletaAdd from "./CardAtletaAdd";


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

export default function CardAddModalidade() {

    const classes = useStyles();

    return (

        <>
            <Paper className={classes.paperA}>

            </Paper>
        </>

    );
}