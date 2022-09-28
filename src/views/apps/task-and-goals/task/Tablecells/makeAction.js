import React, { Fragment, useState } from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Edit, Trash2 } from "react-feather";
import { connect } from "react-redux";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";
import EditTask from "./editTask";
import { REMOVE_TASK, REMOVE_TASK_WITHOUT_GONE_INTO_FOLDER } from "../../../../../redux/actions/task-and-goals/task";
import { useHistory } from "react-router-dom";

const MakeAction = (props) => {
  const { row, REMOVE_TASK_WITHOUT_GONE_INTO_FOLDER, REMOVE_TASK } = props;
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const history = useHistory()


  const handleOpenCloseEdit = () => {
    setOpenEdit(!openEdit);
  };
  const handleOpenClose = () => {
    setOpen(!open);
  };
  const handledelet = (id) => {
    if (row?.subfolderId?._id !== undefined) {
      REMOVE_TASK_WITHOUT_GONE_INTO_FOLDER(id, history?.maintaskFolderId, history?.subtaskFolderId)
    } else {
      REMOVE_TASK(id, history?.maintaskFolderId, history?.subtaskFolderId);
    }
    setOpen(false);
  };
  return (
    <Fragment>
      <UncontrolledDropdown>
        <DropdownToggle className="cursor-pointer">
          <MoreVertRoundedIcon fontSize="large" style={{ color: "#C4C4C4" }} />
        </DropdownToggle>
        <DropdownMenu tag="ul" className="p-50" right>
          <DropdownItem
            tag="li"
            onClick={handleOpenCloseEdit}
            className="px-25"
          >
            <div>
              <Edit size={24} className="mr-1" style={{ color: "#0184FF" }} />
              <span>Edit</span>
            </div>
          </DropdownItem>
          <EditTask openEdit={openEdit} Info={row} setOpenEdit={setOpenEdit} />
          <DropdownItem tag="li" onClick={handleOpenClose} className="px-25">
            <div>
              <Trash2 size={24} className="mr-1" style={{ color: "#EB5757" }} />
              <span>Remove</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={open}
        title="Delete Task ?"
        onConfirm={() => { handledelet(row?._id) }}
        onCancel={handleOpenClose}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Remove"}
        description=" Are you sure you want to delete?"
      />
    </Fragment>
  );
};

export default connect(null, { REMOVE_TASK, REMOVE_TASK_WITHOUT_GONE_INTO_FOLDER })(MakeAction);
