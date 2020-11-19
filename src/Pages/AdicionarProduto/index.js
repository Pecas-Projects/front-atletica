import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import FormularioProduto from "./components/FormularioProduto";
import FormularioProdutoMobile from "./components/FormularioProdutoMobile";
import FormularioEditarProduto from "./components/FormularioEditarProduto"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

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

export default function AdicionarProduto() {
  const classes = useStyles();
  const [opcao, setOpcao] = useState('Adicionar');

  const handleChange = (e) => {
    setOpcao(e.target.value)
  }

  return (
    <div className={classes.root}>
      <NavBar />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        {/*
        
        
        
        DESKTOP
        
        
        
        */}

        <div className={classes.sectionDesktop}>

          <Grid container justify="center">
            <Grid item xs={12} >

              <Grid container justify='flex-start' >
                <FormControl component="fieldset" style={{ marginLeft: 90 }}>
                  <RadioGroup row aria-label="modalidade" name="modalidade" value={opcao} onChange={handleChange}>
                    <FormControlLabel value="Adicionar" control={<Radio />} label="Adicionar Produto" />
                    <FormControlLabel value="Editar" control={<Radio />} label="Editar Produto" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            {opcao === "Adicionar" ? (

              <FormularioProduto />

            ) : (

                <FormularioEditarProduto />

              )}


          </Grid>
        </div>

        <div className={classes.sectionMobile}>
          <Grid container justify="center">
            <Grid container spacing={1} style={{ marginTop: 20 }}>
              <FormularioProdutoMobile />
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  );
}
