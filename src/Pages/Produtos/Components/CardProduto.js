import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ApiService from "../../../variables/ApiService";
import "../styles.css";


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function CardProduto(props) {
  const classes = useStyles();
  const { item, atletica, index, DeleteProduto } = props;

  const removeProduto = () => {
    ApiService.DeletarProdutoAtletica(parseInt(item.produtoId))
      .then((res) => {
        console.log(res);
        DeleteProduto(index);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function apresentaIcones() {
    if (atletica !== null) {
      return (
        <>
            <IconButton aria-label="Editar Produto" className={classes.margin}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Editar Produto" className={classes.margin} onClick={removeProduto}>
              <DeleteIcon fontSize="small" />
            </IconButton>
        </>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }

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
             <Grid container xs={12}>
             <Grid item xs={8} container direction="column" >
                <Grid item>
                  <Typography gutterBottom style={{ color: "white", fontSize: 18 }}>
                    {item.nome}
                  </Typography>
                </Grid>
                <Grid item >
                  <p className="cardPrice">R$ {item.preco}</p>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.descricao}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container justify="flex-end" alignItems="flex-end" style={{marginBottom: -20}}>
                {apresentaIcones()}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
