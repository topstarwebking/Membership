import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    margin: "0px",
  },
  input: {
    display: "none",
  },
  styleDropZone: {
    borderRadius: "6px",
    padding: "10px",
    border: "2px solid #c4c4c4",
    width: "100%",
  },
}));

export default function AttachDocxfile(props) {
  const classes = useStyles();
  const [Name, setName] = useState("Attach document");
  const addfile = (e) => {
    props.handleDocument(e.target.files[0].name, e.target.files[0]);
    setName(e.target.files[0].name);
  };

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={addfile}
      />
      <label htmlFor="contained-button-file" className="w-100">
        <Button component="span" className={classes.styleDropZone} fullWidth>
          {Name}
        </Button>
      </label>
    </div>
  );
}
