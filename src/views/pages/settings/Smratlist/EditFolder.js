import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Label, Input, } from 'reactstrap';
import { UPDATE_SMART_LIST_FOLDER } from '../../../../redux/actions/email';
import { connect } from 'react-redux';

function EditFolder(props) {
  const [open, setOpen] = React.useState(true);
  const [state, setState] = React.useState({
      ...props.item
  })

  const handleClose = () => {
    setOpen(false);
  };
  const handlesubmit = () => {
    props.UPDATE_SMART_LIST_FOLDER(state,props.item?._id)
    setOpen(false);

  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        maxWidth="lg"
      >
        <DialogContent >
          <Label>Folder Name:</Label>
          <Input
            name="folderName"
            placeholder='Folder Name'
            defaultValue={state?.folderName}
            onChange={(e) => setState({
              [e.target.name]: e.target.value
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} style={{ borderRadius: "6px" }} variant="outlined">
            Back
          </Button>
          <Button onClick={handlesubmit} className="actionadd" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



export default connect(null, { UPDATE_SMART_LIST_FOLDER })(EditFolder);

