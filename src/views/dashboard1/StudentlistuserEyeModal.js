import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import { Eye, X } from "react-feather";
import StlistusereyeappoinModal from "../apps/user/list/stlistusereyeappoinModal";
import NoteForm from "../apps/user/list/noteForm";
import NoteCard from "../apps/user/list/noteCard";
import { GET_NOTES_BY_STUDENT } from "../../redux/actions/newstudent";
import { connect } from "react-redux";
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { lightBlue } from '@mui/material/colors';



import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
const ModalForm = (props) => {
  const { studentId, studentInfo, NotesByStudentId, studentType, tillDate } = props;

  const [state, setState] = useState({
    modal: false,
  });
  const toggleModal = () => {
    setState({
      modal: !state.modal,
    });
    props.GET_NOTES_BY_STUDENT(studentId);
  };
  return (
    <React.Fragment>
      <IconButton onClick={toggleModal} className="p-0">
        <Eye size={20} />
      </IconButton>
      <Dialog open={state.modal} onClose={toggleModal} maxWidth="lg">
        <DialogTitle>
          <div className="d-flex justify-content-between pl-1">
            <h4 className="text-dark mb-1 note-fname">
              Notes for {studentInfo?.firstName} {studentInfo?.lastName}
            </h4>
            <div className="d-flex justify-content-end">
              <IconButton onClick={toggleModal} className="p-0">
                <X />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="d-flex justify-content-between">
          <Row>
            <Col lg="5" sm="12" md="5" style={{ borderRight: "1px solid #b6b6b6" }}>
              <Row>
                <Col lg="12" >
                  <div className="card-body" style={{ padding: "0.5rem 1rem 0" }}>
                    <div className="d-flex justify-content-between align-items-end">
                      <div className="d-flex justify-content-between">
                        <div >
                          <Avatar
                            style={{ width: "8em", height: "6em" }}
                            alt={studentInfo?.firstName}
                            src={studentInfo?.memberprofileImage}
                            variant="rounded"
                          />
                          <div className="d-flex justify-content-start">
                            <StlistusereyeappoinModal />
                          </div>
                        </div>

                        <div className="text-notes">
                          <h6>
                            <AddIcCallOutlinedIcon sx={{ color: lightBlue[300] }} fontSize="medium" />
                            {" "} {studentInfo?.primaryPhone || studentInfo?.phone || "N/A"}
                          </h6>
                          <h6>
                            <MailOutlineRoundedIcon sx={{ color: lightBlue[300] }} fontSize="medium" />
                            {" "} {studentInfo?.email || "N/A"}

                          </h6>
                          <p className="text-dark mb-1">
                            <PlaceOutlinedIcon sx={{ color: lightBlue[300] }} fontSize="medium" />
                            {studentInfo?.street}<br></br>
                            {studentInfo?.town},
                            {studentInfo?.state}- {studentInfo?.zipPostalCode}
                          </p>
                          <p className="text-dark mb-1">
                          </p>
                          <h6>Primary Note: {studentInfo?.notes?.note || "N/A"}</h6>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                </Col>
                <Col lg="12">
                  <NoteForm studentId={studentId} studentInfo={studentInfo} studentType={studentType} tillDate={tillDate} toggleModal={toggleModal} edit={false} />
                </Col>
              </Row>
            </Col>
            <Col lg="7" sm="12" md="7">
              <NoteCard
                studentType={studentType}
                tillDate={tillDate}
                studentInfo={studentInfo}
                NotesByStudentId={NotesByStudentId}
              />
            </Col>
          </Row>
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

export default connect(mapStateToProps, { GET_NOTES_BY_STUDENT })(ModalForm);