import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper } from '@material-ui/core';
import TabelaJogadores from './TabelaJogadores'

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

    function checaResultado() {
        if (jogo.PontosAtletica > jogo.PontosAdversario)
            return "Vitória"
        else if (jogo.PontosAtletica < jogo.PontosAdversario)
            return "Derrota"
        else
            return "Empate"
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
                >
                    <Grid item xs={4}>
                        <Typography >
                            {jogo.TimeAtletica + " X " + jogo.TimeAdversario}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container justify="center">
                            <Paper style={{ backgroundColor: "#F68D2E", paddingBottom: 2, paddingTop: 2, paddingLeft: 10, paddingRight: 10, alignContent: 'center' }}>
                                <Typography style={{ textAlign: 'center' }}>
                                    {jogo.PontosAtletica + " X " + jogo.PontosAdversario + " / " + checaResultado()}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container justify="flex-end">
                            <Typography>
                                {jogo.Data}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            {/* CELULAR */}
            <div className={classes.sectionMobile}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item xs={12}>
                        <Typography >
                            {jogo.TimeAtletica + " X " + jogo.TimeAdversario}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Paper style={{ backgroundColor: "#F68D2E", paddingBottom: 2, paddingTop: 2, paddingLeft: 10, paddingRight: 10, alignContent: 'center' }}>
                                <Typography style={{ textAlign: 'center' }}>
                                    {jogo.PontosAtletica + " X " + jogo.PontosAdversario + " / " + checaResultado()}
                                </Typography>
                            </Paper>

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="flex-end">
                            <Typography>
                                {jogo.Data}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <TabelaJogadores jogadores={jogo.Jogadores} />
        </Paper>
    );
}