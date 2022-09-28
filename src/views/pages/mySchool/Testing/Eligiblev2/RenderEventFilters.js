import React from "react";
import { Row, Col } from "reactstrap";
import TestTabs from "../../../../apps/user/list/TestTabs";
import { Card, Chip } from "@material-ui/core";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import moment from "moment";
import { Link } from 'react-router-dom'
import SelectBox from "../../../../../components/@vuexy/SelectBox/SelectBox";
import DateField from "../../../../../components/@vuexy/DateField/DateField";
import SearchIcon from "@material-ui/icons/Search";

const RenderEventFilters = () => {
  return (
    <div className="mt-2">
      <Row>
        <Col sm={4} md={4} lg={4}>
          <div className="d-flex align-items-center">
            <div id="date-filed" style={{ position: "relative" }}>
              <input
                placeholder="Search Event"
                className="form-control"
                type="text"
              />
              <SearchIcon
                style={{
                  color: "#a2a2a2",
                  fontSize: "20px",
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              />
            </div>
            {/* <div className="ml-2" style={{ width: "150px" }}>
              <DateField value={new Date()} type={"date"} />
            </div> */}
          </div>
        </Col>
        <Col sm={8} md={8} lg={8}>
          <div className="d-flex justify-content-end align-items-center">
            <div className="mr-2" style={{ width: "150px" }}>
              {/* <SelectBox
                options={[{ label: "Program", value: "Program" }]}
                optionKey="value"
                optionValue="value"
                optionName="label"
                // onChange={(e) => setUnit(e)}
                selected={"Program"}
              /> */}
            </div>
            <div className="mr-2" style={{ width: "150px" }}>
              {/* <SelectBox
                options={[{ label: "Type", value: "Type" }]}
                optionKey="value"
                optionValue="value"
                optionName="label"
                // onChange={(e) => setUnit(e)}
                selected={"Type"}
              /> */}
            </div>
            <div className="mr-2" style={{ width: "150px" }}>
              {/* <SelectBox
                options={[{ label: "Tags", value: "tags" }]}
                optionKey="value"
                optionValue="value"
                optionName="label"
                // onChange={(e) => setUnit(e)}
                selected={"Tags"}
              /> */}
            </div>
            <Link
              className="member_primary_btn_style btn btn-primary"
              to="/app/event/Create/0"
            >
              Create Event
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RenderEventFilters;
