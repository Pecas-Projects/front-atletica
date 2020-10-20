import React from 'react';
import NavBar from "../../Components/NavBar"
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper } from "@material-ui/core";
import { AvField, AvForm } from "availity-reactstrap-validation"
import "./styles.css"
import ImageCadastro from "../../assets/imagem/undraw_digital_nomad.svg"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

export default function Cadastro() {

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

                                <Grid item xs={6}>

                                    <Grid container justify="center">

                                        <img style={{ width: "60%" }} src={ImageCadastro} alt="undraw_digital_nomad" />

                                    </Grid>
                                </Grid>

                                <Grid item xs={6}>

                                    <Paper className={classes.paperA}>

                                        <h1 className="MyTitle">CADASTRE-SE</h1>

                                        <Grid item xs={12} style={{ marginTop: 20 }}>

                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Como:</FormLabel>
                                                <RadioGroup row aria-label="gender" name="gender1">
                                                    <FormControlLabel value="Atletica" control={<Radio />} label="Atlética" />
                                                    <FormControlLabel value="Membro" control={<Radio />} label="Membro" />

                                                </RadioGroup>
                                            </FormControl>

                                        </Grid>

                                        <Grid item xs={12}>

                                            {/* <AvForm>
                                                <AvField></AvField>
                                            </AvForm> */}

                                        </Grid>


                                    </Paper>


                                </Grid>

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



                            </Paper>


                        </Grid>
                    </Grid>

                </div>


            </main >
        </div >


    );
}