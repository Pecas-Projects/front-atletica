import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Card, CardContent, Avatar, Typography } from "@material-ui/core";
import fotoPerfil from "../../../assets/imagem/fotoPerfil.png";
import Rectangle_Yellow_Ranking from "../../../assets/imagem/Rectangle_Yellow_Ranking.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
    card: {
        backgroundColor: "#C4C4C4",
        maxWidth: "100%",
        borderRadius: "16"
    },
    content: {
        flex: '1 0 auto',
        padding: "2%",
        marginTop: "5%",
        marginLeft: "20%"
    },
    cover: {
        width: 151,

    },
    position: {
        justifyItems: "center",
        color: "white",
        fontSize: 64,
        margin: 10,
    },
}));

function CardAtletica(props) {
    const classes = useStyles();
    const { item } = props;

    return (
        <>
            <Grid item style={{ marginBottom: 20 }} xs={12} >
                <Card className={classes.card}>
                    <Grid container xs={12} spacing={0}>
                        <Grid item xs={2}>
                            <CardContent style={{ padding: "10%" }}>
                                <Avatar alt="Remy Sharp" src={fotoPerfil} className={classes.large} />
                            </CardContent>
                        </Grid>

                        <Grid item xs={7}>
                            <CardContent className={classes.content}>
                                <Typography variant="body2" gutterBottom style={{ fontSize: 18 }}>
                                    {item.atletica}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {item.faculdade}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Número de jogos: {item.jogos}
                                </Typography>
                            </CardContent>

                        </Grid>

                        <Grid item xs={3}>
                            <CardContent style={{ backgroundColor: "#F68D2E", maxWidth: "100%" }}>
                                <Grid container direction="column" alignItems="center" justify="center">
                                    <Typography className={classes.position} variant="body2" component="p">
                                        #{item.posicao}
                                    </Typography>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>

            </Grid>

        </>
    );
}

export default CardAtletica;