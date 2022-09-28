import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";

export const ReactModernCalenderDate = (props) => {
  const { payload, changeHandler, keyName, id, format } = props;

  const handledate = (e) => {
    changeHandler(e);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        style={{
          borderRadius: "0.4em",
          border: "1px solid #b8c2cc",
          padding: "5px",
        }}
        id={id}
        format={format}
        InputProps={{
          disableUnderline: true,
        }}
        value={payload[keyName] || new Date()}
        onChange={handledate}
        className="form-control"
      />
    </MuiPickersUtilsProvider>
  );
};

export const ReactModernCalenderTime = (props) => {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            style={{
              borderRadius: "0.4em",
              border: "1px solid #b8c2cc",
              height: "2.8em",
              padding: "2px",
            }}
            // value={selectedDate}
            // onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </MuiPickersUtilsProvider>
    </MuiPickersUtilsProvider>
  );
};
