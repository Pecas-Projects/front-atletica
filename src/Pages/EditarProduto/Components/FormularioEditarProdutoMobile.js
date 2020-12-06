import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Button, Switch, FormControlLabel, TextField, MenuItem } from "@material-ui/core";
import ApiService from "../../../variables/ApiService";
import { getAtleticaId } from "../../../utils/storage";



export default function FormularioProdutoMobile(props) {


    const [categorias, setCategorias] = useState([]);
    const [produto, setProduto] = useState({
        produtoId: props.produtoId,
        nome: "",
        descricao: "",
        preco: "",
        produtoCategoriaId: undefined,
        estoque: false,
        atleticaId: getAtleticaId(),
        imagemId: undefined
    });

    const defaultValues = {
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
    };

    const handlePrecoChange = (e) => {
        setProduto({...produto, preco: e.target.value})
    }

    const handleEstoqueChange = (e) => {
        e.preventDefault();
        setProduto({...produto, estoque: !produto.estoque})
      };

    useEffect(() => {
        buscarTodasCategorias();
        buscarProduto();
    }, []);

    async function buscarProduto() {
        await ApiService.BuscarProdutoId(produto.produtoId)
            .then((res) => {
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

    async function atualizarProduto(){
        
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
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function submit(){
        atualizarProduto();
    }

    return (
        <>

            <Grid container style={{ marginBottom: 15 }}>
                {
                    produto.produtoCategoriaId === undefined ?
                        <h4 className="MyTitle">Carregando...</h4>
                        :
                        <>
                            <h4 className="MyTitle">Editar Produto</h4>
                            <Typography
                                variant="h8"
                                style={{ color: "#454256" }}
                            >
                                Edite um produto da aba produtos da sua atlética
                            </Typography>

                            <AvForm model={defaultValues}>
                                <Grid container style={{ paddingTop: 50 }}>
                                    <Grid item xs={12}>
                                        <AvField
                                            disabled
                                            name="nome"
                                            label="Nome do Produto"
                                            type="text"
                                            style={{ color: "E2E2E2" }}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AvField
                                            disabled
                                            name="descricao"
                                            label="Descrição"
                                            type="textarea"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AvField name="preco" label="Preço" type="number" onChange={handlePrecoChange} />
                                    </Grid>
                                    <Grid item xs={6}>
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
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            style={{ marginTop: 25, marginLeft: 10 }}
                                            control={<Switch name="estoque" checked={produto.estoque} />}
                                            label="Em estoque"
                                            onChange={handleEstoqueChange}
                                        />
                                    </Grid>
                                    <Grid container justify="center" style={{ marginTop: 10 }}>
                                        <Grid item>
                                            <Typography>
                                                Para que seja possivel o upload de imagem, acesse
                                                nosso sistema pelo computador
                                            </Typography>
                                        </Grid>

                                        <Button
                                            style={{
                                                marginTop: 30,
                                                background: "#DB4922",
                                            }}
                                            fullWidth={true}
                                            onClick={submit}
                                        >
                                            Postar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </AvForm>
                        </>
                }
            </Grid>
        </>
    );
}
