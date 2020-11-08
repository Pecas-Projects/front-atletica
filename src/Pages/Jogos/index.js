import React, { useState } from 'react'
import NavBar from "../../Components/NavBar"
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Categoria from './Components/Categoria'
import Button from '@material-ui/core/Button';
import AddJogo from './Components/AddJogo'

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

export default function Jogos() {

    const [pageNumber, setPageNumber] = useState(1);

    const categorias = [
        {
            id: 1,
            nome: "Futebol Masculino"
        },
        {
            id: 2,
            nome: "Vôlei Feminino"
        },
        {
            id: 3,
            nome: "Handball Masculino"
        },
        {
            id: 4,
            nome: "Tênis de Mesa Masculino"
        }
    ]

    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <NavBar />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {/* DESKTOP */}
                    <div className={classes.sectionDesktop}>
                        <Grid container  >
                            <Grid item xs={2} />
                            <Grid item xs={8} >
                                <Grid container alignItems="center">
                                    <Button
                                        size="large"
                                        className={classes.margin}
                                        style={{ textTransform: 'none', outline: 'none' }}
                                        onClick={() => setPageNumber(1)}
                                    >
                                        Ver jogos
                                    </Button>
                                    <Typography>ou</Typography>
                                    <Button
                                        size="large"
                                        className={classes.margin}
                                        style={{ textTransform: 'none', outline: 'none' }}
                                        onClick={() => setPageNumber(2)}
                                    >
                                        Adicionar jogo
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={2} />
                            <Grid item xs={8} >
                                {
                                    pageNumber == 1 ?
                                        <Grid container justify='center'>
                                            {categorias.map((item) => (
                                                <Categoria categoria={item} />
                                            ))}
                                        </Grid>
                                        :
                                        <AddJogo />
                                }
                                <Grid item xs={2} />
                            </Grid>
                        </Grid>
                    </div>
                    {/* MOBILE */}
                    <div className={classes.sectionMobile}>
                        <Grid container  >
                            <Grid item xs={12} >
                                <Grid container alignItems="center">
                                    <Button
                                        size="large"
                                        className={classes.margin}
                                        style={{ textTransform: 'none', outline: 'none' }}
                                        onClick={() => setPageNumber(1)}
                                    >
                                        Ver jogos
                                    </Button>
                                    <Typography>ou</Typography>
                                    <Button
                                        size="large"
                                        className={classes.margin}
                                        style={{ textTransform: 'none', outline: 'none' }}
                                        onClick={() => setPageNumber(2)}
                                    >
                                        Adicionar jogo
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                {
                                    pageNumber == 1 ?
                                        categorias.map((item) => (
                                            <Categoria categoria={item} />
                                        ))
                                        :
                                        <AddJogo />
                                }
                            </Grid>
                        </Grid>
                    </div>
                </main >
            </div>
        </>
    )
}