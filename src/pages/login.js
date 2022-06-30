import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
//Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { CLEAR_ERRORS } from "../redux/types";

import "./styles/login.css";

const validator = require("email-validator");

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const boldText = {
  fontWeight: "900 ",
  color: "green",
};

export default function Login(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });
  let { email, password, emailError, passwordError } = state;

  const validateEmail = () => {
    if (!email) {
      setState({
        ...state,
        emailError: "¡Introzca el email!",
      });
    } else if (!validator.validate(email)) {
      setState({
        ...state,
        emailError: "¡Email incorrecto!",
      });
    } else return true;
  };

  const validatePassword = () => {
    if (!password) {
      setState({
        ...state,
        passwordError: "¡Introzca la contraseña!",
      });
    } else if (password.length < 6) {
      setState({
        ...state,
        passwordError: "¡Contraseña incorrecta!",
      });
    } else return true;
  };

  const handleSubmit = (e) => {
    console.log(state);
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      dispatch(loginUser(email, password));
    }
  };

  const handleChange = (event) => {
    if (event.target.name == "email") state.emailError = "";
    else state.passwordError = "";
    dispatch({ type: CLEAR_ERRORS });

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const authenticated = useSelector((state) => state.user.authenticated);
  const loginError = useSelector((state) => state.user.error);
  const isLoading = useSelector((state) => state.user.loading);
  if (state.email !== "") state.emailError = "";
  if (state.password !== "") state.passwordError = "";

  return (
    <main className={classes.content} id="login">
      {authenticated ? <Redirect to="/" /> : null}
      <div className={classes.toolbar} />
      <Container
        component="main"
        maxWidth="xs"
        style={{
          background: " #ffffff3a",
          borderRadius: "15px",
          border: "2px solid #73AD21",
          marginTop: "6rem",
        }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h3" style={boldText}>
            Greenproducts
          </Typography>
          <Typography component="h1" variant="h6">
            Asociación Ecológica Vegana
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Colaborador"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange}
              onBlur={validateEmail}
            />
            <div className="invalid-feedback">{emailError}</div>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              password={password}
              autoComplete="current-password"
              onChange={handleChange}
              onBlur={validatePassword}
            />
            <div className="invalid-feedback">{passwordError}</div>
            <div className="invalid-feedback">{loginError}</div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
            {isLoading ? <LinearProgress color="primary" /> : null}
          </form>
        </div>
      </Container>
    </main>
  );
}
