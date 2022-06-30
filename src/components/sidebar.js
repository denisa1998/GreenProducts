import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
//Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import GroupIcon from "@material-ui/icons/Group";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
//Redux
import { useSelector } from "react-redux";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  drawer: {
    zIndex: 0,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

export default function SideBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const isLoggedIn = useSelector((state) => state.user.authenticated);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!isLoggedIn) {
    return null;
  }
  return (
    <Drawer
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
      onMouseOver={handleDrawerOpen}
      onMouseOut={handleDrawerClose}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link to="/socios">
          <ListItem button key={"Gestión de socios"}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Gestión de socios" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to="/productos">
          <ListItem button key={"Gestión de productos"}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Gestión de productos" />
          </ListItem>
        </Link>
      </List>

      <Divider />
      <List>
        <Link to="/informes">
          <ListItem button key={"Informes y Estadísticas"}>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Informes y Estadísticas" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to="/configuracion">
          <ListItem button key={"Configuración"}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configuración" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}
