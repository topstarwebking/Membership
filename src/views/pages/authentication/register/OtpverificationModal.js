import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Otpverification from "./Otpverification"
import { DialogContent } from '@material-ui/core';



function Modal(props) {
  const {  open } = props;
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} maxWidth="md">
      <DialogContent>
        <Otpverification data={props?.data} />
      </DialogContent>
    </Dialog>
  );
}

export default function OtpverificationModal(props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal  open={open} onClose={handleClose}  data={props?.data}/>
    </div>
  );
}
