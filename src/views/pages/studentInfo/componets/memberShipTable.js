import React, { useState, useEffect, Fragment } from "react";
import { Avatar, Collapse, Chip} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ManageMemberShipAction from "./ManageMemberShipAction";
import moment from "moment";
import ViewPaymentInfo from "./viewPaymentInfo";
import DocuSognStatus from "./docuSign/status";
import { GET_ACTIVE_OR_INACTIVE_LIST } from '../../../../redux/actions/email'
import { connect } from "react-redux";

const getDaysLeft = (expiry) => {
  let endDate = moment(expiry).format("YYYY-MM-DD");
  let current = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");
  try {
    return moment(endDate).diff(moment(current), "days");
  } catch (error) {
    return moment(current).diff(moment(endDate), "days");
  }
};

const useStyles = makeStyles(() => ({
  row: {
    display: "grid",
    gridTemplateColumns: " 10% 10% 10% 10% 10% 10% 8% 8% 8% 10% 10%",
  },
}));

const MemberShipTable = (props) => {
  const classes = useStyles();
  const { data } = props;
  console.log(data)
  const [collapase, setCollapse] = useState(null);
  const { GET_ACTIVE_OR_INACTIVE_LIST } = props

  useEffect(() => {
    GET_ACTIVE_OR_INACTIVE_LIST()
  }, [])

  const handleOpenCollapse = (id) => {
    if (collapase === id) {
      setCollapse(null);
    } else {
      setCollapse(id);
    }
  };

  return (
    <Fragment>
      <div className={`px-1 ${classes.row} border-bottom`}>
        <div className="d-flex justify-content-start">
          <b>Name</b>
        </div>
        <div className="d-flex justify-content-start">
          <b>Paid Amt</b>
        </div>
        <div className="d-flex justify-content-start">
          <b>Balance</b>
        </div>
        <div className="d-flex justify-content-start">
          <b> Start Date</b>
        </div>
        <div className="d-flex justify-content-start">
          <b>Expiry Date</b>
        </div>
        <div className="d-flex justify-content-start">
          <b>Days Left</b>
        </div>
        <div className="d-flex justify-content-start">
          <b>Type</b>
        </div>
        <div className="d-flex justify-content-start">
          <b>Method</b>
        </div>
        <div className="d-flex justify-content-start">
          <b>Status</b>
        </div>
        <div className="d-flex justify-content-start">
          <b>Sign Status</b>
        </div>
        <div className="d-flex justify-content-start">
          <b>Manage</b>
        </div>
      </div>
      {data?.map((item, i) => {
        return (
          <div key={i} className={'cursor-pointer border-bottom '}>
            <div className={`pt-1 ${classes.row}`}>
              <div
                style={{ paddingLeft: '15px' }}
                onClick={() => handleOpenCollapse("pannel" + i)}
              >
                {item?.membership_name}
              </div>
              <div
                style={{ paddingLeft: '15px' }}
                className="d-flex justify-content-start align-items-center"
                onClick={() => handleOpenCollapse("pannel" + i)}
              >
                ${(item?.totalp - item?.balance).toFixed(2)}
              </div>
              <div
                style={{ paddingLeft: '15px' }}
                className="d-flex justify-content-start align-items-center"
                onClick={() => handleOpenCollapse("pannel" + i)}
              >
                ${item?.balance.toFixed(2)}
              </div>
              <div
                style={{ paddingLeft: '10px' }}
                className="d-flex justify-content-start align-items-center"
                onClick={() => handleOpenCollapse("pannel" + i)}
              >
                {moment(item.mactive_date).format("MM/DD/YYYY")}
              </div>
              <div
                style={{ paddingLeft: '10px' }}
                className="d-flex justify-content-start align-items-center"
                onClick={() => handleOpenCollapse("pannel" + i)}
              >
                {moment(item?.expiry_date).format("MM/DD/YYYY")}
              </div>
              <div
                style={{ paddingLeft: '15px' }}
                className="d-flex justify-content-start align-items-center"
                onClick={() => handleOpenCollapse("pannel" + i)}
              >
                <Avatar style={{height:"2rem", width: "2rem", backgroundColor: "rgba(96, 170, 14, 0.83", fontSize: "14px"}}> {getDaysLeft(item?.expiry_date)}</Avatar>
              </div>
              <div
                style={{ paddingLeft: '5px' }}
                className=" d-flex justify-content-start align-items-center"
                onClick={() => handleOpenCollapse("pannel" + i)}
              >
                {item?.payment_type}
              </div>
              <div
                className="d-flex justify-content-start align-items-center"
                onClick={() => handleOpenCollapse("pannel" + i)}
              >
                {item?.pay_inout}
              </div>
              <div
                className={`d-flex align-items-center ${item?.membership_status === "Active"
                  ? "text-success"
                  : item?.membership_status === "Freeze"
                    ? "text-warning"
                    : "text-primary"
                  }`}
                onClick={() => handleOpenCollapse("pannel" + i)}
              >
                <Chip 
                  label={item?.membership_status}
                  style={{backgroundColor: "#def8e7"}}
                />
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <DocuSognStatus signDocForId={item?._id} />
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <ManageMemberShipAction isActionONChild={false} data={item} />
              </div>
            </div>
            <Collapse in={collapase === "pannel" + i}>
              <ViewPaymentInfo memberShip={item} />
            </Collapse>
          </div>
        );
      })}
    </Fragment>
  );
};

export default connect(null, { GET_ACTIVE_OR_INACTIVE_LIST })(MemberShipTable);
