import React, { Fragment, useEffect, useState, useReducer } from "react";
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import CreateStudent from "../../pages/newstudent/createStudent";
import StudentBilling from "./infoStudentBilling";
import "../../../assets/scss/pages/users.scss";
import { connect } from "react-redux";
import MembershipTable from "./infoStudentMemberShip";
import Activity from "./infoStudentActivity";
import Ranks from "./infoStudentRank";
import Invoice from "./infoInvoice";
import MyFamily from "./infomyFamily";
import MyGroup from "./infomyGroup";
import { GET_ACTIVE_STUDENT_INFO } from "../../../redux/actions/member";
import ProfileAvatar from "../newstudent/components/ProfileAvatar";
import InfoPreViewCard from "../newstudent/components/infoPreViewcard";
import { useParams } from "react-router-dom";
import ProductListing from "./componets/ProductListing";
import { useHistory } from "react-router-dom";
import { Chip } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const UserEdit = (props) => {
  const [activeTab, setactiveTab] = useState("0");
  const history = useHistory()
  const { studentId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [studentinfo, setStudentInfo] = useState(null);
  const { getstudentInfoById, viewActiveStudentInfo, GET_ACTIVE_STUDENT_INFO } =
    props;
  const toggle = (tab) => {
    setactiveTab(tab);
  };

  useEffect(() => {
    if (studentinfo === null) {
      GET_ACTIVE_STUDENT_INFO(studentId);
      setStudentInfo(getstudentInfoById);
    }

  }, [GET_ACTIVE_STUDENT_INFO, getstudentInfoById]);

  // console.log(studentinfo)

  const handelIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const imageHandler = (e) => {
    setStudentInfo({
      ...studentinfo,
      memberprofileImage: e.target?.files[0],
      memberProfileUrl: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <div>
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              <div className="d-flex justify-content-start align-items-center mb-1">
                <Chip onClick={() => {
                  history.fromback = true
                  history.goBack()
                }} label='Back' icon={<ArrowBackIcon color='secondary' />} />
                <h2 className="ml-1 content-header-title float-left mb-0">
                  {"Student Info"}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Row>
          <Col sm={3} className="border-right m-l">
            <Card style={{ widht: "100%", height: "100%" }}>
              <CardBody style={{ padding: "0.4em" }}>
                <ProfileAvatar
                  studentinfo={viewActiveStudentInfo}
                  update={props.update}
                  isEdit={isEdit}
                />
                <InfoPreViewCard studentinfo={getstudentInfoById} />
              </CardBody>
            </Card>
          </Col>
          <Col sm="9" className="pl-0">
            <Card style={{ widht: "100%", height: "100%" }}>
              <CardBody className="pt-2">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "0" })}
                      onClick={() => {
                        toggle("0");
                      }}
                    >
                      <span className="align-middle ml-50">Details</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      <span className="align-middle ml-50">Membership</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      <span className="align-middle ml-50">Product</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        toggle("3");
                      }}
                    >
                      <span className="align-middle ml-50">Finance</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "4" })}
                      onClick={() => {
                        toggle("4");
                      }}
                    >
                      <span className="align-middle ml-50">Ranks</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "5" })}
                      onClick={() => {
                        toggle("5");
                      }}
                    >
                      <span className="align-middle ml-50">Activity</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "6" })}
                      onClick={() => {
                        toggle("6");
                      }}
                    >
                      <span className="align-middle ml-50">Family</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "7" })}
                      onClick={() => {
                        toggle("7");
                      }}
                    >
                      <span className="align-middle ml-50">Group</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "8" })}
                      onClick={() => {
                        toggle("8");
                      }}
                    >
                      <span className="align-middle ml-50">Invoice</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "9" })}
                      onClick={() => {
                        toggle("9");
                      }}
                    >
                      <span className="align-middle ml-50">Files</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                {activeTab === "0" && (
                  <Fragment>
                    {activeTab === "0" ? (
                      <CreateStudent
                        update={true}
                        handelIsEdit={handelIsEdit}
                        imageHandle={imageHandler}
                      />
                    ) : (
                      <CreateStudent update={true} isCreate={false} />
                    )}
                  </Fragment>
                )}
                {activeTab === "1" && <MembershipTable />}
                {activeTab === "2" && <ProductListing />}
                {activeTab === "3" && <StudentBilling />}
                {activeTab === "4" && <Ranks />}
                {activeTab === "5" && <Activity />}
                {activeTab === "6" && <MyFamily />}
                {activeTab === "7" && <MyGroup />}
                {activeTab === "8" && <Invoice />}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    viewActiveStudentInfo: state.member.viewActiveStudentInfo,
    getstudentInfoById: state.member.getstudentInfoById,
  };
};

export default connect(mapStateToProps, { GET_ACTIVE_STUDENT_INFO })(UserEdit);
