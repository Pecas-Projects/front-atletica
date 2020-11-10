import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Avatar, Typography } from "@material-ui/core";
import fotoPerfil from "../../../assets/imagem/fotoPerfil.png";

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
        width: theme.spacing(11),
        height: theme.spacing(11),
    },
    card: {
        backgroundColor: "#C4C4C4",
        maxWidth: "100%",
        borderRadius: "16",
        maxHeight: "100%,"
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
        fontSize: 45,
    },
}));

function AtleticaMobile(props) {
    const classes = useStyles();
    const { item } = props;
    return (
        <>
            <Grid item style={{ marginTop: 20 }} xs={12} >
                <Card className={classes.card}>
                    <Grid container xs={12} spacing={0}>
                        <Grid item xs={4}>
                            <Grid container justify="center">
                                <CardContent style={{ padding: "10%", marginLeft: "25%", marginTop: "8%" }}>
                                    <Avatar alt="Remy Sharp" src={fotoPerfil} className={classes.large} />
                                </CardContent>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
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

                        <Grid item xs={12}>
                            <CardContent style={{ backgroundColor: "#F68D2E", maxWidth: "100%", maxHeight: "100%" }}>
                                <Grid container direction="row" alignItems="center" justify="center">
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
};

export default AtleticaMobile;