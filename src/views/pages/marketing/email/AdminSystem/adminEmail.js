import React, { Fragment } from "react";
import { connect } from "react-redux";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import EmailTabsmain from "./EmailTabsmain";

const AdminEmail = (props) => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Email Marketing"
        breadCrumbParent="Marketing"
        breadCrumbActive="Email Marketing"
      />
      <EmailTabsmain />
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    getAllAdminCategoris: state.EmailMarketing.getAllAdminCategoris,
  };
};
export default connect(mapStateToProps, null)(AdminEmail);
