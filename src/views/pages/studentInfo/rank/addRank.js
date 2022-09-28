import React, { Fragment } from "react";
import {
  Button,
  FormGroup,
  CustomInput,
} from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";
import { DialogTitle, DialogContent, Dialog } from '@material-ui/core';
import { connect } from "react-redux";
import { GET_PROGRAM_LIST } from "../../../../redux/actions/programe";
import { ADD_RANK_BY_STUDENT_ID } from "../../../../redux/actions/newstudent";
import RankDetails from "../../../../utilities/logic/rankDetails";
import "../../../../assets/scss/pages/users.scss";

class AddRank extends React.Component {
  componentDidMount() {
    this.props.GET_PROGRAM_LIST();
  }
  state = {
    selectedProgram: [],
    modal: false,
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
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
  handleSumite = (e) => {
    e.preventDefault();
    let payload = RankDetails.getUpdateAddRankDetails(this.props.programList, {
      current_rank_name: this.state?.rank_name,
      programName: this.state?.programName,
    });
    this.props.ADD_RANK_BY_STUDENT_ID(payload);
    this.setState({
      ...this.state,
      rank_name: "",
      programName: "",
    });
  };
  render() {
    const { programList } = this.props;
    const { selectedProgram } = this.state;
    return (
      <Fragment>
        <Button.Ripple color="primary" onClick={this.toggleModal}>
          Add New
        </Button.Ripple>
        <Dialog
          PaperProps={{
            elevation: 0,
            style: {
              width: "400px",
            },
          }}
          open={this.state.modal}
          onClose={this.toggleModal}
        // style={{width:300}}
        >
          <DialogTitle>
            <div className="d-flex justify-content-between">
              Add New Rank
              <CloseIcon onClick={this.toggleModal} />
            </div>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSumite}>
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
                      name={"programName"}
                      onChange={this.SelectProgram}
                      id={"programName"}
                    >
                      <option>{"Select Program Name"}</option>
                      {programList?.map((item, i) => {
                        return (
                          <option key={i} value={item?.programName}>
                            {item?.programName} (Ranks count{""}
                            {item?.program_rank?.length}){" "}
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
                  type="submit"
                  color="primary"
                  onClick={this.toggleModal}
                >
                  Add Rank{" "}
                </Button.Ripple>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
  ADD_RANK_BY_STUDENT_ID,
})(AddRank);
