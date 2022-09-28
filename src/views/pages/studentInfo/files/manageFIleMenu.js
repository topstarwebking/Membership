import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Fade from "@material-ui/core/Fade";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  DELETE_FILE_OF_STUDENTS,
  EDIT_FILE_OF_STUDENTS,
} from "../../../../redux/actions/studentFiles";
import { connect } from "react-redux";
import EditfileStudent from "./EditUplaodfile";

const ManageFiles = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [defaultAlert, setDefaultAlert] = useState(false);
  const [Id, setId] = useState(false);
  const [editOpen, setEditOpen] = useState(null);
  const { DELETE_FILE_OF_STUDENTS, file } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleclosePopup = () => {
    setEditOpen("");
  };
  const ConFirmDelete = () => {
    DELETE_FILE_OF_STUDENTS(Id);
    setDefaultAlert(false);
  };
  const handleDelete = (note) => {
    setId(note);
    setDefaultAlert(true);
  };

  const handleEdit = (value) => {
    setEditOpen(value);
  };
  
  return (
    <div>
      <IconButton
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="rounded-circle"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => {
          handleClose();
        }}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            handleDelete(file?._id);
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleEdit("Edit");
          }}
        >
          Edit
        </MenuItem>
      </Menu>
      <SweetAlert
        title="Are you sure?"
        warning
        show={defaultAlert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={ConFirmDelete}
        onCancel={() => {
          setDefaultAlert(false);
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
      {editOpen === "Edit" ? (
        <EditfileStudent
          file={file}
          handleclosePopup={handleclosePopup}
        />
      ) : null}
    </div>
  );
};


export default connect(null, {
  DELETE_FILE_OF_STUDENTS,
  EDIT_FILE_OF_STUDENTS,
})(ManageFiles);