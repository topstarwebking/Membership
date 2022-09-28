import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
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
        (item) => item[keyName] === defaultValueIs
      )[0];
      setSelectedState(afterFilter);
    }
  }, [data, defaultValueIs, keyName]);

  return (
    <div>
      <Autocomplete
        options={data}
        fullWidth
        value={selectState}
        disableClearable
        disabled={!isEdit}
        onChange={(e, newValue) => {
          handleSelect(e, newValue, keyName);
        }}
        getOptionLabel={(option) => option[keyName]}
        renderInput={(params) => (
          <TextField
            name={keyName}
            disableClearable
            value={defaultValueIs}
            className={classes.inputStyle}
            variant={"outlined"}
            {...params}
            placeholder={labelName}
          />
        )}
      />
    </div>
  );
};

export default InputAutoComplete;
