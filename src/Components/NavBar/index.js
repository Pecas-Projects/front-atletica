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
import { Fade, Grid, Grow } from "@material-ui/core";
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 170,
      width: "50%",
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

                <div className={classes.search}>

                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>

                  <InputBase
                    placeholder="Pesquise uma atletica"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
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
                    <div className={classes.search}>

                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>

                      <InputBase
                        placeholder="Pesquise uma atletica"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
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
