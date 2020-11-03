import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper} from '@material-ui/core';
import TabelaJogadores from './TabelaJogadores'

const useStyles = makeStyles((theme) => ({
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
            <Grid container>
                <Grid item xs={4}>
                    <Typography >
                        {jogo.TimeAtletica + " X " + jogo.TimeAdversario}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Grid container justify="center">
                        <Paper style={{ backgroundColor: "#F68D2E", paddingBottom: 2, paddingTop: 2, paddingLeft: 10, paddingRight: 10 }}>
                            <Typography>
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
            <TabelaJogadores jogadores={jogo.Jogadores} />
        </Paper>
    );
}