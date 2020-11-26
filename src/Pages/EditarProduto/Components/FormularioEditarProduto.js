import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, Switch, FormControlLabel, TextField, MenuItem } from "@material-ui/core";
import BotaoUploadImagem from "../../../Components/BotaoUploadImagem"

const useStyles = makeStyles((theme) => ({

    paperA: {
        width: "85%",
        marginTop: 20,
        padding: "2%",
        backgroundColor: "#BBB8CC",
    },

}));


export default function FormularioProduto() {

    const classes = useStyles();

    const [imagem, setImagem] = useState(null);
    const [path, setPath] = useState();
    const [estoque, setEstoque] = useState(false)
    const [categoria, setCategoria] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')
    const [nome, setNome] = useState('')

    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value)
    }

    const handleNomeChange = (e) => {
        setNome(e.target.value)
    }

    const handleDescricaoChange = (e) => {
        setDescricao(e.target.value)
    }

    const handlePrecoChange = (e) => {
        setPreco(e.target.value)
    }

    const handleEstoquChange = () => {
        setEstoque(estoque => !estoque)
    }


    const categorias = ["categoria 1", "categoria 2", "categoria 3"];

    function showAdicionarImagem() {
        if (imagem === null) {
            return <p>Adicione uma Imagem</p>
        } else return <div><br /><br /></div>;
    }

    return (
        <>
            <Grid container justify="center" style={{ marginBottom: 25 }}>


                <Paper className={classes.paperA}>

                    <h4 className="MyTitle">Editar Produto</h4>

                    <Typography variant="h8" style={{ color: "#454256" }}>
                        Edite um produto da aba produtos da sua atlética
            </Typography>

                    <AvForm>
                        <Grid container spacing={1} style={{ paddingTop: 20 }}>
                            <Grid item xs={4}>

                                {showAdicionarImagem()}
                                <Paper style={{ backgroundColor: "#636363", width: 250 }}>
                                    <Grid
                                        container
                                        justify="center"
                                        alignContent="center"
                                        style={{ height: 250, marginTop: -7 }}
                                    >
                                        <BotaoUploadImagem setPath={setPath} setImagem={setImagem} imagem={imagem} path={path} />
                                    </Grid>
                                </Paper>
                            </Grid>

                            <Grid item xs={8}>

                                <AvField
                                    name="nome"
                                    label="Nome do Produto"
                                    type="text"
                                    disabled
                                    style={{ color: "E2E2E2" }}
                                />
                                <AvField
                                    name="descrição"
                                    label="Descrição"
                                    type="textarea"
                                    disabled
                                />

                                <Grid container spacing={2}>

                                    <Grid item xs={4}>
                                        <AvField name="preço" label="Preço" type="number" />
                                    </Grid>

                                    <Grid item xs={4}>

                                        <TextField
                                            fullWidth
                                            id="standard-select-categoria"
                                            select
                                            label="Categoria"
                                            style={{ marginTop: 5, marginLeft: 5 }}
                                            value={categoria}
                                            onChange={handleCategoriaChange}
                                            disabled
                                        >
                                            {categorias.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                    </Grid>

                                    <Grid item xs={4}>

                                        <FormControlLabel
                                            style={{ marginTop: 25, marginLeft: 10 }}
                                            control={<Switch name="estoque" />}
                                            label="Em estoque"
                                            onChange={handleEstoquChange}
                                        />

                                    </Grid>

                                </Grid>

                            </Grid>


                            <Grid item xs={12}>
                                <Grid
                                    container
                                    justify="flex-end"
                                // style={{ paddingRight: 20 }}
                                >
                                    <Button
                                        color='secondary'
                                        variant='contained'
                                        style={{ width: 300 }}
                                    >
                                        Postar
                      </Button>

                                </Grid>
                            </Grid>
                        </Grid>
                    </AvForm>
                </Paper>
            </Grid>

        </>
    );
}