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
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from "../../../../redux/actions/programe";
import "../../../../assets/scss/pages/users.scss";
import { connect } from "react-redux";

class FloatingLabels extends React.Component {
  state = {
    programName: "",
    category: "",
  };

  componentDidMount() {
    this.props.GET_PROGRAM_LIST();
  }

  changeHandler = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  onsubmit = (e) => {
    e.preventDefault();
    let {
      editCategoryStatus,
      CREATE_CATEGORY,
      toggleModal,
      editCategory,
      UPDATE_CATEGORY,
    } = this.props;
    if (editCategoryStatus) {
      let payload = this.state;
      if (editCategory?.programName === "") {
        payload.programName = editCategory?.programName;
      }
      UPDATE_CATEGORY(editCategory?._id, payload);
    } else {
      CREATE_CATEGORY(this.state);
    }
    toggleModal();
  };
  render() {
    const { editCategory } = this.props;
    return (
      <Card>
        <CardBody>
          <Form className="mt-10" onSubmit={this.onsubmit}>
            <Row>
              <Col sm="12">
                <FormGroup className="form-label-group">
                  <div>
                    <Label>Program</Label>
                  </div>
                  <CustomInput
                    type="select"
                    name="programName"
                    value={this.state.programName}
                    onChange={this.changeHandler}
                  >
                    {this.props.program.programList.map((v, i) => (
                      <option
                        value={v.programName || editCategory?.programName}
                        key={v._id}
                      >
                        {v.programName}
                      </option>
                    ))}
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup className="form-label-group">
                  <div>
                    <Label> Category Name </Label>
                  </div>
                  <Input
                    onChange={this.changeHandler}
                    defaultValue={editCategory?.category}
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Category Name"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    className="ml-1"
                    color="flat-danger"
                    onClick={() => {
                      this.props.toggleModal();
                    }}
                  >
                    Cancel
                  </Button.Ripple>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    Save
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
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
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
})(FloatingLabels);
