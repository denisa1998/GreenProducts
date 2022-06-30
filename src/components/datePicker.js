import "date-fns";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_ERRORS, USER_HELPERS, ADD_USER } from "../redux/types";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function MaterialUIPickers() {
  const dispatch = useDispatch();

  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var maxDate = new Date(year - 18, month, day);

  const handleDateChange = (date) => {
    dispatch({
      type: USER_ERRORS,
      payload: {
        birthDate: false,
      },
    });
    dispatch({
      type: USER_HELPERS,
      payload: {
        birthDate: "",
      },
    });

    let d =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    dispatch({
      type: ADD_USER,
      payload: {
        birthDate: d,
      },
    });
  };
  const errorDate = useSelector((state) => state.user.validUser.birthDate);
  const helperTextDate = useSelector(
    (state) => state.user.helperUser.birthDate
  );
  const birthDate = useSelector((state) => state.user.userData.birthDate);
  var date;
  if (birthDate !== "") {
    let bd = birthDate.split("/");
    date = new Date(bd[2], bd[1], bd[0]);
  } else date = maxDate;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        error={errorDate}
        helperText={helperTextDate}
        margin="normal"
        id="date-picker-dialog"
        label="Fecha nacimiento*"
        format="dd/MM/yyyy"
        value={date}
        onChange={handleDateChange}
        disableFuture
        maxDate={maxDate}
      />
    </MuiPickersUtilsProvider>
  );
}
