import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function PaginaInicial(props) {
  const { imagem, legenda } = props;

  return (
    <Grid item md={3} justify="center">
      <Avatar
        style={{
          width: 80,
          height: 80,
          backgroundColor: "#0D0C96",
          marginLeft: 110,
        }}
      >
        <img src={imagem} />
      </Avatar>
      <br />
      <Typography align="center" style={{ fontFamily: "Roboto Condensed" }}>
        {legenda}
      </Typography>
    </Grid>
  );
}
