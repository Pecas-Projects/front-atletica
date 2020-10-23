import React from 'react';
import NavBar from "../../Components/NavBar"
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import "./styles.css"
// import fotoPublicacao from "../../assets/imagem/image 6.svg"
import Post from "./Components/Post"

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

export default function Feed() {

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

                    <Grid container  >

                        <Grid item xs={2} />

                        <Grid item xs={8} >

                            <Grid container justify='center'>

                                <Post />

                            </Grid>

                            <Grid item xs={2} />

                        </Grid>
                    </Grid>

                </div>

                {/* 




            MOBILE




                */}

                <div className={classes.sectionMobile}>


                    <Grid container  >

                        <Grid item xs={12} >

                            <Post />

                        </Grid>
                    </Grid>

                </div>


            </main >
        </div>


    );
}