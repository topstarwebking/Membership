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
  CREATE_PRODECT_FOLDER,
  UPDATE_PRODECT_FOLDER,
  DELETE_PRODECT_FOLDER,
} from "../../../../redux/actions/shop";

const useStyles = makeStyles(() => ({
  addMianFOlder: {
    background: "#2796f3",
    color: "#ffff",
    padding: "10px 10px",
    width: "100%",
    borderRadius: "6px !important",
  },
}));

const ManageFolder = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.update ? true : false);
  const [payload, setPayload] = React.useState(null);
  const { CREATE_PRODECT_FOLDER, UPDATE_PRODECT_FOLDER, item } = props;
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
        UPDATE_PRODECT_FOLDER(payload, item?._id);
      } else {
        CREATE_PRODECT_FOLDER(payload);
      }
    }
    setOpen(false);
  };
  return (
    <Fragment>
      {props.update ? null : (
        <Button
          size="small"
          onClick={handleClickOpen}
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
              defaultValue={item?.folderName || ""}
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
  CREATE_PRODECT_FOLDER,
  UPDATE_PRODECT_FOLDER,
  DELETE_PRODECT_FOLDER,
})(ManageFolder);
