import { Dialog, IconButton, Chip, DialogContent } from "@material-ui/core";
import React, { useState } from "react";
import { X } from "react-feather";
import { connect } from "react-redux";
import AllTesting from "../../../pages/shop/testing/allTesting";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { DELETE_PRODECT } from "../../../../redux/actions/shop";
import { GET_STUDENT_FINANCE_INFO } from "../../../../redux/actions/billing";

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

const TestPaper = (props) => {
  const { studentData } = props
  const [state, setState] = useState({
    defaultAlert: false,
    deleteTestpaper: null,
    modal: false,
  });

  const getColor = (status) => {
    if (status) {
      return { c: "#59f725", bg: hexToRGB("#7ef756a1", 0.16) };
    } else {
      return { c: "#0883fb", bg: hexToRGB("#87c3fc", 0.16) };
    }
  }

  const fetchFinanceDetails = async () => {
    let firstParam =
      typeof studentData?.studentId === "object"
        ? studentData?.studentId
        : studentData;
    await props.GET_STUDENT_FINANCE_INFO(firstParam);
    setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  // console.log(props.selectedrow)
  return (
    <>
      <Chip
        onClick={fetchFinanceDetails}
        size="small"
        style={{
          fontWeight: "bold",
          background: getColor(studentData?.isPaid)?.bg,
          color: getColor(studentData?.isPaid)?.c,
        }}
        // style={{ background: studentData?.isPaid ? "#6ec871" : "#106ab3", color: "#ffff" }}
        label={studentData?.isPaid ? "Paid" : "Pay now"}
      />
      <Dialog open={state?.modal} fullWidth maxWidth="lg">
        <DialogContent>
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex justify-content-start w-100">
              <BreadCrumbs
                breadCrumbTitle="Event Manager"
                breadCrumbParent="My School"
                breadCrumbActive="Events"
              />
            </div>
            <div className="d-flex justify-content-end w-100">
              <IconButton
                onClick={() => {
                  setState({
                    modal: !state.modal,
                  });
                }}
                className="p-0"
              >
                <X />
              </IconButton>
            </div>
          </div>
          <AllTesting gridNumber={6} studentData={props.studentData} selectedrow={props.selectedrow} />
        </DialogContent>
      </Dialog>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    shop: state.shop.getStudentFinanceInfo,
  };
};
export default connect(mapStateToProps, {
  DELETE_PRODECT,
  GET_STUDENT_FINANCE_INFO,
})(TestPaper);
