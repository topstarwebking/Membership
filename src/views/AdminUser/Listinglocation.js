import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import {
  GET_LOCATIONS_IN_ADMIN,
  DELETE_LOCATIONS_IN_ADMIN,
  ASIGN_LOCATIONS_TO_USERS,
} from "../../redux/actions/admin/locations";
import { connect } from "react-redux";
import { RowSkeleton } from "../apps/user/list/components/studentTable";
import EditDeleteLocations from "./EditDeleteLocations";
import ConfirmationModal from "../../components/gloabal/confirmation";
import { SOCKET_SCHOOL_LOCATION_UPDATE } from "../../redux/actions/socket.io";
import AddLocation from "../AdminDashBoardSchool/AddLocation";
import { X } from "react-feather";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const Listinglocation = (props) => {
  const {
    getAlllocations,
    DELETE_LOCATIONS_IN_ADMIN,
    GET_LOCATIONS_IN_ADMIN,
    item,
  } = props;


  const [open, setOpen] = React.useState(false);
  const [locationSelected, setLocationSelected] = useState([]);
  const [id, setId] = useState(null);
  const [SweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const selectLocation = async (id) => {
    let dataCopy = [...locationSelected];
    if (dataCopy.includes(id)) {
      let afterRM = locationSelected?.filter((element) => element !== id);
      setLocationSelected(afterRM);
    } else {
      await setLocationSelected([...locationSelected, id]);
    }
  };
  useEffect(() => {
    (async () => {
      await setLoading(true)
      await GET_LOCATIONS_IN_ADMIN();
      await setLoading(false)
    })()
  }, [GET_LOCATIONS_IN_ADMIN]);

  const HandleDelete = () => {
    DELETE_LOCATIONS_IN_ADMIN(id);
    setSweetAlertOpen(false);
  };

  const HandleSweatAlaert = (element) => {
    setId(element?._id);
    setSweetAlertOpen(true);
  };

  const HandleAsignloctions = () => {
    SOCKET_SCHOOL_LOCATION_UPDATE(locationSelected, item?._id);
    props.ASIGN_LOCATIONS_TO_USERS(
      { access_location_list: locationSelected },
      item?._id
    );
    setOpen(false);
  };

  useEffect(() => {
    if (item?.locations) {
      setLocationSelected(item?.locations);
    }
  }, [item?.locations]);

  return (
    <div>
      <Button
        variant="outlined"
        className="rounded"
        color="primary"
        onClick={handleClickOpen}
      >
        Manage
      </Button>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle>
          <div className="d-flex justify-content-between">
            <div>
              <span className="p-1" style={{ color: "#40a7e1" }}>
                Add Locations
              </span>
            </div>
            <div className="d-flex justify-content-end">
              <IconButton
                onClick={() => {
                  setOpen(false);
                }}
                className="round p-0"
              >
                <X />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <List dense>
            {
              loading
                ? [1, 2, 3, 4, 5].map((i) => {
                  return <RowSkeleton key={i} />;
                })
                :
                getAlllocations.map((element, i) => {
                  return (
                    <ListItem key={i + element?._id} style={{ minWidth: "300px" }}>
                      <ListItemIcon>
                        <Checkbox
                          checked={locationSelected?.includes(element?._id)}
                          disabled={
                            item?.default_location.length &&
                              item?.default_location[0]?.locationName ===
                              element?.locationName
                              ? true
                              : false
                          }
                          onChange={() => {
                            selectLocation(element?._id);
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText>
                        {element?.default_location[0]?.locationName}
                      </ListItemText>
                      <ListItemIcon>
                        <EditDeleteLocations
                          item={element}
                          OpenAlert={HandleSweatAlaert}
                          Editmodal={<AddLocation item={element} Isedit={true} />}
                        />
                      </ListItemIcon>
                    </ListItem>
                  );
                })}
          </List>
        </DialogContent>
        <DialogActions>
          <div className="d-flex justify-content-end">
            <Button
              variant="contained"
              onClick={HandleAsignloctions}
              style={{ background: "#00a6e1", color: "#fff" }}
              className="rounded"
            >
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={SweetAlertOpen}
        title="Delete Location?"
        onConfirm={HandleDelete}
        onCancel={() => {
          setSweetAlertOpen(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you Delete it ?"
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    getAlllocations: state.adminSchoolReducer?.getAlllocations,
  };
};
export default connect(mapStateToProps, {
  GET_LOCATIONS_IN_ADMIN,
  DELETE_LOCATIONS_IN_ADMIN,
  ASIGN_LOCATIONS_TO_USERS,
})(Listinglocation);
