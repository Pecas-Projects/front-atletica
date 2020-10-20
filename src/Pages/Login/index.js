import React from 'react';
import NavBar from "../../Components/NavBar"
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper } from "@material-ui/core";
import { AvField, AvForm } from "availity-reactstrap-validation"
import "./styles.css"
import ImageLogin from "../../assets/imagem/undraw_Login.svg"
// import fotoPublicacao from "../../assets/imagem/image 6.svg"


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
    paperA: {
        width: "85%",
        marginTop: 20,
        padding: "2%",
        backgroundColor: "#BBB8CC"
    },
    paperAMobile: {
        width: "100%",
        marginTop: -10,
        padding: "5%",
        backgroundColor: "#BBB8CC"
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },

}));

export default function Login() {

    const classes = useStyles();

    return (

        <div className={classes.root}>
            <NavBar />

            <main className={classes.content}>
                <div className={classes.toolbar} />

                {/*
    
    
    
                 DESKTOP
    
    
    
                */}

                <div className={classes.sectionDesktop}>

                    <Grid container >

                        <Grid item xs={12}>

                            <Grid container justify="center">

                                <Paper className={classes.paperA}>
                                    <h1 className="MyTitle">Login</h1>

                                    <Grid container spacing={1}>

                                        <Grid item xs={6} style={{ marginTop: 40 }}>

                                            <AvForm>

                                                <AvField style={{ width: "80%", marginBottom: 30 }} name="email" label="E-mail" type="text" errorMessage="Campo obrigatório" validate={{
                                                    required: { value: true },

                                                }} />

                                                <AvField style={{ width: "80%" }} name="senha" label="Senha" type="password" errorMessage="Campo obrigatório" validate={{
                                                    required: { value: true },

                                                }} />
                                            </AvForm>

                                            <Grid item xs={8}>

                                                <Grid container justify="flex-end" style={{ marginTop: 50 }}>
                                                    <Button style={{ width: 300 }} variant='contained' color='secondary' >entrar</Button>
                                                </Grid>

                                            </Grid>

                                        </Grid>

                                        <Grid item xs={6}>
                                            <img style={{ width: "100%" }} src={ImageLogin} alt="undraw_login" />
                                        </Grid>

                                    </Grid>

                                </Paper>
                            </Grid>

                        </Grid>


                    </Grid>

                </div>

                {/* 




            MOBILE




                */}

                <div className={classes.sectionMobile}>


                    <Grid container  >

                        <Grid item xs={12} >

                            <Paper className={classes.paperAMobile}>
                                <h1 className="MyTitle">Login</h1>


                                <AvForm>

                                    <AvField style={{ marginBottom: 30 }} name="email" label="E-mail" type="text" errorMessage="Campo obrigatório" validate={{
                                        required: { value: true },

                                    }} />

                                    <AvField name="senha" label="Senha" type="password" errorMessage="Campo obrigatório" validate={{
                                        required: { value: true },

                                    }} />
                                </AvForm>



                                <Grid container style={{ marginTop: 50 }}>
                                    <Button style={{ width: "100%" }} variant='contained' color='secondary' >entrar</Button>
                                </Grid>


                            </Paper>


                        </Grid>
                    </Grid>

                </div>


            </main >
        </div >


    );
}