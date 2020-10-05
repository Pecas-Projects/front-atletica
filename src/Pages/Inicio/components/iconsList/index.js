import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function PaginaInicial(props) {
  const { icon, leganda, NumPadding } = props;

  return (
    <Grid
      container
      direction="row"
      style={{ paddingTop: NumPadding }}
      spacing={1}
    >
      <Grid item>
        <img src={icon} style={{ width: "90%" }} />
      </Grid>
      <Grid item style={{ padding: 20 }}>
        <Typography>{leganda}</Typography>
      </Grid>
    </Grid>
  );
}
