import React, { useState } from "react";
import {
    Grid,
    Paper,
    Avatar,
    CardHeader,
    IconButton,
    Snackbar
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { isLogin, getAtleticaId } from '../../../utils/storage'
import ApiService from '../../../variables/ApiService'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));

export default function CardMembro(props) {
    const classes = useStyles();
    const { item, atleticaId, removeMembro } = props;
    const [openAdd, setOpenAdd] = useState(false)

    const handleCloseAdd = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAdd(false);
    };

    const deletaMembro = async () => {
        await ApiService.ExcluiMembro(item.membro.membroId)
            .then(res => removeMembro(item))
            .catch(err => {
                console.log(err)
                setOpenAdd(true)
            })
    }

    return (
        <>
            <Snackbar open={openAdd} autoHideDuration={4000} onClose={handleCloseAdd}>
                <Alert onClose={handleCloseAdd} severity="error">
                    Ocorreu um erro! Não foi possível excluir seu membro
                </Alert>
            </Snackbar>
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
                                        <IconButton aria-label="Editar Produto"
                                            className={classes.margin}
                                            style={{ outline: 'none' }}
                                            onClick={deletaMembro}
                                        >
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