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
} from "reactstrap";

import { EDIT_FOLDER } from "../../../../redux/actions/document/document";
import { connect } from "react-redux";

class FloatingLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: this.props.folder.folderName,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
  }

  changeHandler(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  onsubmit(e) {
    e.preventDefault();
    if (this.state.folderName !== "") {
      this.props.EDIT_FOLDER(
        { folderName: this.state.folderName.toLowerCase() },
        this.props.folder
      );
      this.props.toggle();
    }
  }
  render() {
    return (
      <Card>
        <CardBody>
          <Form className="mt-10" onSubmit={this.onsubmit}>
            <Row>
              <Col sm="12">
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="folderName"
                    className="text-capitalize"
                    value={this.state.folderName}
                    onChange={this.changeHandler}
                    id="folderName"
                    placeholder="Folder Name"
                  />
                  <Label for="nameFloating">Edit Folder Name</Label>
                </FormGroup>
              </Col>

              <Col sm="12" className="d-flex justify-content-end">
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    outline
                    color="secondary"
                    className="mb-1 mr-1 m-0"
                    onClick={() => {
                      this.props.toggle();
                    }}
                  >
                    Back
                  </Button.Ripple>
                  <Button color="primary" type="submit" className="mb-1 m-1">
                    Save
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default connect(null, { EDIT_FOLDER })(FloatingLabels);
