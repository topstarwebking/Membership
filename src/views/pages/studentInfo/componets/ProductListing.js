import React, { useEffect, useState } from "react";
import {
  Card,
  Collapse,
} from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import "react-toastify/dist/ReactToastify.css";
import { GET_STUDENT_PURCHASE_LIST } from "../../../../redux/actions/shop";
import NestedTable from "./NestedTable";

// const TextOnlyTooltip = withStyles({
//   tooltip: {
//     color: "gray",
//     backgroundColor: "#fff",
//     fontSize: "12px",
//     border: `2px solid rgb(109 117 141 / 10%)`,
//     // boxShadow: "0 12px 48px rgb(109 117 141 / 30%)",
//   },
// })(Tooltip);

const useStyles = makeStyles(() => ({
  cardStyle: {
    boxShadow: "0 5px 10px #e4e0e0",
    borderRadius: "8px",
  },
  avtStyle: {
    height: "30px",
    width: "30px",
  },
  inputStyle: {
    height: "3em",
    borderRadius: "0.4em",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
  row: {
    display: "grid",
    gridTemplateColumns: "15% 15% 15% 15% 15% auto",
  },
}));
const ProductListing = (props) => {
  const classes = useStyles();
  const [collapase, setCollapse] = useState(null);

  const handleOpenCollapse = (id) => {
    if (collapase === id) {
      setCollapse(null);
    } else {
      setCollapse(id);
    }
  };
  useEffect(() => {
    props.GET_STUDENT_PURCHASE_LIST();
  }, []);
  return (
    <div>
      <Card className={classes.cardStyle}>
        <div className="pl-1 pr-1 pt-0">
          <div className={`p-1 pt-0 ${classes.row}`}>
            <div className="d-flex justify-content-center">
              <b> Product Name</b>
            </div>
            <div className="d-flex justify-content-center">
              <b>Product Type</b>
            </div>
            <div className="d-flex justify-content-center">
              <b>Paid Amount</b>
            </div>
            <div className="d-flex justify-content-center">
              <b>Next Payment</b>
            </div>
            <div className="d-flex justify-content-center">
              <b>Next Payment Date</b>
            </div>
            <div className="d-flex justify-content-center">
              <b>Method</b>
            </div>
          </div>
          {props.purchaseList?.product_details?.map((item, i) => {
            return (
              <div
                key={i}
                style={{ borderTop: "1px solid #dddddd" }}
                onClick={() => handleOpenCollapse("pannel" + i)}
              >
                <div className={classes.row}>
                  <div className="d-flex justify-content-start align-items-center">
                    {collapase === "pannel" + i ? (
                      <ExpandLessIcon className="mr-1" />
                    ) : (
                      <ExpandMoreIcon className="mr-1" />
                    )}
                    <div className="d-flex justify-content-center p-1">
                      {item?.product_name}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center p-1">
                    {item?.product_type}
                  </div>
                  <div className="d-flex justify-content-center p-1">{`$ ${item?.deposite}`}</div>
                  <div className="d-flex justify-content-center p-1">{`$ ${item?.balance}`}</div>
                  <div className="d-flex justify-content-center p-1">
                    {item?.next_payment_date}
                  </div>
                  <div className="d-flex justify-content-center p-1">
                    {item?.ptype}
                  </div>
                </div>
                <Collapse in={collapase === "pannel" + i}>
                  <div className="p-1">
                    <NestedTable data={item.schedulePayments}></NestedTable>
                  </div>
                </Collapse>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    purchaseList: state.shop?.purchaseList,
  };
};

export default connect(mapStateToProps, {
  GET_STUDENT_PURCHASE_LIST,
})(ProductListing);
