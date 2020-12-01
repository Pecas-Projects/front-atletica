import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import Jogo from './Jogo'


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: "#D2CFE5",
        marginBottom: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    nomeCategoria: {
        marginLeft: 8
    },
    timePaper: {
        backgroundColor: '#BBB8CC',
        flexDirection: "row"
    }
}));

export default function Categoria(props) {
    const { categoria } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const jogos = [
        {
            jogoId: 2,
            dataHora: "2020-11-12T18:29:40.871",
            times: [
                {
                    timeId: 1,
                    atleticaId: 1,
                    nome: "Davi Fezes",
                    pontos: 42,
                    registrouEscalacao: true,
                    atletas: [
                        {
                            nome: "Davi Costa",
                            atletaAtleticaModalidadeTimeEscaladoId: 2,
                            timeEscaladoId: 1,
                            atletaAtleticaModalidadeId: 1,
                            funcaoId: 1,
                            numero: 17,
                            infracoes: 51,
                            pontos: 21
                        },
                        {
                            nome: "Bia braba",
                            atletaAtleticaModalidadeTimeEscaladoId: 3,
                            timeEscaladoId: 1,
                            atletaAtleticaModalidadeId: 2,
                            funcaoId: 1,
                            numero: 17,
                            infracoes: 51,
                            pontos: 21
                        }
                    ]
                },
                {
                    timeId: 2,
                    atleticaId: 1,
                    nome: "Davi Fezes",
                    pontos: 42,
                    registrouEscalacao: true,
                    atletas: [
                        {
                            nome: "Maria DBA",
                            atletaAtleticaModalidadeTimeEscaladoId: 4,
                            timeEscaladoId: 2,
                            atletaAtleticaModalidadeId: 4,
                            funcaoId: 1,
                            numero: 17,
                            infracoes: 51,
                            pontos: 21
                        },
                        {
                            nome: "Guilgerme Vago",
                            atletaAtleticaModalidadeTimeEscaladoId: 5,
                            timeEscaladoId: 2,
                            atletaAtleticaModalidadeId: 2,
                            funcaoId: 1,
                            numero: 17,
                            infracoes: 51,
                            pontos: 21
                        }
                    ]
                }
            ]
        },
        {
            jogoId: 3,
            dataHora: "2020-11-12T18:29:40.871",
            times: [
                {
                    timeId: 3,
                    atleticaId: 2,
                    nome: "Davi",
                    pontos: 15,
                    registrouEscalacao: true,
                    atletas: []
                },
                {
                    timeId: 4,
                    atleticaId: 1,
                    nome: "Davi Fezes",
                    pontos: 42,
                    registrouEscalacao: false,
                    atletas: [
                        {
                            nome: "Atori Bribo",
                            atletaAtleticaModalidadeTimeEscaladoId: 10,
                            timeEscaladoId: 4,
                            atletaAtleticaModalidadeId: 1,
                            funcaoId: 1,
                            numero: 17,
                            infracoes: 51,
                            pontos: 21
                        },
                        {
                            nome: "Nanda Troll",
                            atletaAtleticaModalidadeTimeEscaladoId: 11,
                            timeEscaladoId: 4,
                            atletaAtleticaModalidadeId: 2,
                            funcaoId: 1,
                            numero: 17,
                            infracoes: 51,
                            pontos: 21
                        }
                    ]
                }
            ]
        }
    ]

    return (
        <Grid item container justify='center'>
            <Card className={classes.root}>
                <CardActions disableSpacing>
                    <Typography className={classes.nomeCategoria}>{categoria.modalidade}</Typography>
                    <IconButton
                        style={{ outline: 'none' }}
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {jogos.map((item) => (
                            <Jogo jogo={item} />
                        ))}
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
}