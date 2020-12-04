import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { fade, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { isLogin } from "../../utils/storage";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, InputAdornment, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Autocomplete } from "@material-ui/lab";
import { Link } from "react-router-dom";
import MoreIcon from "@material-ui/icons/MoreVert";
import AvatarIcon from "../../assets/icons/user.svg";
import ApiService from '../../variables/ApiService'
import { atleticaUsername } from '../../utils/storage'
import LogoutModel from "../ModalLogout";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontFamily: "Nanum Gothic",
    fontSize: 24,
    fontWeight: 300,
    color: "white",
  },
  divSearch: {
    position: "relative",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
  },
  search: {
    width: 250,
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

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [atleticas, setAtleticas] = React.useState([]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleMenuClose();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const pesquisaAtleticas = async (text) => {
    if (text)
      await ApiService.PesquisaAtleticas(text)
        .then((res) => setAtleticas(res.data))
        .catch((err) => console.log(err));
    else setAtleticas([]);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link style={{ textDecoration: "none", color: "black" }} to={"/Perfil/" + atleticaUsername()}>
        <MenuItem onClick={handleMenuClose}>Meu perfil</MenuItem>
      </Link>
      <MenuItem onClick={handleClickOpen}>Sair</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link style={{ textDecoration: "none", color: "black" }} to={"/Perfil/" + atleticaUsername()}>
        <MenuItem onClick={handleMenuClose}>Meu perfil</MenuItem>
      </Link>
      <MenuItem onClick={handleClickOpen}>Sair</MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <div className={classes.grow}>
          <AppBar>
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>
                OLYMPOS
              </Typography>
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
              {isLogin() ? (
                <>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <img src={AvatarIcon} style={{ width: 30 }} />
                    </IconButton>
                  </div>
                  <div className={classes.sectionMobile}>
                    <IconButton
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </div>
                </>
              ) : (
                <>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <Grid container direction="row" spacing={3}>
                      <Grid item>
                        <Link to="/login">
                          <Button style={{ color: "white" }}>Login</Button>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link to="/cadastro">
                          <Button
                            variant="contained"
                            color="secondary"
                            disableElevation
                          >
                            <span>Cadastre-se</span>
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </div>
                </>
              )}
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
      </ElevationScroll>
      <Toolbar />
      <LogoutModel open={open} handleClose={handleClose} />
    </React.Fragment>
  );
}
