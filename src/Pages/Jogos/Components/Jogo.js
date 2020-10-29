import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';


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

export default function Post(props) {
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
            <TableContainer component={Paper} style={{ backgroundColor: "#BBB8CC", maxHeight: 200 }} elevation={0}>
                <Table className={classes.table} aria-label="caption table" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Jogadores</TableCell>
                            <TableCell align="center">Pontos</TableCell>
                            <TableCell align="center">Infrações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jogo.Jogadores.map((row) => (
                            <TableRow key={row.Id}>
                                <TableCell component="th" scope="row">
                                    {row.Nome}
                                </TableCell>
                                <TableCell align="center">{row.Pontos}</TableCell>
                                <TableCell align="center">{row.Infracoes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}