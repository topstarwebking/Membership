import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { Input } from "reactstrap";
import {
  ADD_LOCATION_IN_ADMIN,
  UPDATE_LOCATIONS_IN_ADMIN,
} from "../../redux/actions/admin/locations";
import { connect } from "react-redux";
import { Edit } from "react-feather";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const AddLocation = (props) => {
  const [open, setOpen] = React.useState(props.item ? true : false);
  const [state, setState] = React.useState({
    ...props.data?.default_location[0],
  });
  const {
    ADD_LOCATION_IN_ADMIN,
    UPDATE_LOCATIONS_IN_ADMIN,
    data,
    setserchValue,
  } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const HandleAddlocation = (e) => {
    e.preventDefault();
    if (data?.default_location[0]?.locationName) {
      UPDATE_LOCATIONS_IN_ADMIN(
        {
          locationName: state.locationName,
        },
        state?._id
      );
    } else {
      ADD_LOCATION_IN_ADMIN(
        {
          locationName: state?.locationName,
          email: props.data?.email,
          password: props.data?.password,
        },
        data?._id
      );
    }
    setserchValue("");
  };
  return (
    <div>
      {data?.default_location?.length > 0 ? (
        <div>
          <Button
            variant="outlined"
            style={{
              color: "#28c76f",
              fontSize: "10px",
            }}
            className="rounded"
            onClick={handleClickOpen}
          >
            <Edit className="ml-1" size={16} />
            {data?.default_location[0]?.locationName}
          </Button>
        </div>
      ) : (
        <Button
          variant="outlined"
          style={{
            color: "#28c76f",
            fontSize: "10px",
          }}
          className="rounded"
          onClick={handleClickOpen}
        >
          Add
        </Button>
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent style={{ minWidth: "300px" }}>
          <form onSubmit={HandleAddlocation}>
            <div>
              <Input
                name="locationName"
                id="locationName"
                defaultValue={state.locationName}
                placeholder="Enter Location Name"
                onChange={(e) => {
                  setState({
                    ...state,
                    [e.target.name]: e.target.value,
                  });
                }}
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
                onClick={handleClose}
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
  );
};

export default connect(null, {
  ADD_LOCATION_IN_ADMIN,
  UPDATE_LOCATIONS_IN_ADMIN,
})(AddLocation);
