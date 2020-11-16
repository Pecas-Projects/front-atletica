import React, { useState } from "react";
import { Grid, Paper, Typography, Dialog, DialogActions, DialogTitle, Button, Snackbar } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CardAtletaDelete(props) {

    const { atleta, index, DeleteAtleta } = props

    const [openExcluir, setOpenExcluir] = useState(false)
    const [openExcluido, setOpenExcluido] = useState(false)

    const Deletar = () => {

        DeleteAtleta(index)
        setOpenExcluir(false)
        setOpenExcluido(true)
    };

    const handleExcluir = () => {
        setOpenExcluir(true);
    };

    const handleCloseExcluir = () => {
        setOpenExcluir(false);
    };

    const handleCloseExcluido = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenExcluido(false);
    };


    return (
        <>
            <Snackbar open={openExcluido} autoHideDuration={4000} onClose={handleCloseExcluido}>
                <Alert onClose={handleCloseExcluido} severity="success">
                    Atleta excluido com sucesso!
                </Alert>
            </Snackbar>
            <Grid item xs={12} sm={3}>

                <Paper style={{ padding: "4%", backgroundColor: "#D2CFE5" }}>

                    <Grid container>

                        <Grid item xs={8}>

                            <Typography style={{ fontSize: 14 }}>
                                {atleta}
                            </Typography>

                        </Grid>

                        <Grid item xs={4}>

                            <Grid container justify='flex-end'>

                                <IconButton style={{ marginTop: -15 }} onClick={handleExcluir} >
                                    <HighlightOffIcon color="secondary" />
                                </IconButton>

                            </Grid>

                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

            <div>

                <Dialog
                    open={openExcluir}
                    onClose={handleCloseExcluir}

                >
                    <DialogTitle id="alert-dialog-excluir">{"Tem certeza que deseja excluir esse atleta da modalidade?"}</DialogTitle>

                    <DialogActions>
                        <Button onClick={Deletar} color="primary">
                            Excluir
                        </Button>
                        <Button variant='outlined' onClick={handleCloseExcluir} color="primary" autoFocus>
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </>
    );
}