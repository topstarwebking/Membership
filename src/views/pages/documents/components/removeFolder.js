import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Form,
  Button,
} from "reactstrap";

// import img from "../../../../assets/img/pages/1-apex.png"
import { REMOVE_FOLDER } from "../../../../redux/actions/document/document";
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
    // const { ...rest } = this.state;
    this.props.REMOVE_FOLDER(
      { folderName: this.state.folderName.trim() },
      this.props.folder
    );
    this.props.toggle();
  }
  render() {
    return (
      <Card>
        <CardHeader>
          {/* <CardTitle>Vertical Form With Floating Labels</CardTitle> */}
        </CardHeader>
        <CardBody>
          <Form className="mt-10" onSubmit={this.onsubmit}>
            <Row>
              <Col sm="12">
                <div style={{ paddingBottom: 20, paddingTop: 20 }}>
                  Are you sure you want to delete folder {this.state.folderName}
                  ?
                </div>
              </Col>
              <Col sm="12">
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    // onClick={e => e.preventDefault()}
                  >
                    Yes, Delete
                  </Button.Ripple>
                  <Button.Ripple
                    outline
                    color="warning"
                    type="cancel"
                    className="mb-1"
                  >
                    Cancel
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
export default connect(null, { REMOVE_FOLDER })(FloatingLabels);
