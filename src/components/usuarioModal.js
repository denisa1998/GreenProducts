import React, { useState, useEffect } from "react";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MaterialUIPickers from "./datePicker";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";

//Redux
import { addUser } from "../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import {
  USER_ERRORS,
  USER_HELPERS,
  ADD_USER,
  CLEAR_USER,
} from "../redux/types";
import { getUserData } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    position: "absolute",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "10%",
    left: "20%",
  },
}));

export default function SimpleModal({ type, user }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (error.serverStatus)
      dispatch({
        type: CLEAR_USER,
      });
    if (user) {
      dispatch(getUserData(user));
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    let id = event.target.id;
    let value = event.target.value;
    if (id === "name" || id === "lastName" || id === "city") {
      value = value.toLowerCase();
      value = value.replace(/\b\w/g, (l) => l.toUpperCase());
    }
    dispatch({
      type: ADD_USER,
      payload: {
        [id]: value,
      },
    });
  };
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!validateBirthDate()) return;
    if (!validateForm()) return;
    dispatch(addUser(userData, user));
  };
  //Obtener las datos de redux para añadir usuario
  const isLoading = useSelector((state) => state.user.modalLoading);
  const error = useSelector((state) => state.user.validUser);
  const helperText = useSelector((state) => state.user.helperUser);
  const fail = useSelector((state) => state.user.modalFail);

  //Obtener las datos de redux para editar usuario
  const dataLoading = useSelector((state) => state.user.dataLoading);
  const userData = useSelector((state) => state.user.userData);
  const failData = useSelector((state) => state.user.failData);
  //console.log(userData);
  // console.log(error);

  useEffect(() => {
    if (error.serverStatus) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  });
  useEffect(() => {
    if (type === "add") {
      dispatch({
        type: CLEAR_USER,
      });
    }
  }, []);

  //Validación básica antes de mandar los datos al servidor
  const validate = (e, minLength, msg, requiredMsg) => {
    let target = e.target.id;
    let value = e.target.value;

    if (value.length === 0) {
      dispatch({
        type: USER_ERRORS,
        payload: {
          [target]: true,
        },
      });
      dispatch({
        type: USER_HELPERS,
        payload: {
          [target]: requiredMsg,
        },
      });
    } else if (value.length < minLength) {
      dispatch({
        type: USER_ERRORS,
        payload: {
          [target]: true,
        },
      });
      dispatch({
        type: USER_HELPERS,
        payload: {
          [target]: msg,
        },
      });
    } else {
      dispatch({
        type: USER_ERRORS,
        payload: {
          [target]: false,
        },
      });
      dispatch({
        type: USER_HELPERS,
        payload: {
          [target]: "",
        },
      });
    }
  };

  //Validar la fecha de nacimiento aparte por ser cogida de otro componente
  const validateBirthDate = () => {
    if (userData.birthDate === "") {
      dispatch({
        type: USER_ERRORS,
        payload: {
          birthDate: true,
        },
      });
      dispatch({
        type: USER_HELPERS,
        payload: {
          birthDate: "La fecha de nacimiento es obligatoria",
        },
      });
    }
    if (!error.name && !error.lastName && !error.dni) return true;
    else return false;
  };

  //Validar el formulario
  const validateForm = () => {
    if (
      userData.name !== "" &&
      userData.lastName !== "" &&
      userData.dni !== "" &&
      userData.birthDate !== ""
    )
      return true;
    else return false;
  };

  //El cuerpo del modal
  const body = (
    <div className={classes.paper}>
      {dataLoading ? (
        <LinearProgress color="primary" style={{ marginBottom: "1rem" }} />
      ) : null}
      {failData !== "" ? <div className="invalidForm">{failData}</div> : null}

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="name"
          label="Nombre*"
          type="search"
          value={userData.name}
          onChange={handleChange}
          onBlur={(e) => {
            validate(
              e,
              3,
              "El nombre no es correcto",
              "El nombre es obligatorio"
            );
          }}
          error={error.name}
          helperText={helperText.name}
        />
        <TextField
          id="lastName"
          label="Apellidos*"
          type="search"
          value={userData.lastName}
          onChange={handleChange}
          onBlur={(e) => {
            validate(
              e,
              3,
              "El apellido no es correcto",
              "El apellido es obligatorio"
            );
          }}
          error={error.lastName}
          helperText={helperText.lastName}
        />
        <TextField
          id="dni"
          label="Dni*"
          type="search"
          value={userData.dni}
          onChange={handleChange}
          onBlur={(e) => {
            validate(e, 9, "El DNI no es correcto", "El DNI es obligatorio");
          }}
          error={error.dni}
          helperText={helperText.dni}
        />
        <MaterialUIPickers />
        <TextField
          id="address"
          label="Dirección"
          type="search"
          value={userData.address}
          onChange={handleChange}
        />
        <TextField
          id="zip"
          label="Código postal"
          type="search"
          value={userData.zip}
          onChange={handleChange}
        />
        <TextField
          id="city"
          label="Ciudad"
          type="search"
          value={userData.city}
          onChange={handleChange}
        />
        <TextField
          id="phone"
          label="Teléfono"
          value={userData.phone}
          type="search"
          onChange={handleChange}
        />
        <TextField
          id="email"
          label="E-mail"
          value={userData.email}
          type="search"
          onChange={handleChange}
          error={error.email}
          helperText={helperText.email}
        />
        <TextField
          id="observations"
          value={userData.observations}
          label="Observaciones"
          multiline
          rows="2"
          rowsMax="2"
          fullWidth
          size="medium"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ width: "95%" }}
          onChange={handleSubmit}
        />
        {type === "add" ? (
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            onClick={handleOpen}
            style={{ margin: ".8rem 0 .8rem 0" }}
          >
            Añadir usuario
          </Button>
        ) : (
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
            style={{ margin: ".8rem 0 .8rem 0" }}
          >
            Actualizar usuario
          </Button>
        )}
      </form>
      {isLoading ? (
        <LinearProgress color="primary" style={{ marginBottom: "1rem" }} />
      ) : null}
      <div className={error.serverStatus ? "validForm" : "invalidForm"}>
        {fail !== "" ? fail : helperText.serverStatus}
      </div>
    </div>
  );

  return (
    <div>
      {type === "add" ? (
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={handleOpen}
          style={{ margin: ".8rem 0 .8rem 0" }}
        >
          Añadir usuario
        </Button>
      ) : (
        <IconButton onClick={handleOpen} style={{ color: "yellow" }}>
          <EditIcon />
        </IconButton>
      )}
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
