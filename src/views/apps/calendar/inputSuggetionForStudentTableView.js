import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  inputStyle: {
    height: "3em",
    margin: "0px",
    padding: "3px",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
}));
export default function Highlights(props) {
  const classes = useStyles();
  const { students, handleSelectStudent, handleSearchChanged } = props;

  return (
    <div>
      <Autocomplete
        style={{ width: 180, paddingTop: "0px !important" }}
        options={students || []}
        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
        onInputChange={(event) => event.target}
        onChange={(event, newValue) => {
          handleSelectStudent(event, newValue);
        }}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Student"
            className={`rounded ${classes.inputStyle}`}
            variant="outlined"
            margin="normal"
            onChange={handleSearchChanged}
          />
        )}
        renderOption={({ firstName, lastName, age, studentType }) => {
          return (
            <div style={{ width: "100%" }} className="row">
              <div className="col-6">
                {firstName} {lastName}
              </div>
              <div className="col-2">
                {age}
                <sup>age</sup>
              </div>
              <div className="col-4">{studentType}</div>
            </div>
          );
        }}
      />
    </div>
  );
}
