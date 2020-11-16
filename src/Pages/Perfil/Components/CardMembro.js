import React from "react";
import { Grid, Paper, Typography, Avatar, CardHeader } from "@material-ui/core";


export default function CardMembro(props) {

    const { item } = props;

    return (
        <>
            <Grid item xs={12} sm={3}>

                <Paper style={{ backgroundColor: "#D2CFE5" }}>

                    <CardHeader
                        avatar={
                            <Avatar alt={item.nome} src={item.imagem} ></Avatar>
                        }

                        title={item.nome} subheader={item.funcao}
                    />


                </Paper>

            </Grid>
        </>
    );
}