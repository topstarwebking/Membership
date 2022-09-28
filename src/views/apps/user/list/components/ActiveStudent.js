import React, { useEffect } from "react";

import { connect } from "react-redux";
import StudentTable from "../../../../dashboard1/StudentTable";
import { GET_ACTIVE_STUDENT } from "../../../../../redux/actions/newstudent";

const ActiveStudent = (props) => {
  const { GET_ACTIVE_STUDENT, active_student } = props;

  useEffect(() => {
    GET_ACTIVE_STUDENT(1, 5,"firstName");
  }, [GET_ACTIVE_STUDENT]);
  return (
    <div className="shadow bg-white rounded" style={{ height: "100%"  ,width:"100%"}}>
      <StudentTable
        rowdata={active_student}
        GetMoreNewData={GET_ACTIVE_STUDENT}
        studentType={"Active Students"}
        link={"app/student/list"}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    active_student: state.student.active_student,
  };
};

export default connect(mapStateToProps, { GET_ACTIVE_STUDENT })(ActiveStudent);
