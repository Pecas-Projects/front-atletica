import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Avatar, Typography, Paper, Button, IconButton } from "@material-ui/core";
import fotoPerfil from "../../../assets/imagem/fotoPerfil.png";

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
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    paper: {
        width: "100%",
        padding: "2%",
        backgroundColor: "#C4C4C4",
    },
    position: {
        backgroundColor: "#F3BF3A",
        width: "100%",
    }
}));

function CardAtletica(props) {
    const classes = useStyles();
    const { item } = props;

    return (
        <>
            <Grid item style={{ marginBottom: 20 }} xs={12} >
                <Paper className={classes.paper} >
                    <Grid container spacing={5} >
                        <Grid item xs={2}>
                            <Avatar alt="Remy Sharp" src={fotoPerfil} className={classes.large} />
                        </Grid>

                        <Grid item xs={8} style={{ marginLeft: 30, marginTop: 5 }}>
                            <Typography gutterBottom style={{ fontSize: 18 }}>
                                Cimatlética
                            </Typography>
                            <Typography variant="body2" component="p">
                                SENAI Cimatec
                            </Typography>
                            <Typography variant="body2" component="p">
                                Número de jogos: 20
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                            {/* <Paper className={classes.position} >
                                <Grid container justify="center">
                                    <Typography gutterBottom style={{ fontSize: 18, color: "white" }}>
                                        #2
                                    </Typography>
                                </Grid>
                            </Paper> */}
                        </Grid>
                    </Grid>
                </Paper>

            </Grid>

        </>
    );
}

export default CardAtletica;