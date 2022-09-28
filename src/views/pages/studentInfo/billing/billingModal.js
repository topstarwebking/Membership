import React, { Fragment } from "react"
import { Button } from "reactstrap"
import CloseIcon from "@material-ui/icons/Close";
import Financedata from './financebillingForm'
import { DialogTitle, DialogContent, Dialog, IconButton } from '@material-ui/core';

const ModalForm = (props) => {
  const { toggleModal, modal, actionOn } = props

  return (
    <Fragment>
      <Button.Ripple
        color="primary"
        onClick={toggleModal}
      >
        Add New
      </Button.Ripple>
      <Dialog
        aria-labelledby="draggable-dialog-title"
        open={modal}
        onClose={toggleModal}
      >
        <DialogTitle >
          <div className="d-flex justify-content-between">
            {actionOn ? ' Add New Finance Info' : ' Edit Finance Info'}
            <IconButton
              onClick={toggleModal}
              className="rounded-circle"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Financedata actionOn={actionOn} />
        </DialogContent>
      </Dialog>

    </Fragment>
  )
}

export default ModalForm
