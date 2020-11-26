import React, { useEffect, useState, useContext } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Grid, Paper, Button } from "@material-ui/core";
import NavBar from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import CardModalidade from "./Components/CardModalidade"
import CardModalidadeMobile from './Components/CardModalidadeMobile'
import CardAddModalidade from "./Components/CardAddModalidade"
import CardAddModalidadeMobile from "./Components/CardAddModalidadeMobile"
import ApiService from "../../variables/ApiService"
import AuthContext from "../../context/auth"

// import "./stylesModalidade.css"

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

export default function AdicionarModalidade() {

    const { userInfo, userType } = useContext(AuthContext);


    useEffect(() => {

        console.log(userInfo)

        async function getInfo(id) {

            await ApiService.ModalidadesAtletica(id)
                .then((res) => {
                    console.log(res)
                });
        }

        if (userInfo !== undefined) {
            console.log(userInfo)
            getInfo(userInfo.atleticaId);
        }



    }, [userInfo])

    const [modalidades, setModalidades] = useState([
        {
            nome: "Futebol Feminino",
            coordenador: "Maria Antônia",
            atletas: ["Beatriz Calazans", "Maria Antônia", "Ana Paula", "Fernanda Lisboa",
                "Beatriz Calazans", "Maria Antônia", "Ana Paula", "Fernanda Lisboa",
                "Beatriz Calazans", "Maria Antônia", "Ana Paula", "Fernanda Lisboa"]
        },
        {
            nome: "Vôlei Feminino",
            coordenador: "Ana Paula",
            atletas: ["Beatriz Calazans", "Maria Antônia", "Ana Paula", "Fernanda Lisboa",
                "Beatriz Calazans", "Maria Antônia", "Ana Paula", "Fernanda Lisboa",
                "Beatriz Calazans", "Maria Antônia", "Ana Paula", "Fernanda Lisboa"]
        },
        {
            nome: "Futebol Masculina",
            coordenador: "Davi Costa",
            atletas: ["Beatriz Calazans", "Maria Antônia", "Ana Paula", "Fernanda Lisboa",
                "Beatriz Calazans", "Maria Antônia", "Ana Paula", "Fernanda Lisboa",
                "Beatriz Calazans", "Maria Antônia", "Ana Paula", "Fernanda Lisboa"]
        },
    ])

    const classes = useStyles();

    const [value, setValue] = useState('Mostrar');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const DeleteModalidade = (index) => {

        let newArray = [...modalidades];
        newArray.splice(index, 1);
        setModalidades(newArray);


    };

    return (
        <div className={classes.root}>
            <NavBar />

            <main className={classes.content}>
                <div className={classes.toolbar} />

                {/*
        
        
        
        DESKTOP
        
        
        
        */}

                <div className={classes.sectionDesktop}>

                    <Grid container  >

                        <Grid item xs={12} >

                            <Grid container justify='flex-start' >
                                <FormControl component="fieldset" style={{ marginLeft: 90 }}>
                                    <RadioGroup row aria-label="modalidade" name="modalidade" value={value} onChange={handleChange}>
                                        <FormControlLabel value="Mostrar" control={<Radio />} label="Ver Modalidades" />
                                        <FormControlLabel value="Adicionar" control={<Radio />} label="Adicionar Modalidade" />
                                    </RadioGroup>
                                </FormControl>


                            </Grid>
                        </Grid>

                        {value === 'Mostrar' ? (

                            <Grid item xs={12}>

                                <Grid container justify="center">

                                    {modalidades.map((item, index) =>
                                        <CardModalidade
                                            item={item}
                                            index={index}
                                            DeleteModalidade={DeleteModalidade} />
                                    )}

                                </Grid>
                            </Grid>


                        ) : (
                                <>

                                    <Grid container justify='center'>

                                        <CardAddModalidade />

                                    </Grid>

                                </>
                            )}


                    </Grid>

                </div>

                {/* 
                
                
                
                
                MOBILE
                
                
                
                
                
                */}

                <div className={classes.sectionMobile}>

                    <Grid container  >

                        <Grid item xs={12} style={{ marginBottom: 30 }} >

                            <Grid container justify='flex-start' >
                                <FormControl component="fieldset" >
                                    <RadioGroup row aria-label="modalidade" name="modalidade" value={value} onChange={handleChange}>
                                        <FormControlLabel value="Mostrar" control={<Radio />} label="Ver Modalidades" />
                                        <FormControlLabel value="Adicionar" control={<Radio />} label="Adicionar Modalidade" />
                                    </RadioGroup>
                                </FormControl>


                            </Grid>
                        </Grid>

                        {value === 'Mostrar' ? (

                            <Grid item xs={12}>

                                <Grid container justify="center">

                                    {modalidades.map((item, index) =>
                                        <CardModalidadeMobile
                                            item={item}
                                            index={index}
                                            DeleteModalidade={DeleteModalidade} />
                                    )}

                                </Grid>
                            </Grid>


                        ) : (
                                <>

                                    <Grid container justify='center'>

                                        <CardAddModalidadeMobile />

                                    </Grid>

                                </>
                            )}


                    </Grid>


                </div>
            </main>
        </div>
    );
}