import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Input, Label, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { CREATE_SUB_USER } from "../../../../../redux/actions/employee_subusers_roles";
import Profile from "./uploadProfilePic";
const userData = JSON.parse(localStorage.getItem("userdata"));

const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;
const SubUsers = (props) => {
  const { employeeRolesList, role_id } = props;
  const [open, setOpen] = useState(false);
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
  const [errorInfo, setErrorInfo] = useState({
    username: false,
    firstname: false,
    email_id: false,
    lastname: false,
    phone_number: false,
  });
  const [errorLog, setErrorLog] = useState({
    validPassword: false,
    selectRol: false,
  });

  const handleCloseOpen = () => {
    setOpen(!open);
    setPayload({});
  };

  var verify = false;

  const changeHandler = (e) => {
    let { value, name } = e.target;
    if (name == "CRPassword" && payload.RPassword !== value) {
      setErrorLog({ ...errorLog, validPassword: true });
    } else {
      setErrorLog({ ...errorLog, validPassword: false });
    }
    if (Object.keys(errorInfo).includes(name)) {
      setErrorInfo({ ...errorInfo, [name]: false });
    }
    setPayload({ ...payload, [name]: value });
  };
  console.log("payload. errorLog", errorInfo);

  const CreateSubUser = async (e) => {
    await setLoading(true);
    await e.preventDefault();
    let newErrorInfo = errorInfo;
    let newErrorLog = errorLog;
    newErrorLog.selectRol =
      !payload.selectRol || payload.selectRol === "select role please."
        ? true
        : false;
    newErrorLog.validPassword =
      !payload.CRPassword || payload.CRPassword === "" ? true : false;
    newErrorInfo.firstname =
      !payload.firstname || payload.firstname === "" ? true : false;
    newErrorInfo.lastname =
      !payload.lastname || payload.lastname === "" ? true : false;
    newErrorInfo.email_id =
      !payload.email_id || payload.email_id === "" ? true : false;
    newErrorInfo.phone_number =
      !payload.phone_number || payload.phone_number === "" ? true : false;
    setErrorInfo({ ...newErrorInfo });
    setErrorLog({ ...newErrorLog });

    if (
      newErrorInfo.firstname ||
      newErrorInfo.lastname ||
      newErrorInfo.email_id ||
      newErrorInfo.phone_number ||
      newErrorLog.selectRol ||
      newErrorLog.CRPassword
    ) {
      verify = true;
    } else {
      verify = false;
    }
    if (!verify) {
      const {
        username,
        RPassword,
        firstname,
        email_id,
        profile_img,
        phone_number,
        lastname,
        CRPassword,
        selectRol,
      } = payload;
      let result = employeeRolesList.filter((v) => v._id === selectRol);
      const { _id, roles, default_location } = result[0];
      var ObjectInfo = Object.assign(
        {},
        {
          username,
          firstname,
          lastname,
          status: "Active",
          default_location,
          phone_number,
          // profile_img,
          email_id,
          RPassword,
          roles: JSON.stringify(roles),
          role: _id,
        }
      );

      const filterResult = Object.entries(ObjectInfo).filter(([k, v]) =>
        [undefined, ""].includes(v)
      );
      if (filterResult.length) {
        setErrorInfo({ ...errorInfo, [filterResult[0][0]]: true });
      } else {
        if (CRPassword) {
          if (
            ObjectInfo.username.trim() === (userData?.data?.username).trim()
          ) {
            setErrorInfo({ ...errorInfo, username: true });
          } else {
            const clone = (obj) => Object.assign({}, obj);
            const renameKey = (object, key, newKey) => {
              const clonedObj = clone(object);
              const targetKey = clonedObj[key];
              delete clonedObj[key];
              clonedObj[newKey] = targetKey;
              return clonedObj;
            };
            ObjectInfo = renameKey(ObjectInfo, "email_id", "email");
            ObjectInfo = renameKey(ObjectInfo, "phone_number", "phone");
            ObjectInfo = renameKey(ObjectInfo, "RPassword", "password");
            let fdata = new FormData();
            for (var k in ObjectInfo) {
              fdata.append(k, ObjectInfo[k]);
            }
            const createResult = await props.CREATE_SUB_USER(fdata, role_id);
            if (createResult.success) {
              handleCloseOpen();
            }
          }
        } else {
          setErrorLog({ ...errorLog, validPassword: true });
        }
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <Button.Ripple onClick={handleCloseOpen} color="primary">
        Add Sub-User
      </Button.Ripple>
      <Dialog
        PaperProps={{
          style: {
            width: IsSmallDevise ? "100%" : "500px",
          },
        }}
        open={open}
      >
        <div className="d-flex justify-content-between align-items-center pt-1 px-2">
          <Typography style={{ fontSize: "18px" }}>Add Sub-User</Typography>
          <IconButton onClick={handleCloseOpen} className="rounded-circle">
            <Close />
          </IconButton>
        </div>
        <DialogContent>
          <form className="mb-3">
            <Row>
              <Col sm="12" md="6" lg="6">
                <Label htmlFor="username">Username</Label>
                <FormGroup>
                  <Input
                    type="text"
                    invalid={errorInfo.username}
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <Label htmlFor="first_name">First Name</Label>
                <FormGroup>
                  <Input
                    type="text"
                    invalid={errorInfo.firstname}
                    name="firstname"
                    id="firstname"
                    placeholder="First name"
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <Label htmlFor="last_name">Last Name</Label>
                <FormGroup>
                  <Input
                    type="text"
                    invalid={errorInfo.lastname}
                    name="lastname"
                    id="lastname"
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
                    invalid={errorInfo.email_id}
                    type="email"
                    name="email_id"
                    id="email_id"
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
                    name="RPassword"
                    id="RPassword"
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <Label htmlFor="CRPassword">Confirm Password</Label>
                <FormGroup>
                  <Input
                    invalid={errorLog.validPassword}
                    type="password"
                    name="CRPassword"
                    id="CRPassword"
                    placeholder="Confirm Password..."
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              {console.log(
                "errorInfo.phone_number",
                errorInfo.phone_number,
                errorLog.selectRol
              )}
              <Col sm="12" md="6" lg="6">
                <Label htmlFor="phone_number">Phone Number</Label>
                <FormGroup>
                  <Input
                    type="number"
                    name="phone_number"
                    invalid={errorInfo.phone_number}
                    id="phone_number"
                    placeholder="phone number..."
                    onChange={changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <FormGroup>
                  <Label for="rolSelect">Select a Role</Label>
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
              </Col>

              <Col sm="12" md="6" lg="6">
                <FormGroup>
                  <Label for="rolSelect">Profile Photo</Label>
                  {payload?.profile_img?.name && (
                    <p className="mb-0" style={{ fontSize: "10px" }}>
                      {payload?.profile_img?.name || ""}
                    </p>
                  )}
                  <Profile setPayload={setPayload} payload={payload} />
                </FormGroup>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button.Ripple
                onClick={CreateSubUser}
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
    employeeRolesList: state.employeeSubUser.employeeRolesList,
    role_id: state.employeeSubUser.role_id,
  };
};

export default connect(mapStateToProps, { CREATE_SUB_USER })(SubUsers);
