import React, { useState, useEffect, Dispatch } from "react";
import { Row, Col, CustomInput } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import MissCallTable from "./TableMisscalls";
import { Card, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import "../../../../assets/scss/pages/users.scss"
import { connect } from "react-redux";
import {
  GET_MISS_YOU_CALL,
  GET_NOTES_BY_MEMBERID,
} from "../../../../redux/actions/member";
import TableNotes from "../noteRow/TableNotes";

const useStyles = makeStyles((Theme) => ({
  activeTab: {
    color: "#2796f3",
  },
  inactiveTab: {
    color: "#2796f3",
  },
}));
const MissyoucallMain = (props) => {
  const [Tabsvalue, setTabsValue] = React.useState(0);
  const [tillDate, setTillDate] = useState(Tabsvalue === 0 ? 14 : Tabsvalue === 1 ? 30 : Tabsvalue === 2 ? 60 : Tabsvalue === 3 ? 90 : null)
  const [loading, setLoading] = useState(false)
  const classes = useStyles();
  const NoteType = "Miss You";
  const [filterBy, setfilterBy] = useState("today");
  const [studentType, setStudentType] = useState("Active Student");

  const {
    GET_MISS_YOU_CALL,
    getMissYouCall,
    GET_NOTES_BY_MEMBERID,
  } = props;


  const handleChange =async (newValue) => {
    let dateTill = (newValue === 0 ? 14 : newValue === 1 ? 30 : newValue === 2 ? 60 : newValue === 3 ? 90 : null)
    setTillDate(dateTill)
    setTabsValue(newValue);
    setLoading(true)
    let response = await GET_MISS_YOU_CALL(0, 10, studentType, dateTill)
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
        breadCrumbTitle="Miss You Call"
        breadCrumbParent="My School"
        breadCrumbActive="Miss You Call"
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
                    7-14 Days
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
                    15-30 Days
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
                    31-60 Days
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
                    61+ Days
                  </button>
                </ButtonGroup>
              </div>
              <div style={{ padding: "2em" }}>
                <CustomInput
                  type="select"
                  name="select"
                  id="studentType"
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
              <MissCallTable
                rowdata={getMissYouCall}
                GetMoreNewData={GET_MISS_YOU_CALL}
                studentType={studentType}
                Tabsvalue={14}
                loading={loading}
                tillDate={tillDate}
              />
            ) : Tabsvalue === 1 ? (
              <MissCallTable
                rowdata={getMissYouCall}
                GetMoreNewData={GET_MISS_YOU_CALL}
                studentType={studentType}
                Tabsvalue={30}
                loading={loading}
                tillDate={tillDate}
              />
            ) : Tabsvalue === 2 ? (
              <MissCallTable
                rowdata={getMissYouCall}
                GetMoreNewData={GET_MISS_YOU_CALL}
                studentType={studentType}
                Tabsvalue={60}
                loading={loading}
                tillDate={tillDate}
              />
            ) : (
              <MissCallTable
                rowdata={getMissYouCall}
                GetMoreNewData={GET_MISS_YOU_CALL}
                studentType={studentType}
                Tabsvalue={90}
                loading={loading}
                tillDate={tillDate}
              />
            )}
          </Card>
        </Col>
        <Col sm="12" md="4" lg="4">
          <Card className="cardHeight">
            <TableNotes
              title={"Miss You Call"}
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
    getMissYouCall: state.member.getMissYouCall,
    getNotesByMemberId: state.member.getNotesByMemberId,
  };
};

export default connect(mapStateToProps, {
  GET_NOTES_BY_MEMBERID,
  GET_MISS_YOU_CALL,
})(MissyoucallMain);
