import React, { useState } from 'react'
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, FormControl, InputLabel, Select } from "@material-ui/core";
import CardAtletica from "./Components/CardAtletica";
import AtleticaMobile from "./Components/AtleticaMobile"
import "./styles.css"

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
        width: "75%",
        marginTop: 20,
        padding: "2%",
        backgroundColor: "#D2CFE5",
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    formControlMobile: {
        margin: theme.spacing(1),
        width: "194px",
    },
}));

function Ranking() {
    const classes = useStyles();
    const [modalidade, setModalidade] = useState("volei");
    const modalidades = [
        {
            value: "volei",
            nome: "Vôlei"
        },
        {
            value: "handbal",
            nome: "Handbal"
        },
        {
            value: "futsal",
            nome: "Futsal"
        },
        {
            value: "futebol",
            nome: "Futebol"
        },
        {
            value: "natacao",
            nome: "Natação"
        },
    ];

    const volei = [
        {
            atletica: "Atletica de Bia, Fernandinha e Mariazinha",
            faculdade: "SENAI Cimatec",
            jogos: "20",
            posicao: "1"
        },
        {
            atletica: "Cimatlética",
            faculdade: "SENAI Cimatec",
            jogos: "20",
            posicao: "2"
        },
        {
            atletica: "Manada",
            faculdade: "Comunicação UNEB",
            jogos: "18",
            posicao: "3"
        },
        {
            atletica: "Aduc",
            faculdade: "Direito UCSAL",
            jogos: "17",
            posicao: "4"
        },
    ];

    const natacao = [
        {
            atletica: "Atlética Bahiana de Medicina",
            faculdade: "Bahiana de Medicina",
            jogos: "30",
            posicao: "1"
        },
        {
            atletica: "Cimatlética",
            faculdade: "SENAI Cimatec",
            jogos: "24",
            posicao: "2"
        },
        {
            atletica: "Atlética Baiana de Direito",
            faculdade: "Baiana de Direito",
            jogos: "23",
            posicao: "3"
        },
    ];

    const handbal = [
        {
            atletica: "Atlética Bahiana de Medicina",
            faculdade: "Bahiana de Medicina",
            jogos: "20",
            posicao: "1"
        },
        {
            atletica: "Cimatlética",
            faculdade: "SENAI Cimatec",
            jogos: "10",
            posicao: "2"
        },
        {
            atletica: "Atlética AEUFBA",
            faculdade: "Administração da UFBA",
            jogos: "8",
            posicao: "3"
        },
    ];

    const futsal = [
        {
            atletica: "Cimatlética",
            faculdade: "SENAI Cimatec",
            jogos: "30",
            posicao: "1"
        },
        {
            atletica: "Aduc",
            faculdade: "Direito UCSAL",
            jogos: "23",
            posicao: "2"
        },
        {
            atletica: "Manada",
            faculdade: "Comunicação UNEB",
            jogos: "18",
            posicao: "3"
        },
    ];

    const futebol = [
        {
            atletica: "Atlética Bahiana de Medicina",
            faculdade: "Bahiana de Medicina",
            jogos: "25",
            posicao: "1"
        },
        {
            atletica: "Pato Loko",
            faculdade: "Medicina Unifacs",
            jogos: "23",
            posicao: "2"
        },
        {
            atletica: "Atlética Baiana de Direito",
            faculdade: "Baiana de Direito",
            jogos: "18",
            posicao: "3"
        },
    ];

    const modalidadeSelecionada = (event) => {
        setModalidade(event.target.value)
    }


    return (
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
                            <h4 className="MyTitle">Ranking das Atléticas</h4>
                            <Grid container spacing={3} xs={12} style={{ marginTop: 20 }}>
                                <Grid item xs={3}>
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <InputLabel htmlFor="filled-age-native-simple">Modalidade</InputLabel>
                                        <Select
                                            native
                                            value={modalidade}
                                            onChange={modalidadeSelecionada}
                                            inputProps={{
                                                name: 'modalidade'
                                            }}
                                        >
                                            {
                                                modalidades.map((item) => (
                                                    <option value={item.value}>{item.nome}</option>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} />

                                <Grid item xs={8} >
                                    <Grid container justify="center">
                                        {
                                            modalidade == "volei" ?
                                                volei.map((item) => (
                                                    <CardAtletica item={item} />
                                                ))
                                                :
                                                modalidade == "futsal" ?
                                                    futsal.map((item) => (
                                                        <CardAtletica item={item} />
                                                    ))
                                                    :
                                                    modalidade == "natacao" ?
                                                        natacao.map((item) => (
                                                            <CardAtletica item={item} />
                                                        ))
                                                        :
                                                        modalidade == "handbal" ?
                                                            handbal.map((item) => (
                                                                <CardAtletica item={item} />
                                                            ))
                                                            :
                                                            modalidade == "futebol" ?
                                                                futebol.map((item) => (
                                                                    <CardAtletica item={item} />
                                                                ))
                                                                :
                                                                null
                                        }

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </div>

                <div className={classes.sectionMobile}>
                    <Grid item xs={1}></Grid>
                    <Grid container justify="center" xs={12} spacing={1} style={{ marginTop: 20 }}>
                        <Grid item>
                            <h4 className="MyTitle">Ranking das Atléticas</h4>
                        </Grid>

                        <Grid item >
                            <FormControl variant="filled" className={classes.formControlMobile}>
                                <InputLabel htmlFor="filled-age-native-simple">Modalidade</InputLabel>
                                <Select
                                    native
                                    value={modalidade}
                                    onChange={modalidadeSelecionada}
                                    inputProps={{
                                        name: 'modalidade'
                                    }}
                                >
                                    {
                                        modalidades.map((item) => (
                                            <option value={item.value}>{item.nome}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            {
                                modalidade === "volei" ?
                                    volei.map((item) => (
                                        <AtleticaMobile item={item} />
                                    ))
                                :
                                modalidade === "natacao" ?
                                    natacao.map((item) => (
                                        <AtleticaMobile item={item} />
                                    ))
                                :
                                modalidade === "futsal" ?
                                    futsal.map((item) => (
                                        <AtleticaMobile item={item} />
                                    ))
                                :
                                modalidade === "futebol" ?
                                        futebol.map((item) => (
                                            <AtleticaMobile item={item} />
                                        ))
                                :
                                modalidade === "handbal" ?
                                        handbal.map((item) => (
                                            <AtleticaMobile item={item} />
                                        ))
                                :
                                null
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </div>
            </main>
        </div>
    );
}

export default Ranking;