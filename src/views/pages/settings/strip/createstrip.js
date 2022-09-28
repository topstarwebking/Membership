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
  CustomInput,
} from "reactstrap";
import "../../../../assets/scss/pages/users.scss";
import img from "../../../../assets/img/pages/1-apex.png";
import {
  CREATE_STRIPES,
  UPDATE_STRIPE,
} from "../../../../redux/actions/stripe";
import { connect } from "react-redux";
import { Upload } from "react-feather";

class FloatingLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#664d4d",
      lable: "",
      total_stripe: "",
      progression: "pramote",
      candidate: "",
      candidate_image: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  componentDidMount() {
    const { selectedData } = this.props;
    if (selectedData) {
      this.setState({
        color: selectedData.color,
        lable: selectedData.lable,
        total_stripe: selectedData.total_stripe,
        progression: selectedData.progression,
        candidate: selectedData.candidate,
        candidate_image: selectedData.candidate_image,
      });
    }
  }

  createStripe = (e) => {
    e.preventDefault();
    this.props.CREATE_STRIPES(this.state);
    setTimeout(() => {
      this.props.toggle();
    }, 600);
  };
  editStripe = (e) => {
    e.preventDefault();
    const { selectedData } = this.props;
    this.props.UPDATE_STRIPE(this.state, selectedData._id);
    setTimeout(() => {
      this.props.toggle();
    }, 600);
  };

  render() {
    const { selectedData } = this.props;
    return (
      <Form
        className="mt-10 mx-2"
        onSubmit={selectedData ? this.editStripe : this.createStripe}
      >
        <Row>
          <Col md="6" sm="12" lg="6">
            <Label for="colorFloating">Candidate Name</Label>
            <FormGroup className="form-label-group">
              <Input
                style={{
                  borderRadius: "0.4em",
                  height: "3em",
                  border: "1px solid #42a8e0",
                }}
                type="text"
                name="candidate"
                value={this.state.candidate}
                onChange={this.changeHandler}
                id="stripeFloating"
                placeholder="Candidate Name"
              />
            </FormGroup>
          </Col>

          
          <Col md="6" sm="12" lg="6">
            <Label for="passwordFloating">Label</Label>
            <FormGroup className="form-label-group">
              <Input
                style={{
                  borderRadius: "0.4em",
                  height: "3em",
                  border: "1px solid #42a8e0",
                }}
                type="text"
                name="lable"
                value={this.state.lable}
                onChange={this.changeHandler}
                id="labelFloating"
                placeholder="Label"
              />
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <Label for="nameFloating">Stripe Order</Label>
            <FormGroup className="form-label-group">
              <Input
                style={{
                  borderRadius: "0.4em",
                  height: "3em",
                  border: "1px solid #42a8e0",
                }}
                type="text"
                name="total_stripe"
                value={this.state.total_stripe}
                onChange={this.changeHandler}
                id="totalstripeFloating"
                placeholder="Total Stripe"
              />
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <FormGroup className="form-label-group">
              <div>
                <Label> progression </Label>
              </div>
              <CustomInput
                style={{
                  borderRadius: "0.4em",
                  height: "3em",
                  border: "1px solid #42a8e0",
                }}
                type="select"
                name="progression"
                value={this.state.progression}
                id="Progression"
                onChange={this.changeHandler}
              >
                <option>Pramote</option>
                <option>Pramote</option>
              </CustomInput>
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <Label for="colorFloating">Color</Label>
            <FormGroup>
              <Input
                required
                name="color"
                style={{ width: "60px", height: "60px" }}
                onChange={this.changeHandler}
                type="color"
                value={this.state.color}
                id="colorFloating"
                // className="npt-1"
              />
            </FormGroup>
          </Col>
         
          <Col md="6" sm="12" lg="6">
            <Label for="candidate_image">Program image</Label>
            <FormGroup>
              <p className="mb-0" style={{ fontSize: "12px" }}>
                {this.state?.candidate_image.name}
              </p>
              <div
                className=""
                style={{ textDecoration: "underline", color: "#1aa6e0" }}
              >
                <input
                  style={{ display: "none" }}
                  type={"file"}
                  id="candidate_image"
                  name="candidate_image"
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      candidate_image: e.target.files[0],
                    })
                  }
                  style={{ width: "74px", opacity: 0 }}
                  className="position-absolute"
                  defaultValue={this.state?.candidate_image?.name}
                />
                <Upload
                  size={16}
                  style={{
                    margin: "0 0.5em 0 0",
                  }}
                />{" "}
                {this.state?.candidate_image?.name?.length > 0 ? "Replace" : "Upload"}
              </div>
            </FormGroup>
          </Col>
          <Col sm="12">
            <FormGroup className="form-label-group d-flex justify-content-end">
              <Button.Ripple
                color="primary"
                type="submit"
                className="mb-1"
                // onClick={e => e.preventDefault()}
              >
                {selectedData ? "Update" : "Create"}
              </Button.Ripple>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect(null, { CREATE_STRIPES, UPDATE_STRIPE })(FloatingLabels);
