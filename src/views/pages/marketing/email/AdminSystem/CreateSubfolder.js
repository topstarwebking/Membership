import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Input } from "reactstrap";
import {
  CREATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
  UPDATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
} from "../../../../../redux/actions/admin/emails";

const useStyles = makeStyles(() => ({
  addMianFOlder: {
    color: "#fff",
    background: "#00a6e1",
    fontWeight: "bold !important",
    borderRadius: "5px !important",
    "&:hover": {
      background: "#00a6e1",
    },
  },
}));
const CreateSubFolder = (props) => {
  const classes = useStyles();
  const { item, IsEdit } = props;
  const [open, setOpen] = React.useState(props.data ? true : false);
  const [payload, setPayload] = React.useState({
    ...props.data,
  });

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

    if (IsEdit) {
      props.updateSubfolderApiCall(
        {
          folderName: payload.folderName.toLowerCase(),
        },
        props.data?._id
      );
    } else {
      props.crearesubfolderApiCall(
        {
          folderName: payload.folderName.toLowerCase(),
        },
        item._id
      );
    }
    setOpen(false);
  };
  return (
    <Fragment>
      {props.data ? null : (
        <IconButton onClick={handleClickOpen}>
          <Chip label={"Add Subfolder"} className={classes.addMianFOlder} />
        </IconButton>
      )}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSaveFolder}>
          <DialogContent>
            <Typography>{"Add New Subfolder"}</Typography>
            <Input
              onChange={handleChange}
              className="text-capitalize"
              style={{ width: "300px" }}
              placeholder={"Folder name"}
              value={payload.folderName}
              required
              name={"folderName"}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="outlined"
              style={{
                borderRadius: "6px",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{
                background: "#40a7e1",
                borderRadius: "6px",
                color: "#fff",
              }}
              variant="contained"
              autoFocus
            >
              {"Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, {
  CREATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
  UPDATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
})(CreateSubFolder);
