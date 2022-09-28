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
import "../../../../assets/scss/pages/users.scss";
import img from "../../../../assets/img/pages/1-apex.png";
import {
  createStrap,
  getStripeList,
  updateStripe,
} from "../../../../redux/actions/stripe";
import { connect } from "react-redux";
import { Select, MenuItem } from "@material-ui/core";
import { Upload } from "react-feather";

class FloatingLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidate: "",
      stripe_name: "",
      stripe_order: "",
      stripe_image: "",
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
        candidate: selectedData?.candidate,
        stripe_name: selectedData.stripe_name,
        stripe_order: selectedData.stripe_order,
        stripe_image: selectedData.stripe_image,
      });
    }
  }

  createStripe = (e) => {
    e.preventDefault();
    this.props.createStrap(this.state);
    setTimeout(() => {
      this.props.toggle();
    }, 600);
  };
  editStripe = (e) => {
    e.preventDefault();
    const { selectedData } = this.props;
    this.props.updateStripe(this.state, selectedData._id);
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
            <Label for="nameFloating">Candidate Name</Label>

            <FormGroup className="form-label-group">
              <div
                style={{
                  borderRadius: "0.4em",
                  height: "3em",
                  border: "1px solid #42a8e0",
                }}
              >
                <Select
                  fullWidth
                  name="program"
                  variant="outlined"
                  value={this.state?.candidate?.program}
                  onChange={(e) => {
                    this.setState({
                      candidate: e.target.value,
                    });
                  }}
                >
                  {this.props.stripe?.map((item) => {
                    return (
                      <MenuItem value={item?.candidate} key={item?._id}>
                        {item?.candidate}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </FormGroup>
          </Col>
          <Col md="6" sm="12" lg="6">
            <Label for="nameFloating">Stripe Name</Label>
            <FormGroup className="form-label-group">
              <Input
                style={{
                  borderRadius: "0.4em",
                  height: "3em",
                  border: "1px solid #42a8e0",
                }}
                type="text"
                name="stripe_name"
                value={this.state.stripe_name}
                onChange={this.changeHandler}
                id="totalstripeFloating"
                placeholder="Stripe Name"
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
                type="number"
                name="stripe_order"
                value={this.state.stripe_order}
                onChange={this.changeHandler}
                id="totalstripeFloating"
                placeholder="Stripe Order"
              />
            </FormGroup>
          </Col>

          <Col md="6" sm="12" lg="6">
            <Label for="stripe_image">Stripe image</Label>
            <FormGroup>

              <p className="mb-0" style={{ fontSize: "12px" }}>
                {this.state?.stripe_image?.name}
              </p>
              <div
                className=""
                style={{ textDecoration: "underline", color: "#1aa6e0" }}
              >
                <input
                  type={"file"}
                  id="stripe_image"
                  name="stripe_image"
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      stripe_image: e.target.files[0],
                    })
                  }
                  style={{display: "none", width: "74px", opacity: 0 }}
                  className="position-absolute"
                  defaultValue={this.state?.stripe_image?.name}
                />
                <Upload
                  size={16}
                  style={{
                    margin: "0 0.5em 0 0",
                  }}
                />{" "}
                {this.state?.stripe_image?.name?.length > 0 ? "Replace" : "Upload"}
              </div>
            </FormGroup>
          </Col>
          <Col sm="12" >
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

const mapStateToProps = (state) => {
  return {
    stripe: state.stripe.stripeList,
  };
};

export default connect(mapStateToProps, {
  createStrap,
  updateStripe,
  getStripeList,
})(FloatingLabels);
