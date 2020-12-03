import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {

  const handleClose = () => {
    props.setAberto(false);
  };

  return (
    <div>
      <Dialog open={props.aberto} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Redefinir Senha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite aqui o seu E-mail e você poderá redefinir a sua senha!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Endereço de E-mail"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}