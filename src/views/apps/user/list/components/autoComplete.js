import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const useStyles = makeStyles(() => ({
  inputStyle: {
    height: "3em",
    borderRadius: "0.4em",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
    overflowX: "hidden",
    overflowY: "hidden",
  },
}));
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(props) {
  const { data, keyName, handleSelect, labelName } = props;
  const classes = useStyles();
  return (
    <div>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={data}
        className={classes.inputStyle}
        onChange={(e, newValue) => {
          handleSelect(e, newValue, keyName);
        }}
        disableClearable
        disableCloseOnSelect
        getOptionLabel={(option) => option[keyName]}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option[keyName]}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" placeholder={labelName} />
        )}
      />
    </div>
  );
}
