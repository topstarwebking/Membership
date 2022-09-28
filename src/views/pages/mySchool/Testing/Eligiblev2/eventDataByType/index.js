import React, { useState, useEffect } from 'react'
import Breadcrumbs from "../../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Row, Col, Card, ButtonGroup } from "reactstrap"
import { connect } from "react-redux";
import {
    GET_FORMER_LIST,
    CLEAR_SELECTED_ROWS,
    GET_PAGE_NUMBER_PER_PAGE,
} from "../../../../../../redux/actions/newstudent/index";
import { SELECTED_TEST_DATA } from "../../../../../../redux/actions/test";
import ActiveTrialsTable from './components/ActiveTrialsTable';
import FormalTrialTable from './components/FormalTrialTable';
import LeadMembersTable from './components/LeadMembersTable';
import ActiveMemberTable from './components/ActiveMemberTable';
import FormalMemberTable from "./components/FormalMemberTable"
import "../style.css"
import { Chip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";


function MainMemberTable(props) {
    const [Tabsvalue, setTabsValue] = React.useState(0);
    const [checkboxSelectionIds, setCheckboxSelectionIds] = useState([])
    const history = useHistory();

    const onSelectionChanged = (selectIds, selectedRows, pageNumber, rowsPerPage) => {
        setCheckboxSelectionIds(selectIds)
    }
    const handleChange = (newValue) => {
        setTabsValue(newValue);
    };
    return (
        <>
            <div className="d-flex justify-content-start align-items-center mb-1">
                <Chip onClick={() => {
                    history.fromback = true
                    history.goBack()
                }} label='Back' icon={<ArrowBackIcon color='secondary' />} />
                <h2 className="ml-1 content-header-title float-left mb-0">
                    {"Guest Details"}
                </h2>
            </div>
            <Row className="app-user-list">
                <Col md="3">
                    <Card>
                        <div style={{ display: "inline-grid" }}>
                            <div
                                className={`d-flex align-items-center ${Tabsvalue === 0
                                    ? "bgActive"
                                    : ""
                                    }`}
                                onClick={() => {
                                    handleChange(0);
                                }}
                            >
                                <div className="iconsColor">
                                    <i className="fa fa-image"></i>
                                </div>
                                <div>
                                    <b>Active Mamber</b>
                                </div>
                            </div>
                            <div
                                className={`d-flex align-items-center ${Tabsvalue === 1
                                    ? "bgActive"
                                    : ""
                                    }`}
                                onClick={() => {
                                    handleChange(1);
                                }}
                            >
                                <div className="iconsColor">
                                    <i className="fa fa-image"></i>
                                </div>
                                <div>
                                    <b>Former Member</b>
                                </div>
                            </div>
                            <div
                                className={`d-flex align-items-center ${Tabsvalue === 2
                                    ? "bgActive"
                                    : ""
                                    }`}
                                onClick={() => {
                                    handleChange(2);
                                }}
                            >
                                <div className="iconsColor">
                                    <i className="fa fa-image"></i>
                                </div>
                                <div

                                >
                                    <b>Active Trial</b>
                                </div>
                            </div>
                            <div
                                className={`d-flex align-items-center ${Tabsvalue === 3
                                    ? "bgActive"
                                    : ""
                                    }`}
                                onClick={() => {
                                    handleChange(3);
                                }}
                            >
                                <div className="iconsColor">
                                    <i className="fa fa-image"></i>
                                </div>
                                <div

                                >
                                    <b>Former Trial</b>
                                </div>
                            </div>
                            <div
                                className={`d-flex align-items-center 
                                ${Tabsvalue === 4
                                        ? "bgActive"
                                        : ""
                                    }`
                                }
                                onClick={() => {
                                    handleChange(4);
                                }}
                            >
                                <div className="iconsColor">
                                    <i className="fa fa-image"></i>
                                </div>
                                <div

                                >
                                    <b>Leads</b>
                                </div>
                            </div>
                            {/* <div
                            className={`d-flex align-items-center 
                                ${Tabsvalue === 4
                                ? "bgActive"
                                : ""
                                }`
                            }
                            onClick={() => {
                                handleChange(4);
                            }}
                        >
                            <div className="iconsColor">
                                <i className="fa fa-image"></i>
                            </div>
                            <div

                            >
                                <b>Employee</b>
                            </div>
                        </div> */}
                        </div>
                    </Card>
                </Col>
                <Col md="9">
                    {Tabsvalue === 0 ? (
                        <ActiveMemberTable />
                    ) : Tabsvalue === 1 ? (
                        <FormalMemberTable />
                    ) : Tabsvalue === 2 ? (
                        <ActiveTrialsTable />
                    ) : Tabsvalue === 3 ? (
                        <FormalTrialTable />
                    ) : (
                        <LeadMembersTable />
                    )
                    }
                </Col>
            </Row>
        </>
    )
}

export default connect(null, {
    GET_FORMER_LIST,
    SELECTED_TEST_DATA,
    GET_PAGE_NUMBER_PER_PAGE,
    CLEAR_SELECTED_ROWS,
})(MainMemberTable);