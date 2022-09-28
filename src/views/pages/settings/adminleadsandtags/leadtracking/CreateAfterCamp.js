import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Input } from "reactstrap";
import { FormGroup, FormLabel } from "@material-ui/core";

const CreateLeadstracking = (props) => {
  const [open, setOpen] = React.useState(props.Isedit);
  const { CREATE_AFTER_CAMP, EDIT_AFTER_CAMP, Isedit, item } = props;
  const [state, setState] = React.useState({ item });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    if (!Isedit) {
      CREATE_AFTER_CAMP(state);
      setOpen(false);
    } else {
      EDIT_AFTER_CAMP(
        { after_camp_category: state.after_camp_category },
        item?._id
      );
      setOpen(false);
    }
  };

  return (
    <div>
      {Isedit ? null : (
        <Button
          variant="contained"
          style={{ background: "#40a7e1", color: "#ffff", borderRadius: "6px" }}
          onClick={handleClickOpen}
        >
          Manage
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Tag Name"
              name="after_camp_category"
              id="after_camp_category"
              defaultValue={item?.after_camp_category}
              onChange={(e) => {
                setState({ [e.target.name]: e.target.value });
              }}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{
              color: "#878787",
              borderRadius: "6px",
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              background: "#40a7e1",
              color: "#ffff",
              borderRadius: "6px",
            }}
            onClick={handleCreate}
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateLeadstracking;
