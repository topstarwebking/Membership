import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import DataTable from "react-data-table-component";
import "react-circular-progressbar/dist/styles.css";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "../../../../../assets/scss/pages/finance.scss";
import PageLink from "../components/PageLink";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCCAction } from "../../../../../redux/actions/mymoney/index";
import Spinner from "../../../../../components/@vuexy/spinner/Loading-spinner";

const Ccexp = () => {
  function maskCC(cc) {
    let firstFourDigit = String(cc).slice(0, 5);
    let lastFourDigit = String(cc).slice(12, 17);
    return `${firstFourDigit}XXXXXXXX${lastFourDigit}`;
  }

  const columns = [
    {
      name: "Card Holder Name",
      selector: (row) => row.card_holder_name,
    },

    {
      name: "Primary Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Expiry Date",
      selector: (row) => {
        let _d = String(row.expiry_date).split("");
        return (
          <>
            {_d[0]}
            {_d[1]} / {_d[2]}
            {_d[3]}
          </>
        );
      },
    },
    {
      name: "CC Number",
      selector: (row) => maskCC(row.pan),
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={row.status === "active" ? "badge-success" : "badge-danger"}
        >
          {row.status === "active" ? "Active" : "Expired"}
        </span>
      ),
    },
  ];

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

  const page = 1;
  const [perPage] = useState(100000);
  const { isLoading, list, isFetching } = useSelector((state) => state.cclist);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCCAction(page, perPage));
    // eslint-disable-next-line
  }, [dispatch, page, perPage]);

  return (
    <div>
      <Breadcrumbs
        breadCrumbTitle="My Money"
        breadCrumbParent="My Money"
        breadCrumbActive="CC Expiring"
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
              <div className="pl-title d-flex flex-column">
                <span>CC Expiring</span>
                <span className="pl-subtitle">Credit Card Expiration Info</span>
              </div>
            </CardHeader>
            <CardBody>
              <DataTable
                progressPending={isLoading}
                progressComponent={
                  <div style={{ minHeight: 456 }}>
                    <Spinner />
                  </div>
                }
                data={list}
                columns={columns}
                noHeader
                customStyles={customStyles}
                pagination
              />

              <div className="ccexp_pagination">
                <div className="ccexp_fetching_data">
                  {isFetching && <Spinner />}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Ccexp;
