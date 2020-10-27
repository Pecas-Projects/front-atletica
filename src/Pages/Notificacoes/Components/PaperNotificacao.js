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

import fotoPerfil from "../../../assets/imagem/fotoPerfil.png"
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
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

function PaperNotificacao(props) {
    const classes = useStyles();

    return (
        <>
            <Grid container xs={12} >
                <Paper style={{ width: "100%", padding: "2%", backgroundColor: "#C4C4C4" }}>
                    <Grid container  >
                        <Grid item xs={2}>
                            <Avatar alt="Remy Sharp" src={fotoPerfil} className={classes.large} />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography gutterBottom style={{ fontSize: 18 }}>
                                Fulana quer participar como atleta!
                        </Typography>
                            <Typography variant="body2" component="p">
                                Modalidades de interesse: Volei, Natação
                        </Typography>
                        </Grid>

                        <Grid item xs={2} justify="flex-end" style={{ paddingRight: 20 }}>
                            <Button
                                style={{
                                    background: "#F3BF3A",
                                    width: 114,
                                    marginTop: 10,
                                }}
                            >
                                Postar
                            </Button>
                        </Grid>
                        <Grid item xs={2} justify="flex-end" >
                            <Button
                                style={{
                                    border: '2px solid #F3BF3A',
                                    borderColor: '#F3BF3A',
                                    boxSizing: 'border-box',
                                    width: 114,
                                    marginTop: 10,
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