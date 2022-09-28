import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
  Typography,
  Chip,
  MenuItem,
} from "@material-ui/core";
import { ADD_NEW_SUB_FOLDER_EMAIL } from "../../../../../redux/actions/email";
import { connect } from "react-redux";
import { Edit } from "react-feather";


const useStyles = makeStyles(() => ({
  addMianFOlder: {
    border: "2px solid #f0f0f1",
    width: "80%",
    color: "#2796f3",
    background: "#f0f0f1",
    borderRadius: "10px !important",
    padding: "10px",
    fontWeight: "bold !important",
  },
  addFolder: {
    background: "#fff",
    color: "#2796f3",
    fontWeight: "bold",
  },
}));

const ManageSubFolder = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [payload, setPayload] = React.useState(null);
  const { ADD_NEW_SUB_FOLDER_EMAIL } = props; // compose
  const {
    mainFolderId,
    MailIndexType,
    folderName,
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
    if (props.editSubFolder === "edit") {
      handleCloseForUpdate("subFolder");
    }
  };
  const handleSaveSubFolder = (e) => {
    e.preventDefault();
    if (props.editSubFolder === "edit") {
      updateEmailFolder("subFolder");
    } else {
      switch (MailIndexType) {
        case 0:
          ADD_NEW_SUB_FOLDER_EMAIL("/api/email_compose", payload, mainFolderId);
          break;
        case 1:
          ADD_NEW_SUB_FOLDER_EMAIL(
            "/api/email_nurturing",
            payload,
            mainFolderId
          );
          break;
        case 2:
          ADD_NEW_SUB_FOLDER_EMAIL("/api/email_system", payload, mainFolderId);
          break;
        default:
          break;
      }
    }
    setOpen(false);
  };
  return (
    <Fragment>
      {props.editSubFolder === "edit" ? (
        <MenuItem onClick={handleClickOpen}>
          <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
          Edit</MenuItem>
      ) : (
        <Chip
          onClick={handleClickOpen}
          size="small"
          label={"+ Add SubFolder"}
          className={`m-1 ${classes.addFolder}`}
        />
      )}
      <Dialog open={open}>
        <form onSubmit={handleSaveSubFolder}>
          <DialogContent>
            <Typography>
              {props.editSubFolder === "edit"
                ? "Update Sub Folder"
                : "Add Sub Folder"}
            </Typography>
            <InputBase
              onChange={
                props.editSubFolder === "edit"
                  ? (e) => {
                      handelUpdateFolder(e, props.folderId);
                    }
                  : handleChange
              }
              className="border rounded pl-1"
              style={{ width: "300px" }}
              placeholder={"Sub Folder name"}
              required
              defaultValue={folderName}
              name={"folderName"}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary" autoFocus>
              {props.editSubFolder === "edit" ? "Update" : " Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { ADD_NEW_SUB_FOLDER_EMAIL })(ManageSubFolder);
