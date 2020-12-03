import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Divider, IconButton, Button } from '@material-ui/core';
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

export default function Time(props) {
    const { time, atletasModalidade } = props;
    const classes = useStyles();
    const [atleta, setAtleta] = useState({
        atletaAtleticaModalidadeId: null,
        atleticaModalidadeId: null,
        atletaId: null,
        pessoaId: null,
        nome: "",
        sobrenome: ""
    })
    const [atletasTime, setAtletasTime] = useState([])

    useEffect(() => {
        setAtletasTime(time.atletas)
        if (atletasModalidade !== null && atletasModalidade.length > 0)
            setAtleta(atletasModalidade[0])
    }, []);

    return (
        <>
            {/* DESKTOP */}
            <div className={classes.sectionDesktop}>

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Divider style={{ marginTop: 20 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{ textAlign: 'center' }}>{"Time " + time.timeId}</Typography>
                    </Grid>
                    {
                        time.registrouEscalacao ? null :
                            <>
                                <Grid item xs={6}>
                                    <FormGroup>
                                        <Label for="exampleSelect">Jogador</Label>
                                        <Input
                                            type="select"
                                            name="select"
                                            id="exampleSelect"
                                            onChange={(e) => setAtleta(e.target.value)}
                                            value={atleta}
                                        >
                                            {
                                                atletasModalidade.map((atleta) =>
                                                    <option
                                                        key={atleta.atletaAtleticaModalidadeId}
                                                        value={JSON.stringify(atleta)}
                                                    >
                                                        {atleta.nome + " " + atleta.sobrenome}
                                                    </option>
                                                )
                                            }
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
                                <Grid item xs={2}>
                                    <IconButton style={{ backgroundColor: "#F68D2E", outline: 'none' }} color="primary" aria-label="add">
                                        <Add />
                                    </IconButton>
                                </Grid>
                            </>
                    }
                    <Grid item xs={12}>
                        <TabelaJogadores jogadores={atletasTime} />
                    </Grid>
                    {
                        time.registrouEscalacao ? null :
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    justify="center"
                                >
                                    <Button
                                        style={{ backgroundColor: "#DB4922", width: 300, marginTop: 20 }}
                                        variant="contained"
                                    >
                                        Salvar
                            </Button>
                                </Grid>
                            </Grid>
                    }
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
                        <Divider style={{ marginTop: 20 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{ textAlign: 'center' }}>{"Time " + time.timeId}</Typography>
                    </Grid>
                    {
                        time.registrouEscalacao ? null :
                            <>
                                <Grid item xs={12} style={{ width: '100%' }}>
                                    <FormGroup>
                                        <Label for="exampleSelect">Jogador</Label>
                                        <Input
                                            type="select"
                                            name="select"
                                            id="exampleSelect"
                                            onChange={(e) => setAtleta(e.target.value)}
                                            value={atleta}
                                        >
                                            {
                                                atletasModalidade.map((atleta) =>
                                                    <option
                                                        key={atleta.atletaAtleticaModalidadeId}
                                                        value={JSON.stringify(atleta)}
                                                    >
                                                        {atleta.nome + " " + atleta.sobrenome}
                                                    </option>
                                                )
                                            }
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
                            </>
                    }
                    <Grid item xs={12}>
                        <TabelaJogadores jogadores={atletasTime} />
                    </Grid>
                    {
                        time.registrouEscalacao ? null :
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    justify="center"
                                >
                                    <Button
                                        style={{ backgroundColor: "#DB4922", width: 300, marginTop: 20 }}
                                        variant="contained"
                                    >
                                        Salvar
                            </Button>
                                </Grid>
                            </Grid>
                    }
                </Grid>
            </div>

        </>
    );
}