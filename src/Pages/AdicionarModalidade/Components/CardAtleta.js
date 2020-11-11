import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function CardAtleta(props) {

    return (
        <>
            <Grid item xs={12} sm={3}>

                <Paper style={{ padding: "4%", backgroundColor: "#D2CFE5" }}>

                    <Grid container>

                        <Grid item xs={8}>

                            <Typography style={{ fontSize: 14 }}>

                                {props.atleta}
                            </Typography>

                        </Grid>

                        <Grid item xs={4}>

                            <Grid container justify='flex-end'>

                                <IconButton style={{ marginTop: -15 }}>
                                    <HighlightOffIcon color="secondary" />
                                </IconButton>

                            </Grid>

                        </Grid>

                    </Grid>

                </Paper>

            </Grid>
        </>
    );
}