import React, { useState, useEffect } from 'react';
import NavBar from "../../Components/NavBar"
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import "./styles.css"
// import fotoPublicacao from "../../assets/imagem/image 6.svg"
import Post from "./Components/Post"
import ApiService from "../../variables/ApiService";
import { getUserId } from "../../utils/storage";

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
    const [posts, setPosts] = useState([])
    const userId = getUserId();


    useEffect(() => {
        if (userId !== undefined && userId !== null)
            getAllPosts();
    }, []);

    async function getAllPosts() {

        await ApiService.BuscarTodosPosts(userId)
            .then((res) => {
                setPosts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function apresentaPosts() {
        if (posts !== undefined && posts !== null) 
            return (
                posts.map((item) => (
                    <Post post={item} />
                ))

            );
        
        else 
            return (
                <div></div>
            );    
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

                    <Grid container  >

                        <Grid item xs={2} />

                        <Grid item xs={8} >

                            <Grid container justify='center'>


                                {apresentaPosts()}

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
                            {apresentaPosts()}
                        </Grid>
                    </Grid>

                </div>


            </main >
        </div>


    );
}