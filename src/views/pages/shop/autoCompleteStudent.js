import React, { useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Avatar, Chip, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GET_ALL_TYPE_STUDENT } from "../../../redux/actions/member";
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
  const { handleSelect, keyName, getAllTypeStudent, GET_ALL_TYPE_STUDENT } =
    props;

  useEffect(() => {
    GET_ALL_TYPE_STUDENT();
  }, [GET_ALL_TYPE_STUDENT]);

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
            placeholder={"Search for student"}
            required
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
                  <Chip
                    variant="outlined"
                    label={option?.studentType || "not found student type"}
                    size="small"
                  />
                </div>
              </div>
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

export default connect(mapStateToProps, { GET_ALL_TYPE_STUDENT })(
  SelectStudent
);
