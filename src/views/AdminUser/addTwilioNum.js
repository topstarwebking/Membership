import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import NumberFormat from "react-number-format";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { IconButton } from '@material-ui/core';
import { Edit } from "react-feather";
import { ADD_TWILIO_NUMBER } from "../../redux/actions/admin/School";
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const AddTwilioNumber = (props) => {
  const { TwilioInfo, ADD_TWILIO_NUMBER } = props;
  const [open, setOpen] = useState(false);
  const [twilioNum, setTwilioNum] = useState();
  const [errorColor, setErrorColor] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnChange = (e) => {
    setTwilioNum(e.target.value);
  };

  const handleSaveFolder = (e) => {
    e.preventDefault();
    let NumFormat = twilioNum.toString().replace(/\s/g, "");
    if (NumFormat.length >= 10) {
      let UpTwilioNum = `+1${NumFormat}`;
      handleClose()
      ADD_TWILIO_NUMBER(UpTwilioNum, TwilioInfo.uid, TwilioInfo.pageNumber);
    } else {
      setErrorColor(true)
    }

  };

  const UpNumberFormat = (number) => {
    let num = number.split('+1')[1];
    setTwilioNum(num);
  }

  return (
    <div>
      {TwilioInfo.twilio_number ? (
        <div className="d-flex justify-content-between">
          <div>
            <p style={{ marginTop: '15px' }}>{TwilioInfo.twilio_number}</p>
          </div>
          <div>
            <IconButton
              onClick={() => {
                UpNumberFormat(TwilioInfo.twilio_number);
                handleClickOpen();
              }}
            >
              <Edit size={14} style={{ color: "#5aa65c" }} />
            </IconButton>
          </div>
        </div>

      ) : (
        <div>
          <Button
            variant="outlined"
            style={{
              color: "#28c76f",
            }}
            className="rounded"
            onClick={handleClickOpen}
          >
            Add
          </Button>
        </div>
      )}
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogContent style={{ minWidth: "300px" }}>
            <form inline="true" onSubmit={handleSaveFolder}>
              <div>
                <NumberFormat
                  required
                  name="twilioNumber"
                  id="twilioNumber"
                  value={twilioNum}
                  placeholder="Enter Number.."
                  onChange={handleOnChange}
                  style={{ borderColor: (errorColor ? "red" : null) }}
                  format="#### ## ####"
                  className="form-control"
                />
              </div>
              <br></br>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  className="m-1"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    borderRadius: "6px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
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
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default connect(null, { ADD_TWILIO_NUMBER })(AddTwilioNumber);
