import React, { useState, useEffect } from 'react'
import NavBar from "../../Components/NavBar"
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, CircularProgress, Typography } from "@material-ui/core";
import Categoria from './Components/Categoria'
import AddJogo from './Components/AddJogo'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ApiService from '../../variables/ApiService'
import { getAtleticaId } from '../../utils/storage'

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
    card: {
        width: "100%",
        backgroundColor: "#D2CFE5",
        marginBottom: 20
    },
    grid: {
        padding: theme.spacing(1),
    }
}));

export default function Jogos() {

    const [opcao, setOpcao] = useState('Ver')
    const [modalidades, setModalidades] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        buscaAtleticaModalidades()
    }, []);

    const classes = useStyles();

    const handleFormChange = (e) => {
        setOpcao(e.target.value)
    }

    const buscaAtleticaModalidades = async () => {
        await ApiService.BuscarAtleticaModalidades(getAtleticaId())
            .then(res => {
                setModalidades(res.data)
                setLoading(false)
            })
            .catch(err =>
                console.log(err)
            )
    }

    function apresentaModalidades() {
        if (modalidades.length !== 0 && modalidades !== null && modalidades !== undefined) {
            return (
                modalidades.map((item) => (
                    <Categoria categoria={item} />
                ))
            );
        }
        else {
            return (

                <Card className={classes.card}>
                    <Grid item container justify='center' className={classes.grid}>
                        <Typography >Essa atlética não possui modalidades.</Typography>
                    </Grid>
                </Card >
            );
        }
    }

    return (
        <>
            {loading ? (
                <>
                    <div style={{ marginTop: 250 }}>
                        <Grid container justify="center">
                            <CircularProgress size={100} color="primary" />
                        </Grid>
                    </div>
                </>

            ) : (
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
                                                apresentaModalidades()
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
                                                apresentaModalidades()
                                                :
                                                <AddJogo />
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                        </main >
                    </div>
                )}
        </>
    )
}