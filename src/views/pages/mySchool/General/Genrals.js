import React, { useEffect, useState } from "react";
import { Row, Col, Button, CustomInput } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Card, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MainGeneral from "./MainGeneral";
import {
  GET_FROZEN_LIST_MEMBERSHIP,
  GET_MEMBERSHIP_EXPIRD30DAYS,
  GET_MEMBERSHIP_EXPIRD60DAYS,
  GET_MEMBERSHIP_EXPIRD90DAYS,
  GET_NOTES_BY_MEMBERID,
} from "../../../../redux/actions/member";
import { connect } from "react-redux";
import { GET_EXPIRED_MEMBERSSHIP } from "../../../../redux/actions/dashboard";
import TableNotes from "../noteRow/TableNotes";

const useStyles = makeStyles((Theme) => ({
  activeTab: {
    color: "#2796f3",
  },
  inactiveTab: {
    color: "#2796f3",
  },
}));
const General = (props) => {
  const [Tabsvalue, setTabsValue] = React.useState(0);
  const classes = useStyles();
  const [filterBy, setfilterBy] = useState("today");
  const [studentType, setStudentType] = useState("All");
  const {
    GET_EXPIRED_MEMBERSSHIP,
    GET_FROZEN_LIST_MEMBERSHIP,
    GET_MEMBERSHIP_EXPIRD30DAYS,
    GET_MEMBERSHIP_EXPIRD60DAYS,
    GET_MEMBERSHIP_EXPIRD90DAYS,
    GET_NOTES_BY_MEMBERID,
    getlistoffrozenmembership,
    getExpiredMembership,
    getlistofmembershipExpiredin30days,
    getlistofmembershipExpiredin60days,
    getlistofmembershipExpiredin90days,
  } = props;

  const NoteType = "General";

  const handleChange = (newValue) => {
    setTabsValue(newValue);
  };
  const handleEventType = (e) => {
    setStudentType(e.target.value);
  };

  useEffect(() => {
    GET_NOTES_BY_MEMBERID(NoteType, filterBy, 0, 10);
  }, [GET_NOTES_BY_MEMBERID, NoteType, filterBy]);

  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="General"
        breadCrumbParent="My School"
        breadCrumbActive="General"
      />
      <Row className="app-user-list">
        <Col sm="12" md="8" lg="8">
          <Card style={{ height: "92vh" }}>
            {/* <Tabs
              value={Tabsvalue}
              variant="scrollable"
              TabIndicatorProps={{
                style: { background: "#2796f3", height: "0px" },
              }}
              onChange={handleChange}
            >
              <Tab
                className={Tabsvalue === 0 ? classes.activeTab : ""}
                label={
                  <div>
                    <span>
                      <b>Expired</b>
                    </span>
                  </div>
                }
              />
              <Tab
                className={Tabsvalue === 1 ? classes.activeTab : ""}
                label={
                  <div>
                    <span>
                      <b> Expires In 30 Days</b>
                    </span>
                  </div>
                }
              />
              <Tab
                className={Tabsvalue === 2 ? classes.activeTab : ""}
                label={
                  <div>
                    <span>
                      <b>Expires In 60 Days</b>
                    </span>
                  </div>
                }
              />
              <Tab
                className={Tabsvalue === 3 ? classes.activeTab : ""}
                label={
                  <div>
                    <span>
                      <b> Expires In 90 Days</b>
                    </span>
                  </div>
                }
              />
              <Tab
                className={Tabsvalue === 4 ? classes.activeTab : ""}
                label={
                  <div>
                    <span>
                      <b>Frozen</b>
                    </span>
                  </div>
                }
              />
            </Tabs> */}
            <div className="d-flex justify-content-between pd-2em">
              <div style={{ padding: "2em" }}>
                <ButtonGroup>
                  <button
                    className={`btn ${
                      Tabsvalue === 0
                        ? "btn-primary"
                        : "btn-outline-primary text-primary"
                    }`}
                    onClick={() => {
                      handleChange(0);
                    }}
                  >
                    Expired
                  </button>
                  <button
                    className={`btn ${
                      Tabsvalue === 1
                        ? "btn-primary"
                        : "btn-outline-primary text-primary"
                    }`}
                    onClick={() => {
                      handleChange(1);
                    }}
                  >
                    In 30 Days
                  </button>
                  <button
                    className={`btn ${
                      Tabsvalue === 2
                        ? "btn-primary"
                        : "btn-outline-primary text-primary"
                    }`}
                    onClick={() => {
                      handleChange(2);
                    }}
                  >
                    In 60 Days
                  </button>
                  <button
                    className={`btn ${
                      Tabsvalue === 3
                        ? "btn-primary"
                        : "btn-outline-primary text-primary"
                    }`}
                    onClick={() => {
                      handleChange(3);
                    }}
                  >
                    In 90 Days
                  </button>
                  <button
                    className={`btn ${
                      Tabsvalue === 4
                        ? "btn-primary"
                        : "btn-outline-primary text-primary"
                    }`}
                    onClick={() => {
                      handleChange(4);
                    }}
                  >
                    Frozen
                  </button>
                </ButtonGroup>
              </div>
              <div style={{ padding: "2em" }}>
                <CustomInput
                  type="select"
                  name="select"
                  onChange={handleEventType}
                >
                  <option>All</option>
                  <option>Active Student</option>
                  <option>Active Trial</option>
                  <option>Former Student</option>
                  <option>Former Trial</option>
                  <option>Leads</option>
                </CustomInput>
              </div>
            </div>

            {Tabsvalue === 0 ? (
              <MainGeneral
                rowdata={getExpiredMembership}
                GetMoreNewData={GET_EXPIRED_MEMBERSSHIP}
                studentType={studentType}
              />
            ) : Tabsvalue === 1 ? (
              <MainGeneral
                rowdata={getlistofmembershipExpiredin30days}
                GetMoreNewData={GET_MEMBERSHIP_EXPIRD30DAYS}
                studentType={studentType}
              />
            ) : Tabsvalue === 2 ? (
              <MainGeneral
                rowdata={getlistofmembershipExpiredin60days}
                GetMoreNewData={GET_MEMBERSHIP_EXPIRD60DAYS}
                studentType={studentType}
              />
            ) : Tabsvalue === 3 ? (
              <MainGeneral
                rowdata={getlistofmembershipExpiredin90days}
                GetMoreNewData={GET_MEMBERSHIP_EXPIRD90DAYS}
                studentType={studentType}
              />
            ) : (
              <MainGeneral
                rowdata={getlistoffrozenmembership}
                GetMoreNewData={GET_FROZEN_LIST_MEMBERSHIP}
                studentType={studentType}
              />
            )}
          </Card>
        </Col>
        <Col sm="12" md="4" lg="4 ">
          <Card style={{ height: "92vh" }}>
            <TableNotes
              title={"General"}
              setfilterBy={setfilterBy}
              data={props.getNotesByMemberId}
              gobackdata={GET_NOTES_BY_MEMBERID}
            />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    getlistoffrozenmembership: state.member.getlistoffrozenmembership,
    getlistofmembershipExpiredin30days:
      state.member.getlistofmembershipExpiredin30days,
    getlistofmembershipExpiredin60days:
      state.member.getlistofmembershipExpiredin60days,
    getlistofmembershipExpiredin90days:
      state.member.getlistofmembershipExpiredin90days,
    getExpiredMembership: state.dashboard.getExpiredMembership,
    getNotesByMemberId: state.member.getNotesByMemberId,
  };
};

export default connect(mapStateToProps, {
  GET_FROZEN_LIST_MEMBERSHIP,
  GET_MEMBERSHIP_EXPIRD30DAYS,
  GET_MEMBERSHIP_EXPIRD60DAYS,
  GET_MEMBERSHIP_EXPIRD90DAYS,
  GET_EXPIRED_MEMBERSSHIP,
  GET_NOTES_BY_MEMBERID,
})(General);
