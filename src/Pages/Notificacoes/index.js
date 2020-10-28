import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import PaperNotificacao from "./Components/PaperNotificacao"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paperA: {
        width: "85%",
        marginTop: 20,
        padding: "2%",
        backgroundColor: "#BBB8CC",
    },
    paperB: {
        width: "85%",
        marginTop: -10,
        padding: "2%",
        backgroundColor: "#807D8E",
    },
    paperAMobile: {
        width: "100%",
        marginTop: -10,
        padding: "5%",
        backgroundColor: "#BBB8CC",
    },
    paperBMobile: {
        width: "100%",
        marginTop: -10,
        padding: "5%",
        backgroundColor: "#807D8E",
    },
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
}));

function Notificacoes() {
    const classes = useStyles();
    const [tipo, setTipo] = useState('atletas');

    const notificacaoAtletas = [
        {
            tipo: 'atletas',
            nome: 'Fulana',
            modalidades: 'Volei, Futsal'
        },
        {
            tipo: 'atletas',
            nome: 'Fernandinha',
            modalidades: 'Futsal'
        },
        {
            tipo: 'atletas',
            nome: 'Ana Paula',
            modalidades: 'Volei, Natação, Futsal'
        },
    ];

    const notificacaoJogos = [
        {
            tipo: 'jogos',
            nome: 'Manada',
            modalidades: 'Vôlei'
        },
        {
            tipo: 'jogos',
            nome: 'Serpente',
            modalidades: 'Judô'
        },
        {
            tipo: 'jogos',
            nome: 'Aduc',
            modalidades: 'Jogo eletrônico'
        },
    ];

    const handleChange = (event) => {
        setTipo(event.target.value);
    };

    return (
        <>
            <div className={classes.root}>
                <NavBar />

                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    {/*
        
        
        
                    DESKTOP
        
        
        
                 */}

                    <div className={classes.sectionDesktop}>
                        <Grid container justify="center">
                            <Paper className={classes.paperA}>
                                <h4 className="MyTitle">Suas Notificações</h4>
                                <Grid container spacing={2} style={{ marginTop: 20 }}>
                                    <Grid item xs={12}>
                                        <RadioGroup row aria-label="tipo" name="notificacoes" value={tipo} onChange={handleChange}>
                                            <FormControlLabel value="atletas" control={<Radio />} label="Atletas" />
                                            <FormControlLabel value="jogos" control={<Radio />} label="Jogos" />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs >
                                            {tipo === 'atletas' ?
                                                notificacaoAtletas.map((item) => (
                                                    <PaperNotificacao item={item} />
                                                ))
                                                :
                                                notificacaoJogos.map((item) => (
                                                    <PaperNotificacao item={item} />
                                                ))
                                            }
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </div>

                    {/* <div className={classes.sectionMobile}>
                        <FormularioEventoMobile />
                    </div> */}

                </main>
            </div>

        </>
    );
}

export default Notificacoes;