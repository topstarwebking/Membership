import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Input, Label, FormGroup } from "reactstrap";
import Profile from "./uploadProfilePic";
import { connect } from "react-redux";
import { UPDATE_SUB_USER } from "../../../../../redux/actions/employee_subusers_roles";

const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;
const EditSubUser = (props) => {
  const { editVales, role_id } = props;
  const [editOpen, setEditOpen] = useState(true);
  const [payload, setPayload] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email_id: "",
    RPassword: "",
    CRPassword: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorLog, setErrorLog] = useState({
    validPassword: false,
    selectRol: false,
  });

  const handleCloseOpen = () => {
    setEditOpen(false);
    setPayload({});
  };

  useEffect(() => {
    let { _id, firstname, lastname, email, password, phone, username } =
      editVales;
    setPayload({
      ...payload,
      firstname,
      lastname,
      email_id: email,
      RPassword: password,
      CRPassword: password,
      phone_number: phone,
      username,
      _id,
    });
  }, [editVales]);

  const changeHandler = (e) => {
    let { value, name } = e.target;
    if (name === "CRPassword" && payload.RPassword !== value) {
      setErrorLog({ ...errorLog, validPassword: true });
    } else {
      setErrorLog({ ...errorLog, validPassword: false });
    }
    setPayload({ ...payload, [name]: value });
  };

  const UpdateSubUser = async (e) => {
    setLoading(true);

    const {
      _id,
      username,
      RPassword,
      firstname,
      email_id,
      phone_number,
      lastname,
      profile_img,
      CRPassword,
      selectRol,
    } = payload;

    const createResult = await props.UPDATE_SUB_USER(
      Object.assign(
        {},
        {
          _id,
          username,
          firstname,
          lastname,
          profile_img,
          phone: phone_number,
          email: email_id,
          password: RPassword,
        }
      ),
      _id,
      role_id
    );
    if (createResult.success) {
      handleCloseOpen();
    }

    setLoading(false);
  };
  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            width: IsSmallDevise ? "100%" : "500px",
          },
        }}
        open={editOpen}
      >
        <div className="d-flex justify-content-between align-items-center p-1">
          <Typography>Edit sub-user</Typography>
          <IconButton onClick={handleCloseOpen} className="rounded-circle">
            <Close />
          </IconButton>
        </div>
        <DialogContent>
          <form>
            <Row>
              <Col sm="12" md="12" lg="12">
                <Label htmlFor="username">username</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={payload?.username}
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <Label htmlFor="first_name">First name</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={payload?.firstname}
                    placeholder="Full name"
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <Label htmlFor="last_name">Last name</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={payload?.lastname}
                    placeholder="Last name"
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <Label htmlFor="email_id">Email</Label>
                <FormGroup>
                  <Input
                    type="email"
                    name="email_id"
                    id="email_id"
                    value={payload?.email_id}
                    placeholder="email"
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              {/* <Col sm="12" md="6" lg="6">
                <Label htmlFor="twilio_number">Twilio no.</Label>
                <FormGroup>
                  <Input
                    type="number"
                    name="twilio_number"
                    id="twilio_number"
                    value={payload?.twilio_number}
                    placeholder="twilio number..."
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col> */}
              <Col sm="12" md="6" lg="6">
                <Label htmlFor="RPassword">Password</Label>
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="Password..."
                    value={payload?.RPassword}
                    name="RPassword"
                    id="RPassword"
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <Label htmlFor="CRPassword">Confirm password</Label>
                <FormGroup>
                  <Input
                    invalid={errorLog.validPassword}
                    type="password"
                    name="CRPassword"
                    id="CRPassword"
                    value={payload?.CRPassword}
                    placeholder="Confirm Password..."
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>

              <Col sm="12" md="6" lg="6">
                <Label htmlFor="phone_number">Phone Number</Label>
                <FormGroup>
                  <Input
                    type="number"
                    name="phone_number"
                    id="phone_number"
                    placeholder="phone number..."
                    value={payload?.phone_number}
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              {/* <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label for="rolSelect">Select a role</Label>
                    <Input
                      invalid={errorLog.selectRol}
                      id="rolSelect"
                      name="selectRol"
                      type="select"
                      onChange={changeHandler}
                    >
                      <option key={0}>select role please.</option>
                      {employeeRolesList.map((info, index) => {
                        return (
                          <option value={info._id} key={index + 1}>
                            {info.rolename}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col> */}

              <Col sm="12" md="6" lg="6">
                <FormGroup>
                  <Label for="rolSelect">Update Profile Photo</Label>
                  <Profile setPayload={setPayload} payload={payload} />
                </FormGroup>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button.Ripple
                onClick={() => {
                  UpdateSubUser();
                }}
                type="button"
                color="primary"
              >
                {loading ? "Loading ... " : " Submit"}
              </Button.Ripple>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    role_id: state.employeeSubUser.role_id,
  };
};

export default connect(mapStateToProps, { UPDATE_SUB_USER })(EditSubUser);
