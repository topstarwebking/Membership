import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  CustomInput,
} from "reactstrap";
import { connect } from "react-redux";
import { GET_PROGRAM_LIST } from "../../../../redux/actions/programe";
import { EDIT_RANK_BY_STUDENT_ID } from "../../../../redux/actions/newstudent";
import RankDetails from "../../../../utilities/logic/rankDetails";
import "../../../../assets/scss/pages/users.scss";
import { Edit2 } from "react-feather";

class EditRank extends React.Component {
  componentDidMount() {
    this.props.GET_PROGRAM_LIST();
    let filterProgram = this.props?.programList?.filter(
      (item) => item?.programName === this.props.editData?.programName
    )[0];
    this.setState({
      ...this.state,
      selectedProgram: filterProgram,
      programName: this.props.editData?.programName,
    });
  }
  state = {
    selectedProgram: [],
    modal: true,
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      rank_name: e.target.value,
    });
  };

  SelectProgram = (e) => {
    let filterProgram = this.props?.programList?.filter(
      (item) => item?.programName === e.target.value
    )[0];
    this.setState({
      ...this.state,
      selectedProgram: filterProgram,
      programName: e.target?.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let payload = this.state;
    delete payload.selectedProgram;
    delete payload.modal;
    payload = RankDetails.getUpdateAddRankDetails(this.props.programList, {
      current_rank_name: this.state?.rank_name,
      programName: this.state?.programName,
    });
    this.props.EDIT_RANK_BY_STUDENT_ID(
      payload,
      this.props.editData?._id,
      this.props.editData?.studentId
    );
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    const { programList, editData } = this.props;
    const { selectedProgram, modal } = this.state;
    return (
      <Fragment>
        <Edit2 onClick={this.toggleModal} style={{ color: "#626262" }} />
        <Modal
          isOpen={modal}
          // toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>Edit Rank</ModalHeader>
          <ModalBody>
            <form onSubmit={this.handleSubmit}>
              <div>
                <span>Program name</span>
                <FormGroup>
                  <div
                    style={{
                      height: "3em",
                      borderRadius: "0.4em",
                      border: "1px solid #b8c2cc",
                    }}
                  >
                    <CustomInput
                      type="select"
                      style={{ padding: "10px !imporant", height: "100%" }}
                      variant={"outlined"}
                      defaultValue={editData?.programName}
                      name={"programName"}
                      onChange={this.SelectProgram}
                      id={"programName"}
                    >
                      <option>{"Select Program Name"}</option>
                      {programList?.map((item, i) => {
                        return (
                          <option key={i} value={item?.programName}>
                            {item?.programName} (Ranks count{""}{" "}
                            {item?.program_rank?.length} )
                          </option>
                        );
                      })}
                    </CustomInput>
                  </div>
                </FormGroup>
              </div>
              <div>
                <span>Select Rank</span>
                <FormGroup>
                  <div
                    style={{
                      height: "3em",
                      borderRadius: "0.4em",
                      border: "1px solid #b8c2cc",
                    }}
                  >
                    <CustomInput
                      type="select"
                      style={{ padding: "10px !imporant", height: "100%" }}
                      variant={"outlined"}
                      name={"rank_name"}
                      onChange={this.handleChange}
                      id={"rank_name"}
                    >
                      <option>{"Select Rank"}</option>
                      {selectedProgram?.program_rank?.map((item, i) => {
                        return (
                          <option key={i} value={item?.rank_name}>
                            {item?.rank_name}
                          </option>
                        );
                      })}
                    </CustomInput>
                  </div>
                </FormGroup>
              </div>
              <div className="d-flex justify-content-end">
                <Button.Ripple
                  color="secondary"
                  outline
                  className="m-1"
                  onClick={this.toggleModal}
                >
                  Cancel
                </Button.Ripple>
                <Button.Ripple
                  type="submit"
                  color="info"
                  className="m-1"
                  onClick={this.toggleModal}
                >
                  Update Rank{" "}
                </Button.Ripple>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    programList: state.program?.programList,
  };
};
export default connect(mapStateToProps, {
  GET_PROGRAM_LIST,
  EDIT_RANK_BY_STUDENT_ID,
})(EditRank);
