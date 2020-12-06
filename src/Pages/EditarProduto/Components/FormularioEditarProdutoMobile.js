import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, Switch, FormControlLabel, IconButton } from "@material-ui/core";
import BotaoUploadImagemMobile from "../../../Components/BotaoUploadImagemMobile";
import ApiService from "../../../variables/ApiService";
import { getAtleticaId } from "../../../utils/storage";

const useStyles = makeStyles((theme) => ({

    paperAMobile: {
        width: "100%",
        marginTop: -10,
        padding: "5%",
        backgroundColor: "#BBB8CC",
    }

}));


export default function FormularioProdutoMobile(props) {

    const classes = useStyles();

    const [imagem, setImagem] = useState(null);
    const [path, setPath] = useState();
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

    useEffect(() => {
        buscarTodasCategorias();
        buscarProduto();
    }, []);

    async function buscarProduto() {
        await ApiService.BuscarProdutoId(produto.produtoId)
            .then((res) => {
                console.log(res.data)
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

                            <AvForm>
                                <Grid container style={{ paddingTop: 50 }}>
                                    <Grid item xs={12}>
                                        <AvField
                                            disabled
                                            name="nome"
                                            label="Nome do Produto"
                                            type="text"
                                            style={{ color: "E2E2E2" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AvField
                                            disabled
                                            name="descrição"
                                            label="Descrição"
                                            type="textarea"

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AvField name="preço" label="Preço" type="number" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AvField name="categoria" label="Categoria" type="select">
                                            <option>Roupa</option>
                                        </AvField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            style={{ marginTop: 25, marginLeft: 10 }}
                                            control={<Switch name="estoque" />}
                                            label="Em estoque"
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
