import React from "react";
import { Dialog, DialogContent, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledDialog = withStyles(() => ({
  paper: {
    borderRadius: "14px",
  },
}))(Dialog);

const ConfirmationModal = (props) => {
  const {
    primaryColor,
    secondaryColor,
    title,
    open,
    description,
    onConfirm,
    onCancel,
    onCancelButtonTitle,
    contiunuebuttonTitle,
    imagePath,
  } = props;
  return (
    <StyledDialog open={open} maxWidth="sm">
      <DialogContent>
        <div className="w-90">
          <center>
            <img
              style={{ width: "150px", objectFit: "contain" }}
              alt="confimation"
              src={imagePath}
            />
          </center>
        </div>

        <center>
          <Typography variant="h5">
            <b>{title}</b>
          </Typography>
        </center>
        <Typography color="textSecondary">{description}</Typography>
        <div className="d-flex justify-content-between align-items-center">
          <Button
            color="primary"
            variant="outlined"
            className="rounded"
            style={{
              color: primaryColor,
              border: `1px solid ${primaryColor}`,
            }}
            onClick={onCancel}
          >
            <b>{onCancelButtonTitle}</b>
          </Button>
          <Button
            color="primary"
            variant="contained"
            className="rounded"
            style={{
              color: secondaryColor,
              background: primaryColor,
            }}
            onClick={onConfirm}
          >
            <b>{contiunuebuttonTitle}</b>
          </Button>
        </div>
      </DialogContent>
    </StyledDialog>
  );
};

export default ConfirmationModal;
