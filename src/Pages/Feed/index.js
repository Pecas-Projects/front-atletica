import React, { useState, useEffect } from 'react';
import NavBar from "../../Components/NavBar"
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import "./styles.css"
// import fotoPublicacao from "../../assets/imagem/image 6.svg"
import Post from "./Components/Post"
import ApiService from "../../variables/ApiService";

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
    paperA: {
        width: "85%",
        marginTop: 20,
        padding: "2%",
        backgroundColor: "#BBB8CC",
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

export default function Feed(props) {

    const classes = useStyles();
    const [posts, setPosts] = useState([])
    const [userId, setUserId] = useState();
    const username = props.match.params.username;

    useEffect(() => {
        buscaAtletica();
        if (userId !== undefined && userId !== null)
            getAllPosts();
    }, [userId]);

    async function buscaAtletica() {
        await ApiService.PesquisaAtleticaPorUsername(username)
            .then((res) => {
                setUserId(res.data.atleticaId)
            })
            .catch((err) => {
                console.log(err)
            })
    }

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
        if (posts !== undefined && posts !== null && posts.length !== 0)
            return (
                posts.map((item) => (
                    <Post post={item} />
                ))

            );

        else
            return (
                <Paper className={classes.paperA}>
                    <Grid container justify="center" >
                        <Grid item>
                            <Typography variant="h6" align="center" style={{ color: 'white' }}>Essa atlética não possui publicações!</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            );
    }

    return (

        <div className={classes.root}>
            <NavBar />

            <main className={classes.content}>
                <div className={classes.toolbar} />

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