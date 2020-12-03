import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ApiService from "../../../variables/ApiService";

export default function FormDialog(props) {
  const [email, setEmail] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleClose = () => {
    props.setAberto(false);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    let email = {
      email: email,
    };

    await ApiService;
  };

  return (
    <div>
      <Dialog
        open={props.aberto}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Redefinir Senha</DialogTitle>
        <form onSubmit={onFormSubmit}>
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
              value={email}
              onChange={handleChangeEmail}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ color: "red" }}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Enviar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
