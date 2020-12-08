import React from "react";
import {
    Grid,
    Paper,
    Typography,
    Avatar,
    CardHeader,
    IconButton
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { isLogin, getAtleticaId } from '../../../utils/storage'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));

export default function CardMembro(props) {
    const classes = useStyles();
    const { item, atleticaId } = props;

    return (
        <>
            <Grid item xs={12} sm={3}>
                <Paper style={{ backgroundColor: "#D2CFE5" }}>
                    <Grid container alignItems="center">
                        {
                            isLogin() && getAtleticaId() == atleticaId ?
                                <>
                                    <Grid item xs={9}>
                                        <CardHeader
                                            avatar={<Avatar alt={item.nome} src={item.membro == null ? null : item.membro.imagem.path} />}
                                            title={item.nome + " " + item.sobrenome} subheader={item.funcao}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IconButton aria-label="Editar Produto" className={classes.margin} >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Grid>
                                </>
                                :
                                <Grid item xs={12}>
                                    <CardHeader
                                        avatar={<Avatar alt={item.nome} src={item.membro == null ? null : item.membro.imagem.path} />}
                                        title={item.nome + " " + item.sobrenome} subheader={item.funcao}
                                    />
                                </Grid>
                        }

                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}