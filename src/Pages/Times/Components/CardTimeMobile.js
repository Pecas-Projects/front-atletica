import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

export default function CardTime(props) {
  const { time } = props;

  return (
    <>
      <Grid container justify="center" style={{ marginBottom: 25 }}>
        <Card color="primary" style={{ backgroundColor: "#D2CFE5" }}>
          
        </Card>
      </Grid>
    </>
  );
}
