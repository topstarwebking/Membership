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
import { CREATE_TUTORIALS } from "../../../../redux/actions/document/document";
import { connect } from "react-redux";

class FloatingLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url:"",
      description:""


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
      title: this.state.title,
      url:this.state.url,
      description:this.state.description

    };
    this.props.CREATE_TUTORIALS(createFolderData,this.props.activeSubMainFolder._id);
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
              <Label for="nameFloating">Title</Label>

                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="title"
                    className="text-capitalize"
                    value={this.state.title}
                    onChange={this.changeHandler}
                    id="title"
                    placeholder="Title"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
              <Label for="nameFloating">Tutorial URL</Label>

                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="url"
                    className="text-capitalize"
                    value={this.state.url}
                    onChange={this.changeHandler}
                    id="url"
                    placeholder="Tutorial URL"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
              <Label for="nameFloating">Description</Label>

                <FormGroup className="form-label-group">
                  <Input
                    type="textarea"
                    name="description"
                    className="text-capitalize"
                    value={this.state.description}
                    onChange={this.changeHandler}
                    id="description"
                    placeholder="Description"
                  />
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

export default connect(null, { CREATE_TUTORIALS })(FloatingLabels);
