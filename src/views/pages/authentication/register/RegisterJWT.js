import React from "react";
import { Form, FormGroup, Input, Label, Button, CustomInput } from "reactstrap";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import { connect } from "react-redux";
import {
  signupWithJWT,
  SIGN_UP_JWT,
} from "../../../../redux/actions/auth/registerActions";
import { history } from "../../../../history";
import NumberFormat from "react-number-format";
import OtpverificationModal from "./OtpverificationModal";

const Notification = () => {
  return (
    <>
      <div className="p-3 my-2 rounded bg-docs-transparent-grid">
        <div className="alert alert-success" role="alert">
          Your account created successfully!
        </div>
      </div>
    </>
  );
};

class RegisterJWT extends React.Component {
  state = {
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    // password: "demo@123",
    bussinessname: "",
    bussinessAddress: "",
    industry: "",
    username: "",
    location_name: "",
  };

  changeHandler = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  changeHandler2 = (value) => {
    this.setState({ location_name: value });
  };
  handleRegister = (e) => {
    e.preventDefault();
    if (this.state.firstname === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill first name",
      });
    } else if (this.state.lastname === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill last name",
      });
    } else if (this.state.email === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill email",
      });
    } else if (this.state.phone === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill phone",
      });
    } else if (this.state.bussinessname === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill bussiness name",
      });
    } else if (this.state.bussinessAddress === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill bussiness address",
      });
    } else if (this.state.username === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill username",
      });
    } else {
      this.setState({
        error: false,
        errorMsg: "",
      });
      this.props.SIGN_UP_JWT({ ...this.state });
    }
  };
  render() {
    return (
      <>
        {this.props.register.status?.status && <Notification />}
        <Form action="/" onSubmit={this.handleRegister}>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="First Name"
              required
              name="firstname"
              onChange={this.changeHandler}
            />
            <Label>First Name</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="Last Name"
              required
              name="lastname"
              onChange={this.changeHandler}
            />
            <Label>Last Name</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="email"
              placeholder="Email"
              required
              name="email"
              onChange={this.changeHandler}
            />
            <Label>Email</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <NumberFormat
              style={{ height: "3em" }}
              type="text"
              name="phone"
              id="mobile_number"
              placeholder="Phone"
              onChange={this.changeHandler}
              format="###-###-####"
              mask="_"
              className="form-control"
            />
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="Bussiness Name"
              required
              name="bussinessname"
              onChange={this.changeHandler}
            />
            <Label>Bussiness Name</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="Bussiness Address"
              required
              name="bussinessAddress"
              onChange={this.changeHandler}
            />
            <Label>Bussiness Address</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <CustomInput
              onChange={(e) => this.changeHandler(e, "industry")}
              type="select"
              name="industry"
              id="industry"
            >
              <option>General Business</option>
              <option>Real Estate</option>
              <option>Fitness</option>
              <option>Martial Arts</option>
              <option>Dance</option>
              <option>Yoga</option>
              <option>CMA Franchise</option>
            </CustomInput>
            <Label>Industry</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="User Name"
              required
              name="username"
              onChange={this.changeHandler}
            />
            <Label>Username</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="City"
              required
              name="town"
              onChange={this.changeHandler}
            />
            <Label>City</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="State"
              required
              name="state"
              onChange={this.changeHandler}
            />
            <Label>State</Label>
          </FormGroup>
          <FormGroup>
            <Checkbox
              color="primary"
              icon={<Check className="vx-icon" size={16} />}
              label=" I accept the terms & conditions."
              defaultChecked={true}
            />
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Button.Ripple
              color="primary"
              outline
              onClick={() => {
                history.push("/pages/login");
              }}
            >
              Login
            </Button.Ripple>
            <Button.Ripple color="primary" type="submit">
              Register
            </Button.Ripple>
          </div>
        </Form>
        {this.props.register.status?.status ? (
          <OtpverificationModal data={this.props.register.status?.data} />
        ) : null}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    register: state.auth.register,
  };
};
export default connect(mapStateToProps, {
  signupWithJWT,
  SIGN_UP_JWT,
  SIGN_UP_JWT,
})(RegisterJWT);
