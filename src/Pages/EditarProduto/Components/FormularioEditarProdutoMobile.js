import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, IconButton } from "@material-ui/core";
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
    const [produto, setProduto] = useState({
        ProdutoId: props.produtoId,
        Nome: "",
        Descricao: "",
        Preco: "",
        ProdutoCategoriaId: undefined,
        Estoque: false,
        AtleticaId: getAtleticaId(),
        ImagemId: null
    });

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
                    produto.ProdutoCategoriaId === undefined ?
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
                                    <Grid item xs={12}>
                                        <AvField name="categoria" label="Categoria" type="select">
                                            <option>Roupa</option>
                                        </AvField>
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
