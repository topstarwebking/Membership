import React, { useEffect, useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CustomInput,
} from "reactstrap";
import Barchart from "./components/MemberChart";
import "react-circular-progressbar/dist/styles.css";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "../../../../assets/scss/pages/finance.scss";
import Ranks from "./components/Ranks";
import States from "./components/states";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  GET_ALL_JOINY_AND_QUIT_TRAILS,
  GET_ALL_JOINY_AND_QUIT_MEMBERS,
  GET_ALL_PROGRAM,
} from "../../../../redux/actions/statictics";

const Stat = (props) => {
  const dispatch = useDispatch();
  // const [year, setYear] = useState(() => new Date().getFullYear());
  const [years] = useState(() => {
    let data = [];
    let currentYear = new Date().getFullYear();
    for (let i = 5; i > 0; i--) {
      data.push(currentYear - i);
    }
    data.reverse();
    return [currentYear, ...data];
  });

  // function changeYear(key) {
  //   setYear(key);
  //   props.GET_ALL_JOINY_AND_QUIT_TRAILS("01-01-" + key);
  //   props.GET_ALL_JOINY_AND_QUIT_MEMBERS("01-01" + key);
  // }

  // function yearList() {
  //   return (
  //     <React.Fragment>
  //       {years.map((x) => (
  //         <DropdownItem key={x} onClick={() => changeYear(x)} tag="a">
  //           {x}
  //         </DropdownItem>
  //       ))}
  //     </React.Fragment>
  //   );
  // }
  const { all_program } = useSelector((state) => state.statictics);

  useEffect(() => {
    dispatch(GET_ALL_PROGRAM());
  }, [dispatch]);

  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [studentType, setStudentType] = useState("Active Student");



  useMemo(() => {
    if (all_program) {
      if (all_program.length > 0) {
        setSelectedProgram(all_program[0].programName);
        setSelectedName(all_program[0].programName);
      }
    }
  }, [all_program]);

  const handleEventType = (e) => {
    setStudentType(e.target.value);
  };
  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="My School"
        breadCrumbParent="My School"
        breadCrumbActive="Statistics"
      />
      <Row>
        <Col md="3">
          <Card>
            <CardBody>
              <div className="section-header d-flex justify-content-between align-items-center">
                <span className="section-title">By Program</span>
                <div>
                  <CustomInput
                    type="select"
                    value={studentType}
                    name="select"
                    id="select"
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
              <div className="divider" />
              <div className="d-flex justify-content-between">
                <div>
                  {all_program &&
                    all_program.map((program) => (
                      <div
                        onClick={() => {
                          setSelectedProgram(program.programName);
                          setSelectedName(program.programName);
                        }}
                        key={program.programName}
                        className="d-flex align-items-center finance-nav cursor-pointer"
                      >
                        <div
                          className={`bullet ${selectedProgram === program.programName
                            ? "active-bullet"
                            : ""
                            }`}
                        />
                        <CardText className="active">
                          {program.programName}
                        </CardText>
                      </div>
                    ))}
                </div>

              </div>
              <div className="section-header pt-1">
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="section-title">By Rank</span>
                  </div>
                  <div className="d-flex">
                    <div className="mr-1">
                      <CustomInput
                        type="select"
                        id="months"
                        name="month"
                        defaultValue={new Date().getMonth()}
                      >
                        {months?.map((m, i) => {
                          return <option value={i} key={i}>{m}</option>;
                        })}
                      </CustomInput>
                    </div>
                    <div className="mr-1">
                      <CustomInput
                        type="select"
                        id="years"
                        name="year"
                      >
                        {years?.map((y, i) => {
                          return <option value={y} key={i}>{y}</option>;
                        })}
                      </CustomInput>
                    </div>
                    {/* <button
                      className="btn btn-primary btn-sm"
                      onClick={handleFilter}
                     disabled={!isFilterApplied}>Filter</button> */}
                  </div>
                </div>
                <div className="divider" />
              </div>
              <Ranks
                selectedProgram={selectedProgram}
                studentType={studentType}
              />
            </CardBody>
          </Card>
        </Col>
        <Col md="9">
          <States selectedProgram={selectedProgram} />
          {/* <MemberList
            selectedName={selectedName}
            selectedProgram={selectedProgram}
          /> */}
          <Row>
            <Col md="12">
              <Card style={{ widht: "100% !important", height: "100%" }}>
                <CardBody>
                  {/* <div className="d-flex justify-content-start">
                    <UncontrolledDropdown className="data-list-dropdown">
                      <DropdownToggle className="filter-toggle">
                        <span
                          className="align-middle dropdown-label"
                          style={{ color: "#0184FF" }}
                        >
                          {year}
                        </span>
                        <ChevronDown
                          size={15}
                          className="chevron"
                          style={{ color: "#0184FF" }}
                        />
                      </DropdownToggle>
                      <DropdownMenu tag="div" right>
                        {yearList()}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div> */}
                  <Barchart selectedProgram={selectedProgram} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default connect(null, {
  GET_ALL_JOINY_AND_QUIT_TRAILS,
  GET_ALL_JOINY_AND_QUIT_MEMBERS,
})(Stat);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
