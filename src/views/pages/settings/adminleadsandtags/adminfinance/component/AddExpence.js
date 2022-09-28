import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Input } from "reactstrap";
import { FormGroup, FormLabel } from "@material-ui/core";
import {
  CREATE_EXPENSE_FOR_ADMIN,
  EDIT_EXPENSES_CATEGROY_FOR_ADMIN,
} from "../../../../../../redux/actions/mymoney";
import { connect } from "react-redux";

const CreateLeadstracking = (props) => {
  const [open, setOpen] = React.useState(props.IsEdit ? true : false);
  const {
    CREATE_EXPENSE_FOR_ADMIN,
    EDIT_EXPENSES_CATEGROY_FOR_ADMIN,
    IsEdit,
    item,
  } = props;
  const [state, setState] = React.useState({ ...item });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    if (!IsEdit) {
      CREATE_EXPENSE_FOR_ADMIN(state);
      setOpen(false);
    } else {
      EDIT_EXPENSES_CATEGROY_FOR_ADMIN(
        {
          expense_category_type: state.expense_category_type,
          color: state?.color,
        },
        item?._id
      );
      setOpen(false);
    }
  };

  return (
    <div>
      {IsEdit ? null : (
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
        // maxWidth="md"
      >
        <DialogContent>
          <div style={{minWidth:300}}>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Category Name"
                name="expense_category_type"
                id="expense_category_type"
                defaultValue={item?.expense_category_type}
                onChange={(e) => {
                  setState({ ...state, [e.target.name]: e.target.value });
                }}
              />
            </FormGroup>
            <br></br>
            <FormGroup>
              <FormLabel htmlFor="color">Select Color</FormLabel>
              <div className="colorPicker">
                <Input
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                  defaultValue={item?.color}
                  id="color"
                  name="color"
                  type="color"
                />
              </div>
            </FormGroup>
          </div>
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
              cursor: "pointer",
            }}
            onClick={handleCreate}
            variant="contained"
          >
            {IsEdit ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default connect(null, {
  CREATE_EXPENSE_FOR_ADMIN,
  EDIT_EXPENSES_CATEGROY_FOR_ADMIN,
})(CreateLeadstracking);
