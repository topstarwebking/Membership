import React from "react";
import BreadCrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import AdminTextSidbar from "./components/sidbar/AdminTextSidbar";
import TextTemplateListing from "./TextTemplateListing";

const MainAdminText = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="Text"
        breadCrumbParent="Marketing"
        breadCrumbActive="Text"
      />
      <div className="d-flex justify-content-between">
        <AdminTextSidbar />
        <TextTemplateListing />
      </div>
    </>
  );
};

export default MainAdminText;
