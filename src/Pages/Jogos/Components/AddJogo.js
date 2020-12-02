import React, { useState, useEffect } from 'react'
import { Card, Grid, Button, CardHeader, CardContent } from '@material-ui/core';
import { FormGroup, Label, Input } from 'reactstrap';
import { AvField, AvForm } from "availity-reactstrap-validation"
import { makeStyles } from '@material-ui/core/styles';
import ApiService from '../../../variables/ApiService'
import { getAtleticaId } from '../../../utils/storage'

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: "#D2CFE5"
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

export default function AddJogo() {
    const classes = useStyles();
    const [emptyDate, setEmptyDate] = useState(false);
    const [emptyTime, setEmptyTime] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [atleticas, setAtleticas] = useState([])
    const [atleticaId, setAtleticaId] = useState(null)
    const [modalidades, setModalidades] = useState([])
    const [modalidadeId, setModalidadeId] = useState(null)

    useEffect(() => {
        buscaAtleticas()
        buscaModalidades()
    }, []);

    const handleSubmitClick = () => {

        if (date == "")
            setEmptyDate(true)
        else
            setEmptyDate(false)

        if (time == "")
            setEmptyTime(true)
        else
            setEmptyTime(false)
    };

    const buscaAtleticas = async () => {
        await ApiService.BuscarTodasAtleticas()
            .then(res => {
                setAtleticas(res.data)
                if (res.data != null && res.data.length > 0)
                    setAtleticaId(res.data[0].atleticaId)
            })
            .catch(err =>
                console.log(err)
            )
    }

    const buscaModalidades = async () => {
        await ApiService.BuscarAtleticaModalidades(getAtleticaId())
            .then(res => {
                setModalidades(res.data)
                if (res.data !== null && res.data.length > 0)
                    setModalidadeId(res.data[0].modalidadeId)
            })
            .catch(err =>
                console.log(err)
            )
    }

    return (
        <>
            {/* DESKTOP */}
            <div className={classes.sectionDesktop}>
                <Card className={classes.root}>
                    <CardHeader
                        titleTypographyProps={{
                            variant: 'h4',
                            style: { fontFamily: "Roboto Condensed" }
                        }}
                        title="NOVO JOGO"
                        subheader="Convide outra atlética para um jogo" />
                    <CardContent>
                        <AvForm>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AvField
                                        name="adversario"
                                        label="Adversário"
                                        type="select"
                                        onChange={(e) => setAtleticaId(e.target.value)}
                                        value={atleticaId}
                                    >
                                        {
                                            atleticas.map((atletica) =>
                                                <option
                                                    key={atletica.atleticaId}
                                                    value={atletica.atleticaId}
                                                >
                                                    {atletica.nome}
                                                </option>
                                            )
                                        }
                                    </AvField>
                                </Grid>
                                <Grid item xs={6}>
                                    <AvField
                                        name="modalidade"
                                        label="Modalidade"
                                        type="select"
                                        onChange={(e) => setModalidadeId(e.target.value)}
                                        value={modalidadeId}
                                    >
                                        {
                                            modalidades.map((modalidade) =>
                                                <option
                                                    key={modalidade.modalidadeId}
                                                    value={modalidade.modalidadeId}
                                                >
                                                    {modalidade.modalidade}
                                                </option>
                                            )
                                        }
                                    </AvField>
                                </Grid>
                                <Grid item xs={4}>
                                    <AvField name="categoria" label="Categoria" type="select">
                                        <option>Treino</option>
                                        <option>Campeonato</option>
                                    </AvField>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormGroup>
                                        <Label for="exampleDate">Data</Label>
                                        <Input
                                            type="date"
                                            name="date"
                                            id="exampleDate"
                                            placeholder="date placeholder"
                                            invalid={emptyDate}
                                            value={date}
                                            onChange={(event) => setDate(event.target.value)}
                                        />
                                    </FormGroup>

                                </Grid>
                                <Grid item xs={4}>
                                    <FormGroup>
                                        <Label for="exampleTime">Hora</Label>
                                        <Input
                                            type="time"
                                            name="time"
                                            id="exampleTime"
                                            placeholder="time placeholder"
                                            invalid={emptyTime}
                                            value={time}
                                            onChange={(event) => setTime(event.target.value)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <AvField name="local" label="Local" type="text" validate={{
                                        required: { value: true, errorMessage: "Campo obrigatório" },
                                        maxLength: "45",
                                    }} />
                                </Grid>
                                <Grid item xs={8} />
                                <Grid item xs={4}>
                                    <Button onClick={handleSubmitClick} type='submit' style={{ width: '100%' }} variant="contained" color="secondary">Enviar solicitação</Button>
                                </Grid>
                            </Grid>
                        </AvForm>
                    </CardContent>
                </Card>
            </div>
            {/* CELULAR */}
            <div className={classes.sectionMobile}>
                <Card className={classes.root}>
                    <CardHeader
                        titleTypographyProps={{
                            variant: 'h4',
                            style: { fontFamily: "Roboto Condensed" }
                        }}
                        title="NOVO JOGO"
                        subheader="Convide outra atlética para um jogo" />
                    <CardContent>
                        <AvForm>
                            <Grid container>
                                <Grid item xs={12}>
                                    <AvField name="adversario" label="Adversário" type="select">
                                        <option>Cimatlética</option>
                                        <option>Manada</option>
                                    </AvField>
                                </Grid>
                                <Grid item xs={12}>
                                    <AvField
                                        name="modalidade"
                                        label="Modalidade"
                                        type="select"
                                        onChange={(e) => setModalidadeId(e.target.value)}
                                        value={modalidadeId}
                                    >
                                        {
                                            modalidades.map((modalidade) =>
                                                <option
                                                    key={modalidade.modalidadeId}
                                                    value={modalidade.modalidadeId}
                                                >
                                                    {modalidade.modalidade}
                                                </option>
                                            )
                                        }
                                    </AvField>
                                </Grid>
                                <Grid item xs={12}>
                                    <AvField name="categoria" label="Categoria" type="select">
                                        <option>Treino</option>
                                        <option>Campeonato</option>
                                    </AvField>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <Label for="exampleDate">Data</Label>
                                        <Input
                                            type="date"
                                            name="date"
                                            id="exampleDate"
                                            placeholder="date placeholder"
                                            invalid={emptyDate}
                                            value={date}
                                            onChange={(event) => setDate(event.target.value)}
                                        />
                                    </FormGroup>

                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <Label for="exampleTime">Hora</Label>
                                        <Input
                                            type="time"
                                            name="time"
                                            id="exampleTime"
                                            placeholder="time placeholder"
                                            invalid={emptyTime}
                                            value={time}
                                            onChange={(event) => setTime(event.target.value)}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <AvField name="local" label="Local" type="text" validate={{
                                        required: { value: true, errorMessage: "Campo obrigatório" },
                                        maxLength: "45",
                                    }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={handleSubmitClick} type='submit' style={{ width: '100%' }} variant="contained" color="secondary">Enviar solicitação</Button>
                                </Grid>
                            </Grid>
                        </AvForm>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}