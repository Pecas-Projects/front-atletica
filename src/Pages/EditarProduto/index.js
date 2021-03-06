import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import FormularioEditarProduto from "./Components/FormularioEditarProduto";
import FormularioEditarProdutoMobile from "./Components/FormularioEditarProdutoMobile"


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

export default function EditarProduto(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavBar />

            <main className={classes.content}>
                <div className={classes.toolbar} />

                <div className={classes.sectionDesktop}>

                    <Grid container justify="center">
                        <Grid item xs={12} >
                            <FormularioEditarProduto produtoId={props.match.params.produtoId}/>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.sectionMobile}>
                    <Grid container justify="center">
                        <Grid container spacing={1} style={{ marginTop: 20 }}>
                            <FormularioEditarProdutoMobile produtoId={props.match.params.produtoId}/>
                        </Grid>
                    </Grid>
                </div>
            </main>
        </div>
    );
}
