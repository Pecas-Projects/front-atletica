import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
        backgroundColor: "#BBB8CC"
    }
}));

export default function TabelaJogadores(props) {
    const { jogadores } = props;
    const classes = useStyles();

    return (
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
                        {jogadores.map((row) => (
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
    );
}