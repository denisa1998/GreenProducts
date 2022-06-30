import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BuyForm from "./comprar";
import PaymentForm from "./payment";
import Review from "./review";
import LinearProgress from "@material-ui/core/LinearProgress";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { checkout } from "../redux/actions/dataActions";
import { CLEAR_CHECKOUT } from "../redux/types";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: "0",
    },
  },
  paper: {
    position: "relative",
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Productos comprados", "Facturación", "Revisar pedido"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BuyForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState({
    cart: "",
    socio: "",
  });

  const isLoading = useSelector((state) => state.data.isLoading);
  const products = useSelector((state) => state.data.checkProducts);
  const user = useSelector((state) => state.user.userSelected);
  const cart = useSelector((state) => state.data.checkProducts.length);
  //Registrar la compra
  const isRegistering = useSelector((state) => state.data.isRegistering);
  const registerMsg = useSelector((state) => state.data.checkoutRegistered);
  const failRegister = useSelector((state) => state.data.failCheckout);

  useEffect(() => {
    if (!failRegister && registerMsg !== "")
      setTimeout(() => {
        dispatch({ type: CLEAR_CHECKOUT });
        setActiveStep(0);
      }, 3000);
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      if (cart === 0) {
        setError({ ...error, cart: "¡La cesta de productos está vacía!" });
        return;
      }
      if (!user.nombre) {
        setError({ ...error, socio: "¡Selecciona una socio!" });
        return;
      }
      let data = [];
      products.forEach((p) => {
        data.push({
          ...p,
          partner: user.nombre,
          memberNumber: user.nsocio,
          id: user.userId,
        });
      });
      dispatch(checkout(data));
    } else {
      setActiveStep(activeStep + 1);
      setError({ ...error, socio: "", cart: "" });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper} style={{ margin: "0" }}>
          {isLoading ? (
            <LinearProgress color="primary" style={{ marginBottom: "1rem" }} />
          ) : null}
          <Typography component="h1" variant="h4" align="center">
            Registrar Compra
          </Typography>
          <Button
            style={{ position: "absolute", right: "1rem", top: "0" }}
            endIcon={<ShoppingBasketOutlinedIcon style={{ fontSize: 27 }} />}
          >
            <h2>{cart}</h2>
          </Button>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>
              {getStepContent(activeStep)}
              {cart === 0 && error.cart !== "" ? (
                <div className="invalidForm">{error.cart}</div>
              ) : null}
              {!user.nombre && error.socio !== "" ? (
                <div className="invalidForm">{error.socio}</div>
              ) : null}
              {isRegistering ? (
                <LinearProgress
                  color="primary"
                  style={{ marginBottom: "1rem" }}
                />
              ) : null}
              {registerMsg !== "" ? (
                <div className={!failRegister ? "validForm" : "invalidForm"}>
                  {registerMsg}
                </div>
              ) : null}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Volver
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1
                    ? "Registrar compra"
                    : "Siguiente"}
                </Button>
              </div>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
