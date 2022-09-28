import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../assets/scss/pages/dashboard2.scss";
import { GET_COUNT_OF_STUDENT_BY_TYPE } from "./../../../redux/actions/member";
const StudentState = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.member.getCountOfStudentByType);

  useMemo(() => {
    dispatch(GET_COUNT_OF_STUDENT_BY_TYPE());
  }, [dispatch]);

  return (
    <>
      <div className="single-stat-card mb-1">
        <span className="mini-card-title">Active Students</span>
        <div className="mini-card-content">
          <span className="mini-card-amt">{data ? data.active : 0}</span>
          <button className="viewAllBtn">View All</button>
        </div>
      </div>
      <div className="single-stat-card mb-1">
        <span>Active trials</span>
        <div className="mini-card-content">
          <span className="mini-card-amt">{data ? data.active_trial : 0}</span>
          <button className="viewAllBtn">View All</button>
        </div>
      </div>
      <div className="single-stat-card">
        <span>Formal Students</span>
        <div className="mini-card-content">
          <span className="mini-card-amt">{data ? data.former_trail : 0}</span>
          <button className="viewAllBtn">View All</button>
        </div>
      </div>
    </>
  );
};

export default StudentState;
