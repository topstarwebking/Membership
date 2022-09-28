import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
import { CREATE_DOCUMENT_FOLDER } from "../../../../redux/actions/document/document";
import { connect } from "react-redux";

class FloatingLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
  }

  changeHandler(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  onsubmit(e) {
    e.preventDefault();
    let createFolderData = {
      folderName: this.state.folderName.toLowerCase(),
    };
    this.props.CREATE_DOCUMENT_FOLDER(createFolderData);
    this.props.toggle();
  }
  render() {
    return (
      <Card>
        <CardHeader></CardHeader>
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
                  <Label for="nameFloating">Folder Name</Label>
                </FormGroup>
              </Col>

              <Col sm="12" className="d-flex justify-content-end">
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    outline
                    color="secondary"
                    type="reset"
                    className="mb-1 mr-1"
                    onClick={() => this.props.toggle()}
                  >
                    Cancel
                  </Button.Ripple>
                  <Button.Ripple color="primary" type="submit" className="mb-1">
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

export default connect(null, { CREATE_DOCUMENT_FOLDER })(FloatingLabels);
