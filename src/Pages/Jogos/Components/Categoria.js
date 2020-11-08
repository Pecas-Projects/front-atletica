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
            Data: "15/12/2020",
            TimeAtletica: "Time A",
            TimeAdversario: "Time B",
            PontosAtletica: 5,
            PontosAdversario: 4,
            Jogadores: [
                {
                    Id: 1,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 2,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 3,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 4,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 5,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 6,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 7,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 8,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 9,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                }
            ]
        },
        {
            Data: "15/12/2020",
            TimeAtletica: "Time A",
            TimeAdversario: "Time B",
            PontosAtletica: 5,
            PontosAdversario: 4,
            Jogadores: [
                {
                    Id: 1,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 2,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 3,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 4,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 5,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 6,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 7,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 8,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                },
                {
                    Id: 9,
                    Nome: "Bia",
                    Pontos: 15,
                    Infracoes: 0
                }
            ]
        },
    ]

    return (
        <Grid item container justify='center'>
            <Card className={classes.root}>
                <CardActions disableSpacing>
                    <Typography className={classes.nomeCategoria}>{categoria.nome}</Typography>
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