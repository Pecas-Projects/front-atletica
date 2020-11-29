import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import "../styles.css";

export default function CardProduto(props) {
  const { item } = props;

  return (
    <>
      <Grid item xs={12} sm={4} style={{ marginBottom: 25 }}>
        <Card style={{ backgroundColor: "#73797D", maxWidth: 300 }}>
          <CardMedia
            image={item.imagem.path}
            title={item.titulo}
            style={{ height: 300 }}
          />

          <CardContent>
            <Typography gutterBottom style={{ color: "white", fontSize: 18 }}>
              {item.nome}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              {item.descricao}
            </Typography>

            <p className="cardPrice">R$ {item.preco}</p>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
