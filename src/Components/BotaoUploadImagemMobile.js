import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, IconButton } from "@material-ui/core";
import AddFile from "../../src/assets/imagem/file-add.svg";
import RemoveFile from "../../src/assets/imagem/close-o.svg";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

export default function BotaoUploadImagemMobile(props) {
  const classes = useStyles();

  function handleRemoveFile() {
    props.setImagem(null);
  }

  function handleFileChange({ target: { files } }) {
    const cancel = !files.length;
    if (cancel) return;

    const [{ size, name }] = files;
    const maxSize = 2000000;
    let reader = new FileReader();

    if (size < maxSize) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        props.setPath([reader.result]);
      };
      props.setImagem(files[0]);
    }
  }

  if (props.imagem !== null) {
    return (
      <>
        <Grid container style={{marginTop: -50}}>
          <Grid item xs={4}>
            <Button onClick={handleRemoveFile}>
              <IconButton aria-label="remove imagem" component="span" style={{marginBottom:-10}}>
                <img src={RemoveFile} alt="remover imagem" />
              </IconButton>
            </Button>
          </Grid>
          <Grid item xs={8} style={{marginBottom:-10}}>
            <br />
            <p>Remover Imagem</p>
          </Grid>

          <img
            src={props.path}
            alt="adicionar imagem"
            style={{ width: 250, height: 250 }}
          />
        </Grid>
      </>
    );
  } else {
    return (
      <div>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <img src={AddFile} alt="adicionar imagem" />
          </IconButton>
        </label>
      </div>
    );
  }
}
