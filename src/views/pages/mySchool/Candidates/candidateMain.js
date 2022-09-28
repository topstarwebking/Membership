import React, { useEffect, useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CustomInput,
} from "reactstrap";

// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "../../../../assets/scss/pages/finance.scss";
import CandidateTable from "../../../apps/user/list/CandidateTable";
import Stripes from "./components/Stripes";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  getStripeList,
} from "../../../../redux/actions/stripe";
import {FILTER_CANDIDATE_DATA, GET_FILTER_BY_STRIPE } from "../../../../redux/actions/newstudent";
import moment from "moment";


const Candidate = (props) => {
  const { FILTER_CANDIDATE_DATA, filter_candidate_data } = props;

  const date = useMemo(() => new Date(), [])
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [studentType, setStudentType] = useState("Active Student");
  const [filterData, setFilterData] = useState({ month: date.getMonth(), year: years[0] })
  const [pageNumber, setpageNumber] = useState(0);
  const [isFilterApplied, setIsFilterApplied] = useState(false)
  const [stripeCount, setStripeCount] = useState(null)
  const [candidateStripeFilter, setCandidateStripeFilter] = useState({ monthSidebar: date.getMonth(), yearSidebar: years[0] })
  const perRows = 5;

  const { stripeList } = useSelector((state) => state.stripe);

  useEffect(() => {
    dispatch(getStripeList());
    handleFilter()
  }, []);

  const handleCandidateStripeChange = (e) => {
    let { name } = e.target
    const value = parseInt(e.target.value, 10)
    setCandidateStripeFilter((prev) => ({ ...prev, [name]: value }))
  }

  const handleFilter = () => {
    const date = new Date();
    date.setDate(1)
    date.setMonth(filterData.month)
    date.setFullYear(filterData.year)
    const dateString = moment(date).format("MM-DD-YYYY")
    FILTER_CANDIDATE_DATA(dateString);
  }


  const handleDate = (e) => {
    let { name } = e.target
    const value = parseInt(e.target.value, 10)
    if (!isFilterApplied) {
      setIsFilterApplied(true)
    }
    setFilterData({ ...filterData, [name]: value })
  }

  const handleEventType = (e) => {
    setStudentType(e.target.value);
  };

  useEffect(() => {
    GET_FILTER_BY_STRIPE().then(res => {
      setStripeCount(res)
    })
  }, [])

  useMemo(() => {
    if (stripeList) {
      if (stripeList.length > 0) {
        setSelectedCandidate(stripeList[0].candidate);
        setSelectedName(stripeList[0].candidate);
      }
    }
  }, [stripeList]);

  function modalToggle() {
    setIsModalOpen((p) => !p);
  }
  function categoryModalToggle() {
    setIsCategoryModalOpen((p) => !p);
  }

  const count = useMemo(() => filter_candidate_data?.data?.reduce((prev, elem) => {
    const hasJoinAny = elem.joinHistory.some((history) => history.join)
    const hasQuiteAny = elem.joinHistory.some((history) => history.quite)

    if (hasJoinAny) {
      prev.join += 1
    }

    if (hasQuiteAny) {
      prev.quite += 1
    }
    return prev
  }, { join: 0, quite: 0 }) || { join: 0, quite: 0 }, [filter_candidate_data?.data])

  return (
    <div>
      <Breadcrumbs
        breadCrumbTitle="Candidate"
        breadCrumbParent="My School"
        breadCrumbActive="Candidate"
      />
      <Row>
        <Col md="3">
          <Card>
            <CardBody>
              <div className="section-header">
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="section-title">By Candidate</span>
                  </div>
                </div>
                <div className="divider" />
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  {stripeList &&
                    stripeList.map((candidate) => (
                      <div
                        onClick={() => {
                          setSelectedCandidate(candidate.candidate);
                          setSelectedName(candidate.candidate);
                        }}
                        key={candidate.candidate}
                        className="d-flex align-items-center finance-nav cursor-pointer"
                      >
                        <div
                          className={`bullet ${selectedCandidate === candidate.candidate
                            ? "active-bullet"
                            : ""
                            }`}
                        />
                        <CardText className="active">
                          {candidate.candidate}
                        </CardText>
                      </div>
                    ))}
                </div>
                <div>
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
              <div className="section-header pt-1">
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="section-title">By Stripe</span>
                  </div>
                  <div className="d-flex">
                    <div className="mr-1">
                      <CustomInput
                        type="select"
                        id="months"
                        name="monthSidebar"
                        onChange={handleCandidateStripeChange}
                        defaultValue={candidateStripeFilter.monthSidebar}
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
                        name="yearSidebar"
                        onChange={handleCandidateStripeChange}
                        defaultValue={candidateStripeFilter.yearSidebar}
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
                <Stripes
                  month={candidateStripeFilter.monthSidebar}
                  year={candidateStripeFilter.yearSidebar}
                  selectedCandidate={selectedCandidate}
                  studentType={studentType}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="9">
          <Row className="single-stat-grid">
            <Card className="mr-1 rounded shodow">
              <div className="p-1">
                <h5 className="font-weight-bold">This Month</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="mini-card-amt">Join</span><br />
                    <span className="mini-card-amt">Not Join</span>
                  </div>
                  <div>
                    <span className="mini-card-amt">{stripeCount?.ThisMonth?.join}</span><br />
                    <span className="mini-card-amt">{stripeCount?.ThisMonth?.quite}</span>
                  </div>

                </div>
              </div>
            </Card>

            <Card className="mr-1 rounded shodow">
              <div className="p-1">
                <h5 className="font-weight-bold">Last Month</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="mini-card-amt">Join</span><br />
                    <span className="mini-card-amt">Not Join</span>
                  </div>
                  <div>
                    <span className="mini-card-amt">{stripeCount?.lastMonth?.join}</span><br />
                    <span className="mini-card-amt">{stripeCount?.lastMonth?.quite}</span>
                  </div>

                </div>
              </div>
            </Card>

            <Card className="mr-1 rounded shodow">
              <div className="p-1">
                <h5 className="font-weight-bold">New Candidate</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {/* <span className="mini-card-amt">Total</span><br /> */}
                    {/* <span className="mini-card-amt">Join</span><br />
                    <span className="mini-card-amt">Not Join</span> */}
                  </div>
                  <div>
                    {/* <span className="mini-card-amt">{stripeCount?.sum_of_LCB ? stripeCount?.sum_of_LCB : 0}</span><br /> */}
                    {/* <span className="mini-card-amt">0</span> */}
                  </div>
                  {/* <div style={{ width: 25, height: 25, marginTop: "10px" }}>
                    <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#FFCA0D",
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div> */}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-1">
                <h5 className="font-weight-bold">This Year</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="mini-card-amt">Join</span><br />
                    <span className="mini-card-amt">Not Join</span>
                  </div>
                  <div>
                    <span className="mini-card-amt">{stripeCount?.Thisyear?.join}</span><br />
                    <span className="mini-card-amt">{stripeCount?.Thisyear?.quite}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Row>

          <Row className="d-flex justify-content-between align-items-center pb-1">
            <div>
              <div className="filter-title">
                <h4>CANDIDATE REPORT</h4>
              </div>
              <div className="income-total">
                <span>
                  Join -{" "}
                  <strong className="income-amt-coming">{count.join}</strong>
                </span>
                <span>
                  Not Join -{" "}
                  <strong className="income-amt-coming">{count.quite}</strong>
                </span>
              </div>
            </div>
            <div className="d-flex">
              <div className="mr-1">
                <CustomInput
                  onChange={handleDate}
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
                  onChange={handleDate}
                  type="select"
                  id="years"
                  name="year"
                >
                  {years?.map((y, i) => {
                    return <option value={y} key={i}>{y}</option>;
                  })}
                </CustomInput>
              </div>
              <button
                onClick={handleFilter}
                className="rounded btn btn-primary text-white customFilterBtn"
                disabled={!isFilterApplied}>Filter</button>
            </div>
          </Row>
          {/* <Row>
            <div className='accordion-area'>
              <Collapsible 
                trigger={
                  <>
                    <div className='custom-accordion'>
                      <span>March 1 2022</span>
                      <div className='accordion-right'>
                        <div className='row-count'>
                          <span>10</span>
                        </div>
                        <div>
                          <ChevronDown size={20} className='chevron'/>
                        </div>
                      </div>
                    </div>
                  </>
                }>
                <Card className='finance-col-two'>
                  <CardBody>
                    <DataTable
                      data={data}
                      columns={columns}
                      noHeader
                      selectableRows
                      pagination
                      selectableRowsComponent={Checkbox}
                      selectableRowsComponentProps={{
                        color: "primary",
                        icon: <Check className="vx-icon" size={12} />,
                        label: "",
                        size: "sm"
                      }}
                      customStyles={customStyles}
                    />
                  </CardBody>
                </Card>
              </Collapsible>
              <Collapsible 
                trigger={
                  <>
                    <div className='custom-accordion'>
                      <span>March 1 2022</span>
                      <div className='accordion-right'>
                        <div className='row-count'>
                          <span>10</span>
                        </div>
                        <div>
                          <ChevronDown size={20} className='chevron'/>
                        </div>
                      </div>
                    </div>
                  </>
                }>
                <Card className='finance-col-two'>
                  <CardBody>
                    <DataTable
                      data={data}
                      columns={columns}
                      noHeader
                      selectableRows
                      pagination
                      selectableRowsComponent={Checkbox}
                      selectableRowsComponentProps={{
                        color: "primary",
                        icon: <Check className="vx-icon" size={12} />,
                        label: "",
                        size: "sm"
                      }}
                      customStyles={customStyles}
                    />
                  </CardBody>
                </Card>
              </Collapsible>
            </div>
          </Row> */}
          <CandidateTable handleFilter={handleFilter} pageNumber={pageNumber} setpageNumber={setpageNumber} />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter_candidate_data: state.student.filter_candidate_data,
  };
};

export default connect(mapStateToProps, {
  FILTER_CANDIDATE_DATA,
})(Candidate);



const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
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