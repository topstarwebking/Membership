import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import AddIcon from "@material-ui/icons/Add";
import NewCategory from "./createSubFolder";
import { connect } from "react-redux";
import { GET_DOCUMENT_FOLDER_LIST } from "../../../../redux/actions/document/document";
import { Chip } from "@material-ui/core";

const ModalForm = (props) => {
  const { activeMainFolder,userinformation}=props
  const [state, setSate] = useState({
    modal: false,
    hover: false,
  });

  useEffect(() => {
    props.GET_DOCUMENT_FOLDER_LIST();
  }, []);

  const toggleModal = () => {
    setSate({ ...state, modal: !state.modal });
  };

  return (
    <React.Fragment>
      <div className="p-1" style={{ paddingTop: "0 !important" }}>
        <Chip
          size="small"
          icon={<AddIcon style={{ color: "#fff" }} />}
          label={<b>Add SubFolder</b>}
          onClick={toggleModal}
          style={{ background: "#2796f3", color: "#ffff" }}
          disabled={activeMainFolder?.adminId !== undefined && userinformation?.role === 0 ? true : false}

        />
      </div>
      <Modal
        isOpen={state.modal}
        toggle={toggleModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggleModal}>Add New Sub Folder</ModalHeader>
        <ModalBody>
          <NewCategory
            toggle={toggleModal}
            mainFolder={props.mainFolder}
            isSubFolder={props.isSubFolder}
          />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    documentFolderList: state.documentFolderList,
  };
};
export default connect(mapStateToProps, { GET_DOCUMENT_FOLDER_LIST })(
  ModalForm
);
