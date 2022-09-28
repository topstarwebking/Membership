import React from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Alert,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
import { Upload } from "react-feather";

// import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/users.scss";
import {
  GET_PROGRAM_LIST,
  ADD_PROGRAM,
  UPDATE_PROGRAM,
} from "../../../../redux/actions/programe";
import { connect } from "react-redux";

class FloatingLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formfilled: false,
      error: false,
      errorMsg: "",
      programName: "",
      color: "",
      label: 0,
      total_rank: "",
      progression: "Progression",
      type: "By Belt",
      requirement: "Requirement",
      program_image: "",
    };
  }
  componentDidMount() {
    this.props.GET_PROGRAM_LIST();
    this.setState({
      ...this.state,
      programName: this?.props?.programToEdit?.programName || "",
      color: this?.props?.programToEdit?.color || "",
      lable: this?.props?.programToEdit?.label || this.state.label,
      total_rank: this?.props?.programToEdit?.total_rank || 0,
      progression: this?.props?.programToEdit?.progression || "",
      type: this?.props?.programToEdit?.type || "",
      requirement: this?.props?.programToEdit?.requirement || "",
      program_image: this?.props?.programToEdit?.program_image,
    });
  }
  myChangeHandler = (event) => {
    let { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  submitFormData = (e) => {
    e.preventDefault();
    if (this.state.programName === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill program name",
      });
    } else if (this.state.color === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly select color",
      });
    } else if (this.state.lable === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill label",
      });
    } else if (this.state.total_rank === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill total rank",
      });
    } else {
      this.setState({
        error: false,
        errorMsg: "",
      });
      let {
        color,
        lable,
        programName,
        progression,
        requirement,
        total_rank,
        type,
      } = this.state;
      var postdata = {
        color,
        lable,
        programName,
        progression,
        requirement,
        total_rank,
        type,
      };
      if (this.state.program_image !== "") {
        postdata.program_image = this.state.program_image;
      }
      if (this.props?.programToEdit !== undefined) {
        this.props.UPDATE_PROGRAM(postdata, this?.props?.programToEdit?._id);
      } else {
        this.props.ADD_PROGRAM(postdata);
      }
    }

    this.props.toggleModal();
  };

  render() {
    return (
      <Form className="mt-10 mx-2">
        <Row>
          <Col md="6" sm="12" lg="6">
            <Label for="programName">Program Name </Label>
            <FormGroup>
              <Input
                required
                id="programName"
                type="text"
                name="programName"
                defaultValue={this.state?.programName}
                onChange={this.myChangeHandler}
              />
            </FormGroup>
          </Col>

          {/* <Col md="6" sm="12" lg="6">
            <Label for="labelFloating">Lable</Label>
            <FormGroup>
              <Input
                required
                name="lable"
                onChange={this.myChangeHandler}
                type="number"
                defaultValue={
                  this.state?.lable || this.props?.programToEdit?.lable
                }
                id="labelFloating"
              />
            </FormGroup>
          </Col> */}
          <Col md="6" sm="12" lg="6">
            <Label for="TotalRank">Total Rank</Label>
            <FormGroup>
              <Input
                required
                name="total_rank"
                onChange={this.myChangeHandler}
                type="number"
                defaultValue={this.state?.total_rank}
                id="TotalRank"
                // className="npt-1"
              />
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <Label for="Progression">Progression</Label>
            <FormGroup>
              <Input
                required
                name="progression"
                onChange={this.myChangeHandler}
                type="select"
                defaultValue={this.state?.progression}
                id="Progression"
                // className="npt-1"
              >
                <option value="select">Select</option>
                <option value="Active Student">Active Student</option>
                <option value="Former Student">Former Student</option>
                <option value="Leads">Leads</option>
                <option value="Active Trial">Active Trial</option>
                <option value="Former Trial">Former Trial</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <Label for="type">Belt Type </Label>
            <FormGroup>
              <Input
                required
                name="type"
                onChange={this.myChangeHandler}
                type="select"
                defaultValue={this.state?.type}
                id="type"
                // className="npt-1"
              >
                <option value="select">Select</option>
                <option value="By Belt">By Belt</option>
                <option value="By Stripe">By Stripe</option>
                <option value="By Apparel">By Apparel</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <Label for="requirement">Requirement </Label>
            <FormGroup>
              <Input
                required
                name="requirement"
                onChange={this.myChangeHandler}
                type="select"
                defaultValue={this.state?.requirement}
                id="requirement"
                // className="npt-1"
              >
                <option value="select">Select</option>
                <option value="Requirement">Requirement</option>
                <option value="None">None</option>
                <option value="bottel">bottel</option>
                <option value="Manage list">Manage list</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <Label for="colorFloating">Color</Label>
            <FormGroup>
              <Input
                required
                name="color"
                style={{ width: "60px", height: "60px" }}
                onChange={this.myChangeHandler}
                type="color"
                defaultValue={this.state?.color}
                id="colorFloating"
                // className="npt-1"
              />
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <Label for="program_image">Program image</Label>
            <FormGroup>
             
              <p className="mb-0" style={{ fontSize: "12px" }}>
                {this.state?.program_image}
              </p>
              <div
                className=""
                style={{ textDecoration: "underline", color: "#1aa6e0" }}
              >
                <input
                  style={{ display: "none", width: "74px", opacity: 0  }}
                  type={"file"}
                  id="program_image"
                  name="program_image"
                  onChange={this.myChangeHandler}
                  className="position-absolute"
                  defaultValue={this.state?.program_image}
                />
                <Upload
                  size={16}
                  style={{
                    margin: "0 0.5em 0 0",
                  }}
                />{" "}
                {this.state?.program_image?.length > 0 ? "Replace" : "Upload"}
              </div>
            </FormGroup>
          </Col>

          <Col md="6" sm="12" lg="6">
            {this.state.error === true && (
              <Alert color="danger">{this.state.errorMsg}</Alert>
            )}
            {this.state.formfilled === true && (
              <Alert color="success">Program created successfully</Alert>
            )}
          </Col>
          <Col sm="12">
            <FormGroup className="form-label-group justify-content-end d-flex mb-1">
            
              <Button.Ripple
                outline
                color="warning"
                type="reset"
                className="mr-1 "
              >
                Delete
              </Button.Ripple>
              <Button.Ripple
                color="primary"
                className=""
                onClick={(e) => this.submitFormData(e)}
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
  ADD_PROGRAM,
  UPDATE_PROGRAM,
})(FloatingLabels);
