import React from "react";
import { useState, useEffect } from "react";
import "./components.css";
//Material UI
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TextField from "@material-ui/core/TextField";
//Redux
import { getUserData } from "../redux/actions/userActions";
import { getRegisters } from "../redux/actions/dataActions";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
    },
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
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "25vh",
  },
  observation: {
    padding: theme.spacing(0),
    textAlign: "right",
    height: "25vh",
    padding: "1rem 4rem .5rem 0",
    position: "relative",
  },
  close: {
    position: "absolute",
    color: "red",
    right: 0,
    top: 0,
  },
}));

export default function Usuario(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let id = props.location.search.split("=")[1];

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserData(id));
    dispatch(getRegisters(id));
  }, []);
  //Datos del usuario
  const isLoading = useSelector((state) => state.user.dataLoading);
  const data = useSelector((state) => state.user.userData);
  const failData = useSelector((state) => state.user.failData);
  //Datos de transacciones
  const loadingRegisters = useSelector((state) => state.data.loadingRegisters);
  const registers = useSelector((state) => state.data.setRegisters);
  const failRegisters = useSelector((state) => state.data.failRegisters);

  // let cssState = "";
  // if (data.endInscriptionDate) {
  //   let today = new Date();
  //   if (today < dateHelper(data.endInscriptionDate)) cssState = "expired";
  // }

  //Calcular la media de compras del socio
  let total = Number((0).toFixed(2));
  let fruta = Number((0).toFixed(2));
  let verdura = Number((0).toFixed(2));
  registers.forEach((e) => {
    total += Number(e.total);
    if (e.section === "Fruta") fruta += Number(e.total);
    if (e.section === "Verdura") verdura += Number(e.total);
  });

  //Establecer el estado del socio

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {isLoading || loadingRegisters ? (
        <LinearProgress color="primary" style={{ marginBottom: "1rem" }} />
      ) : null}
      {!isLoading &&
      !loadingRegisters &&
      (failData !== "" || failRegisters !== "") ? (
        <div className="noUser">{failData || failRegisters}</div>
      ) : null}
      {failData === "" && failRegisters === "" ? (
        <div className={isLoading || loadingRegisters ? "loading" : null}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <h4 className="rightText">{`Socio N° ${data.memberNumber}`}</h4>
                <h6 className="title">{`${data.name} ${data.lastName}`}</h6>
                <hr style={{ border: ".5px dotted", marginTop: 0 }} />
                <h6 className="userData">{`DNI ${data.dni}`}</h6>
                <h6 className="userData">{`Inscripción ${data.startInscriptionDate}`}</h6>
                <h6 className="userData">{`Caducidad ${data.endInscriptionDate}`}</h6>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <p className="grConsum">Compra frutas: {fruta}€</p>
                    <p className="grConsum">Compra verduras: {verdura}€</p>
                    <p className="grConsum">Total: {total}€</p>
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      src={require("../images/scales.png")}
                      id="scales"
                    ></img>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper} id="expired">
                Este socio tiene su tarjeta caducada desde el 12/02/2020
              </Paper>
            </Grid>
            {open ? (
              <Grid item xs={12}>
                <Paper className={classes.observation} elevation={3}>
                  <IconButton
                    onClick={(e) => setOpen(false)}
                    className={classes.close}
                  >
                    <CloseIcon size="small" />
                  </IconButton>
                  <TextField
                    id="observation"
                    label="Comentario"
                    variant="outlined"
                    multiline
                    rows={3}
                    fullWidth
                    style={{
                      margin: "0 0 -1rem .5rem",
                      width: "98%",
                      height: "80%",
                    }}
                    defaultValue="Comentario..."
                  />
                  <Button variant="contained" color="primary">
                    Publicar
                  </Button>
                </Paper>
              </Grid>
            ) : null}
          </Grid>
          <TableContainer
            component={Paper}
            style={{
              marginTop: "1.8rem",
              background: "rgba(143, 115, 49, 0.253)",
            }}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead className="tablaHistorial">
                <TableRow>
                  <TableCell
                    align="center"
                    style={{ fontSize: "2rem" }}
                    colSpan={12}
                  >
                    <ListAltIcon
                      color="action"
                      fontSize="large"
                      className="floatLeft"
                    />
                    Historial del usuario
                    <Button
                      variant="contained"
                      color="light"
                      className="floatRight"
                      onClick={(e) => setOpen(true)}
                    >
                      Publicar Comentario
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registers.length > 0
                  ? registers.map((row) => (
                      <TableRow key={row.idRegister}>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">{row.section}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{`${row.stock} ${row.unit}`}</TableCell>
                        <TableCell align="right">{row.total} €</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </main>
  );
}
// const dateHelper = (date) => {
//   let arr = date.split("/");
//   let day = arr[0] < 10 ? `0${arr[0]}` : arr[0];
//   let month = arr[1] < 10 ? `0${arr[1]}` : arr[1];
//   return new Date(`${arr[2]}-${month}-${day}`);
// };
