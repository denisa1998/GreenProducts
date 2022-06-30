import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { getUsersData } from "../redux/actions/userActions";
import { getProducts } from "../redux/actions/dataActions";
import { USERS_LOADED, USER_SELECTED } from "../redux/types";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import WarningIcon from "@material-ui/icons/Warning";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
//Components
import Checkout from "../components/checkout";

import "./styles/home.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  card: {
    display: "flex",
    marginTop: ".5rem",
    padding: "0",
    justifyContent: "center",
    boxShadow: "none",
  },
  details: {
    display: "flex",
    background: "rgb(56, 28, 56)",
    flexDirection: "column",
    minWidth: "500px",
  },
  content: {
    flex: "1 0 auto",
    width: "100%",
  },
  cover: {
    width: 500,
  },
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
  table: {
    minWidth: 650,
  },
  cell: {
    padding: ".2rem",
  },
}));

export default function Home(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    nsocio: "",
  });
  const [rowSelected, setRowSelected] = useState(false);
  const [search, setSearch] = useState(false);
  useEffect(() => {
    //hide table in firefox
    // let table = document.getElementById("filterTable");
    // if (table) {
    //   if (table.rows.length===0)
    //     table.parentElement.style.visibility = "hidden";
    //   else {
    //     table.parentElement.style.visibility = "visible";
    //   }
    // }
    dispatch(getProducts());
  }, []);

  function handleChange(e) {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  }

  const getUsers = (e) => {
    if (e) e.preventDefault();
    setRowSelected(false);
    setSearch(true);
    dispatch(
      getUsersData({
        nombre: state.nombre,
        apellido: state.apellido,
        dni: state.dni,
        nsocio: state.nsocio,
      })
    );
  };
  //Configurar el usuario seleccionado
  const getUser = (socio) => {
    let s = [];
    s.push(socio);
    setRowSelected(true);
    dispatch({ type: USERS_LOADED, payload: s });
    dispatch({ type: USER_SELECTED, payload: socio });
  };
  //Usuarios
  const isLoading = useSelector((state) => state.user.loadingUsers);
  const users = useSelector((state) => state.user.users);
  const alert = useSelector((state) => state.user.error);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className="align-center">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={getUsers}
          id="filterForm"
        >
          <TextField id="nombre" onChange={handleChange} label="Nombre" />
          <TextField id="apellido" onChange={handleChange} label="Apellido" />
          <TextField id="dni" onChange={handleChange} label="DNI" />
          <TextField id="nsocio" onChange={handleChange} label="N° Socio" />
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            value="Submit"
          >
            Buscar
          </Button>
        </form>
        {isLoading ? (
          <LinearProgress color="primary" style={{ marginBottom: "1rem" }} />
        ) : null}

        <TableContainer component={Paper} id="tablePrincipal">
          <Table
            className={classes.table}
            aria-label="simple table"
            id="filterTable"
          >
            <TableBody className="tableColor">
              {users.length > 0 && search === true
                ? users.map((row) => (
                    <TableRow
                      key={row.userId}
                      hover={true}
                      onClick={(event) =>
                        getUser({
                          userId: row.userId,
                          nombre: row.nombre,
                          nsocio: row.nsocio,
                          inscripcion: row.inscripcion,
                          caducidad: row.caducidad,
                          estado: row.estado,
                        })
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={rowSelected} />
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        {row.nombre}
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        N° {row.nsocio}
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        <span>{row.inscripcion}</span>
                        <br />
                        <span style={{ color: "red" }}>{row.caducidad}</span>
                      </TableCell>
                      <TableCell align="center">
                        <DoneOutlineIcon
                          color="primary"
                          className={row.estado === "1" ? "show" : "hidden"}
                        />
                        <AssignmentLateIcon
                          style={{ color: "rgb(255, 164, 27)" }}
                          className={row.estado === "2" ? "show" : "hidden"}
                        />
                        <WarningIcon
                          style={{ color: "rgb(255, 72, 0)" }}
                          className={row.estado === "3" ? "show" : "hidden"}
                        />
                        <CloseIcon
                          style={{ color: "red" }}
                          className={row.estado === "4" ? "show" : "hidden"}
                        />
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ color: "white" }}
                          onClick={(e) =>
                            history.push(`/usuario?id=${row.userId}`)
                          }
                        >
                          Historial
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        {users.length === 0 && search === true && isLoading === false ? (
          <div className="noUser">
            {alert !== ""
              ? alert
              : "No hay resultados que coincidan con la busqueda."}
          </div>
        ) : null}
      </div>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content} style={{ padding: "5px" }}>
            <Checkout />
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={require("../images/redfruits.jpg")}
        />
      </Card>
    </main>
  );
}
