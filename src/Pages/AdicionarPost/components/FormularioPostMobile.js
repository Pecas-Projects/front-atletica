import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, Snackbar } from "@material-ui/core";
import BotaoUploadImagemMobile from "../../../Components/BotaoUploadImagemMobile";
import ApiService from "../../../variables/ApiService";
import { getAtleticaId, atleticaUsername } from "../../../utils/storage";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paperA: {
    width: "85%",
    marginTop: 20,
    padding: "2%",
    backgroundColor: "#BBB8CC",
  },
  paperB: {
    width: "85%",
    marginTop: -10,
    padding: "2%",
    backgroundColor: "#807D8E",
  },
  paperAMobile: {
    width: "100%",
    marginTop: -10,
    padding: "5%",
    backgroundColor: "#BBB8CC",
  },
  paperBMobile: {
    width: "100%",
    marginTop: -10,
    padding: "5%",
    backgroundColor: "#807D8E",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));



export default function FormularioPostMobile() {
  const classes = useStyles();
  const [imagem, setImagem] = useState(null);
  const [path, setPath] = useState();
  const [post, setPost] = useState({
    Titulo: "",
    Descricao: "",
    AtleticaId: parseInt(getAtleticaId()),
    ImagemId: null
  });

  const [openAceito, setOpenAceito] = useState(false)
  const [openRecusado, setOpenRecusado] = useState(false)

  const handleCloseAceito = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAceito(false);
  };

  const handleCloseRecusado = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenRecusado(false);
  };

  const handleTitleChange = (event) => {
    event.preventDefault();
    setPost({ ...post, Titulo: event.target.value })
  };

  const handleTextoChange = (event) => {
    event.preventDefault();
    setPost({ ...post, Descricao: event.target.value })
  };

  function showAdicionarImagem() {
    if (imagem === null) {
      return <p>Adicione uma Imagem</p>;
    } else
      return (
        <div>
          <br />
          <br />
        </div>
      );
  }

  async function envioImagem() {
    let file = new FormData();
    file.append('value', imagem);

    await ApiService.UploadImagem(file)
      .then((res) => {
        console.log(res)
        setPost({ ...post, ImagemId: res.data.imagemId })
      })
      .catch((error) => {
        console.log(error)
      });
  }

  async function criarPost() {
    await ApiService.EnviarPost(post)
      .then((res) => {
        setOpenAceito(true)
        setTimeout(function () { window.location.href = '/feed/' + atleticaUsername() }, 3000)
      })
      .catch((err) => {
        setOpenRecusado(true)
      });
  }

  useEffect(() => {
    if (post.ImagemId !== null)
      criarPost();
  }, [post]);

  async function submit() {
    envioImagem();
  }

  return (
    <>


      <Grid container style={{ marginBottom: 25 }}>
        <Paper className={classes.paperAMobile}>
          <Typography>Não é possível adicionar post pelo celular</Typography>
        </Paper>
      </Grid>
    </>
  );
}
