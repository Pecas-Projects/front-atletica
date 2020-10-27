import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Grid, Typography, Paper, Button, IconButton } from "@material-ui/core";


function FormularioEvento() {


    return (
        <>
            <Grid container justify="center" style={{ marginBottom: 25 }}>
                <Grid item xs={9}>
                    <Paper style={{ backgroundColor: "#D2CFE5", padding: 30 }}>
                        <h4 className="MyTitle">Adicionar Evento</h4>
                        <Typography variant="h8" style={{ color: "#454256" }}>
                            Adicione um evento ao calendário da sua atlética
                        </Typography>

                        <AvForm>
                            <Grid container spacing={5} style={{ paddingTop: 30 }}>
                                <Grid item xs={6}>
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
                                <Grid item xs={6}>
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

                                <Grid item xs={3} >
                                    <AvField name="Data" label="Data:" type="date" />
                                </Grid>
                                <Grid item xs={3}>
                                    <AvField name="Visivel" label="Visível para:" type="select" />
                                </Grid>
                                <Grid item xs={3}>
                                    <AvField name="Categoria do evento" label="Categoria:" type="select" />
                                </Grid>
                                <Grid item xs={3}>
                                    <AvField name="preço" label="Preço" type="number" />
                                </Grid>

                                <Grid item xs={6}>
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

                                <Grid item xs={6}>
                                    <Grid
                                        container
                                        justify="flex-end"
                                        style={{ paddingRight: 20 }}
                                    >
                                        <Button
                                            style={{
                                                background: "#DB4922",
                                                width: 200,
                                                marginTop: 24,
                                            }}
                                        >
                                            Postar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AvForm>
                    </Paper>
                </Grid>
            </Grid>

        </>
    );
}

export default FormularioEvento;