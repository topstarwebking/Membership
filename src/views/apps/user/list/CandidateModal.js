import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { User } from "react-feather";
import CandidateTabs from "./CandidateTabs";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  InputBase,
  Chip,
} from "@material-ui/core";
import { getStripeList } from "../../../../redux/actions/stripe";
import {
  Add_CANDIDATE_LIST,
  CANDIDATE_REMOVE,
  GET_CANDIDATE_LIST,
  SEARCH_RECOMEND_CANDIDATE
} from "../../../../redux/actions/newstudent/index";
import { SELECT_STUDENT_FOR_CANDIDATE } from "../../../../redux/actions/test";

class ModalForm extends React.Component {
  state = {
    modal: false,
    defaultAlert: false,
    isOpen: false,
    candidate: "",
    defaultAlertDelete: false,
  };

  toggleModal = () => {
    const { selectedRows } = this.props;
    if (selectedRows.length > 0) {
      const customSelectedRows = selectedRows.map((selectedRow) => {
        return {
          studentId: selectedRow?._id,
          rating: selectedRow?.rating,
          status: selectedRow?.status,
          firstName: selectedRow?.firstName,
          lastName: selectedRow?.lastName,
          phone: selectedRow?.phone,
          memberprofileImage: selectedRow?.memberprofileImage,
          userId: selectedRow?.userId,
          isRecomCandidate: selectedRow?.isRecomCandidate,
          program: selectedRow?.program,
          current_rank_name: selectedRow?.current_rank_name,
          current_rank_img:
            selectedRow?.current_rank_img === ""
              ? "nodata"
              : selectedRow?.current_rank_img,
          next_rank_name: selectedRow?.next_rank_name === "" ? "no any rank" : selectedRow?.next_rank_name,
          next_rank_img:
            selectedRows?.next_rank_img === ""
              ? "nodata"
              : selectedRows?.next_rank_img,
        };
      });
      this.props.Add_CANDIDATE_LIST(customSelectedRows);
      this.props.clearSelect();
    }

    this.setState((prevState) => ({
      modal: !prevState.modal,
      defaultAlert: false,
    }));
  };

  confirmAddCandidate = () => {
    this.toggleModal();
    this.setState({
      defaultAlert: false,
    });
  };

  openSweetAlt = () => {
    const { selectedRows } = this.props;
    if (selectedRows.length > 0) {
      this.setState({ defaultAlert: true });
    } else {
      this.setState((prevState) => ({
        modal: !prevState.modal,
      }));
    }
  };

  handleClickOpen = () => {
    this.setState({ defaultalert: true });
  };
  handleClose = () => {
    this.setState({ defaultalert: false });
  };

  componentDidMount() {
    this.props.getStripeList();
  }
  handleDeleteStudent = () => {
    this.props.CANDIDATE_REMOVE(this.props.SelectStudentForCandidate);
    this.props.SELECT_STUDENT_FOR_CANDIDATE([]);
    this.setState({
      ...this.state,
      defaultAlertDelete: false,
    });
  };
  handleDeleteClick = () => {
    this.setState({
      ...this.state,
      defaultAlertDelete: true,
    });
  };

  HandleSearchingAll = (e) => {
    let { value } = e.target
    if (value.length > 2) {
      this.props.SEARCH_RECOMEND_CANDIDATE(value)
    }
    if(value === ""){
      this.props.gobackData()
    }
  }

  render() {
    const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;
    return (
      <React.Fragment>
        <Button
          style={{ color: "#565656" }}
          className="btn-lg btn waves-effect waves-light"
          onClick={this.openSweetAlt}
        >
          <User size={21} />
          <br></br>
          Candidate
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered modal-lg"
          style={{ maxWidth: "1000px", width: "100%" }}
        >
          <ModalHeader toggle={this.toggleModal}>
            MANAGE YOUR CANDIDATE HERE
          </ModalHeader>

          <div className="d-flex justify-content-between mr-5 pt-1">
            <div className="ml-2">
              <InputBase
                className="pl-1"
                style={{
                  height: "3em",
                  width: "100%",
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                }}
                fullwidth={"true"}
                type="text"
                placeholder="Search for students..... "
                onChange={this.HandleSearchingAll}
              />
            </div>
            <div>
              <Chip
                size="small"
                style={{
                  background: "#e74954",
                  color: "#ffff",
                  cursor: "pointer",
                }}
                label={<b>Remove</b>}
                disabled={this.props.SelectStudentForCandidate.length === 0}
                onClick={() => {
                  this.handleDeleteClick();
                }}
              />
            </div>
          </div>
          <ModalBody>
            <CandidateTabs candidate={this.state.candidate} candidate_list={this.state.candidate_list} />
          </ModalBody>
        </Modal>
        <Dialog open={this.state.defaultAlert} onClose={this.handleClickOpen}>
          <DialogTitle> You want to add candidates</DialogTitle>
          <DialogContent
            style={{
              width: IsSmallDevise ? "100%" : "400px",
              padding: "1rem",
            }}
          >
            <span className="mb-0 fw-bolder" color="textSecondary">
              Candidates
            </span>
            <div
              style={{
                borderRadius: "0.4em",
                height: "3em",
                border: "1px solid #42a8e0",
              }}
            >
              <Select
                fullWidth
                name="program"
                variant="outlined"
                defaultValue={
                  this.props?.stripe ? this.props?.stripe[0].candidate : null
                }
                onChange={(e) => {
                  this.setState({
                    candidate: e.target.value,
                  });
                }}
              >
                {this.props?.stripe ? (
                  this.props?.stripe?.map((item) => {
                    return (
                      <MenuItem value={item?.candidate} key={item?._id}>
                        {item?.candidate}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value={"no data"}>{"no data"}</MenuItem>
                )}
              </Select>
            </div>
          </DialogContent>
          <DialogActions>
            <div className="">
              <Button.Ripple
                outline
                onClick={() => {
                  this.setState({ defaultAlert: false });
                }}
                color="secondary"
                className="m-1"
              >
                Cancel
              </Button.Ripple>
              <Button.Ripple
                className="m-1"
                color="primary"
                onClick={this.confirmAddCandidate}
              >
                Add
              </Button.Ripple>
            </div>
          </DialogActions>
        </Dialog>
        <SweetAlert
          title="Are you sure?"
          warning
          show={this.state.defaultAlertDelete}
          showCancel
          reverseButtons
          cancelBtnBsStyle="danger"
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          onConfirm={() => {
            this.handleDeleteStudent();
          }}
          onCancel={() => {
            this.setState({
              ...this.state,
              defaultAlertDelete: false,
            });
          }}
        >
          You won't be able to revert this!
        </SweetAlert>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stripe: state?.stripe?.stripeList,
    SelectStudentForCandidate: state.test.SelectStudentForCandidate,
  };
};
export default connect(mapStateToProps, {
  Add_CANDIDATE_LIST,
  SELECT_STUDENT_FOR_CANDIDATE,
  getStripeList,
  GET_CANDIDATE_LIST,
  SEARCH_RECOMEND_CANDIDATE,
  CANDIDATE_REMOVE,
})(ModalForm);
