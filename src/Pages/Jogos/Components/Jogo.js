import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper, IconButton, Collapse } from '@material-ui/core';
import { Add } from '@material-ui/icons'
import Time from './Time'
import { getAtleticaId } from '../../../utils/storage'
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    timePaper: {
        backgroundColor: '#BBB8CC',
        padding: 20,
        marginBottom: 20
    },
    table: {
        minWidth: 650,
        backgroundColor: "#BBB8CC"
    }
}));

export default function Jogo(props) {

    const { jogo } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [textoTimes, setTextoTimes] = useState("");
    const [textoPlacar, setTextoPlacar] = useState("");

    useEffect(() => {
        calculaTexto()
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const calculaTexto = () => {

        let txtTime = ""
        let arrayTxtTimes = []
        let txtPlacar = ""
        let arrayTxtPlacar = []

        if (jogo != null) {
            jogo.times.forEach(time => {
                txtTime = "Time " + time.timeId + " (" + time.nome + ")"
                arrayTxtTimes.push(txtTime)
                txtPlacar = time.pontos
                arrayTxtPlacar.push(txtPlacar)
            });
            setTextoTimes(arrayTxtTimes.join(" X "))
            setTextoPlacar(arrayTxtPlacar.join(" X "))
        }
    }

    const formataDataHora = () => {
        let date = jogo.dataHora.substring(8, 10)
        date += "/" + jogo.dataHora.substring(5, 7)
        date += "/" + jogo.dataHora.substring(0, 4)
        return date;
    }

    const exibeTimes = () => {
        let atleticaId = getAtleticaId();
        if (jogo !== null)
            return jogo.times.map((time) => (
                time.atleticaId != atleticaId ? null :
                    <Time time={time} />
            ))
    }

    return (
        <Paper className={classes.timePaper}>
            {/* DESKTOP */}
            <div className={classes.sectionDesktop}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={4}>
                        <Typography >
                            {textoTimes}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container justify="center">
                            <Paper style={{ backgroundColor: "#F68D2E", paddingBottom: 2, paddingTop: 2, paddingLeft: 10, paddingRight: 10, alignContent: 'center' }}>
                                <Typography style={{ textAlign: 'center' }}>
                                    {textoPlacar}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container justify="flex-end">
                            <Typography>
                                {formataDataHora()}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justify='flex-end'>
                            <IconButton
                                style={{ outline: 'none' }}
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </Grid>

                    </Grid>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        {exibeTimes()}
                    </Collapse>
                </Grid>
            </div>
            {/* CELULAR */}
            <div className={classes.sectionMobile}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item xs={10}>
                        <Typography style={{ textAlign: 'center' }} >
                            {textoTimes}
                        </Typography>
                        <Grid container justify="center">
                            <Paper style={{ backgroundColor: "#F68D2E", paddingBottom: 2, paddingTop: 2, paddingLeft: 10, paddingRight: 10, alignContent: 'center' }}>
                                <Typography style={{ textAlign: 'center' }}>
                                    {textoPlacar}
                                </Typography>
                            </Paper>

                        </Grid>
                        <Grid container justify="center">
                            <Typography>
                                {formataDataHora()}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            style={{ outline: 'none' }}
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </Grid>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        {exibeTimes()}
                    </Collapse>
                </Grid>

            </div>
        </Paper>
    );
}