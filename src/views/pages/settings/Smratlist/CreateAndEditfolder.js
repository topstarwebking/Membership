import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core';
import { Label, Input, } from 'reactstrap';
import { CREATE_SMART_LIST_FOLDER } from '../../../../redux/actions/email';
import { connect } from 'react-redux';


const useStyles = makeStyles(() => ({
  addMianFOlder: {
    color: "#fff",
    background: "#2796f3",
    fontWeight: "bold !important",
    borderRadius: "10px !important",
    "&:hover": {
      background: "#2796f3",
    },
  },
}));


function CreateAndEditfolder(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles()
  const [state, setState] = React.useState({
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlesubmit = () => {
    props.CREATE_SMART_LIST_FOLDER(state)
    setOpen(false);
  }
  return (
    <div className='w-100'>
      <Button onClick={handleClickOpen} className={`w-100 ${classes.addMianFOlder}`}>
        + Add Folder
      </Button>
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

export default connect(null, { CREATE_SMART_LIST_FOLDER })(CreateAndEditfolder);

