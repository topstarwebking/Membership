import React from "react"
import { Link, withRouter } from "react-router-dom";
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Mail, Lock, Check } from "react-feather"
import { loginWithJWT, LOGIN_WITH_JWT } from "../../../../redux/actions/auth/loginActions"
import { connect } from "react-redux";
import { compose } from 'redux';
import { history } from "../../../../history"

class LoginJWT extends React.Component {
  state = {
    username: "",
    password: "",
    remember: false
  }
  componentDidMount() {
    if (!!localStorage.getItem("access_token")) {
    }
  }
  handleLogin = e => {
    e.preventDefault()
    this.props.LOGIN_WITH_JWT(this.state)
  }
  handleRemember = e => {
    this.setState({
      remember: e.target.checked
    })
  }
  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="username"
                placeholder="Username"
                onChange={e => this.setState({ username: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>User Name</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Remember me"
                defaultChecked={false}
                onChange={this.handleRemember}
              />
              <div className="float-right">
                <Link to="/pages/forgot-password">Forgot Password?</Link>
              </div>
            </FormGroup>
            <div className="d-flex justify-content-between">
              <Button.Ripple
                color="primary"
                outline
                onClick={() => {
                  history.push("/pages/register")
                }}
              >
                Register
              </Button.Ripple>
              <Button.Ripple color="primary" type="submit">
                Login
              </Button.Ripple>
            </div>

            {this.props.error && (
              <div className="alert alert-danger mt-1" role="alert">
                {this.props.error}            </div>
            )}
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  let values = state.auth.login.values;
  let error = '';
  if (values) {
    if (values.hasOwnProperty('error')) {
      error = values.error;
    }
  }

  //const error = state.auth.login.values.error;
  return {
    error: error,
  }
}
export default compose(withRouter, connect(mapStateToProps, { loginWithJWT, LOGIN_WITH_JWT }))(LoginJWT);
