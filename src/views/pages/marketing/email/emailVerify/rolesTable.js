import React, { useEffect, useState } from "react";
import VerificationForm from "./verifyModall";
import { Col, FormGroup, Input, InputGroup, Row, Label } from "reactstrap";
import SubUsersListRow from "./sub_users_row";
import { Card } from "@material-ui/core";
import {
  GET_SUB_USERS_LIST,
  STORE_ROLE_ID,
} from "../../../../../redux/actions/employee_subusers_roles";

import { connect } from "react-redux";

const RolesTable = (props) => {
  const { employeeSubUsersList, employeeRolesList, role_id } = props;
  // const [verifiedEmail, setVerifiedEmail] = useState([]);

  // const searchEmail = (e) => {
  //   let { value } = e.target;
  //   let res = listOfActiveOrInActiveEmails?.filter((item) =>
  //     item?.email?.includes(value?.toLowerCase())
  //   );
  //   setVerifiedEmail(res);
  // };

  const selectRoleHandler = (e) => {
    let { value } = e.target;
    props.GET_SUB_USERS_LIST(value);
    props.STORE_ROLE_ID(value);
  };

  useEffect(() => {
    if (employeeRolesList.length) {
      if (role_id === null) {
        const { _id } = employeeRolesList[0];
        props.GET_SUB_USERS_LIST(_id);
        props.STORE_ROLE_ID(_id);
      }
    }
  }, [employeeRolesList]);

  return (
    <div className="py-1" style={{ width: "100%" }}>
      <Row>
        <Col sm="12" md="12" lg="12">
          <div className="d-flex">
            <VerificationForm />
            {/* <FormGroup>
              <Input
                type="text"
                name="searchsubuser"
                id="searchsubuser"
                placeholder="Search sub-user.."
                // onChange={searchEmail}
                required
              />
            </FormGroup> */}
            <FormGroup  className="ml-2">
                <select
                class="browser-default custom-select"
                  onChange={selectRoleHandler}
                  type="select"
                  name="select"
                  id="selected"
                  style={{width:"150px"}}
                >
                  {employeeRolesList.map((info, index) => {
                    return (
                      <option value={info._id} key={index + 1}>
                        {info.rolename}
                      </option>
                    );
                  })}
                </select>
              
            </FormGroup>
          </div>
        </Col>
        <Col sm="12" md="12" lg="12">
          <Card
            className="rounded"
            style={{ boxShadow: "0 12px 48px rgb(109 117 141 / 10%)" }}
          >
            <SubUsersListRow RoleListInfo={employeeRolesList} SubUsersList={employeeSubUsersList} />
            <br />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeSubUsersList: state.employeeSubUser.employeeSubUsersList,
    employeeRolesList: state.employeeSubUser.employeeRolesList,
    role_id: state.employeeSubUser.role_id,
  };
};

export default connect(mapStateToProps, {
  GET_SUB_USERS_LIST,
  STORE_ROLE_ID,
})(RolesTable);
