import React, { useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CardAtleta from "./CardAtleta"
import clsx from 'clsx';
import "../styles.css"

const useStyles = makeStyles((theme) => ({

    paperA: {
        width: "85%",
        marginTop: 20,
        padding: "2%",
        backgroundColor: "#BBB8CC",
    },

}));

export default function CardModalidade(props) {

    const { item } = props;

    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (

        <Paper className={classes.paperA}>

            <div className="relativeCard">

                <Grid container>

                    <Grid item xs={8}>

                        <h4 className="MySubtitle">{item.nome}</h4>
                        <br />
                        <p className="MySubtitle2">Coordenador: {item.coordenador}</p>

                    </Grid>

                    <Grid item xs={2}>

                        <div className="absoluteCard2">

                            <IconButton style={{ marginTop: -10 }}>
                                <EditIcon />
                            </IconButton>

                        </div>

                    </Grid>

                    <Grid item xs={2}>

                        <div className="absoluteCard">

                            <IconButton
                                style={{ marginTop: -10 }}
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>


                        </div>
                    </Grid>
                </Grid>
            </div>

            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <Grid container spacing={3}>

                    {item.atletas.map((atleta) =>
                        <CardAtleta atleta={atleta} />
                    )}

                </Grid>

            </Collapse>

        </Paper>

    );
}