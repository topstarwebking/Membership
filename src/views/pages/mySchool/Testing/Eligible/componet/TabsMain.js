import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import React, { useState } from "react";
import classnames from "classnames";
import Attendee from "./Attendee";
import Invite from "./Invite";
import Register from "./Register";
import { connect } from "react-redux";
import { Chip } from "@material-ui/core";
import {
  INVITE_REGISTER,
  DELET_STUDENT_FROM_INVITE,
  ADD_STUDENTS_IN_ATTEDNDE,
  DELET_STUDENT_FROM_ATTENDED_OR_REGISTER,
} from "../../../../../../redux/actions/test";
import ConfirmationModal from "../../../../../../components/gloabal/confirmation";

const TabsMain = (props) => {
  const [selectedId, setSelectedId] = useState([]);
  const [SelectedRows, setSelectedRows] = useState([]);
  const [All_id, setAll_id] = useState([]);
  const [defaultAlert, setdefaultAlert] = useState(false);
  const [All_studentId, setAll_studentId] = useState([]);
  const [defaultAlert2, setdefaultAlert2] = useState(false);
  const [state, setState] = useState({
    activeTab: "1",
  });
  const [defaultAlert3, setdefaultAlert3] = useState(false);
  const [defaultAlert4, setdefaultAlert4] = useState(false);

  const getalldata = (data) => {
    let list = [];
    for (let item of data) {
      let payload = {
        studentId: item?.studentId,
        firstName: item?.firstName,
        lastName: item?.firstName,
        memberprofileImage: item?.memberprofileImage,
        phone: item?.primaryPhone,
        program: item?.program,
        current_rank_img: item?.current_rank_img || "no data",
        next_rank_img: item?.next_rank_img || "no data",
        next_rank_name: item?.next_rank_name || "no data",
        current_rank_name: item?.current_rank_name || "no data",
      };
      list.push(payload);
    }
    return list;
  };
  const getAllIds = (data) => {
    let list = [];
    for (let item of data) {
      list.push(item?.eventId);
    }
    return list;
  };
  const getAll_Ids = (data) => {
    let list = [];
    for (let item of data) {
      list.push(item?._id);
    }
    return list;
  };
  const studentIds = (data) => {
    let list = [];
    for (let item of data) {
      list.push(item?.studentId);
    }
    return list;
  };

  const handleSelectRows = async (state) => {
    let payload = await getalldata(state.selectedRows);
    let ids = await getAllIds(state?.selectedRows);
    let _id = await getAll_Ids(state?.selectedRows);
    await setSelectedId(ids);
    await setSelectedRows(payload);
    await setAll_id(_id);
  };
  const handleSelectRows2 = async (state) => {
    let S_id = await studentIds(state?.selectedRows);
    let _id = await getAll_Ids(state?.selectedRows);
    await setAll_studentId(S_id);
    await setAll_id(_id);
  };

  const toggle = (tab) => {
    setAll_id([]);
    setSelectedRows([]);
    setSelectedId([]);
    setState({
      activeTab: tab,
    });
  };
  const Handleregister = () => {
    props.INVITE_REGISTER(SelectedRows, selectedId[0], props.EventId);
    setdefaultAlert3(false);
  };
  const DELETE_INVITES = () => {
    props.DELET_STUDENT_FROM_INVITE(All_id, props.EventId);
    setdefaultAlert(false);
  };
  const HandleDeleteAlert = () => {
    setdefaultAlert(true);
  };
  const HandleDeleteAlert2 = () => {
    setdefaultAlert2(true);
  };
  const HandleAddStudntInattteded = () => {
    props.ADD_STUDENTS_IN_ATTEDNDE(All_studentId, props.EventId);
    setdefaultAlert4(false);
  };
  const DELETE_REGISTER_AND_ATTENDED = () => {
    props.DELET_STUDENT_FROM_ATTENDED_OR_REGISTER(All_id, props.EventId);
    setdefaultAlert2(false);
  };
  return (
    <>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: state.activeTab === "1",
                  })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  <span className="align-middle ml-50">Invited</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: state.activeTab === "2",
                  })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  <span className="align-middle ml-50">Registered</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: state.activeTab === "3",
                  })}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  <span className="align-middle ml-50">Attended</span>
                </NavLink>
              </NavItem>
            </Nav>
            {state?.activeTab === "1" && (
              <div>
                <Chip
                  label={"Register"}
                  onClick={() => {
                    setdefaultAlert3(true);
                  }}
                  disabled={All_id?.length === 0}
                  size="small"
                  style={{
                    background: "#7ab837",
                    color: "#fff",
                  }}
                />
                <Chip
                  label="Remove"
                  onClick={HandleDeleteAlert}
                  size="small"
                  disabled={All_id?.length === 0}
                  style={{ background: "#e74954", color: "#fff" }}
                />
              </div>
            )}
            {state?.activeTab === "2" && (
              <div>
                <Chip
                  label="Remove"
                  onClick={HandleDeleteAlert2}
                  size="small"
                  disabled={All_id?.length === 0}
                  style={{ background: "#e74954", color: "#fff" }}
                />
                <Chip
                  label="Attended"
                  onClick={() => {
                    setdefaultAlert4(true);
                  }}
                  size="small"
                  style={{
                    background: "#7ab837",
                    color: "#fff",
                  }}
                  disabled={All_id?.length === 0}
                />
              </div>
            )}
            {state?.activeTab === "3" && (
              <div>
                <Chip
                  label="Remove"
                  onClick={HandleDeleteAlert2}
                  size="small"
                  disabled={All_id?.length === 0}
                  style={{ background: "#e74954", color: "#fff" }}
                />
              </div>
            )}
          </div>


          <TabContent activeTab={state.activeTab}>
            <TabPane tabId="1">
              <Invite
                getInvitestudents={props.getInvitestudents}
                handleSelectRows={handleSelectRows}
              />
            </TabPane>
            <TabPane tabId="2">
              <Register
                data={props.getRegisteredforEvent}
                handleSelectRows={handleSelectRows2}
              />
            </TabPane>
            <TabPane tabId="3">
              <Attendee
                data={props.getAttendedforEvent}
                handleSelectRows={handleSelectRows2}
              />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
      
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={defaultAlert}
        title="Remove student?"
        onConfirm={DELETE_INVITES}
        onCancel={() => {
          setdefaultAlert(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Remove"}
        description=" Are you sure you Remove it ?"
      />
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={defaultAlert2}
        title="Remove student?"
        onConfirm={DELETE_REGISTER_AND_ATTENDED}
        onCancel={() => {
          setdefaultAlert2(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Remove"}
        description=" Are you sure you Remove it ?"
      />
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/icons8-ok-96.png"
        open={defaultAlert3}
        title="Add Student Registered"
        onConfirm={Handleregister}
        onCancel={() => {
          setdefaultAlert3(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Add"}
        description=" "
      />
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/icons8-ok-96.png"
        open={defaultAlert4}
        title="Add Student to attended"
        onConfirm={HandleAddStudntInattteded}
        onCancel={() => {
          setdefaultAlert4(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Add"}
        description=" "
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    getInvitestudents: state.test.getInvitestudents,
    getRegisteredforEvent: state.test.getRegisteredforEvent,
    getAttendedforEvent: state.test.getAttendedforEvent,
    EventId: state.test.EventId,
  };
};
export default connect(mapStateToProps, {
  INVITE_REGISTER,
  DELET_STUDENT_FROM_INVITE,
  ADD_STUDENTS_IN_ATTEDNDE,
  DELET_STUDENT_FROM_ATTENDED_OR_REGISTER,
})(TabsMain);
