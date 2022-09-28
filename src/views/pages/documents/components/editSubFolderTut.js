import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Label,
} from "reactstrap";

import { EDIT_TUTORIAL_SUB_FOLDER } from "../../../../redux/actions/document/document";
import { connect } from "react-redux";

class FloatingLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subfolderName: this.props.subFolder.subfolderName,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
  }

  changeHandler(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  onsubmit(e) {
    e.preventDefault();
    if (this.state.subfolderName !== "") {
      this.props.EDIT_TUTORIAL_SUB_FOLDER(
        { subfolderName: this.state.subfolderName.toLowerCase() },
        this.props.subFolder
      );
      this.props.toggle();
    }
  }
  render() {
    return (
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <form className="mt-10" onSubmit={this.onsubmit}>
            <Row>
              <Col sm="12">
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="subfolderName"
                    value={this.state.subfolderName}
                    onChange={this.changeHandler}
                    id="subfolderName"
                    placeholder="Folder Name"
                  />
                  <Label for="nameFloating">Edit Sub Folder Name</Label>
                </FormGroup>
              </Col>

              <Col sm="12" className="d-flex justify-content-end">
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    outline
                    color="secondary"
                    className="mr-1 "
                    onClick={() => {
                      this.props.toggle();
                    }}
                  >
                    Back
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
          </form>
        </CardBody>
      </Card>
    );
  }
}

export default connect(null, { EDIT_TUTORIAL_SUB_FOLDER })(FloatingLabels);
