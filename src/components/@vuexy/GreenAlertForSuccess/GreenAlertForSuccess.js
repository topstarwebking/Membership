import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function GreenAlertForSuccess(props) {
  return props?.data?(
    <Snackbar
      open={props?.data?.open}
      autoHideDuration={6000}
      onClose={props?.handleMessageClose}
    >
      <Alert
        onClose={props?.handleMessageClose}
        severity={props?.data?.className}
      >
        {props?.data?.message}
      </Alert>
    </Snackbar>
  ):null;
}
