import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { CircularProgress, Grid, Typography, Paper, Button, Switch, FormControlLabel, TextField, MenuItem } from "@material-ui/core";
import BotaoUploadImagem from "../../../Components/BotaoUploadImagem"
import ApiService from "../../../variables/ApiService";
import { getAtleticaId, atleticaUsername } from "../../../utils/storage";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({

    paperA: {
        width: "85%",
        marginTop: 20,
        padding: "2%",
        backgroundColor: "#BBB8CC",
    },

}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function FormularioProduto(props) {

    const classes = useStyles();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [imagem, setImagem] = useState(null);
    const [path, setPath] = useState();
    const [imgId, setImgId] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [produto, setProduto] = useState({
        produtoId: props.produtoId,
        nome: "",
        descricao: "",
        preco: "",
        produtoCategoriaId: undefined,
        estoque: false,
        atleticaId: getAtleticaId(),
        imagemId: undefined,
        imagem: {}
    });

    const defaultValues = {
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
    };

    const handlePrecoChange = (e) => {
        setProduto({ ...produto, preco: e.target.value })
    }

    const handleEstoqueChange = (e) => {
        e.preventDefault();
        setProduto({ ...produto, estoque: !produto.estoque })
    };

    const handleCloseSuccess = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccess(false);
    };

    const handleCloseError = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setError(false);
    };

    useEffect(() => {
        buscarTodasCategorias();
        buscarProduto();
    }, []);

    async function buscarProduto() {
        await ApiService.BuscarProdutoId(produto.produtoId)
            .then((res) => {
                //     console.log(res.data)
                setImagem(res.data.imagem)
                setPath(res.data.imagem.path)
                setProduto(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function buscarTodasCategorias() {
        await ApiService.BuscarTodasCategorias()
            .then((response) => {
                setCategorias(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function envioImagem() {
        let file = new FormData();
        file.append('value', imagem);

        await ApiService.UploadImagem(file)
            .then((res) => {
                setProduto({ ...produto, imagemId: res.data.imagemId })
                setImgId(res.data.imagemId)
            })
            .catch((error) => {
                console.log(error)
                setError(true);
            });
    }

    async function atualizarProduto() {

        let produtoDados = {
            Nome: produto.nome,
            Descricao: produto.descricao,
            Preco: produto.preco,
            Estoque: produto.estoque,
            ProdutoCategoriaId: produto.produtoCategoriaId,
            ImagemId: produto.imagemId,
            AtleticaId: produto.atleticaId
        };

        await ApiService.AtualizarProduto(produto.produtoId, produtoDados)
            .then((res) => {
                console.log(res);
                setSuccess(true);
                setTimeout(function () { window.location.href = '/produtos/' + atleticaUsername() }, 3000)
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            })
    }

    function showAdicionarImagem() {
        if (imagem === null) {
            return <p>Adicione uma Imagem</p>
        } else return <div><br /><br /></div>;
    }

    function submit() {
        if (produto.imagem.path !== path && path !== null && path !== undefined) {
            envioImagem();
        }
        else {
            setImgId(produto.imagemId)
        }
    }

    useEffect(() => {
        if (produto.imagemId === imgId) {
            atualizarProduto();
        }
    }, [imgId]);

    return (
        <>
            <Snackbar
                open={success}
                autoHideDuration={4000}
                onClose={handleCloseSuccess}
            >
                <Alert onClose={handleCloseSuccess} severity="success">
                    Produto editado com sucesso!
                </Alert>
            </Snackbar>
            <Snackbar
                open={error}
                autoHideDuration={4000}
                onClose={handleCloseError}
            >
                <Alert onClose={handleCloseSuccess} severity="error">
                    Erro ao editar o produto!
                </Alert>
            </Snackbar>
            <Grid container justify="center" style={{ marginBottom: 25 }}>
                {
                    produto.produtoCategoriaId === undefined ?
                        <>
                            <div style={{ marginTop: 250 }}>
                                <Grid container justify="center">
                                    <CircularProgress size={100} color="primary" />
                                </Grid>
                            </div>
                        </>
                        :
                        <Paper className={classes.paperA}>

                            <h4 className="MyTitleProduto">Editar Produto</h4>

                            <Typography variant="h8" style={{ color: "#454256" }}>
                                Edite um produto da aba produtos da sua atlética
                            </Typography>

                            <AvForm model={defaultValues} onSubmit={submit}>
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
                                            name="descricao"
                                            label="Descrição"
                                            type="textarea"
                                            disabled
                                        />

                                        <Grid container spacing={2}>

                                            <Grid item xs={4}>
                                                <AvField name="preco" label="Preço" type="number" value={produto.Preco} onChange={handlePrecoChange} />
                                            </Grid>

                                            <Grid item xs={4}>

                                                <TextField
                                                    fullWidth
                                                    id="standard-select-categoria"
                                                    select
                                                    label="Categoria"
                                                    style={{ marginTop: 5, marginLeft: 5 }}
                                                    value={produto.produtoCategoriaId}
                                                    disabled
                                                >
                                                    {categorias.map((option) => (
                                                        <MenuItem value={option.produtoCategoriaId} key={option.nome}>
                                                            {option.nome}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>

                                            </Grid>

                                            <Grid item xs={4}>

                                                <FormControlLabel
                                                    style={{ marginTop: 25, marginLeft: 10 }}
                                                    control={<Switch checked={produto.estoque} name="estoque" onChange={handleEstoqueChange} />}
                                                    label="Em estoque"

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
                                                type="submit"
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
                }
            </Grid>

        </>
    );
}
