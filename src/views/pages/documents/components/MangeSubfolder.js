import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
  Typography,
} from "@material-ui/core";
import { ADD_NEW_MAIN_FOLDER_EMAIL } from "../../../../../redux/actions/email";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  addMianFOlder: {
    color: "#fff",
    background: "#2796f3",
    fontWeight: "bold !important",
    borderRadius: "10px !important",
    "&:hover": {
      background: "#2796f3",
    },
  },
}));
const MangeSubfolder = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [payload, setPayload] = React.useState(null);
  const { ADD_NEW_MAIN_FOLDER_EMAIL } = props; // compose
  const {
    MailIndexType,
    folderName,
    isUpdateMain,
    handelUpdateFolder,
    handleCloseForUpdate,
    updateEmailFolder,
  } = props;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setPayload({ [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleCloseForUpdate("main");
  };

  const handleSaveFolder = (e) => {
    e.preventDefault();
    if (isUpdateMain) {
      updateEmailFolder("main");
    } else {
      switch (MailIndexType) {
        case 0:
          ADD_NEW_MAIN_FOLDER_EMAIL("/api/email_compose", payload);
          break;
        case 1:
          ADD_NEW_MAIN_FOLDER_EMAIL("/api/email_nurturing", payload);
        case 2:
          ADD_NEW_MAIN_FOLDER_EMAIL("/api/email_system", payload);
        default:
          break;
      }
    }
    setOpen(false);
  };
  return (
    <Fragment>
      <Button onClick={handleClickOpen} className={classes.addMianFOlder}>
        + Add Folder
      </Button>
      <Dialog open={open || isUpdateMain} onClose={handleClose}>
        <form onSubmit={handleSaveFolder}>
          <DialogContent>
            <Typography>
              {isUpdateMain ? "Update Folder" : "Add New Folder"}
            </Typography>
            {isUpdateMain ? (
              <InputBase
                onChange={handelUpdateFolder}
                className="border rounded pl-1"
                style={{ width: "300px" }}
                placeholder={"Folder name"}
                required
                value={folderName}
                name={"categoryName"}
              />
            ) : (
              <InputBase
                onChange={handleChange}
                className="border rounded pl-1"
                style={{ width: "300px" }}
                placeholder={"Folder name"}
                required
                name={"categoryName"}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary" autoFocus>
              {isUpdateMain ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { ADD_NEW_MAIN_FOLDER_EMAIL })(MangeSubfolder);
