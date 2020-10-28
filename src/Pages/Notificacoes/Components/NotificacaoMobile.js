import React from 'react';
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


function NotificacaoMobile(props) {

    const classes = useStyles();
    const { item } = props

    function corpo() {
        if (item.tipo === 'atletas') {
            return (
                <>
                    <Typography gutterBottom >
                        {item.nome} quer participar como atleta!
                    </Typography>
                    <Typography variant="body2" component="p" style={{ paddingTop: 10 }}>
                        Modalidades de interesse: {item.modalidades}
                    </Typography>
                </>
            );
        }
        else {
            return (
                <>
                    <Typography gutterBottom >
                        A Atlética {item.nome} está te convidando para um jogo!
                    </Typography>
                    <Typography variant="body2" component="p">
                        Modalidade: {item.modalidades}
                    </Typography>
                    <Typography variant="body2" component="p" style={{ paddingTop: 5 }}>
                        Data e Horário: 22 de outubro de 2022
                    </Typography>
                    <Typography variant="body2" component="p" style={{ paddingTop: 5 }}>
                        Local: Ufba
                    </Typography>
                </>
            );
        }

    }

    return (
        <>
            <Grid item style={{ marginBottom: 20 }} xs={12} >
                <Paper className={classes.paper}>
                    <Grid container xs={12} spacing={2} style={{ paddingLeft: 10, paddingTop: 10 }}>
                        <Grid item xs={4} >
                            <Avatar alt="Remy Sharp" src={item.tipo === 'atletas' ? atleta_icon : jogo_icon} className={classes.large} />
                        </Grid>

                        <Grid item xs={8}  >
                            {corpo()}
                        </Grid>

                        <Grid item xs={6} justify="flex-start" style={{ marginBottom: 10}}>
                            <Button
                                style={{
                                    background: "#F3BF3A",
                                    color: "black"
                                }}
                                fullWidth={true}
                            >
                                Aceitar
                            </Button>
                        </Grid>
                        <Grid item xs={6} justify="flex-end" style={{ marginBottom: 10}}>
                            <Button
                                style={{
                                    color: "black",
                                    border: '2px solid #F3BF3A',
                                    height: 35,
                                }}
                                fullWidth={true}
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

export default NotificacaoMobile;