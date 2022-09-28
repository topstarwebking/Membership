import React from "react";
import StudentlistuserEmailModal from "../../../pages/studentlistEmailicon/studentlistuserEmailModal";
import QuickSendSMS from "./components/quickSend-sms";
// ----------------------------------------------------------------------

export default function QuickSMSstudent(props) {

  const { item, alertCount ,StudentTypeOrInterest} = props;

  return (
    <div className="d-flex justify-content-start">
      <QuickSendSMS badgeContent={alertCount ? alertCount : 0} item={item} StudentTypeOrInterest={StudentTypeOrInterest}/>
      <StudentlistuserEmailModal  item={item} />
    </div>
  );
}
