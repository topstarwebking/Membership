import React, { Fragment, useState, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Invited from "./eventDetailsTable/Invited"
import Going from "./eventDetailsTable/Going";
import Attended from "./eventDetailsTable/Attended";
import { connect } from "react-redux";
import {
    GET_INVITEES_OF_EVENT,
  } from "../../../../../redux/actions/test";
  


function DetailsTable(props) {
    const [activeTab, setActiveTab] = useState("1")
    const { GET_INVITEES_OF_EVENT, getInvitestudents } = props;
    const toggle = () => {
        setActiveTab({
            activeTab: activeTab
        });
    };
    useEffect(() => {
        GET_INVITEES_OF_EVENT()
      }, [GET_INVITEES_OF_EVENT])

    return (
        <Fragment>
            <div className="pt-2">
                <div className="d-flex justify-content-between">
                    <div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        activeTab: activeTab === "1",
                                    })}
                                    onClick={() => {
                                        toggle("1");
                                    }}
                                >
                                    <span className="align-middle ml-50"><i className="fa fa-check-circle"></i>Invited</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        activeTab: activeTab === "2",
                                    })}
                                    onClick={() => {
                                        toggle("2");
                                    }}
                                >
                                    <span className="align-middle ml-50"><i className="fa fa-check-square-o"></i> Going</span>
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        activeTab: activeTab === "3",
                                    })}
                                    onClick={() => {
                                        toggle("3");
                                    }}
                                >
                                    <span className="align-middle ml-50"><i className="fa fa-check"></i> Attended</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                    <div>
                        {activeTab === "1" ? (
                            <div className="d-flex justify-content-between text-primary mr-5">
                                Total Invited: 312
                            </div>
                        ) : null}
                        <div>
                            {activeTab === "2" ? (
                                <div className="d-flex justify-content-between text-primary mr-5">
                                    Total Going: 332
                                </div>
                            ) : null}
                        </div>
                        {activeTab === "3" ? (
                            <div className="d-flex justify-content-between text-primary mr-5">
                                Total Attended: 123
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Invited />
                </TabPane>
                <TabPane tabId="2">
                    <Going />
                </TabPane>
                <TabPane tabId="3">
                    <Attended />
                </TabPane>
            </TabContent>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
      getInvitestudents: state.test.getInvitestudents
    };
  };

  export default connect(mapStateToProps, {
    GET_INVITEES_OF_EVENT,
  })(DetailsTable);
