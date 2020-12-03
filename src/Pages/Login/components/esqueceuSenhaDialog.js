import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import ApiService from "../../../variables/ApiService";

export default function FormDialog(props) {
  const [email, setEmail] = useState("");
  const { aberto, setAberto, login } = props;
  const [err, setErr] = useState(false);
  const [response, setResponse] = useState(false);
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleClose = () => {
    setAberto(false);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    let value;

    if (login.Type === "Atletica") {
      value = {
        tipo: "A",
        email: email,
      };
    } else if (login.Type === "Membro") {
      value = {
        tipo: "M",
        email: email,
      };
    }

    await ApiService.ReseteSenha(value)
      .then(() => setResponse(true))
      .catch(() => setErr(true));
  };

  return (
    <div>
      <Dialog
        open={aberto}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Redefinir Senha</DialogTitle>
        <form onSubmit={onFormSubmit}>
          <DialogContent>
            <DialogContentText>
              Digite aqui o seu E-mail e você poderá redefinir a sua senha!
            </DialogContentText>
            {response ? (
              <Alert severity="success">
                E-mail de recuperação enviado, verifique sua caixa de entrada
              </Alert>
            ) : (
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
            )}
            {err && (
              <Alert severity="error" style={{ marginTop: 20 }}>
                {"Nenhum(a) " +
                  login.Type +
                  " encontrado(a), verifique o email!"}
              </Alert>
            )}
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
