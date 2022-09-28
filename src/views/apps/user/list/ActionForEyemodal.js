import * as React from "react";
import { connect } from "react-redux";
import StudentlistuserEyeModal from "../../../dashboard1/StudentlistuserEyeModal";
import StudentManageMenu from "./UserMoreMenu";

const ActionForEyemodal = (props) => {
  const { item, usersChatAlertList } = props;

  return (
    <div className="d-flex justify-content-start align-items-center">
      <StudentlistuserEyeModal studentInfo={item} />
      <StudentManageMenu
        item={item}
        alertCount={usersChatAlertList[item?._id]}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    usersChatAlertList: state.V2textChat?.usersChatAlertList,
  };
};

export default connect(mapStateToProps, null)(ActionForEyemodal);
