import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";

const navStyle = {
  display: "flex",
  justifyContent: "space-around",
};
const boldStyle = {
  fontWeight: "700",
  color: "white",
  width: "90%",
  textAlign: "center",
};

const whiteIcon = {
  color: "white",
};

export default function NavBar(props) {
  const isLoggedIn = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  if (!isLoggedIn) {
    return null;
  }
  return (
    <AppBar position="fixed" style={navStyle}>
      <Toolbar>
        <Link to="/">
          <IconButton
            color="inherit"
            edge="start"
            style={whiteIcon}
            className="icon-style"
          >
            <HomeIcon /> Inicio
          </IconButton>
        </Link>

        <Typography style={boldStyle} variant="h5" noWrap>
          TIENDA ECOLÓGICA
        </Typography>
        <IconButton color="inherit" style={whiteIcon} onClick={logout}>
          <ExitToAppIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
