import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";


export default function CardAtleta(props) {

    return (
        <>
            <Grid item xs={12} sm={3}>

                <Paper style={{ padding: "4%", backgroundColor: "#D2CFE5" }}>


                    <Typography style={{ fontSize: 14 }}>

                        {props.atleta}
                    </Typography>


                </Paper>

            </Grid>
        </>
    );
}