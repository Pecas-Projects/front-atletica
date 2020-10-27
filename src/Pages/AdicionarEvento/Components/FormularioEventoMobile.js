import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, IconButton } from "@material-ui/core";

function FormularioEventoMobile() {

    return (
        <>
            <Grid container justify="center" style={{ marginBottom: 25 }}>
                <h4 className="MyTitle">Adicionar Evento</h4>
                <Typography variant="h8" style={{ color: "#454256", paddingBottom:50 }}>
                    Adicione um evento ao calendário da sua atlética
                </Typography>
                <AvForm>
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={12}>
                            <AvField
                                name="Nome:"
                                label="Nome do Evento:"
                                type="text"
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: "Campo obrigatório",
                                    },
                                    minLength: { value: 2, errorMessage: "Nome inválido" },
                                    maxLength: { value: 45, errorMessage: "Nome inválido" },
                                }}
                                style={{ color: "E2E2E2" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AvField
                                name="Descrição:"
                                label="Descrição do Evento:"
                                type="text"
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: "Campo obrigatório",
                                    },
                                    minLength: { value: 2, errorMessage: "Descrição inválida" },
                                }}
                            />
                        </Grid>

                        {/* <Grid container spacing={2}> */}
                            <Grid item xs={6} >
                                <AvField name="Data" label="Data:" type="date" />
                            </Grid>
                            <Grid item xs={6}>
                                <AvField name="Visivel" label="Visível para:" type="select" />
                            </Grid>
                            <Grid item xs={6}>
                                <AvField name="Categoria do evento" label="Categoria:" type="select" />
                            </Grid>
                            <Grid item xs={6}>
                                <AvField name="preço" label="Preço" type="number" />
                            </Grid>
                        {/* </Grid> */}

                        <Grid item xs={12}>
                            <AvField
                                name="Local:"
                                label="Local do Evento:"
                                type="text"
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: "Campo obrigatório",
                                    },
                                    minLength: { value: 2, errorMessage: "Local inválido" },
                                }}
                            />
                        </Grid>

                        <Button
                            style={{
                                background: "#DB4922",
                                // marginTop: 20
                            }}
                            fullWidth={true}
                        >
                            Postar
                        </Button>

                    </Grid>
                </AvForm>
            </Grid>
        </>
    );
}

export default FormularioEventoMobile;