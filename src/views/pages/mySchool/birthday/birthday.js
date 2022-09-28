import React, { useEffect, useState } from "react";
import { Row, Col, CustomInput } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import { Card, ButtonGroup } from "@material-ui/core";
import {
  GET_BIRTHDAY_ALL_DATA,
  GET_NOTES_BY_MEMBERID,
} from "../../../../redux/actions/member";
import "../../../../assets/scss/pages/users.scss"
import BirthdyaTable from "./BirthdyaTable";
import TableNotes from "../noteRow/TableNotes";
// import MergeForm from "../../../apps/user/list/MergeForm";
const useStyles = makeStyles((Theme) => ({
  activeTab: {
    color: "#2796f3",
  },
  inactiveTab: {
    color: "#2796f3",
  },
}));

const Birthday = (props) => {
  const {
    GET_BIRTHDAY_ALL_DATA,
    getBirthday,
    GET_NOTES_BY_MEMBERID,
  } = props;
  const [Tabsvalue, setTabsValue] = React.useState(0);
  const [loading, setLoading] = useState(false)
  const [tillDate, setTillDate] = useState("Thees week")
  const classes = useStyles();
  const [filterBy, setfilterBy] = useState("today");
  const NoteType = "Birthday";
  const [studentType, setStudentType] = useState("Active Student");


  const handleChange = async (newValue) => {
    let dateTill = (newValue === 0 ? "Thees week" : newValue === 1 ? "This month" : newValue === 2 ? "next month" : newValue === 3 ? "60" : newValue === 4 ? "90" : null)
    setTillDate(dateTill)
    setTabsValue(newValue);
    setLoading(true)
    let response =await  GET_BIRTHDAY_ALL_DATA(0, 10, studentType, dateTill)
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
        breadCrumbTitle="Birthday"
        breadCrumbParent="My School"
        breadCrumbActive="Birthday"
      />
      <Row className="app-user-list">
        <Col sm="12" md="8" lg="8">
          <Card className="cardHeight">
            <div className="d-flex justify-content-between">
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
                    THIS WEEK
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
                    THIS MONTH
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
                    NEXT MONTH
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
                    In 60 Days
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
                    In 90 Days
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
              <BirthdyaTable
                rowdata={getBirthday}
                GetMoreNewData={GET_BIRTHDAY_ALL_DATA}
                studentType={studentType}
                Tabsvalue={"Thees week"}
                loading={loading}
                tillDate={tillDate}
              />
            ) : Tabsvalue === 1 ? (
              <BirthdyaTable
                rowdata={getBirthday}
                GetMoreNewData={GET_BIRTHDAY_ALL_DATA}
                studentType={studentType}
                Tabsvalue={"This month"}
                loading={loading}
                tillDate={tillDate}
              />
            ) : Tabsvalue === 2 ? (
              <BirthdyaTable
                rowdata={getBirthday}
                GetMoreNewData={GET_BIRTHDAY_ALL_DATA}
                studentType={studentType}
                Tabsvalue={"next month"}
                loading={loading}
                tillDate={tillDate}
              />
            ) : Tabsvalue === 3 ? (
              <BirthdyaTable
                rowdata={getBirthday}
                GetMoreNewData={GET_BIRTHDAY_ALL_DATA}
                studentType={studentType}
                Tabsvalue={"60"}
                loading={loading}
                tillDate={tillDate}
              />
            ) : (
              <BirthdyaTable
                rowdata={getBirthday}
                GetMoreNewData={GET_BIRTHDAY_ALL_DATA}
                studentType={studentType}
                Tabsvalue={"90"}
                loading={loading}
                tillDate={tillDate}
              />
            )}
          </Card>
        </Col>
        <Col sm="12" md="4" lg="4">
          <Card className="cardHeight">
            <TableNotes
              title={"Birthday"}
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
    getBirthday: state.member.getBirthday,
    getNotesByMemberId: state.member.getNotesByMemberId,
  };
};

export default connect(mapStateToProps, {
  GET_BIRTHDAY_ALL_DATA,
  GET_NOTES_BY_MEMBERID,
})(Birthday);
