import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  inputStyle: {
    height: "3em",
    padding: "3px",
    borderRadius: "0.4em",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
}));
const InputAutoComplete = (props) => {
  const { data, keyName, handleSelect, labelName, defaultValueIs, isEdit } =
    props;
  const classes = useStyles();
  const [selectState, setSelectedState] = useState(null);

  useEffect(() => {
    if (defaultValueIs !== undefined) {
      let afterFilter = data?.filter(
        (item) => item?.name === defaultValueIs
      )[0];
      setSelectedState(afterFilter);
    }
  }, [defaultValueIs]);

  return (
    <div>
      <Autocomplete
        options={data}
        fullWidth
        value={selectState}
        disabled={!isEdit}
        onChange={(e, newValue) => {
          handleSelect(e, newValue, keyName);
        }}
        getOptionLabel={(option) => option[keyName]}
        renderInput={(params) => (
          <TextField
            name={keyName}
            value={defaultValueIs}
            className={classes.inputStyle}
            variant={"outlined"}
            {...params}
            placeholder={labelName}
          />
        )}
        renderOption={(option) => {
          return (
            <div
              style={{ width: "100%" }}
              className="d-flex d-flex justify-content-between aling-items-center"
            >
              <div className="d-flex justify-content-start">
                <div>
                  <Typography className="mb-0">{option[keyName]}</Typography>
                </div>
              </div>
              <Chip
                variant="outlined"
                label={option[keyName] || "not found"}
                size="small"
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default InputAutoComplete;
