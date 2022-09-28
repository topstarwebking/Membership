import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import AddIcon from "@material-ui/icons/Add";
import {
  Chip,
  TextField,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  CREATE_LEADS_TRACKING,
  DELETE_LEAD_TRACKING,
} from "../../../../../redux/actions/member";

import EditAndDeletelead from "./EditAndDeletelead";
import SweetAlert from "react-bootstrap-sweetalert";
const IsSmallDevise = window.matchMedia("(max-width:624px)").matches;
const AddLeadsTracking = (props) => {
  const { isEdit } = props;
  const [leads_category, setleads_category] = useState("");
  const [state, setState] = useState({
    modal: false,
    defaultAlert: false,
    isOpen: false,
    candidate: "",
    id: "",
  });

  const openSweetAlt = () => {
    setState({
      ...state,
      modal: !state.modal,
    });
  };
  const toggleModal = () => {
    setState({
      modal: !state.modal,
      defaultAlert: false,
    });
  };

  const HandleClick = () => {
    let payload = {
      leads_category: leads_category,
    };
    props.LEADS_TRACKING(payload);
    setState({
      ...state,
      modal: false,
    });
  };
  const ConFirmDelete = () => {
    props.DELETE_LEAD_TRACKING(state.id);
    setState({ ...state, defaultAlert: false });
  };

  const handleDefalt = (item) => {
    setState({
      ...state,
      defaultAlert: true,
      id: item?._id,
    });
  };

  return (
    <React.Fragment>
      <Chip
        style={{
          background: "#bedff3",
          color: "#3092d7",
          marginLeft: "1em",
          borderRadius: "4px",
          height: "36px",
        }}
        onClick={openSweetAlt}
        disabled={!isEdit}
        size="small"
        label={<b>Add</b>}
        icon={<AddIcon style={{ color: "#3092d7" }} />}
      />

      <Modal
        isOpen={state.modal}
        toggle={toggleModal}
        className="modal-dialog-centered modal-sm"
        style={{
          width: IsSmallDevise ? "100%" : "600px",
        }}
      >
        <ModalHeader toggle={toggleModal}>Add Your Lead Tracking</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-between">
            <TextField
              fullWidth
              style={{
                borderRadius: "0.4em",
                border: "1px solid #b8c2cc",
                height: "30px",
              }}
              variant={"outlined"}
              size="small"
              rows={1}
              type="text"
              name="leads_category"
              placeholder="Leads Category"
              onChange={(e) => {
                setleads_category(e.target.value);
              }}
              required
            />

            <div>
              <Button color="primary" className="ml-1" onClick={HandleClick}>
                Add
              </Button>
            </div>
          </div>
          <Table>
            <TableBody>
              {props?.getLeadTrackingList?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="left">{item?.leads_category}</TableCell>
                    <TableCell align="right">
                      <EditAndDeletelead
                        handleDefalt={handleDefalt}
                        item={item}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="d-flex justify-content-end m-1">
            <Button
              color="danger"
              onClick={() => {
                setState({
                  modal: !state.modal,
                });
              }}
            >
              Cancel
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <SweetAlert
        title="Are you sure?"
        warning
        show={state.defaultAlert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={() => {
          ConFirmDelete(state.id);
        }}
        onCancel={() => {
          setState({
            defaultAlert: false,
          });
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    getLeadTrackingList: state.member.getLeadTrackingList,
  };
};
export default connect(mapStateToProps, {
  CREATE_LEADS_TRACKING,
  DELETE_LEAD_TRACKING,
})(AddLeadsTracking);
