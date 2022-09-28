import React from "react";
import "../../../../assets/scss/pages/users.scss";
import CandidateTable from "./CandidateTable";

const CandidateTabs = (props) => {
  return (
    <>
      <CandidateTable candidate={props.candidate} />
    </>
  );
};

export default CandidateTabs;
