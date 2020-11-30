import React, { useState } from "react";
import { Grid, Paper, Typography, Snackbar, Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';
import ApiService from "../../../variables/ApiService"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CardAtletaAdd(props) {

    const { atleta, AtleticaModalidadeId, DeleteAtletaAdd, index } = props;

    const [openAdd, setOpenAdd] = useState(false)
    const [openAdicionar, setOpenAdicionar] = useState(false)


    const handleCloseAdd = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAdd(false);
    };

    const handleOpenAdd = () => {

        ApiService.AdicionarAtletaModalidade(atleta.atletaId, AtleticaModalidadeId)
            .then(res => {
                console.log(res)
                setOpenAdicionar(false)
                setOpenAdd(true)
                DeleteAtletaAdd(index)
            })

    }

    const handleOpenAdicionar = () => {
        setOpenAdicionar(true)
    }

    const handleCloseAdicionar = () => {
        setOpenAdicionar(false)
    }

    return (
        <>
            <Snackbar open={openAdd} autoHideDuration={4000} onClose={handleCloseAdd}>
                <Alert onClose={handleCloseAdd} severity="success">
                    Atleta adicionado com sucesso!
                </Alert>
            </Snackbar>

            <Grid item xs={12} sm={3}>

                <Paper style={{ padding: "4%", backgroundColor: "#D2CFE5" }}>

                    <Grid container>

                        <Grid item xs={8}>

                            <Typography style={{ fontSize: 14 }}>

                                {atleta.nome}
                            </Typography>

                        </Grid>

                        <Grid item xs={4}>

                            <Grid container justify='flex-end'>

                                <IconButton onClick={handleOpenAdicionar} style={{ marginTop: -15 }}>
                                    <AddIcon style={{ color: "green" }} />
                                </IconButton>

                            </Grid>

                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

            <div>

                <Dialog
                    open={openAdicionar}
                    onClose={handleCloseAdicionar}

                >
                    <DialogTitle id="alert-dialog-excluir">{"Tem certeza que deseja adicionar esse atleta a modalidade?"}</DialogTitle>

                    <DialogActions>
                        <Button onClick={handleOpenAdd} color="primary">
                            Adicionar
        </Button>
                        <Button variant='outlined' onClick={handleCloseAdicionar} color="primary" autoFocus>
                            Cancelar
        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </>
    );
}