import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function ReactModernCalender(props) {
  const { isEdit, dob, handleDateofBirth, Isdisable } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        style={{
          borderRadius: "0.4em",
          border: "1px solid #b8c2cc",
          padding: "0px !important",
        }}
        id="date-picker-dialog"
        format="MM/dd/yyyy"
        InputProps={{
          disableUnderline: true,
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        value={dob}
        onChange={handleDateofBirth}
        className="form-control"
        disabled={!isEdit || Isdisable}
      />
    </MuiPickersUtilsProvider>
  );
}
