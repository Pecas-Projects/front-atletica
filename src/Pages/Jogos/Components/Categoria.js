import React, { useState, useEffect } from 'react';
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
import ApiService from '../../../variables/ApiService';
import { getAtleticaId } from '../../../utils/storage'

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
    const [expanded, setExpanded] = useState(false);
    const [jogos, setJogos] = useState([])
    const [atletas, setAtletas] = useState([])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const buscaJogosModalidade = async () => {
        await ApiService.BuscarJogosModalidade(getAtleticaId(), categoria.modalidadeId)
            .then(res =>
                setJogos(res.data)
            )
            .catch(err =>
                console.log(err)
            )
    }

    const buscaAtletasModalidade = async () => {
        await ApiService.BuscarAtletasModalidade(categoria.atleticaModalidadeId)
            .then(res =>
                setAtletas(res.data)
            )
            .catch(err =>
                console.log(err)
            )
    }

    useEffect(() => {
        buscaJogosModalidade()
        buscaAtletasModalidade()
    }, []);

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
                        {jogos.length !== 0 && jogos !== null ?
                            jogos.map((item) => (
                                <Jogo jogo={item} atletas={atletas} />
                            ))
                            :
                            <Grid container justify="center">
                                <Typography>Essa modalidade não possui jogos cadastrados.</Typography>
                            </Grid>
                        }
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
}