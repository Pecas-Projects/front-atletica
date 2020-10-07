import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";


export default function CardMembro(props) {

    const { item } = props;

    return (
        <>
            <Grid item xs={12} sm={3}>

                <Paper style={{ padding: "4%", backgroundColor: "#D2CFE5" }}>

                    <Typography style={{ fontSize: 14 }}>
                        {item.nome}
                    </Typography>

                    <Typography style={{ fontSize: 13, color: "#DB4922" }}>
                        {item.funcao}
                    </Typography>

                </Paper>

            </Grid>
        </>
    );
}