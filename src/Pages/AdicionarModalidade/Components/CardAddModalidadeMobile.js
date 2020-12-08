import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paperAMobile: {
        width: "100%",
        marginTop: -10,
        padding: "5%",
        backgroundColor: "#BBB8CC",
    },

}));


export default function CardAddModalidade() {

    const classes = useStyles();


    return (

        <>

            <Paper className={classes.paperAMobile}>

                <p className="SubtitleM">Não é posível adicionar modalidade pelo celular, utilize um computador para isso</p>

            </Paper>

        </>

    );
}