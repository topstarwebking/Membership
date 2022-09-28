import React, { useState } from "react";
import { Form, FormGroup, Input, CustomInput, Col, Row } from "reactstrap";
import {
  ADD_NOTE_FOR_STUDENT,
  EDIT_NOTE_OF_STUDENT,
} from "../../../../redux/actions/newstudent";
import moment from "moment";
// import { useHistory } from "react-router-dom";
import { GET_NOTES_BY_MEMBERID } from "../../../../redux/actions/member";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const NoteForm = (props) => {
  const { note, edit, toggleModal, studentId, studentType, tillDate } = props;
  const location = useLocation()
  const [notePayload, setNotePayload] = useState({
    followupType: "Left Message"
  });
  const notesOf = location?.pathname.split("/")
  const changeHandler = (e) => {
    let { name, value } = e.target;
    setNotePayload({ ...notePayload, [name]: value });
  };

  const SubmitNote = (e) => {
    e.preventDefault();
    notePayload.date = moment(notePayload.date).format("MM/DD/YYYY")
    if (notesOf[2] === "renewals") {
      notePayload.noteType = "Renewal"
    } else if (notesOf[2] === "birthday") {
      notePayload.noteType = "Birthday"
    } else if (notesOf[2] === "miss-you-call") {
      notePayload.noteType = "Miss You"
    }
    if (edit) {
      props.EDIT_NOTE_OF_STUDENT(notePayload, note);
      props.setmodalOpen(false);
      props.GET_NOTES_BY_MEMBERID();
    } else {
      let responce = props.ADD_NOTE_FOR_STUDENT(notePayload, studentId, props.studentInfo?._id, studentType, tillDate);
      if (responce) {
        toggleModal()
      }                                                                            
    }
  };

  return (
    <div style={{ height: "96%" }}>
      <div className="card-body" style={{ padding: "1rem" }}>
        {edit ? null : <h6>New Note</h6>}
        <Form className="mt-2" onSubmit={SubmitNote}>
          <Row>
            <Col md="6" sm="12">
              <label>Follow Up Type</label>
              <FormGroup className="form-label-group">
                {notesOf[2] === "birthday" ||
                  notesOf[2] === "miss-you-call" ||
                  notesOf[2] === "renewals" ? (
                  <CustomInput
                    type="select"
                    style={{ padding: "10px !imporant", height: "100%" }}
                    variant={"outlined"}
                    value={edit ? note?.noteType : null}
                    name={"noteType"}
                    // onChange={changeHandler}
                    id={"noteType"}
                  >
                    {notesOf[2] === "renewals" ?
                      <option value="Renewal">Renewal</option>
                      : notesOf[2] === "birthday" ?
                        <option value="Birthday">Birthday</option>
                        : notesOf[2] === "miss-you-call" ?
                          <option value="Miss You">Miss You</option>
                          : null}

                  </CustomInput>
                ) : (
                  <CustomInput
                    type="select"
                    style={{ padding: "10px !imporant", height: "100%" }}
                    variant={"outlined"}
                    defaultValue={edit ? note?.noteType : null}
                    name={"noteType"}
                    onChange={changeHandler}
                    id={"noteType"}
                  >
                    <option value="select">Select Note </option>
                    <option value="General">General</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Miss You">Miss You</option>
                    <option value="Renewal">Renewal</option>
                    <option value="Other">Other</option>
                  </CustomInput>
                )}

              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <label>Response*</label>
              <FormGroup className="form-label-group">
                <CustomInput
                  type="select"
                  id="followupType"
                  defaultValue={edit ? note?.followupType : notePayload?.followupType}
                  name={"followupType"}
                  onChange={changeHandler}
                >
                  <option value="Left Message">Left Message</option>
                  <option value="No Answer">No Answer</option>
                  <option value="Answered">Answered</option>
                  <option value="Other">Other</option>
                </CustomInput>
              </FormGroup>
            </Col>
            {/* <Col md="4" sm="12">
              <FormGroup className="form-label-group">
                <CustomInput
                  type="select"
                  id={"communication_mode"}
                  defaultValue={edit ? note?.communication_mode : null}
                  name={"communication_mode"}
                  onChange={changeHandler}
                >
                  <option value="select">Select Method</option>
                  <option value="System text sent">System text sent</option>
                  <option value="System email sent">System email sent</option>
                  <option value="System call made">System call made</option>
                  <option value="Manual text sent">Manual text sent</option>
                  <option value="Manual call">Manual call</option>
                  <option value="Manual email">Manual email</option>
                </CustomInput>
              </FormGroup>
            </Col> */}
          </Row>
          <FormGroup>
            <label>Notes*</label>
            <Input
              required
              style={{ height: "50px" }}
              type="textarea"
              defaultValue={edit ? note?.note : null}
              name={"note"}
              placeholder="✍🏻 Write your note.... "
              onChange={changeHandler}
            />
          </FormGroup>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save Note
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    NotesByStudentId: state.student.NotesByStudentId,
  };
};

export default connect(mapStateToProps, {
  ADD_NOTE_FOR_STUDENT,
  EDIT_NOTE_OF_STUDENT,
  GET_NOTES_BY_MEMBERID,
})(NoteForm);
