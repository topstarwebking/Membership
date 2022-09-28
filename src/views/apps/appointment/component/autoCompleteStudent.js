import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Avatar, Chip, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  inputStyle: {
    borderRadius: "0.4em",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
}));
const SelectStudent = (props) => {
  const classes = useStyles();
  const {
    handleSelect,
    keyName,
    getAllTypeStudent,
  } = props;
  return (
    <div>
      <Autocomplete
        className={classes.inputStyle}
        id="filter-demo"
        options={getAllTypeStudent}
        onChange={(e, newValue) => {
          handleSelect(e, newValue);
        }}
        getOptionLabel={(option) => option[keyName]}
        renderInput={(params) => (
          <TextField
            name={keyName}
            variant={"outlined"}
            {...params}
            placeholder={"Search for member"}
          />
        )}
        renderOption={(option) => {
          return (
            <div
              style={{ width: "100%" }}
              className="d-flex d-flex justify-content-between aling-items-center"
            >
              <div className="d-flex justify-content-start">
                <Avatar
                  alt={option.firstName}
                  src={option?.memberprofileImage}
                  className="mr-1"
                />
                <div>
                  <Typography className="mb-0">
                    {option.firstName} {option.lastName}
                  </Typography>
                  <Typography className="mb-0" color="textSecondary">
                    {option.primaryPhone}
                  </Typography>
                </div>
              </div>
              <Chip
                variant="outlined"
                label={option?.studentType || "not found student type"}
                size="small"
              />
            </div>
          );
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getAllTypeStudent: state.member.getAllTypeStudent,
  };
};

export default connect(mapStateToProps, null)(SelectStudent);
