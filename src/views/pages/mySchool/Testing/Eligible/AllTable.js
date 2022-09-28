import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { GET_ALL_ELIGIBLE_STUDENT_LIST } from "../../../../../redux/actions/test_eligible/allstudent";
import StudentTable from "../components/studentTable";

const AllTable = (props) => {
  const { GET_ALL_ELIGIBLE_STUDENT_LIST, eligibleStudentList } = props;

  useEffect(() => {
    GET_ALL_ELIGIBLE_STUDENT_LIST();
  }, [GET_ALL_ELIGIBLE_STUDENT_LIST]);

  return (
    <div>
      <StudentTable
        Getdata={GET_ALL_ELIGIBLE_STUDENT_LIST}
        rowdata={eligibleStudentList}
      ></StudentTable>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { eligibleStudentList: state?.member?.eligibleStudentList };
};
export default connect(mapStateToProps, { GET_ALL_ELIGIBLE_STUDENT_LIST })(
  AllTable
);
