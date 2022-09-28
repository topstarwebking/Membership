import React from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  CustomInput,
} from "reactstrap";
import {
  GET_PROGRAM_LIST,
  CREATE_PROGRAM_RANK,
  UPDATE_PROGRAM_RANK,
} from "../../../../../redux/actions/programe";
import "../../../../../assets/scss/pages/users.scss";
import { connect } from "react-redux";
import { Upload } from "react-feather";

class AddProgramRankOrEdit extends React.Component {
  state = { ...this.props.editRank };
  changeHandler = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  FilesChange = (event) => {
    this.setState({ rank_image: event.target.files[0] });
  };

  onsubmit = (e) => {
    e.preventDefault();
    let { programList } = this.props.program;
    let { editRankStatus, editRank } = this.props;
    let {
      programName,
      rank_order,
      day_to_ready,
      lession_to_ready,
      rank_name,
      rank_image,
    } = this.state;
    let payload = new FormData();
    payload.append(
      "programName",
      editRankStatus ? editRank?.programName : programName
    );
    payload.append("rank_name", rank_name || editRank?.rank_name);
    payload.append("day_to_ready", day_to_ready || editRank?.day_to_ready);
    payload.append(
      "lession_to_ready",
      lession_to_ready || editRank?.lession_to_ready
    );
    payload.append("rank_order", rank_order || editRank?.rank_order);
    payload.append("rank_image", rank_image || editRank?.rank_image);
    if (!editRankStatus) {
      let programId = programList.filter(
        (item) => item.programName === programName
      )[0]?._id;
      this.props.CREATE_PROGRAM_RANK(payload, programId);
      this.props.toggle();
    } else {
      this.props.UPDATE_PROGRAM_RANK(payload, editRank?._id);
      this.props.toggle();
    }
  };
  render() {
    return (
      <Form className="mt-10 mx-2" onSubmit={this.onsubmit}>
        <Row>
          <Col md="6" sm="12" lg="6">
            <FormGroup className="form-label-group">
              <div>
                <Label>Program name</Label>
              </div>
              <CustomInput
                type="select"
                name="programName"
                value={this.state?.programName}
                onChange={this.changeHandler}
              >
                <option value={"select"}>{"Please Select Program"}</option>
                {this.props.program.programList.map((v) => (
                  <option
                    value={v.programName || this.state?.programName}
                    key={v._id}
                  >
                    {v.programName}
                  </option>
                ))}
              </CustomInput>
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <FormGroup className="form-label-group">
              <div>
                <Label> Rank name </Label>
              </div>
              <Input
                value={this.state?.rank_name}
                onChange={this.changeHandler}
                type="text"
                name="rank_name"
                id="rank_name"
                placeholder="Rank name"
              />
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <FormGroup className="form-label-group">
              <div>
                <Label> Rank order </Label>
              </div>
              <Input
                value={this.state?.rank_order}
                onChange={this.changeHandler}
                type="number"
                name="rank_order"
                id="rank_order"
                placeholder="Rank order"
              />
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <FormGroup className="form-label-group">
              <div>
                <Label> Day to ready </Label>
              </div>
              <Input
                onChange={this.changeHandler}
                value={this.state?.day_to_ready}
                type="number"
                name="day_to_ready"
                id="day_to_ready"
                placeholder="Day to ready"
              />
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
          <Label> Lession to ready </Label>
            <FormGroup className="form-label-group">
              <Input
                onChange={this.changeHandler}
                type="number"
                value={this.state?.lession_to_ready}
                name="lession_to_ready"
                id="lession_to_ready"
                placeholder="Lession to ready"
              />
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
          <Label for="program_image">Program image</Label>

            <FormGroup className="form-label-group">
              
              {/* <Input
                    onChange={this.FilesChange}
                    type="file"
                    value={this.state?.program_image}
                    name="program_image"
                    id="program_image"
                    placeholder="Program Name"
                  />
                  {console.log("program_image",this.state?.rank_image)} */}
              <p className="mb-0" style={{ fontSize: "12px" }}>
                {this.state?.rank_image?.name}
              </p>
              <div
                className=""
                style={{ textDecoration: "underline", color: "#1aa6e0" }}
              >
                <Input
                  style={{ width: "74px", opacity: 0 }}
                  className="position-absolute"
                  onChange={this.FilesChange}
                  type="file"
                  // value={this.state?.rank_image}
                  name="program_image"
                  id="program_image"
                  placeholder="Program Name"
                />
                <Upload
                  size={16}
                  style={{
                    margin: "0 0.5em 0 0",
                  }}
                />{" "}
                {this.state?.rank_image?.name?.length > 0 ? "Replace" : "Upload"}
              </div>
            </FormGroup>
          </Col>
          <Col sm="12">
            <FormGroup className="form-label-group d-flex justify-content-end mb-1">
              <Button.Ripple
                color="primary"
                type="submit"
              >
                Save
              </Button.Ripple>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    program: state.program,
  };
};
export default connect(mapStateToProps, {
  GET_PROGRAM_LIST,
  CREATE_PROGRAM_RANK,
  UPDATE_PROGRAM_RANK,
})(AddProgramRankOrEdit);
