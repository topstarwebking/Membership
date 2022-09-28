import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { ChevronDown } from "react-feather";
import "react-circular-progressbar/dist/styles.css";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "../../../../../assets/scss/pages/finance.scss";
import MailIcon from "@material-ui/icons/Mail";
import PrintIcon from "@material-ui/icons/Print";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import PageLink from "../components/PageLink";
import Spinner from "../../../../../components/@vuexy/spinner/Loading-spinner";
import {
  filterDataForPNLExpenseAction,
  filterDataForPNLMembershipAction,
  filterDataForPNLProductAction,
  filterDataForPNLRefundAction,
  filterDataForPNLRecurringByCC,
  filterDataForPNLRecurringByInHouse,
} from "../../../../../redux/actions/mymoney";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { Chip } from "@material-ui/core";

const PNL = () => {
  // Hooks Initialize
  // const history = useHistory();
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

  const dispatch = useDispatch();

  const [firstMonth, setFirstMonth] = useState(() => new Date().getMonth() - 1);
  const [firstYear, setFirstYear] = useState(() => new Date().getFullYear());

  const [secondMonth, setSecondMonth] = useState(() => new Date().getMonth());
  const [secondYear, setSecondYear] = useState(() => new Date().getFullYear());

  const [ytd, setYtd] = useState(() => new Date().getFullYear());

  const [temp, setTemp] = useState({
    firstMonth: monthNames.find((x) => x.key === new Date().getMonth() - 1)
      .name,
    secondMonth: monthNames.find((x) => x.key === new Date().getMonth()).name,
  });

  const [firstMonthTotalIncome, setFirstMonthTotalIncome] = useState(0);
  const [secondMonthTotalIncome, setSecondMonthTotalIncome] = useState(0);
  const [yearlyTotalIncome, setYearlyTotalIncome] = useState(0);

  const {
    data: expenses,
    firstMonthTotalExpense,
    secondMonthTotalExpense,
    yearlyTotalExpense,
    membership,
    buyProduct,
    refund,
    recurringInCC,
    recurringInHouse,
  } = useSelector((state) => state.pnl);

  useEffect(() => {
    setFirstMonthTotalIncome(
      parseFloat(
        membership.firstMonthTotal +
        buyProduct.firstMonthTotal +
        recurringInCC.firstMonthAmt +
        recurringInHouse.firstMonthAmt
      ).toFixed(2)
    );
    setSecondMonthTotalIncome(
      parseFloat(
        membership.secondMonthTotal +
        buyProduct.secondMonthTotal +
        recurringInCC.secondMonthAmt +
        recurringInHouse.secondMonthAmt
      ).toFixed(2)
    );
    setYearlyTotalIncome(
      parseFloat(
        membership.yearlyTotal +
        buyProduct.yearlyTotal +
        recurringInCC.yearlyAmt +
        recurringInHouse.yearlyAmt
      ).toFixed(2)
    );
  }, [membership, buyProduct, recurringInCC, recurringInHouse]);

  useEffect(() => {
    const payload = {
      firstMonth,
      firstYear,
      secondMonth,
      secondYear,
      ytd,
    };
    dispatch(filterDataForPNLExpenseAction(payload));
    dispatch(filterDataForPNLMembershipAction(payload));
    dispatch(filterDataForPNLProductAction(payload));
    dispatch(filterDataForPNLRefundAction(payload));

    dispatch(filterDataForPNLRecurringByCC(payload));
    dispatch(filterDataForPNLRecurringByInHouse(payload));

    // eslint-disable-next-line
  }, [dispatch, firstMonth, firstYear, secondMonth, secondYear, ytd]);

  function changeMonth(mnum, key) {
    if (mnum === 1) {
      setFirstMonth(key);
      setTemp((p) => {
        const currnet = monthNames.find((x) => x.key === key);
        return {
          ...p,
          firstMonth: currnet.name,
        };
      });
    } else {
      setSecondMonth(key);
      setTemp((p) => ({
        ...p,
        secondMonth: monthNames.find((x) => x.key === key).name,
      }));
    }
  }

  function monthList(mnum) {
    return (
      <React.Fragment>
        {monthNames.map((x) => (
          <DropdownItem
            key={x.key}
            onClick={() => changeMonth(mnum, x.key)}
            tag="a"
          >
            {x.name}
          </DropdownItem>
        ))}
      </React.Fragment>
    );
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
    if (ynum === 1) {
      setFirstYear(key);
    } else if (ynum === 2) {
      setSecondYear(key);
    } else if (ynum === 3) {
      setYtd(key);
    }
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

  // TOtal and Net income calculatin

  const [totalm1Income, setTotalm1Income] = useState(0);
  const [totalm2Income, setTotalm2Income] = useState(0);
  const [totalYearly, setTotalYearly] = useState(0);
  const [productFilter, setProductFilter] = useState("")

  useEffect(() => {
    setTotalm1Income(firstMonthTotalIncome - refund.firstMonthTotal);
    setTotalm2Income(secondMonthTotalIncome - refund.secondMonthTotal);
    setTotalYearly(yearlyTotalIncome - refund.yearlyTotal);
  }, [
    firstMonthTotalIncome,
    secondMonthTotalIncome,
    yearlyTotalIncome,
    refund,
  ]);

  //save as PDF
  // =======================================================
  const [printing, setIsPrinting] = useState("");

  var pdfPrintOptions = {
    margin: 0.1,
    filename: "report.pdf",
    html2canvas: { scale: 1 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  function saveAsPDF() {
    var element = document.getElementById("element-to-print");
    setIsPrinting(true);
    setTimeout(() => {
      // html2pdf(element, pdfPrintOptions);
      html2pdf().from(element).set(pdfPrintOptions).save();
    }, 700);
    setTimeout(() => {
      setIsPrinting(false);
    }, 1000);
  }

  function printPage() {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
    }, 1000);

    setTimeout(() => {
      let uniqueIframeId = "123";
      const content = document.getElementById("element-to-print");

      if (content === null || content === undefined) return;

      let pri;
      if (document.getElementById(uniqueIframeId)) {
        pri = document.getElementById(uniqueIframeId).contentWindow;
      } else {
        const iframe = document.createElement("iframe");
        iframe.setAttribute("title", uniqueIframeId);
        iframe.setAttribute("id", uniqueIframeId);
        iframe.setAttribute(
          "style",
          `height: 0px; width: 0px; position: absolute;`
        );
        document.body.appendChild(iframe);
        pri = iframe.contentWindow;
      }

      pri.document.open();
      pri.document.write(content.innerHTML);
      pri.document.querySelector("head").innerHTML = `
    <style>
    #subject-title{
      text-align: center;
      font-size:20px;
    }
    
    .pl-title {
      font-size: 22px;
    }
    .pl-subtitle-area {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .pl-subtitle {
      font-size: 12px;
    }

    .pl-table-filter {
      display: flex;
      position: relative;
      width: 100%;
    }
    .pl-blank {
      width: 31%;
      border-left: 1px solid #dbdbdb;
      padding: 2px 5px;
    }
    .pl-month-filter {
      width: 23%;
      padding: 2px 5px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding-bottom: 10px;
    }
    .filtered-month {
      font-size: 16px;
      color: #000000;
      margin-bottom: 10px;
    }
    .pl-year-filter {
      width: 23%;
      border-right: 1px solid #dbdbdb;
      padding: 2px 5px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding-bottom: 10px;
    }
    .filter-dropdown {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .pl-filter-placeholder {
      font-size: 11px;
    }
    .margin-right-5 {
      margin-right: 5px;
    }

    .pl-table-header-data {
      display: flex;
      position: relative;
      width: 100%;
      background-color: #e7e3e3;
    }
    .pl-total {
      width: 31%;
      border-left: 1px solid #dbdbdb;
      padding: 5px;
      font-size: 18px;
    }
    .pl-month-total {
      width: 23%;
      border-left: 1px solid #dbdbdb;
      padding: 5px;
      font-size: 18px;
      display: flex;
      justify-content: center;
    }
    .pl-year-total {
      width: 23%;
      border-left: 1px solid #dbdbdb;
      border-right: 1px solid #dbdbdb;
      padding: 5px;
      font-size: 18px;
      display: flex;
      justify-content: center;
    }
    .pl-income-total {
      color: #0eb73e;
    }
    .pl-expense-total {
      color: #ff2c2c;
    }

    .pl-cat-data {
      display: flex;
      position: relative;
      width: 100%;
    }
    .pl-cat {
      width: 31%;
      border-left: 1px solid #dbdbdb;
      padding: 2px 5px;
      font-size: 15px;
      font-weight: 600;
      margin-top: 10px;
    }
    .pl-month-blank {
      width: 23%;
      border-left: 1px solid #dbdbdb;
      padding: 2px 5px;
    }
    .pl-year-blank {
      width: 23%;
      border-left: 1px solid #dbdbdb;
      border-right: 1px solid #dbdbdb;
      padding: 2px 5px;
    }

    .pl-sub-cat-data {
      display: flex;
      position: relative;
      width: 100%;
    }
    .pl-sub-cat {
      width: 31%;
      border-left: 1px solid #dbdbdb;
      padding: 2px 5px;
      font-size: 13px;
    }
    .pl-month-data {
      width: 23%;
      border-left: 1px solid #dbdbdb;
      padding: 2px 5px;
      font-size: 13px;
      color: #636363;
    }
    .pl-year-data {
      width: 23%;
      border-left: 1px solid #dbdbdb;
      border-right: 1px solid #dbdbdb;
      padding: 2px 5px;
      font-size: 13px;
    }

    .pl-cat-total {
      display: flex;
      position: relative;
      width: 100%;
    }
    .pl-cat-bold {
      width: 31%;
      border-left: 1px solid #dbdbdb;
      padding: 2px 5px;
      font-size: 13px;
      font-weight: 700;
    }
    .pl-month-bold {
      width: 23%;
      border-left: 1px solid #dbdbdb;
      padding: 2px 5px;
      font-size: 13px;
      font-weight: 700;
    }
    .pl-year-bold {
      width: 23%;
      border-left: 1px solid #dbdbdb;
      border-right: 1px solid #dbdbdb;
      padding: 2px 5px;
      font-size: 13px;
      font-weight: 700;
    }
    .pl-net-amt {
      color: #0d78db;
    }
    .pl-net-pct {
      color: #0eb73e;
    }

    
    .income_details_loading {
      min-width: 100%;
      min-height: 400px;
      margin: 0 auto;
      margin-top: 100px;
    }
    .filter__btn {
      background-color: #0184ff;
      color: #fff;
      border-radius: 5px;
    }

    .colorPicker {
      width: 100%;
      border: 1px solid #dadada;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .cancel_btn_modal {
      background-color: #aaaaaa;
    }
    .colorPicker input {
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
    .colorPicker span {
      flex: 1;
    }
   
  .d-flex {
      display: flex !important;
  }	
  
  [dir=ltr] .row {
      margin-right: -14px;
      margin-left: -14px;
  }	
  
    .row {
        display: flex;
        flex-wrap: wrap;
    }
    
  
    .col-md-8 {
      justify-content: flex-start !important
    
    }
    .col-md-4 {
      justify-content: flex-end !important
    
    }

    .pl-month-data {
        width: 23%;
        font-size: 13px;
        color: #636363;
    }

    #print_row{
      display:flex;
      justify-content:space-between;
    }


    </style>
    `;
      pri.document.close();
      pri.focus();
      pri.print();
    }, 500);
  }

  const [firstMonthCCPercentage, setFirstMonthCCPercentage] = useState(0);
  const [firstMonthInHousePercentage, setFirstMonthInHousePercentage] =
    useState(0);

  const [secondMonthCCPercentage, setsecondMonthCCPercentage] = useState(0);
  const [secondMonthInHousePercentage, setSecondMonthInHousePercentage] =
    useState(0);

  const [yearlyCCPercentage, setyearlyCCPercentage] = useState(0);
  const [yearlyInHousePercentage, setYearlyInHousePercentage] = useState(0);

  // Inhouse And CC Percentage
  useEffect(() => {
    const { firstMonthAmt, secondMonthAmt, yearlyAmt } = recurringInHouse;
    const firstMonthTotal = firstMonthAmt + recurringInCC.firstMonthAmt;
    const secondMonthTotal = secondMonthAmt + recurringInCC.secondMonthAmt;
    const yearlyTotal = yearlyAmt + recurringInCC.yearlyAmt;

    let m1ccPercentage = parseFloat(
      (recurringInCC.firstMonthAmt / firstMonthTotal) * 100
    ).toFixed(2);
    let m1InHousePercentage = parseFloat(
      (firstMonthAmt / firstMonthTotal) * 100
    ).toFixed(2);

    let m2ccPercentage = parseFloat(
      (recurringInCC.secondMonthAmt / secondMonthTotal) * 100
    ).toFixed(2);
    let m2InHousePercentage = parseFloat(
      (secondMonthAmt / secondMonthTotal) * 100
    ).toFixed(2);

    let yearlyccPercentage = parseFloat(
      (recurringInCC.yearlyAmt / yearlyTotal) * 100
    ).toFixed(2);
    let yearlyInHousePercentage = parseFloat(
      (yearlyAmt / yearlyTotal) * 100
    ).toFixed(2);
    // =============================================

    setFirstMonthCCPercentage(m1ccPercentage);
    setFirstMonthInHousePercentage(m1InHousePercentage);
    setsecondMonthCCPercentage(m2ccPercentage);
    setSecondMonthInHousePercentage(m2InHousePercentage);
    setyearlyCCPercentage(yearlyccPercentage);
    setYearlyInHousePercentage(yearlyInHousePercentage);
  }, [recurringInHouse, recurringInCC]);

  return (
    <div>
      <Breadcrumbs
        breadCrumbTitle="My Money"
        breadCrumbParent="My Money"
        breadCrumbActive="P&amp;L"
      />
      <Row>
        <Col md="3">
          <PageLink>
            <div className="section-header">
              <span className="section-title">Filters</span>
              <div className="divider" />
            </div>
          </PageLink>
        </Col>
        <Col md="9">
          <Card className="finance-col-two">
            <CardHeader>
              <div className="pl-title">
                <span>P&amp;L Statements</span>
              </div>
              <div className="pl-subtitle-area">
                <span className="pl-subtitle">Profit &amp; Loss by Period</span>
                <div>
                  <span onClick={saveAsPDF}>
                    <GetAppOutlinedIcon
                      style={{
                        fontSize: "1.3em",
                        color: "#555555",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </span>

                  <a href={`mailto:email@domain.com?subject=`}>
                    <MailIcon
                      style={{
                        fontSize: "1.3em",
                        color: "#0184FF",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </a>

                  <span onClick={printPage}>
                    <PrintIcon
                      style={{
                        fontSize: "1.3em",
                        color: "#403F90",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {membership.loading && buyProduct.loading && (
                <>
                  <Spinner />
                </>
              )}

              <div
                style={printing ? { padding: "20px 10px" } : {}}
                id="element-to-print"
              >
                {/* PL Table Filter Starts Here */}

                <div className="pl-table-filter">
                  <div className="pl-blank" />
                  <div className="pl-month-filter">
                    <span className="filtered-month">
                      {temp.firstMonth} {firstYear}
                    </span>
                    {!printing && (
                      <div className="d-flex justify-content-between">
                        <UncontrolledDropdown style={{ marginRight: 5 }}>
                          <DropdownToggle className="p-0 ">
                            <Chip
                              label={temp.firstMonth}
                              icon={<ChevronDown size={14} className="chevron" />}
                              size="medium"
                              className="rounded"
                              style={{
                                background: 'transparent',
                                color: 'gray',
                                border: '1px solid #9aa9b7'
                              }}
                            />
                          </DropdownToggle>
                          <DropdownMenu tag="div" right>
                            {monthList(1)}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown className="">
                          <DropdownToggle className="p-0">
                            <Chip
                              label={firstYear}
                              icon={<ChevronDown size={14} className="chevron" />}
                              size="medium"
                              className="rounded"
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
                      </div>
                    )}
                  </div>
                  <div className="pl-month-filter">
                    <span className="filtered-month">
                      {temp.secondMonth} {secondYear}
                    </span>
                    {!printing && (
                      <div className="d-flex justify-content-between">
                        <UncontrolledDropdown style={{ marginRight: 5 }}>
                          <DropdownToggle className="p-0">
                            <Chip
                              label={temp.secondMonth}
                              icon={<ChevronDown size={14} className="chevron" />}
                              size="medium"
                              className="rounded"
                              style={{
                                background: 'transparent',
                                color: 'gray',
                                border: '1px solid #9aa9b7'
                              }}
                            />
                          </DropdownToggle>
                          <DropdownMenu tag="div" right>
                            {monthList(2)}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown className="">
                          <DropdownToggle className="p-0">
                            <Chip
                              label={secondYear}
                              icon={<ChevronDown size={14} className="chevron" />}
                              size="medium"
                              className="rounded"
                              style={{
                                background: 'transparent',
                                color: 'gray',
                                border: '1px solid #9aa9b7'
                              }}
                            />
                          </DropdownToggle>
                          <DropdownMenu tag="div" right>
                            {yearList(2)}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    )}
                  </div>
                  <div className="pl-year-filter">
                    <span className="filtered-month">
                      {printing ? ytd : "YTD"}
                    </span>
                    {!printing && (
                      <div className="d-flex justify-content-between">
                        <UncontrolledDropdown className="">
                          <DropdownToggle className="p-0">
                            <Chip
                              label={ytd}
                              icon={<ChevronDown size={14} className="chevron" />}
                              size="medium"
                              className="rounded"
                              style={{
                                background: 'transparent',
                                color: 'gray',
                                border: '1px solid #9aa9b7'
                              }}
                            />
                          </DropdownToggle>
                          <DropdownMenu tag="div" right>
                            {yearList(3)}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    )}
                  </div>
                </div>

                {/* PL Table Header Starts Here */}
                <div className="pl-table-header-data">
                  <div className="pl-total">Total Income</div>
                  <div className="pl-month-total pl-income-total">
                    ${firstMonthTotalIncome}
                  </div>
                  <div className="pl-month-total pl-income-total">
                    ${secondMonthTotalIncome}
                  </div>
                  <div className="pl-year-total pl-income-total">
                    ${yearlyTotalIncome}
                  </div>
                </div>
                {/* PL Table Header Ends here */}

                {/* PL Category Starts Here */}
                <div className="pl-cat-data">
                  <div className="pl-cat">Membership Sales</div>
                  <div className="pl-month-blank" />
                  <div className="pl-month-blank" />
                  <div className="pl-year-blank" />
                </div>
                {/* PL Category Ends here */}

                {membership.data &&
                  membership.data.map((x) => (
                    <div key={x.membership} className="pl-sub-cat-data">
                      <div className="pl-sub-cat">{x.membership}</div>
                      <div className="pl-month-data">
                        <Row id="print_row">
                          <Col md="8" className="d-flex  justify-content-end">
                            ${parseFloat(x.firstMonthIncome).toFixed(2)}
                          </Col>

                          <Col md="4" className="d-flex  justify-content-end">
                            {x.percentage1 === "NaN" ? 0 : x.percentage1}%
                          </Col>
                        </Row>
                      </div>
                      <div className="pl-month-data">
                        <Row id="print_row">
                          <Col md="8" className="d-flex justify-content-end">
                            ${parseFloat(x.secondMonthIncome).toFixed(2)}
                          </Col>
                          <Col md="4" className="d-flex justify-content-end">
                            {x.percentage2 === "NaN" ? 0 : x.percentage2}%
                          </Col>
                        </Row>
                      </div>
                      <div className="pl-year-data">
                        <Row id="print_row">
                          <Col md="8" className="d-flex justify-content-end">
                            ${parseFloat(x.incomeInYear).toFixed(2)}
                          </Col>
                          <Col md="4" className="d-flex justify-content-end">
                            {x.percentage3 === "NaN" ? 0 : x.percentage3}%
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ))}
                {/* Not Needed Ends */}
                {/* Not Needed Ends */}

                {/* PL Category Total Starts here */}
                <div className="pl-cat-total">
                  <div className="pl-cat-bold">Total Membership Sales</div>
                  <div className="pl-month-bold">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${parseFloat(membership.firstMonthTotal).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                  <div className="pl-month-bold">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${parseFloat(membership.secondMonthTotal).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                  <div className="pl-year-bold">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${parseFloat(membership.yearlyTotal).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                </div>
                {/* PL Category Total Ends here */}

                {/* Category, Sub Category & Total Set Starts Here */}
                <div className="pl-cat-data">
                  <div className="pl-cat">Product Sales</div>
                  <div className="pl-month-blank" />
                  <div className="pl-month-blank" />
                  <div className="pl-year-blank" />
                </div>
                <div className="pl-cat-bold">Birthday</div>

                {buyProduct.data &&
                  buyProduct.data.map((x) => {
                    const { product } = x
                    if (product.productType === "Birthday") {
                      return (
                        <div key={x.product} className="pl-sub-cat-data">
                          <div className="pl-sub-cat">{x.product._id}</div>
                          <div className="pl-month-data">
                            <Row id="print_row">
                              <Col md="8" className="d-flex justify-content-end">
                                ${x.firstMonthIncome}
                              </Col>
                              <Col md="4" className="d-flex justify-content-end">
                                {x.percentage1 === "NaN" ? 0 : x.percentage1}%
                              </Col>
                            </Row>
                          </div>
                          <div className="pl-month-data">
                            <Row id="print_row">
                              <Col md="8" className="d-flex justify-content-end">
                                ${x.secondMonthIncome}
                              </Col>
                              <Col md="4" className="d-flex justify-content-end">
                                {x.percentage2 === "NaN" ? 0 : x.percentage2}%
                              </Col>
                            </Row>
                          </div>
                          <div className="pl-year-data">
                            <Row id="print_row">
                              <Col md="8" className="d-flex justify-content-end">
                                ${x.incomeInYear}
                              </Col>
                              <Col md="4" className="d-flex justify-content-end">
                                {x.percentage3 === "NaN" ? 0 : x.percentage3}%
                              </Col>
                            </Row>
                          </div>
                        </div>
                      )
                    }
                  })}

                  {/* Events */}
                  <div className="pl-cat-bold">Events</div>
                  {buyProduct.data &&
                  buyProduct.data.map((x) => {
                    const { product } = x
                    if (product.productType === "Events") {
                      return (
                        <div key={x.product} className="pl-sub-cat-data">
                          <div className="pl-sub-cat">{x.product._id}</div>
                          <div className="pl-month-data">
                            <Row id="print_row">
                              <Col md="8" className="d-flex justify-content-end">
                                ${x.firstMonthIncome}
                              </Col>
                              <Col md="4" className="d-flex justify-content-end">
                                {x.percentage1 === "NaN" ? 0 : x.percentage1}%
                              </Col>
                            </Row>
                          </div>
                          <div className="pl-month-data">
                            <Row id="print_row">
                              <Col md="8" className="d-flex justify-content-end">
                                ${x.secondMonthIncome}
                              </Col>
                              <Col md="4" className="d-flex justify-content-end">
                                {x.percentage2 === "NaN" ? 0 : x.percentage2}%
                              </Col>
                            </Row>
                          </div>
                          <div className="pl-year-data">
                            <Row id="print_row">
                              <Col md="8" className="d-flex justify-content-end">
                                ${x.incomeInYear}
                              </Col>
                              <Col md="4" className="d-flex justify-content-end">
                                {x.percentage3 === "NaN" ? 0 : x.percentage3}%
                              </Col>
                            </Row>
                          </div>
                        </div>
                      )
                    }
                  })}

                  {/* Tests */}
                  <div className="pl-cat-bold">Test</div>
                  {buyProduct.data &&
                  buyProduct.data.map((x) => {
                    const { product } = x
                    if (product.productType === "Test") {
                      return (
                        <div key={x.product} className="pl-sub-cat-data">
                          <div className="pl-sub-cat">{x.product._id}</div>
                          <div className="pl-month-data">
                            <Row id="print_row">
                              <Col md="8" className="d-flex justify-content-end">
                                ${x.firstMonthIncome}
                              </Col>
                              <Col md="4" className="d-flex justify-content-end">
                                {x.percentage1 === "NaN" ? 0 : x.percentage1}%
                              </Col>
                            </Row>
                          </div>
                          <div className="pl-month-data">
                            <Row id="print_row">
                              <Col md="8" className="d-flex justify-content-end">
                                ${x.secondMonthIncome}
                              </Col>
                              <Col md="4" className="d-flex justify-content-end">
                                {x.percentage2 === "NaN" ? 0 : x.percentage2}%
                              </Col>
                            </Row>
                          </div>
                          <div className="pl-year-data">
                            <Row id="print_row">
                              <Col md="8" className="d-flex justify-content-end">
                                ${x.incomeInYear}
                              </Col>
                              <Col md="4" className="d-flex justify-content-end">
                                {x.percentage3 === "NaN" ? 0 : x.percentage3}%
                              </Col>
                            </Row>
                          </div>
                        </div>
                      )
                    }
                  })}

                <div className="pl-cat-total">
                  <div className="pl-cat-bold">Total Product Sales</div>
                  <div className="pl-month-bold">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${parseFloat(buyProduct.firstMonthTotal).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                  <div className="pl-month-bold">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${parseFloat(buyProduct.secondMonthTotal).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                  <div className="pl-year-bold">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${parseFloat(buyProduct.yearlyTotal).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                </div>
                {/* Category, Sub Category & Total Set Ends here */}

                <div className="pl-cat-data">
                  <div className="pl-cat">Recurring Income</div>
                  <div className="pl-month-blank" />
                  <div className="pl-month-blank" />
                  <div className="pl-year-blank" />
                </div>

                <div className="pl-sub-cat-data">
                  <div className="pl-sub-cat">
                    Recurring Inhouse pay - CA CH{" "}
                  </div>
                  <div className="pl-month-data">
                    <Row id="print_row">
                      <Col md="8" className="d-flex justify-content-end">
                        ${parseFloat(recurringInHouse.firstMonthAmt).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end">
                        {firstMonthInHousePercentage === "NaN"
                          ? 0
                          : parseFloat(firstMonthInHousePercentage).toFixed(2)}
                        %
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-month-data">
                    <Row id="print_row">
                      <Col md="8" className="d-flex justify-content-end">
                        $
                        {parseFloat(recurringInHouse.secondMonthAmt).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end">
                        {secondMonthInHousePercentage === "NaN"
                          ? 0
                          : parseFloat(secondMonthInHousePercentage).toFixed(2)}
                        %
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-year-data">
                    <Row id="print_row">
                      <Col md="8" className="d-flex justify-content-end">
                        ${parseFloat(recurringInHouse.yearlyAmt).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end">
                        {yearlyInHousePercentage === "NaN"
                          ? 0
                          : parseFloat(yearlyInHousePercentage).toFixed(2)}
                        %
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="pl-sub-cat-data">
                  <div className="pl-sub-cat">Recurring pay - CC</div>
                  <div className="pl-month-data">
                    <Row id="print_row">
                      <Col md="8" className="d-flex justify-content-end">
                        ${parseFloat(recurringInCC.firstMonthAmt).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end">
                        {firstMonthCCPercentage === "NaN"
                          ? 0
                          : parseFloat(firstMonthCCPercentage).toFixed(2)}
                        %
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-month-data">
                    <Row id="print_row">
                      <Col md="8" className="d-flex justify-content-end">
                        ${parseFloat(recurringInCC.secondMonthAmt).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end">
                        {secondMonthCCPercentage === "NaN"
                          ? 0
                          : parseFloat(secondMonthCCPercentage).toFixed(2)}
                        %
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-year-data">
                    <Row id="print_row">
                      <Col md="8" className="d-flex justify-content-end">
                        ${parseFloat(recurringInCC.yearlyAmt).toFixed(2)}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end">
                        {yearlyCCPercentage === "NaN"
                          ? 0
                          : parseFloat(yearlyCCPercentage).toFixed(2)}
                        %
                      </Col>
                    </Row>
                  </div>
                </div>

                {/* Category, Sub Category & Total Set Starts Here */}
                <div className="pl-cat-data">
                  <div className="pl-cat">Refunds</div>
                  <div className="pl-month-blank" />
                  <div className="pl-month-blank" />
                  <div className="pl-year-blank" />
                </div>

                <div className="pl-sub-cat-data">
                  <div className="pl-sub-cat">Membership Refunds</div>
                  <div className="pl-month-data">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${refund.firstMonthTotal}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                  <div className="pl-month-data">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${refund.secondMonthTotal}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                  <div className="pl-year-data">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${refund.yearlyTotal}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                </div>

                <div className="pl-cat-total">
                  <div className="pl-cat-bold">Total Refund</div>
                  <div className="pl-month-bold">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${refund.firstMonthTotal}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                  <div className="pl-month-bold">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${refund.secondMonthTotal}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                  <div className="pl-year-bold">
                    <Row>
                      <Col md="8" className="d-flex justify-content-end">
                        ${refund.yearlyTotal}
                      </Col>
                      <Col md="4" className="d-flex justify-content-end"></Col>
                    </Row>
                  </div>
                </div>
                {/* Category, Sub Category & Total Set Ends here */}

                {/* PL Table Header Starts Here */}
                <div className="pl-table-header-data">
                  <div className="pl-total">Total Expense</div>
                  <div className="pl-month-total pl-expense-total">
                    ${firstMonthTotalExpense}
                  </div>
                  <div className="pl-month-total pl-expense-total">
                    ${secondMonthTotalExpense}
                  </div>
                  <div className="pl-year-total pl-expense-total">
                    ${yearlyTotalExpense}
                  </div>
                </div>
                {/* PL Table Header Ends here */}

                {/* Category, Sub Category & Total Set Starts Here */}
                <div className="pl-cat-data">
                  <div className="pl-cat">Expense</div>
                  <div className="pl-month-blank" />
                  <div className="pl-month-blank" />
                  <div className="pl-year-blank" />
                </div>

                {expenses &&
                  expenses.map((x, i) => (
                    <div key={i} className="pl-sub-cat-data">
                      <div className="pl-sub-cat">{x.category}</div>
                      <div className="pl-month-data">
                        <Row id="print_row">
                          <Col md="8" className="d-flex justify-content-end">
                            ${x.month1}
                          </Col>
                          <Col md="4" className="d-flex justify-content-end">
                            {x.percentage1}%
                          </Col>
                        </Row>
                      </div>
                      <div className="pl-month-data">
                        <Row id="print_row">
                          <Col md="8" className="d-flex justify-content-end">
                            ${x.month2}
                          </Col>
                          <Col md="4" className="d-flex justify-content-end">
                            {x.percentage2}%
                          </Col>
                        </Row>
                      </div>
                      <div className="pl-year-data">
                        <Row id="print_row">
                          <Col md="8" className="d-flex justify-content-end">
                            ${x.yearly}
                          </Col>
                          <Col md="4" className="d-flex justify-content-end">
                            {x.percentage3}%
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ))}

                {/* Category, Sub Category & Total Set Ends here */}

                <div className="pl-cat-total mt-1">
                  <div className="pl-cat-bold">Income - Expense</div>
                  <div className="pl-month-bold d-flex justify-content-center">
                    <span className="pl-income-total">${totalm1Income} </span> -{" "}
                    <span className="pl-expense-total">
                      {" "}
                      ${firstMonthTotalExpense}
                    </span>
                  </div>
                  <div className="pl-month-bold d-flex justify-content-center">
                    <span className="pl-income-total">${totalm2Income} </span> -{" "}
                    <span className="pl-expense-total">
                      {" "}
                      ${secondMonthTotalExpense}
                    </span>
                  </div>
                  <div className="pl-year-bold d-flex justify-content-center">
                    <span className="pl-income-total">${totalYearly}</span> -{" "}
                    <span className="pl-expense-total">
                      ${yearlyTotalExpense}
                    </span>
                  </div>
                </div>

                <div className="pl-table-header-data">
                  <div className="pl-total">Net Income</div>
                  <div className="pl-month-total">
                    <Row>
                      <Col
                        md="8"
                        className="d-flex justify-content-end pl-net-amt"
                      >
                        {totalm1Income - firstMonthTotalExpense < 0 && "-"}$
                        {totalm1Income - firstMonthTotalExpense < 0
                          ? (totalm1Income - firstMonthTotalExpense) * -1
                          : totalm1Income - firstMonthTotalExpense}
                      </Col>
                      <Col
                        md="4"
                        className="d-flex justify-content-end pl-net-pct"
                      ></Col>
                    </Row>
                  </div>
                  <div className="pl-month-total">
                    <Row>
                      <Col
                        md="8"
                        className="d-flex justify-content-end pl-net-amt"
                      >
                        {totalm2Income - secondMonthTotalExpense < 0 && "-"}$
                        {totalm2Income - secondMonthTotalExpense < 0
                          ? (totalm2Income - secondMonthTotalExpense) * -1
                          : totalm2Income - secondMonthTotalExpense}
                      </Col>
                      <Col
                        md="4"
                        className="d-flex justify-content-end pl-net-pct"
                      ></Col>
                    </Row>
                  </div>
                  <div className="pl-year-total">
                    <Row>
                      <Col
                        md="8"
                        className="d-flex justify-content-end pl-net-amt"
                      >
                        {totalYearly - yearlyTotalExpense < 0 && "-"}$
                        {totalYearly - yearlyTotalExpense < 0
                          ? (totalYearly - yearlyTotalExpense) * -1
                          : totalYearly - yearlyTotalExpense}
                      </Col>
                      <Col
                        md="4"
                        className="d-flex justify-content-end pl-net-pct"
                      ></Col>
                    </Row>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PNL;
