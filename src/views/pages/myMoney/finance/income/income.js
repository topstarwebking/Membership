import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import Spinner from "../../../../../components/@vuexy/spinner/Loading-spinner";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import "react-circular-progressbar/dist/styles.css";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "../../../../../assets/scss/pages/finance.scss";
import Collapsible from "react-collapsible";
import PageLink from "../components/PageLink";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodaysIncomeAction,
  getWeeklyIncomeAction,
  getMonthlyIncomeAction,
  getIncomeReportFilterAction,
  getLastMonthIncomeAction,
} from "../../../../../redux/actions/mymoney/index";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDayTwoTone";
import EventNote from "@material-ui/icons/EventNote";
import moment from "moment";
import { Chip } from "@material-ui/core";
import Settings from "@material-ui/icons/Settings";
import PaymentProcess from "./PaymentProcess";

const Income = () => {



  const customStyles = {
    rows: {
      style: {
        minHeight: "40px",
      },
    },
    header: {
      style: {
        fontSize: "10px",
      },
    },
    cells: {
      style: {
        color: "#828282",
        fontSize: "12px",
      },
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodaysIncomeAction());
    dispatch(getWeeklyIncomeAction());
    dispatch(getMonthlyIncomeAction());
    dispatch(getLastMonthIncomeAction());
    // eslint-disable-next-line
  }, [dispatch]);

  const {
    todaysIncome,
    thisWeekyIncome,
    thisMonthIncome,
    thisYearIncome,
    lastMonthIncome,
    report,
  } = useSelector((state) => state.income);

  function getMonth(key) {
    const monthNames = [
      { key: 0, name: "January" },
      { key: 1, name: "February" },
      { key: 2, name: "March" },
      { key: 3, name: "April" },
      { key: 4, name: "May" },
      { key: 5, name: "June" },
      { key: 6, name: "July" },
      { key: 7, name: "August" },
      { key: 8, name: "September" },
      { key: 9, name: "October" },
      { key: 10, name: "November" },
      { key: 11, name: "December" },
    ];

    return monthNames.find((x) => x.key === key).name;
  }

  // Collection and due status
  const [totalCollected, setTotalCollected] = useState(0);
  const [upCommingAmt, setUpCommingAmt] = useState(0);

  useEffect(() => {
    if (!report.isFetching) {
      let totalCollected = 0;
      let dueAmt = 0;
      for (let each of report.list) {
        totalCollected += each.data
          .filter((x) => x.status === "paid")
          .reduce((a, x) => a + x.amount, 0);

        dueAmt += each.data
          .filter((x) => x.status === "due")
          .reduce((a, x) => a + x.amount, 0);
      }
      setTotalCollected(parseFloat(totalCollected).toFixed(2));
      setUpCommingAmt(parseFloat(dueAmt).toFixed(2));
    }
  }, [report]);

  // Details report Filtering
  const [paymentSystem, setPaymentSystem] = useState("all");
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [year, setYear] = useState(() => new Date().getFullYear());

  // temp
  const [paymentSystemtemp, setPaymentSystemTemp] = useState("All Income");

  const [monthName, setMonthName] = useState(() =>
    getMonth(new Date().getMonth())
  );
  // filter data
  function filterData() {
    dispatch(getIncomeReportFilterAction(paymentSystem, month, year));
  }
  function handleFilter() {
    filterData();
  }

  useEffect(() => {
    filterData();
    // eslint-disable-next-line
  }, []);

  function changeYear(key) {
    setYear(key);
  }

  function changeMonth(key) {
    setMonth(key);
    setMonthName(getMonth(key));
  }

  const [years] = useState(() => {
    let data = [];
    let currentYear = new Date().getFullYear();
    for (let i = 5; i > 0; i--) {
      data.push(currentYear - i);
    }
    data.reverse();
    return [currentYear, ...data];
  });

  function changeYear(ynum, key) {
    setYear(key);
  }

  function yearList(ynum) {
    return (
      <React.Fragment>
        {years.map((x) => (
          <DropdownItem key={x} onClick={() => changeYear(ynum, x)} tag="a">
            {x}
          </DropdownItem>
        ))}
      </React.Fragment>
    );
  }
  const columns = [
    {
      name: "Date",
      sortable: true,
      selector: (row) => moment(row.date).format("L"),
    },
    {
      name: "Full Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Sub Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Payment Type",
      selector: (row) => row.ptype,
      sortable: true,
      width: "16%",
    },
    {
      name: "Amount",
      selector: (row) => `$${parseFloat(row.amount).toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <span
            className={
              row.status === "paid"
                ? "badge-success"
                : row.status === "due"
                  ? "badge-primary"
                  : "badge-danger"
            }
          >
            {row.status}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: "Manage",
      selector: (row) => (
        <>
          <PaymentProcess paymentSystem={paymentSystem} month={month} year={year} row={row} />
        </>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="Finance"
        breadCrumbParent="Pages"
        breadCrumbActive="Finance"
      />
      <Row>
        <Col md="3">
          <PageLink>
            <div className="section-header">
              <span className="section-title">Filters</span>
              <div className="divider" />
            </div>
            <div style={{ minHeight: 200 }}></div>
          </PageLink>
        </Col>
        <Col md="9">
          <Row className="single-stat-grid">
            <Card className="mr-1">
              <div className="p-1">
                <span>Today</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">${todaysIncome.amount}</span>
                  <div
                    className="sch-icon"
                    style={{ backgroundColor: "#E9F1FF" }}
                  >
                    <InsertInvitationIcon style={{ color: "#0184FF" }} />
                  </div>

                  {/* <div style={{ width: 25, height: 25 }}> */}
                  {/* <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#0184FF",
                        trailColor: "#d6d6d6",
                      })}
                    /> */}
                  {/* </div> */}
                </div>
              </div>
            </Card>

            <Card className="mr-1">
              <div className="p-1">
                <span>This Week</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">
                    ${thisWeekyIncome.amount}
                  </span>

                  <div
                    className="sch-icon"
                    style={{ backgroundColor: "#ffc6c6" }}
                  >
                    <DateRangeIcon style={{ color: "#ff3e3e" }} />
                  </div>

                  {/* <div style={{ width: 25, height: 25 }}> */}

                  {/* <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#FF753A",
                        trailColor: "#d6d6d6",
                      })}
                    /> */}
                  {/* </div> */}
                </div>
              </div>
            </Card>

            <Card className="mr-1">
              <div className="p-1">
                <span>This Month</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">
                    ${thisMonthIncome.amount}
                  </span>

                  <div
                    className="sch-icon"
                    style={{ backgroundColor: "#ffead2" }}
                  >
                    <CalendarViewDayIcon style={{ color: "#fb8700" }} />
                  </div>

                  {/* <div style={{ width: 25, height: 25 }}> */}
                  {/* <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#FFCA0D",
                        trailColor: "#d6d6d6",
                      })}
                    /> */}
                  {/* </div> */}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-1">
                <span>Last Month</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">
                    ${lastMonthIncome.amount}
                  </span>
                  <div
                    className="sch-icon"
                    style={{ backgroundColor: "#f1dfff" }}
                  >
                    <EventNote style={{ color: "#ce41ff" }} />
                  </div>

                  {/* <div style={{ width: 25, height: 25 }}> */}
                  {/* <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#FF5A5A",
                        trailColor: "#d6d6d6",
                      })}
                    /> */}
                  {/* </div> */}
                </div>
              </div>
            </Card>
          </Row>
          <Row className="d-flex justify-content-between align-items-center pb-1">
            <div>
              <div className="filter-title">
                <h4>INCOME REPORT</h4>
              </div>
              <div className="income-total">
                <span style={{ fontSize: "14px" }}>
                  PAST DUE :{" "}
                  <strong
                    style={{ fontSize: "14px" }}
                    className="income-amt-due"
                  >
                    $0.00
                  </strong>
                </span>
                <span style={{ fontSize: "14px" }}>
                  UPCOMING :
                  <strong
                    style={{ fontSize: "14px" }}
                    className="income-amt-coming"
                  >
                    ${upCommingAmt}
                  </strong>
                </span>
                <span style={{ fontSize: "14px" }}>
                  TOTAL COLLECTED :
                  <strong
                    style={{ fontSize: "14px" }}
                    className="income-amt-collected"
                  >
                    ${totalCollected}
                  </strong>
                </span>
              </div>
            </div>
            <div className="d-flex">
              <UncontrolledDropdown className="mr-1"  >
                <DropdownToggle className="p-0" >
                  <Chip
                    label={`${paymentSystemtemp}`}
                    icon={<ChevronDown size={14} className="chevron" />}
                    size="medium"
                    className="rounded transparent"
                    style={{
                      background: 'transparent',
                      color: 'gray',
                      border: '1px solid #9aa9b7'
                    }}
                  />
                </DropdownToggle>
                <DropdownMenu tag="div" right>
                  <DropdownItem
                    onClick={(_) => {
                      setPaymentSystem("all");
                      setPaymentSystemTemp("All Income");
                    }}
                    tag="b"
                  >
                    All Income
                  </DropdownItem>

                  <DropdownItem
                    onClick={(_) => {
                      setPaymentSystem("In house");
                      setPaymentSystemTemp("In house Payment");
                    }}
                    tag="a"
                  >
                    In house Payment
                  </DropdownItem>
                  <DropdownItem
                    onClick={(_) => {
                      setPaymentSystem("auto pay");
                      setPaymentSystemTemp("Auto Payment");
                    }}
                    tag="b"
                  >
                    Auto Payment
                  </DropdownItem>

                  <DropdownItem
                    onClick={(_) => {
                      setPaymentSystem("product");
                      setPaymentSystemTemp("Product");
                    }}
                    tag="b"
                  >
                    Product
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown className="mr-1">
                <DropdownToggle className="p-0">
                  <Chip
                    label={monthName}
                    icon={<ChevronDown size={14} className="chevron" />}
                    size="medium"
                    className="rounded transparent"
                    style={{
                      background: 'transparent',
                      color: 'gray',
                      border: '1px solid #9aa9b7'
                    }}
                  />
                </DropdownToggle>
                <DropdownMenu tag="div" right>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(0);
                    }}
                    tag="a"
                  >
                    January
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(1);
                    }}
                    tag="a"
                  >
                    Febuary
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(2);
                    }}
                    tag="a"
                  >
                    March
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(3);
                    }}
                    tag="a"
                  >
                    April
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(4);
                    }}
                    tag="a"
                  >
                    May
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(5);
                    }}
                    tag="a"
                  >
                    June
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(6);
                    }}
                    tag="a"
                  >
                    July
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(7);
                    }}
                    tag="a"
                  >
                    August
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(8);
                    }}
                    tag="a"
                  >
                    September
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(9);
                    }}
                    tag="a"
                  >
                    October
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(10);
                    }}
                    tag="a"
                  >
                    November
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(11);
                    }}
                    tag="a"
                  >
                    December
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown className="mr-1">
                <DropdownToggle className="p-0">
                  <Chip
                    label={year}
                    icon={<ChevronDown size={14} className="chevron" />}
                    size="medium"
                    className="rounded transparent"
                    style={{
                      background: 'transparent',
                      color: 'gray',
                      border: '1px solid #9aa9b7'
                    }}
                  />
                </DropdownToggle>
                <DropdownMenu tag="div" right>
                  {yearList(1)}
                </DropdownMenu>
              </UncontrolledDropdown>
              <Chip
                label={report.isFetching ? "Filtering..." : "Filter"}
                className='rounded'
                onClick={handleFilter}
                disabled={report.isFetching}
                style={{ color: 'white', background: '#2796f3', fontSize: 14 }}
              />
            </div>
          </Row>
          <Row>
            <div className="accordion-area">
              {report.loading && (
                <div className="income_details_loading">
                  <Spinner />
                </div>
              )}

              {report.list &&
                report.list.map((each) => (
                  <Collapsible
                    key={each.date}
                    trigger={
                      <>
                        <div className="custom-accordion">
                          <span>{moment(each.date).format("LL")}</span>
                          <div className="accordion-right">
                            <div className="row-count">
                              <span>{each.data.length}</span>
                            </div>
                            <div>
                              <ChevronDown size={20} className="chevron" />
                            </div>
                          </div>
                        </div>
                      </>
                    }
                  >
                    <Card className="finance-col-two">
                      <CardBody>
                        {/* {console.log(each.data)} */}
                        <DataTable
                          data={each.data}
                          columns={columns}
                          noHeader
                          pagination
                          customStyles={customStyles}
                        />
                      </CardBody>
                    </Card>
                  </Collapsible>
                ))}
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Income;
