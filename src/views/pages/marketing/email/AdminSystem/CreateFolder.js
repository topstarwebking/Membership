import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import { Input } from "reactstrap";
const useStyles = makeStyles(() => ({
  addMianFOlder: {
    color: "#fff",
    display: "flex",
    flex: 1,
    background: "#00a6e1",
    fontWeight: "bold !important",
    borderRadius: "5px !important",
    "&:hover": {
      background: "#00a6e1",
    },
  },
}));
const CreateFolder = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.data ? true : false);
  const [payload, setPayload] = React.useState({
    ...props.data,
  });
  const { IsEdit } = props;

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
      props.UpdatefolderApiCall(
        {
          categoryName: payload.categoryName.toLowerCase(),
        },
        props.data?._id
      );
    } else {
      props.createFolderApiCall({
        categoryName: payload.categoryName.toLowerCase(),
      });
    }
    setOpen(false);
  };
  return (
    <Fragment>
      {props.data ? null : (
        <Button onClick={handleClickOpen} className={classes.addMianFOlder}>
          Add Folder
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSaveFolder}>
          <DialogContent>
            <Typography>{"Add New Folder"}</Typography>
            <Input
              onChange={handleChange}
              className="text-capitalize"
              style={{ width: "300px" }}
              placeholder={"Folder name"}
              defaultValue={payload?.categoryName}
              required
              name={"categoryName"}
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

export default CreateFolder;
