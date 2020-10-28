import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Grid,
    Paper,
    Typography,
    makeStyles
} from "@material-ui/core";
import "../styles.css";

import atleta_icon from "../../../assets/imagem/atleta_icon.svg"
import jogo_icon from "../../../assets/imagem/jogo_icon.svg"
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    paper: {
        width: "100%",
        padding: "2%",
        backgroundColor: "#C4C4C4",
    }
}));

function PaperNotificacao(props) {
    const classes = useStyles();
    const { item } = props

    function corpo() {
        if (item.tipo === 'atletas') {
            return (
                <>
                    <Typography gutterBottom style={{ fontSize: 18 }}>
                        {item.nome} quer participar como atleta!
                                        </Typography>
                    <Typography variant="body2" component="p">
                        Modalidades de interesse: {item.modalidades}
                                        </Typography>
                </>
            );
        }
        else{
            return (
                <>
                    <Typography gutterBottom style={{ fontSize: 18 }}>
                        A Atlética {item.nome} está te convidando para um jogo!
                    </Typography>
                    <Typography variant="body2" component="p">
                        Modalidade: {item.modalidades}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Data e Horário: 22 de outubro de 2022
                    </Typography>
                    <Typography variant="body2" component="p">
                        Local: Ufba
                    </Typography>
                </>
            );
        }

    }

    return (
        <>
            <Grid item style={{ marginBottom: 20}} xs={12} >
                <Paper className={classes.paper} >
                    <Grid container>
                        <Grid item xs={2}>
                            <Avatar alt="Remy Sharp" src={item.tipo === 'atletas' ? atleta_icon : jogo_icon} className={classes.large} />
                        </Grid>

                        <Grid item xs={6} style={{ paddingTop: 10 }}>
                            {corpo()}
                        </Grid>

                        <Grid item xs={2} justify="flex-end" style={{ paddingRight: 20 }}>
                            <Button
                                style={{
                                    background: "#F3BF3A",
                                    width: 114,
                                    marginTop: 20,
                                    color: "black"
                                }}
                            >
                                Aceitar
                            </Button>
                        </Grid>
                        <Grid item xs={2} justify="flex-end" >
                            <Button
                                style={{
                                    color: "black",
                                    border: '2px solid #F3BF3A',
                                    height: 35,
                                    width: 114,
                                    marginTop: 20,
                                }}
                            >
                                Recusar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}

export default PaperNotificacao;