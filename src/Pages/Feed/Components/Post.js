import React from "react";
import { getAtleticaId } from "../../../utils/storage";
import ApiService from "../../../variables/ApiService";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import fotoPost from "../../../assets/imagem/image 6.svg";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Grid, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#807D8E",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Post(props) {
  const classes = useStyles();
  const { post } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function formataDataHora() {
    let date = post.dataHora.substring(8, 10);
    date += "/" + post.dataHora.substring(5, 7);
    date += "/" + post.dataHora.substring(0, 4);

    return date;
  }

  const DeletePost = async () => {
    await ApiService.ExcluirPost(post.publicacaoId)
      .then(() => {
        setMsg("Publicação deletada com sucesso!");
        setStatus("success");
        setOpen(true);
        setTimeout(() => {
          document.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Algo deu arrado! Não foi possivel deletar a publicação");
        setStatus("error");
        setOpen(true);
      });
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status}>
          {msg}
        </Alert>
      </Snackbar>
      <Grid container justify="center" style={{ marginBottom: 20 }}>
        <Card className={classes.root}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={10}>
              <CardHeader title={post.titulo} subheader={formataDataHora()} />
            </Grid>
            {parseInt(getAtleticaId()) === post.atleticaId && (
              <Grid item xs={2}>
                <Button onClick={DeletePost}>
                  <DeleteIcon />
                </Button>
              </Grid>
            )}
          </Grid>
          <CardMedia
            className={classes.media}
            image={post.imagem.path}
            title="Foto do produto"
          />

          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{post.descricao}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </>
  );
}
