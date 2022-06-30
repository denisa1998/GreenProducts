import React, { useState } from "react";
//Material UI
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";

export default function PaymentForm() {
  const [state, setState] = useState({
    method: "card",
  });
  const handleRadio = (event) => {
    setState({
      ...state,
      method: event.target.value,
    });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Método de pago
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup row value={state.method} onChange={handleRadio}>
          <FormControlLabel
            value="card"
            control={<Radio color="primary" />}
            label="Card"
          />
          <FormControlLabel
            value="cash"
            control={<Radio color="primary" />}
            label="Cash"
          />
        </RadioGroup>
      </FormControl>
      {state.method === "card" ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required id="cardName" label="Nombre" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Número de la tarjeta"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="expDate" label="Caducidad" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="
              Últimos tres dígitos en la tira de firma"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveCard" value="yes" />
              }
              label="Recordar la tarjeta para próximas compras"
            />
          </Grid>
        </Grid>
      ) : null}
    </React.Fragment>
  );
}
