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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Home from "../../assets/imagem/home.svg";
import Feed from "../../assets/imagem/today (1).svg";
import Bell from "../../assets/icons/bellIcon.svg";
import Ranking from "../../assets/icons/ranking.svg";
import { isLogin, getUserType } from "../../utils/storage";
import Trofeu from "../../assets/imagem/trophy.svg";
import Bag from "../../assets/imagem/shopping-bag.svg";
import Jogo from "../../assets/icons/jogoIcon.svg";
import Modalidade from "../../assets/icons/modalidadeIcon.svg";
import LogOut from "../../assets/imagem/log-out.svg";
import SearchIcon from "@material-ui/icons/Search";
import "./NavBar.css";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LogoutModel from "../../Components/ModalLogout";
import ApiService from "../../variables/ApiService";
import { atleticaUsername } from '../../utils/storage'

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
    marginLeft: 0,
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
  const [atleticas, setAtleticas] = useState([]);
  const [openLogout, setOpenLogout] = useState(false);

  const handleClickOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleChange = () => {
    setShowSearch(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pesquisaAtleticas = async (text) => {
    if (text)
      await ApiService.PesquisaAtleticas(text)
        .then((res) => setAtleticas(res.data))
        .catch((err) => console.log(err));
    else setAtleticas([]);
  };

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
                <Link style={{ textDecoration: "none" }} to="/">
                  <h1 className="Mylogo">OLYMPOS</h1>
                </Link>

                <div className={classes.divSearch}>
                  <Autocomplete
                    freeSolo
                    options={atleticas}
                    getOptionLabel={(option) => option.nome}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange={(event, newValue) => {
                      atleticaUsername(newValue.username)
                      window.location.href = "/Perfil/" + newValue.username
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Pesquise uma atletica"
                        margin="dense"
                        variant="outlined"
                        className={classes.search}
                        onChange={(e) => pesquisaAtleticas(e.target.value)}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon style={{ color: "#FFFFFF" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>

                <div className="userButtom">
                  <Link to="/EditarPerfil">
                    <IconButton>
                      <PermIdentityIcon
                        fontSize="large"
                        style={{ color: "white" }}
                      />
                    </IconButton>
                  </Link>
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
                <IconButton
                  onClick={handleDrawerClose}
                  style={{ color: "white" }}
                >
                  {theme.direction === "rtl" ? (
                    <ChevronRight />
                  ) : (
                      <ChevronLeft />
                    )}
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
                      {/* <img src={Calendario} alt="calendario" /> */}
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


              <div className="absoluteNavBar">

                <List>
                  <Link to={"/Perfil/" + atleticaUsername()}>
                    <ListItem button>
                      <ListItemIcon>
                        <img src={Home} alt="home" />
                      </ListItemIcon>
                      <ListItemText className="item" primary="Home" />
                    </ListItem>
                  </Link>

                  <Link to={"/Feed/" + atleticaUsername()}>
                    <ListItem button>
                      <ListItemIcon>
                        <img src={Feed} alt="feed" />
                      </ListItemIcon>
                      <ListItemText className="item" primary="Feed" />
                    </ListItem>
                  </Link>
                  <Link to="/Times">
                    <ListItem button>
                      <ListItemIcon>
                        <img src={Trofeu} alt="times" />
                      </ListItemIcon>
                      <ListItemText className="item" primary="Times" />
                    </ListItem>
                  </Link>

                  <Link to="/Produtos">
                    <ListItem button>
                      <ListItemIcon>
                        <img src={Bag} alt="produtos" />
                      </ListItemIcon>
                      <ListItemText className="item" primary="Produtos" />
                    </ListItem>
                  </Link>
                  {isLogin() && (
                    <>
                      <Link to="/Notificacoes">
                        <ListItem button>
                          <ListItemIcon>
                            <img src={Bell} alt="Notificação" />
                          </ListItemIcon>
                          <ListItemText
                            className="item"
                            primary="Notificações"
                          />
                        </ListItem>
                      </Link>
                      <Link to="/Ranking">
                        <ListItem button>
                          <ListItemIcon>
                            <img src={Ranking} alt="Ranking" />
                          </ListItemIcon>
                          <ListItemText className="item" primary="Ranking" />
                        </ListItem>
                      </Link>
                      <Link to="/Jogos">
                        <ListItem button>
                          <ListItemIcon>
                            <img src={Jogo} alt="Jogo" />
                          </ListItemIcon>
                          <ListItemText className="item" primary="Jogos" />
                        </ListItem>
                      </Link>
                      <Link to="/Modalidades">
                        <ListItem button>
                          <ListItemIcon>
                            <img src={Modalidade} alt="Modalidade" />
                          </ListItemIcon>
                          <ListItemText className="item" primary="Modalidade" />
                        </ListItem>
                      </Link>
                    </>
                  )}
                </List>


                {getUserType() === "A" && (
                  <div className="absolute">
                    <List>
                      <ListItem button onClick={handleClickOpenLogout}>
                        <ListItemIcon>
                          <img src={LogOut} alt="logout" />
                        </ListItemIcon>
                        <ListItemText className="item" primary="Logout" />
                      </ListItem>
                    </List>
                  </div>
                )}
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
                        options={atleticas}
                        getOptionLabel={(option) => option.nome}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        onChange={(event, newValue) => {
                          atleticaUsername(newValue.username)
                          window.location.href = "/Perfil/" + newValue.username
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Pesquise uma atletica"
                            margin="dense"
                            variant="outlined"
                            className={classes.search}
                            onChange={(e) => pesquisaAtleticas(e.target.value)}
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon style={{ color: "#FFFFFF" }} />
                                </InputAdornment>
                              ),
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
              <IconButton
                onClick={handleDrawerClose}
                style={{ color: "white" }}
              >
                {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </div>

            <Grid style={{ marginTop: 30 }}>
              <List>
                <Link to={"/Perfil/" + atleticaUsername()}>
                  <ListItem button className="listItem">
                    <ListItemIcon>
                      <img src={Home} alt="home" />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Home" />
                  </ListItem>
                </Link>

                <Link to={"/Feed/" + atleticaUsername()}>
                  <ListItem button>
                    <ListItemIcon>
                      <img src={Feed} alt="feed" />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Feed" />
                  </ListItem>
                </Link>

                <Link to="/Times">
                  <ListItem button>
                    <ListItemIcon>
                      <img src={Trofeu} alt="times" />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Times" />
                  </ListItem>
                </Link>

                <Link to="/Produtos">
                  <ListItem button>
                    <ListItemIcon>
                      <img src={Bag} alt="produtos" />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Produtos" />
                  </ListItem>
                </Link>
                {isLogin() && (
                  <>
                    <Link to="/Notificacoes">
                      <ListItem button>
                        <ListItemIcon>
                          <img src={Bell} alt="Notificação" />
                        </ListItemIcon>
                        <ListItemText className="item" primary="Notificações" />
                      </ListItem>
                    </Link>
                    <Link to="/Ranking">
                      <ListItem button>
                        <ListItemIcon>
                          <img src={Ranking} alt="Ranking" />
                        </ListItemIcon>
                        <ListItemText className="item" primary="Ranking" />
                      </ListItem>
                    </Link>
                    <Link to="/Jogos">
                      <ListItem button>
                        <ListItemIcon>
                          <img src={Jogo} alt="Jogo" />
                        </ListItemIcon>
                        <ListItemText className="item" primary="Jogos" />
                      </ListItem>
                    </Link>
                    <Link to="/Modalidades">
                      <ListItem button>
                        <ListItemIcon>
                          <img src={Modalidade} alt="Modalidade" />
                        </ListItemIcon>
                        <ListItemText className="item" primary="Modalidade" />
                      </ListItem>
                    </Link>
                  </>
                )}
              </List>
            </Grid>

            <div className="absoluteMobile">
              {getUserType() === "A" && (
                <Link to="/EditarPerfil">
                  <ListItem button>
                    <ListItemIcon>
                      <PermIdentityIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText className="item" primary="Meu Perfil" />
                  </ListItem>
                </Link>
              )}

              <List>
                <ListItem button onClick={handleClickOpenLogout}>
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
      <LogoutModel open={openLogout} handleClose={handleCloseLogout} />
    </>
  );
}
