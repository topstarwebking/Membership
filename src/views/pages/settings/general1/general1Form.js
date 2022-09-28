import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Input,
  Form,
  Button,
  Row,
  Label,
} from "reactstrap";

import { User, Upload, EyeOff, Eye } from "react-feather";
import { connect } from "react-redux";
import { updateUserInfo } from "../../../../redux/actions/auth/loginActions";
import { InputBase } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

class HorizontalForm extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.state = {
      showPassWord: true,
    };
  }

  componentDidUpdate(prevProps) {
    const { userinfo } = prevProps;

    const { userInfo } = this.props.userinfo;
    if (userinfo.userInfo !== userInfo) {
      this.setState({
        ...userInfo?.userInfo,
      });
    }
  }
  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value,
    });
  };

  updateUser = (e) => {
    e.preventDefault();
    this.props.updateUserInfo(this.state);
  };
  imageHandler = (e) => {
    this.setState({
      ...this.state,
      profile_image: e.target.files[0],
      memberProfileUrl: URL.createObjectURL(e.target.files[0]),
    });
  };
  render() {
    const { showPassWord } = this.state;
    return (
      <div>
        <Card>
          {/* <CardHeader>
            <CardTitle style={{fontSize:16}}>
              <PersonIcon  style={{
              color: "gray",
              fontSize: 26,
              marginRight: "4px"
            }} />
              Organization Setup
            </CardTitle>
            <div style={{backgroundColor:"#d9d9d9", paddingBottom:"1px",width:"100%"}} className="mt-1 mb-2"/>

          </CardHeader> */}
          <CardBody>
            <Form onSubmit={this.updateUser}>
              <Row>
                <Col
                  md="6"
                  sm="12"
                  lg="6"
                  className="pr-2"
                  style={{ borderRight: "1px solid #d9d9d9" }}
                >
                  <CardTitle style={{ fontSize: 16 }}>Account Info</CardTitle>
                  <Row>
                 
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span>First Name:</span>
                        <Input
                          type="text"
                          defaultValue={
                            this.props.userinfo?.userinformation?.firstname
                          }
                          name="firstname"
                          placeholder="First Name"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span>Last Name:</span>
                        <Input
                          type="text"
                          defaultValue={
                            this.props.userinfo?.userinformation?.lastname
                          }
                          name="lastname"
                          placeholder="Last Name"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span> Phone Number:</span>
                        <Input
                          type="Number"
                          name="phone"
                          defaultValue={
                            this.props.userinfo?.userinformation?.phone
                          }
                          id="num"
                          placeholder="Phone Number"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                   
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span> Email:</span>
                        <Input
                          type="email"
                          name="email"
                          defaultValue={
                            this.props.userinfo?.userinformation?.email
                          }
                          id="email"
                          placeholder="Email"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span>User Name:</span>
                        <Input
                          type="text"
                          defaultValue={
                            this.props.userinfo?.userinformation?.username
                          }
                          name="username"
                          id="merch"
                          placeholder="User Name"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12" lg="6">
                      <div>
                        <span> Password:</span>
                        <div
                          className="rounded"
                          style={{
                            border: "1px solid #d9d9d9",
                            padding: "0.2rem 0.2rem",
                          }}
                        >
                          <InputBase
                            style={{ width: "90%", paddingleft: "10px" }}
                            type={showPassWord ? "password" : "text"}
                            defaultValue={
                              this.props.userinfo?.userinformation?.password
                            }
                            name="password"
                            id="Password"
                            placeholder="Password"
                            onChange={this.handleChange}
                          />
                          {showPassWord ? (
                            <EyeOff
                              size="20"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  showPassWord: !showPassWord,
                                });
                              }}
                            />
                          ) : (
                            <Eye
                              size="20"
                              onClick={() => {
                                this.setState({
                                  ...this.state,
                                  showPassWord: !showPassWord,
                                });
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span>About</span>
                        <Input
                          type="text"
                          defaultValue={
                            this.props.userinfo?.userinformation?.about
                          }
                          name="about"
                          id="merch"
                          placeholder="About"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                   
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <Label>Member Profile Image</Label>
                        <div className="my-1">
                         
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                              background: "rgb(239 238 238 / 45%)",
                              width: "128px",
                              borderRadius: "4px",
                              height: "98px",
                              color:"#1aa6e0"
                            }}
                          >
                            {this.state.memberProfileUrl === undefined ? (
                              <div style={{textDecoration: "underline"}}>
                                <input
                                  style={{ display: "none", width: "74px", opacity: 0 }}
                                  type={"file"}
                                  ref={this.myRef}
                                  onChange={this.imageHandler}
                                  className="position-absolute"
                                />
                                <Upload
                                  size={16}
                                  style={{
                                    margin: "0 0.5em 0 0",
                                  }}
                                />{" "}
                                Upload
                              </div>
                            ) : (
                              <img
                                style={{
                                  width:"100%"
                                }}
                                src={this.state.memberProfileUrl}
                                alt="select_image"
                                width="100"
                                height="100"
                              />
                            )}
                          </div>
                        </div>
                        {this.state.memberProfileUrl !== undefined && (
                          <div style={{color:"#1aa6e0", textDecoration: "underline",paddingLeft: "26px"}} >
                            <input
                              style={{width: "74px",
                                opacity: 0}}
                              className="position-absolute cursor-pointer"
                              type={"file"}
                              ref={this.myRef}
                              onChange={this.imageHandler}
                            />
                            <Upload
                              size={14}
                              style={{
                                margin: "0 0.5em 0 0",
                              }}
                            />
                            Replace
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>

                <Col md="6" sm="12" lg="6" className="pl-2">
                  <CardTitle style={{ fontSize: 16 }}>Business Info</CardTitle>
                  <Row>
                    
                    
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span>Business Name:</span>
                        <Input
                          type="text"
                          defaultValue={
                            this.props.userinfo?.userinformation?.bussinessname
                          }
                          name="bussinessname"
                          placeholder="Business Name"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span>Business Email:</span>
                        <Input
                          type="email"
                          defaultValue={
                            this.props.userinfo?.userinformation?.bussinessEmail
                          }
                          name="bussinessEmail"
                          id="BusinessEmail"
                          placeholder="Business Email"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span>School Id:</span>
                        <Input
                          type="number"
                          defaultValue={
                            this.props.userinfo?.userinformation?.schoolId
                          }
                          name="schoolId"
                          id="school"
                          placeholder="School Id"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span> Address:</span>
                        <Input
                          type="text"
                          name="bussinessAddress"
                          defaultValue={
                            this.props.userinfo?.userinformation
                              ?.bussinessAddress
                          }
                          id="Address"
                          placeholder="Address"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span> City:</span>
                        <Input
                          type="text"
                          name="city"
                          defaultValue={
                            this.props.userinfo?.userinformation?.city
                          }
                          id="add2"
                          placeholder="City"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span> State:</span>
                        <Input
                          type="text"
                          name="state"
                          defaultValue={
                            this.props.userinfo?.userinformation?.state
                          }
                          id="State"
                          placeholder="State"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span> Country:</span>
                        <Input
                          type="text"
                          name="country"
                          defaultValue={
                            this.props.userinfo?.userinformation?.country
                          }
                          id="Country"
                          placeholder="Country"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span> Zip:</span>
                        <Input
                          type="text"
                          name="zipPostal_code"
                          defaultValue={
                            this.props.userinfo?.userinformation?.zipPostal_code
                          }
                          id="Zip"
                          placeholder="Zip"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    {/* <Col md="6" sm="12" lg="6">
                      <FormGroup>
                        <span>Landing Page</span>
                        <Input
                          type="text"
                          defaultValue={
                            this.props.userinfo?.userinformation?.landing_page
                          }
                          name="landing_page"
                          id="Landing Page"
                          placeholder="Landing Page"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col> */}
                  </Row>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <Button.Ripple color="primary" type="submit">
                  Update
                </Button.Ripple>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth,
    userinfo: state.userinfo,
  };
};
// export default HorizontalForm
export default connect(mapStateToProps, { updateUserInfo })(HorizontalForm);
