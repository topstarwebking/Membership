import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, MenuItem } from "@material-ui/core";
import { Input } from "reactstrap";
import { X } from "react-feather";
import { connect } from "react-redux";
import { ADD_TEXT_CREDIT } from "../../../redux/actions/admin/Text";
const Addcredit = (props) => {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({ textCredits: "" });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const HandleAdd = () => {
    let data = { textCredits: Number(state?.textCredits) };
    props.ADD_TEXT_CREDIT(data, props.item?._id);
    setOpen(false);
  };

  return (
    <div>
      <MenuItem variant="outlined" color="primary" onClick={handleClickOpen}>
        Add credit
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        Addcredity="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ padding: "0px" }}>
          <div className="d-flex justify-content-end m-0 pt-0 pb-0">
            <IconButton style={{ padding: "0px" }} onClick={handleClose}>
              <X />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Input
            placeholder="Add credit"
            type={"number"}
            style={{ width: "200px", borderReadus: "10" }}
            name="textCredits"
            onChange={(e) => {
              setState({ [e.target.name]: e.target.value });
            }}
          />
          <span>{props.item?.textCredit}</span>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            className="m-1"
            name="textCredits"
            style={{
              textTransform: "none",
              fontWeight: "600",
              borderRadius: "6px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={HandleAdd}
            variant="contained"
            className="m-1"
            style={{
              textTransform: "none",
              fontWeight: "600",
              borderRadius: "6px",
              background: "#2796f3",
              color: "#fff",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default connect(null, { ADD_TEXT_CREDIT })(Addcredit);
