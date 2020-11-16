import React from "react";
import { Grid, Paper, Typography, Avatar, CardHeader, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    paperA: {
        width: "85%",
        marginTop: 30,
        padding: "4%",
        backgroundColor: "#BBB8CC"
    },


}));


export default function Page404() {

    const classes = useStyles();

    return (

        <>

            <Grid container justify='center'>

                <Paper className={classes.paperA}>



                    <h3 className='MyTitle'>Erro 404</h3>
                    <p className='MySubtitle'>Essa página não existe ou esta indisponível</p>



                </Paper>

            </Grid>

        </>
    );
}