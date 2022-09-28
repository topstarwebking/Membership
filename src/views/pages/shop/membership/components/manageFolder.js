import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
  Typography,
} from "@material-ui/core";
import {
  ADD_CREATE_MEMEBERSHIP_FOLDER,
  EDIT_MEMBERSHIP_FOLDER,
} from "../../../../../redux/actions/shop";

const useStyles = makeStyles(() => ({
  addMianFOlder: {
    color: "#fff",
    borderRadius: "10px !important",
    background: "#2796f3",
    fontWeight: "bold !important",
    "&:hover": {
      background: "#2796f3",
    },
  },
}));

const ManageFolder = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.update ? true : false);
  const [payload, setPayload] = React.useState(null);
  const {
    ADD_CREATE_MEMEBERSHIP_FOLDER,
    folderId,
    EDIT_MEMBERSHIP_FOLDER,
    DELETE_MEMBERSHIP_FOLDER,
  } = props; // create
  const handleChange = (e) => {
    let { name, value } = e.target;
    setPayload({ [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveFolder = (e) => {
    e.preventDefault();
    if (payload !== null) {
      if (props.update) {
        // call you edit function here
        EDIT_MEMBERSHIP_FOLDER(payload, folderId);
      } else if (payload === undefined) {
        DELETE_MEMBERSHIP_FOLDER();
      } else {
        ADD_CREATE_MEMEBERSHIP_FOLDER(payload);
      }
    }
    setOpen(false);
  };
  return (
    <Fragment>
      {props.update ? null : ( // </IconButton> //   <EditIcon /> // <IconButton size="small" onClick={handleClickOpen} >
        <Button
          size="small"
          onClick={handleClickOpen}
          // className={`mt-1 ${classes.addMianFOlder}`}
          style={{
            textTransform: "none",
            fontWeight: "600",
            color: "#FFF",
            background: "#0184FF",
            padding: "10px 10px",
            width: "100%",
            borderRadius: "6px",
            borderColor: "rgb(1, 132, 255)",
          }}
        >
          + Add Folder
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSaveFolder}>
          <DialogContent>
            <Typography>
              {props.update ? "Edit Folder" : "Add New Folder"}
            </Typography>
            <InputBase
              onChange={handleChange}
              className="border rounded pl-1"
              placeholder={"Folder name"}
              required
              defaultValue={props?.folderName || ""}
              name={"folderName"}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary" autoFocus>
              {props.update ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, {
  ADD_CREATE_MEMEBERSHIP_FOLDER,
  EDIT_MEMBERSHIP_FOLDER,
})(ManageFolder);
