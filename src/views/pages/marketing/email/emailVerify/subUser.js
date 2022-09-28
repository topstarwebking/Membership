import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import RolesList from "./rolesList";
import RolesTable from "./rolesTable";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb"

const SubUser = (props) => {
    return (
        <Fragment>
            <Breadcrumbs
                breadCrumbTitle="Employee"
                breadCrumbParent="Members"
                breadCrumbActive="Employee"
            />
            <RolesList />
            <RolesTable />
        </Fragment>
    )
};

export default connect(null, null)(SubUser);
