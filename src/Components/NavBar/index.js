import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ChevronLeft } from "@material-ui/icons";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from "@material-ui/core/ListItemText";
import InputBase from "@material-ui/core/InputBase";
import Home from "../../assets/imagem/home.svg"
import Feed from "../../assets/imagem/today (1).svg"
import Calendario from "../../assets/imagem/calendar-today.svg"
import Trofeu from "../../assets/imagem/trophy.svg"
import Bag from "../../assets/imagem/shopping-bag.svg"
import More from "../../assets/imagem/more-vertical-alt.svg"
import LogOut from "../../assets/imagem/log-out.svg"
import SearchIcon from "@material-ui/icons/Search";
import "./NavBar.css";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab"
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    height: 70,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarMobile: {
    height: 60,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    background: "#020431",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "#020431",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 60,
    [theme.breakpoints.up("sm")]: {
      width: 60,
    },
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
  divSearch: {
    position: "relative",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 170,
      width: "50%",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    color: "#FFFFFF",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  listItem: {
    backgroundColor: "#020431",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
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

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(true);


  const handleChange = () => {
    setShowSearch(false)

  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
  ];
  return (

    <>

      {/*
      
      
      
      DESKTOP
      
      
      
      */}

      <div className={classes.sectionDesktop}>

        <div className={classes.root}>
          <CssBaseline />

          <div className="parent">

            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>

                <h1 className="Mylogo">OLYMPOS</h1>

                <div className={classes.divSearch}>
                  <Autocomplete
                    freeSolo
                    options={top100Films.map((option) => option.title)}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Pesquise uma atletica"
                        margin="dense"
                        variant="outlined"
                        className={classes.search}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon style={{ color: "#FFFFFF" }} />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </div>

                <div className="userButtom">

                  <IconButton>

                    <PermIdentityIcon fontSize='large' style={{ color: "white" }} />

                  </IconButton>

                </div>

              </Toolbar>

            </AppBar>

          </div>

          <div className="parent">

            <Drawer
              containerStyle={{ background: "#020431" }}
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                }),
              }}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose} style={{ color: "white" }}>
                  {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
              </div>



              <Grid style={{ marginTop: 80 }}>

                <List >

                  <ListItem button >
                    <ListItemIcon >
                      <img src={Home} alt="home" />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Home" />
                  </ListItem>

                  <ListItem button >
                    <ListItemIcon>
                      <img src={Feed} alt="feed" />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Feed" />
                  </ListItem>

                  <ListItem button >
                    <ListItemIcon>
                      <img src={Calendario} alt="calendario" />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Calendário" />
                  </ListItem>

                  <ListItem button >
                    <ListItemIcon>
                      <img src={Trofeu} alt="times" />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Times" />
                  </ListItem>

                  <ListItem button >
                    <ListItemIcon>
                      <img src={Bag} alt="produtos" />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Produtos" />
                  </ListItem>
                </List>

              </Grid>


              <div className="absolute">

                <List>

                  <ListItem button >
                    <ListItemIcon>
                      <img src={More} alt="configurações" />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Configurações" />
                  </ListItem>

                  <ListItem button >
                    <ListItemIcon>
                      <img src={LogOut} alt="logout" />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Logout" />
                  </ListItem>
                </List>


              </div>


            </Drawer>

          </div>

        </div>
      </div>

      {/*
      
      
      
      MOBILE 
      
      
      
      */}


      <div className={classes.sectionMobile}>

        <CssBaseline />

        <div className="parent">

          <AppBar
            position="fixed"
            className={clsx(classes.appBarMobile, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>

              {showSearch ? (
                <>

                  <div className="divLogoMobile">

                    <h3 className="MylogoMobile">OLYMPOS</h3>

                  </div>


                  <div className="userButtom">

                    <IconButton onClick={handleChange}>
                      <SearchIcon style={{ color: "white" }} />
                    </IconButton>


                  </div>
                </>

              ) : (
                  <>
                    <div className={classes.divSearch}>
                      <Autocomplete
                        freeSolo
                        options={top100Films.map((option) => option.title)}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Pesquise uma atletica"
                            margin="dense"
                            variant="outlined"
                            className={classes.search}
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon style={{ color: "#FFFFFF" }} />
                                </InputAdornment>
                              )
                            }}
                          />
                        )}
                      />
                    </div>


                  </>
                )}


            </Toolbar>
          </AppBar>

        </div>

        <div className="parent">

          <Drawer
            containerStyle={{ background: "#020431" }}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerOpen,
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose} style={{ color: "white" }}>
                {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </div>



            <Grid style={{ marginTop: 30 }}>

              <List >

                <ListItem button className="listItem">
                  <ListItemIcon  >
                    <img src={Home} alt="home" />
                  </ListItemIcon>
                  <ListItemText className="item" primary="Home" />
                </ListItem>


                <ListItem button >
                  <ListItemIcon>
                    <img src={Feed} alt="feed" />
                  </ListItemIcon>
                  <ListItemText className="item" primary="Feed" />
                </ListItem>

                <ListItem button >
                  <ListItemIcon>
                    <img src={Calendario} alt="calendario" />
                  </ListItemIcon>
                  <ListItemText className="item" primary="Calendário" />
                </ListItem>

                <ListItem button >
                  <ListItemIcon>
                    <img src={Trofeu} alt="times" />
                  </ListItemIcon>
                  <ListItemText className="item" primary="Times" />
                </ListItem>

                <ListItem button >
                  <ListItemIcon>
                    <img src={Bag} alt="produtos" />
                  </ListItemIcon>
                  <ListItemText className="item" primary="Produtos" />
                </ListItem>
              </List>

            </Grid>

            <div className="absoluteMobile">


              <ListItem button >
                <ListItemIcon>
                  <PermIdentityIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText className="item" primary="Meu Perfil" />
              </ListItem>

              <List>
                <ListItem button >
                  <ListItemIcon>
                    <img src={More} alt="configurações" />
                  </ListItemIcon>
                  <ListItemText className="item" primary="Configurações" />
                </ListItem>

                <ListItem button >
                  <ListItemIcon>
                    <img src={LogOut} alt="logout" />
                  </ListItemIcon>
                  <ListItemText className="item" primary="Logout" />
                </ListItem>
              </List>

            </div>


          </Drawer>
        </div>

      </div>

    </>
  );
}
