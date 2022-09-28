import React, { useEffect, useState } from "react";
import RolesList from "./rolesList";
import RolesTable from "./rolesTable";
import { connect } from "react-redux";

const EmailAddresses = (props) => {
  return (
    <div className="p-1" style={{ width: "100%" }}>
      {/* <RolesList />
      <RolesTable /> */}
    </div>
  );
};

export default connect(null, null)(EmailAddresses);
