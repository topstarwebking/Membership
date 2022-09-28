import React from "react";
import { Row, Col } from "reactstrap";
import TestTabs from "../../../../apps/user/list/TestTabs";
import { Card, Chip } from "@material-ui/core";
import TabsMain from "./componet/TabsMain";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import moment from "moment";

function hexToRGB(hex, alpha) {
  try {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  } catch (error) {
    return hex;
  }
}
const Sidecontent = (props) => {
  const { getDataBackOfStudent } = props;
  console.log(props);
  
  return (
    <div>
      <Row className="single-stat-grid">
        <Card className="mr-1 rounded shadow">
          <div className="p-1">
            <p style={{ color: "#acacac" }}>Event Income</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="mini-card-amt">$280</span>
              <div style={{ width: 30, height: 30 }}>
                <CircularProgressbar
                  value={66}
                  styles={buildStyles({
                    pathColor: "#0184FF",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="mr-1 rounded shadow">
          <div className="p-1">
            <p style={{ color: "#acacac" }}>Event Attendess</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="mini-card-amt">$280</span>
              <div style={{ width: 30, height: 30 }}>
                <CircularProgressbar
                  value={66}
                  styles={buildStyles({
                    pathColor: "#FF753A",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="mr-1 rounded shadow">
          <div className="p-1">
            <p style={{ color: "#acacac" }}>Event Expense</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="mini-card-amt">$280</span>
              <div style={{ width: 30, height: 30 }}>
                <CircularProgressbar
                  value={66}
                  styles={buildStyles({
                    pathColor: "#FFCA0D",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="mr-1 rounded shadow">
          <div className="p-1">
            <p style={{ color: "#acacac" }}>Event Profit</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="mini-card-amt">$280</span>
              <div style={{ width: 30, height: 30 }}>
                <CircularProgressbar
                  value={66}
                  styles={buildStyles({
                    pathColor: "#FF5A5A",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
            </div>
          </div>
        </Card>
      </Row>
      {props.data?.length > 0 ? (
        <Row className="d-flex justify-content-between align-items-center p-1">
          <Col>
            <div className="w-100">
              <div>
                <div className="d-flex justify-content-start">
                  <span className="mr-1">
                    <h3>
                      {props?.selectedrow?.title
                        ? props?.selectedrow?.title
                        : "EVENT"}
                    </h3>
                  </span>
                  <Chip
                    label={
                      props?.selectedrow?.appointment_type
                        ? props?.selectedrow?.appointment_type
                        : "Type "
                    }
                    style={{
                      color: props?.selectedrow?.app_color,
                      backgroundColor: hexToRGB(
                        props.selectedrow?.app_color || "#40a7e1",
                        0.16
                      ),
                      fontWeight: "bold",
                    }}
                    size="small"
                  />
                </div>
              </div>
              <div>
                <span className="mr-1">
                  <b>
                    {props?.selectedrow?.start
                      ? moment(props?.selectedrow?.start)?.format("MM/DD/YYYY")
                      : "Event Date "}
                  </b>
                </span>
                <span className="mr-1">
                  <b>
                    {props?.selectedrow?.start_time
                      ? moment(props?.selectedrow?.start_time)?.format("LT")
                      : "Time"}
                  </b>
                  <span className="ml-1 mr-1">to</span>
                  <b>
                    {props?.selectedrow?.end_time
                      ? moment(props?.selectedrow?.end_time)?.format("LT")
                      : "Time"}
                  </b>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      ) : null}
      {props.data?.length > 0 ? (
        <> {props.iSTest ? <TestTabs getDataBackOfStudent={getDataBackOfStudent} selectedrow={props.selectedrow} /> : <TabsMain />}</>
      ) : null}
    </div>
  );
};

export default Sidecontent;
