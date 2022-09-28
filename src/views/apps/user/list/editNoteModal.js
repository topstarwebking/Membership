import React, { useState } from "react";
import NoteForm from "./noteForm";
import { GET_NOTES_BY_STUDENT } from "../../../../redux/actions/newstudent";
import { connect } from "react-redux";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

import "../../../../assets/scss/pages/users.scss"

const EditNoteModal = (props) => {
  const { note } = props;
  const [modalOpen, setmodalOpen] = useState(true);

  return (
    <React.Fragment>
      <Dialog
        open={modalOpen}
        toggle={() => {
          setmodalOpen(!modalOpen);
        }}
      >
        <DialogTitle
          toggle={() => {
            setmodalOpen(!modalOpen);
          }}
        >
          Edit Note
        </DialogTitle>
        <DialogContent>
          <NoteForm note={note} edit={true} setmodalOpen={setmodalOpen} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    NotesByStudentId: state.student.NotesByStudentId,
  };
};

export default connect(mapStateToProps, { GET_NOTES_BY_STUDENT })(
  EditNoteModal
);
