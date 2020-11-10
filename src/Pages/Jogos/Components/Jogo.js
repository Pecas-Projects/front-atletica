import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons'
import TabelaJogadores from './TabelaJogadores'
import { FormGroup, Label, Input } from 'reactstrap';

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
                    spacing={2}
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
                    <Grid item xs={7}>
                        <FormGroup>
                            <Label for="exampleSelect">Jogador</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>Juninho</option>
                                <option>Atari</option>
                            </Input>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={2}>
                        <FormGroup>
                            <Label for="pontos">Pontos</Label>
                            <Input type="number" id="pontos" />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={2}>
                        <FormGroup>
                            <Label for="infracoes">Infrações</Label>
                            <Input type="number" id="infracoes">
                            </Input>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton style={{ backgroundColor: "#F68D2E", outline: 'none' }} color="primary" aria-label="add">
                            <Add />
                        </IconButton>
                    </Grid>
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
                    <Grid item xs={12}>
                        <Typography style={{ textAlign: 'center' }} >
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
                        <Grid container justify="center">
                            <Typography>
                                {jogo.Data}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ width: '100%' }}>
                        <FormGroup>
                            <Label for="exampleSelect">Jogador</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>Juninho</option>
                                <option>Atari</option>
                            </Input>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={5} style={{ width: '100%' }}>
                        <FormGroup>
                            <Label for="pontos">Pontos</Label>
                            <Input type="number" id="pontos" />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={5} style={{ width: '100%' }}>
                        <FormGroup>
                            <Label for="infracoes">Infrações</Label>
                            <Input type="number" id="infracoes">
                            </Input>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton style={{ backgroundColor: "#F68D2E", outline: 'none' }} color="primary" aria-label="add">
                            <Add />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
            <TabelaJogadores jogadores={jogo.Jogadores} />
        </Paper>
    );
}