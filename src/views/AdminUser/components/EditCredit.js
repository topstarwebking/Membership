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
import { EDIT_TEXT_CREDIT } from "../../../redux/actions/admin/Text";
const Editcredit = (props) => {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({ updatedCredit: "" });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const HandleAdd = () => {
    let data = {
      updatedCredit: Number(state.updatedCredit),
      lastCredit: Number(props.item?.textCreditHistory?.slice(-1)[0]?.credits),
    };
    props.EDIT_TEXT_CREDIT(
      data,
      props.item?._id,
      props.item?.textCreditHistory?.slice(-1)[0]?._id
    );
    setOpen(false);
  };

  return (
    <div>
      <MenuItem variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit credit
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
            placeholder="Edit credit"
            type={"number"}
            defaultValue={props.item?.textCreditHistory?.slice(-1)[0]?.credits}
            style={{ width: "200px", borderReadus: "10" }}
            name="updatedCredit"
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
export default connect(null, { EDIT_TEXT_CREDIT })(Editcredit);
