import React from "react";
import Alert from "@material-ui/lab/Alert";

export default function SimpleAlerts({ status, mensagem }) {
  return (
    <Alert style={{ marginTop: 30 }} severity={status}>
      {mensagem}
    </Alert>
  );
}
