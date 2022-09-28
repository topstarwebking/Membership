import React, { useEffect, useState } from 'react'
import {
  Tooltip,
  XAxis,
  CartesianGrid,
  BarChart,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts'
import CustomTooltip from "./CustomTooltip"
import { Row, Col, CustomInput } from "reactstrap";
import {
  GET_PROGRAM_DATA_BY_MEMBERSHIP_TYPE,
  GET_PROGRAM_DATA_BY_STATICS_TYPE,
} from "../../../../../redux/actions/statictics";
import { connect } from "react-redux";
import TableData from "./states/Table"

const StaticsbarChart = (props) => {
  const {
    GET_PROGRAM_DATA_BY_MEMBERSHIP_TYPE,
    GET_PROGRAM_DATA_BY_STATICS_TYPE,
    getProgramDataByStaticsType,
    getProgramDataByMembershipType,
  } = props;
  const [activeMamberType, setActiveMemberType] = useState("Beginner")
  const [activeStatisticsType, setActiveStaticsType] = useState("MemberStatics")
  const [statisticsYear, setStatisticsYear] = useState("2022")
  const [memberYear, setMemberYear] = useState("2022")
  const [tooltip, settooltip] = useState(null)


  useEffect(() => {
    GET_PROGRAM_DATA_BY_MEMBERSHIP_TYPE(activeMamberType, memberYear)
    GET_PROGRAM_DATA_BY_STATICS_TYPE(activeStatisticsType, statisticsYear)
  }, [GET_PROGRAM_DATA_BY_MEMBERSHIP_TYPE, activeStatisticsType, activeMamberType, statisticsYear, memberYear]);

  const labels = [
    { 1: "Jan" },
    { 2: "Feb" },
    { 3: "Mar" },
    { 4: "Apr" },
    { 5: "May" },
    { 6: "Jun" },
    { 7: "Jul" },
    { 8: "Aug" },
    { 9: "Sep" },
    { 10: "Oct" },
    { 11: "Nov" },
    { 12: "Dec" },
  ];
  const getMonth = (index) => {
    const data = labels.find((item, i) => i + 1 === index)
    return data[index]
  }


  const modifyData = (data) => {
    let valueList = [];
    if (data) {
      for (let item of data) {
        let data = { name: getMonth(item?.month), ...item }
        valueList.push(data);
      }
    }
    return valueList;
  };
  const modifyData2 = (data, keyname) => {
    if (keyname !== undefined) {
      if (data) {
        let valueList = [];
        for (let item of data) {
          let data = { name: getMonth(item?.month) }
          data[keyname] = item?.count
          valueList.push(data);
        }
        return valueList;
      }
    }
  };
  const handleStatisticYear = (e) => {
    setStatisticsYear(e.target.value)
  }
  const handleMemberYear = (e) => {
    setMemberYear(e.target.value)
  }
  const handleChangeStatics = (e) => {
    setActiveStaticsType(e.target.value)
  }
  const handleChangeMembershipType = (e) => {
    setActiveMemberType(e.target.value)
  }

  return (
    <div>
      <Row className="mt-2">
        <Col md="6">
          <div className="d-flex justify-content-between align-items-center stat-thead dark-back p-1">
            {activeStatisticsType === "TrialStatics" ? <h4>Pipeline Statistics</h4> : <h4>Member Statistics</h4>}
            <div style={{ width: "250px" }} className="d-flex justify-content-between">
              <CustomInput
                type="select"
                name="select"
                id="select"
                onChange={handleChangeStatics}
              >
                <option value="MemberStatics">Member Statistics</option>
                <option value="TrialStatics">Trail Statistics</option>
                <option value="leadsStatics">Lead Statistics</option>

              </CustomInput>
              <CustomInput
                type="select"
                name="select"
                onChange={handleStatisticYear}
                style={{ width: "100px", marginLeft: "5px" }}
              >
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>

              </CustomInput>
            </div>
          </div>{
            activeStatisticsType === "leadsStatics" ? <ResponsiveContainer height={300}>
              <BarChart
                width={500}
                height={300}
                data={modifyData(getProgramDataByStaticsType)}
              >
                <CartesianGrid />
                <XAxis
                  height={40}
                  type={"category"}
                  dataKey="name"
                  angle={-40}
                  interval={0}
                  textAnchor={"end"}
                  axisLine={false}
                  offset={4}
                  tickMargin={1}
                />
                <YAxis />

                <Tooltip
                  cursor={false}
                  wrapperStyle={{ top: -150, right: 100 }}
                  content={<CustomTooltip tooltip={tooltip}
                    statisticsYear={statisticsYear}
                  />}
                />
                <Legend verticalAlign="top" />
                <Bar barSize={8}
                  onMouseOver={(data) => {
                    settooltip("Joined")
                  }}
                  dataKey={(data) => data?.join?.count} name="Joined" fill="#0184FF" />
              </BarChart>
            </ResponsiveContainer>
              : <ResponsiveContainer height={300}>
                <BarChart
                  width={500}
                  height={300}
                  data={modifyData(getProgramDataByStaticsType)}

                >
                  <CartesianGrid />
                  <XAxis
                    height={40}
                    type={"category"}
                    dataKey="name"
                    angle={-40}
                    interval={0}
                    textAnchor={"end"}
                    axisLine={false}
                    offset={4}
                    tickMargin={1}
                  />
                  <YAxis />
                  <Tooltip
                    cursor={false}
                    wrapperStyle={{ top: -150, right: 100 ,background:"#0000"}}
                    content={<CustomTooltip tooltip={tooltip} statisticsYear={statisticsYear}

                    />}
                  />
                  <Legend verticalAlign="top" />
                  <Bar
                    barSize={8}
                    onMouseOver={(data) => {
                      settooltip("Not Joined")
                    }}
                    dataKey={(data) => data?.quite?.count} name="Not Joined" fill="#f56111" />
                  <Bar
                    barSize={8}
                    onMouseOver={(data) => {
                      settooltip("Joined")
                    }}
                    dataKey={(data) => data?.join?.count} name="Joined" fill="#0184FF" />

                </BarChart>
              </ResponsiveContainer>
          }
        </Col>
        <Col md="6">
          <div className="d-flex justify-content-between align-items-center stat-thead dark-back p-1">
            <h4>Program Statistics</h4>
            <div style={{ width: "250px" }} className="d-flex justify-content-between">
              <CustomInput
                type="select"
                value={activeMamberType}
                name="membershipType"
                id="membershipType"
                onChange={handleChangeMembershipType}
              >
                <option value="Beginner">Beginner</option>
                <option value="BBC">BBC</option>
                <option value="LC">LC</option>
                <option value="Trial">Trial </option>
                <option value="IC">IC</option>
                <option value="MC">MC</option>
                <option value="TC">TC</option>
                <option value="After School">After School</option>
              </CustomInput>
              <CustomInput
                type="select"
                name="select"
                onChange={handleMemberYear}
                style={{ width: "100px", marginLeft: "5px" }}
              >
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </CustomInput>
            </div>
          </div>
          <ResponsiveContainer height={300}>
            <BarChart
              width={500}
              height={300}
              data={modifyData2(getProgramDataByMembershipType, activeMamberType)}

            >
              <CartesianGrid />
              <XAxis
                height={40}
                dataKey="name"
                type="category"
                angle={-40}
                interval={0}
                textAnchor={"end"}
                axisLine={false}
                offset={4}
                tickMargin={1}
              />
              <YAxis />
              <Tooltip cursor={false}
              />
              <Legend verticalAlign="top" />
              <Bar barSize={8} dataKey={(data) => data?.Beginner} name={activeMamberType} fill="#0184FF" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>

      <TableData />
    </div >
  )
}
const mapStateToProps = (state) => {
  return {
    getProgramDataByStaticsType: state.statictics.getProgramDataByStaticsType,
    getProgramDataByMembershipType: state.statictics.getProgramDataByMembershipType,
  };
};
export default connect(mapStateToProps, {
  GET_PROGRAM_DATA_BY_MEMBERSHIP_TYPE,
  GET_PROGRAM_DATA_BY_STATICS_TYPE,
})(StaticsbarChart);