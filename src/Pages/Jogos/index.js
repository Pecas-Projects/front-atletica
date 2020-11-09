import React, { useState } from 'react'
import NavBar from "../../Components/NavBar"
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Categoria from './Components/Categoria'
import Button from '@material-ui/core/Button';
import AddJogo from './Components/AddJogo'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

    const [opcao, setOpcao] = useState('Ver')

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

    const handleFormChange = (e) => {
        setOpcao(e.target.value)
    }

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
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="gender" name="gender1" value={opcao} onChange={handleFormChange} >
                                        <FormControlLabel value="Ver" control={<Radio />} label="Ver jogos" />
                                        <FormControlLabel value="Adicionar" control={<Radio />} label="Adicionar jogo" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={2} />
                            <Grid item xs={8} >
                                {
                                    opcao == "Ver" ?
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
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="gender" name="gender1" value={opcao} onChange={handleFormChange} >
                                        <FormControlLabel value="Ver" control={<Radio />} label="Ver jogos" />
                                        <FormControlLabel value="Adicionar" control={<Radio />} label="Adicionar jogo" />
                                    </RadioGroup>
                                </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                {
                                    opcao == "Ver" ?
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