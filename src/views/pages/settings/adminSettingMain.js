import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import "../../../assets/scss/pages/users.scss";
import StripTable from "./strip/stripTable";
import ProgramTable from "./Program/programeTable";
import CategoryTable from "./Program/category/categoryTable";
import RankTable from "./Program/category/RankTable";
import General1Form from "./general1/general1Form";
import SettingSmartlistMain from "./Smratlist/SettingSmartlistMain";
import LeadTrackingandaftercamp from "./adminleadsandtags/leadtracking/leadTrackingandaftercamp";
import Expencelisting from "./adminleadsandtags/adminfinance/component/expenceList";

class UserEdit extends React.Component {
  state = {
    activeTab: "1",
    ListselectedProgramCategory: [],
    ListselectedProgramRank: [],
  };

  toggle = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };
  handleSelectProgram = (
    selectProgramCatList,
    selectProgramRankList,
    programName
  ) => {
    this.setState({
      ListselectedProgramCategory: selectProgramCatList,
      ListselectedProgramRank: selectProgramRankList,
      selectPName: programName,
    });
  };

  render() {
    const {
      ListselectedProgramCategory,
      ListselectedProgramRank,
      selectPName,
    } = this.state;
    return (
      <div>
        <div className="content-header row">
          <div className="content-header-left col-md-9 col-12 mb-2">
            <div className="row breadcrumbs-top">
              <div className="col-12">
                <h2 className="content-header-title float-left mb-0">
                  {"Settings"}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody className="pt-2">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1",
                      })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      <span className="align-middle ml-50">General</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2",
                      })}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      <span className="align-middle ml-50">Programs</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "3",
                      })}
                      onClick={() => {
                        this.toggle("3");
                      }}
                    >
                      <span className="align-middle ml-50">Candidate</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "4",
                      })}
                      onClick={() => {
                        this.toggle("4");
                      }}
                    >
                      <span className="align-middle ml-50">SmartList</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "5",
                      })}
                      onClick={() => {
                        this.toggle("5");
                      }}
                    >
                      <span className="align-middle ml-50">Custom Info</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "6",
                      })}
                      onClick={() => {
                        this.toggle("6");
                      }}
                    >
                      <span className="align-middle ml-50">Expense</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <General1Form />
                  </TabPane>
                  <TabPane tabId="2">
                    <ProgramTable
                      updateParentDefaultCategoryRank={this.setState}
                      handleSelectProgram={this.handleSelectProgram}
                    />
                    <CategoryTable
                      handleSelectProgram={this.handleSelectProgram}
                      selectPName={selectPName}
                      ListselectedProgramCategory={ListselectedProgramCategory}
                    />
                    <RankTable
                      handleSelectProgram={this.handleSelectProgram}
                      selectPName={selectPName}
                      ListselectedProgramRank={ListselectedProgramRank}
                    />
                  </TabPane>
                  <TabPane tabId="3">
                    <StripTable />
                  </TabPane>
                  <TabPane tabId="4">
                    <SettingSmartlistMain />
                  </TabPane>
                  <TabPane tabId="5">
                    <LeadTrackingandaftercamp />
                  </TabPane>
                  <TabPane tabId="6">
                    <Expencelisting />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default UserEdit;
