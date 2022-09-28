import React, { useEffect, useState } from "react";
import { Row, Col, Button, CustomInput } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Card, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MainRenewals from "./MainRenewals";
import {
  GET_RENEWAL_ALL_DATA,
  GET_NOTES_BY_MEMBERID,
} from "../../../../redux/actions/member";
import { connect } from "react-redux";
import "../../../../assets/scss/pages/users.scss"
import TableNotes from "../noteRow/TableNotes";

const useStyles = makeStyles((Theme) => ({
  activeTab: {
    color: "#2796f3",
  },
  inactiveTab: {
    color: "#2796f3",
  },
}));
const Renewals = (props) => {
  const [Tabsvalue, setTabsValue] = React.useState(0);
  const [loading, setLoading] = useState(false)
  const [tillDate, setTillDate] = useState(Tabsvalue === 0 ? "expired" : Tabsvalue === 1 ? 30 : Tabsvalue === 2 ? 60 : Tabsvalue === 3 ? 90 : Tabsvalue === 4 ? "frozenmembership" : null)
  const classes = useStyles();
  const [filterBy, setfilterBy] = useState("today");
  const [studentType, setStudentType] = useState("Active Student");
  const {
    GET_RENEWAL_ALL_DATA,
    getRenewal,
    GET_NOTES_BY_MEMBERID,
  } = props;

  const NoteType = "Renewal";

  const handleChange = async (newValue) => {
    let dateTill = (newValue === 0 ? "expired" : newValue === 1 ? 30 : newValue === 2 ? 60 : newValue === 3 ? 90 : newValue === 4 ? "frozenmembership" : null)
    setTillDate(dateTill)
    setTabsValue(newValue);
    setLoading(true)
    let response = await GET_RENEWAL_ALL_DATA(0, 10, studentType, dateTill)
    if (!response) {
      setLoading(false)
    } else {
      setLoading(true)
    }
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
        breadCrumbTitle="Renewals"
        breadCrumbParent="My School"
        breadCrumbActive="Renewals"
      />
      <Row className="app-user-list">
        <Col sm="12" md="8" lg="8">
          <Card className="cardHeight">
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
                    className={`btn ${Tabsvalue === 0
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
                    className={`btn ${Tabsvalue === 1
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
                    className={`btn ${Tabsvalue === 2
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
                    className={`btn ${Tabsvalue === 3
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
                    className={`btn ${Tabsvalue === 4
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
                  <option value="Active Student">Active Members</option>
                  <option value="Active Trial">Active Trial</option>
                  <option value="Former Student">Former Student</option>
                  <option value="Former Trial">Former Trial</option>
                  <option value="Leads">Leads</option>
                  <option value="All">All</option>
                </CustomInput>
              </div>
            </div>

            {Tabsvalue === 0 ? (
              <MainRenewals
                rowdata={getRenewal}
                GetMoreNewData={GET_RENEWAL_ALL_DATA}
                studentType={studentType}
                Tabsvalue={"expired"}
                loading={loading}
                tillDate={tillDate}
              />
            ) : Tabsvalue === 1 ? (
              <MainRenewals
                rowdata={getRenewal}
                GetMoreNewData={GET_RENEWAL_ALL_DATA}
                studentType={studentType}
                Tabsvalue={30}
                loading={loading}
                tillDate={tillDate}
              />
            ) : Tabsvalue === 2 ? (
              <MainRenewals
                rowdata={getRenewal}
                GetMoreNewData={GET_RENEWAL_ALL_DATA}
                studentType={studentType}
                Tabsvalue={60}
                loading={loading}
                tillDate={tillDate}
              />
            ) : Tabsvalue === 3 ? (
              <MainRenewals
                rowdata={getRenewal}
                GetMoreNewData={GET_RENEWAL_ALL_DATA}
                studentType={studentType}
                Tabsvalue={90}
                loading={loading}
                tillDate={tillDate}
              />
            ) : (
              <MainRenewals
                rowdata={getRenewal}
                GetMoreNewData={GET_RENEWAL_ALL_DATA}
                studentType={studentType}
                Tabsvalue={"frozenmembership"}
                loading={loading}
                tillDate={tillDate}
              />
            )}
          </Card>
        </Col>
        <Col sm="12" md="4" lg="4 ">
          <Card className="cardHeight">
            <TableNotes
              title={"Renewals"}
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
    getRenewal: state.member.getRenewal,
    getNotesByMemberId: state.member.getNotesByMemberId,
  };
};

export default connect(mapStateToProps, {
  GET_RENEWAL_ALL_DATA,
  GET_NOTES_BY_MEMBERID,
})(Renewals);
