import React, { useState } from 'react'
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { AvForm, AvField } from "availity-reactstrap-validation";
import CardAtletica from "./Components/CardAtletica";
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
            atletica: "Coruja",
            faculdade: "SENAI Cimatec",
            jogos: "20",
            posicao: "1"
        },
        {
            atletica: "Manada",
            faculdade: "Comunicação UNEB",
            jogos: "18",
            posicao: "2"
        },
        {
            atletica: "Aduc",
            faculdade: "Direito UCSAL",
            jogos: "17",
            posicao: "3"
        },
    ];

    const futsal = [
        {
            atletica: "Coruja",
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
                                    <AvForm >
                                        <AvField value={modalidade} type="select" name="Modalidades" label="Modalidade">
                                            {
                                                modalidades.map((item) => (
                                                    <option value={item.value}>{item.nome}</option>
                                                ))
                                            }
                                        </AvField>
                                    </AvForm>
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
                    <Grid container spacing={1} style={{ marginTop: 20 }}>
                        {/* <h4 className="MyTitle">Nossos Produtos</h4>
                        {products.map((item) => (
                            <CardProduto item={item} />
                        ))} */}
                    </Grid>
                    <Grid item xs={1}></Grid>
                </div>
            </main>
        </div>
    );
}

export default Ranking;