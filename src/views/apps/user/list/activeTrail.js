import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import {
  GET_ACTIVE_TRAIL_LIST,
  CLEAR_SELECTED_ROWS,
} from "../../../../redux/actions/newstudent";
import { SELECTED_TEST_DATA } from "../../../../redux/actions/test";
import { connect } from "react-redux";
import "../../../../assets/scss/pages/users.scss";
import StudentTable from "./components/studentTable";
import ActionsOnStudent from "./components/actions";
import { GET_PAGE_NUMBER_PER_PAGE } from "../../../../redux/actions/newstudent";
class UsersList extends React.Component {
  state = {
    checkboxSelectionIds: [],
    rowData: null,
    selectedRows: [],
    data: [],
    loading: true,
  };
  onSelectionChanged(selectIds, selectedRows, pageNumber, rowsPerPage) {
    this.setState({
      checkboxSelectionIds: selectIds,
      selectedRows: selectedRows,
    });
    this.props.GET_PAGE_NUMBER_PER_PAGE({
      page: pageNumber,
      perpage: rowsPerPage,
    });
  }

  clearSelect = () => {
    this.setState({
      selectedRows: [],
      checkboxSelectionIds: [],
    });
    this.props.SELECTED_TEST_DATA([]);
    this.props.CLEAR_SELECTED_ROWS(true);
  };
  
  render() {
    const { selectedRows, checkboxSelectionIds } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Breadcrumbs
            breadCrumbTitle="Active Trials"
            breadCrumbParent="Members"
            breadCrumbActive="Active Trials"
          />
          <br />
          <StudentTable
            activeUserActionComponent={
              <ActionsOnStudent
                studentType="Active Trial"
                clearSelect={this.clearSelect}
                checkboxSelectionIds={checkboxSelectionIds}
                selectedRows={selectedRows}
                getDataBack={this.props.GET_ACTIVE_TRAIL_LIST}
              />
            }
            SELECTED_TEST_DATA={this.props.SELECTED_TEST_DATA}
            getDataBack={this.props.GET_ACTIVE_TRAIL_LIST}
            checkboxSelectionIds={checkboxSelectionIds}
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            StudentTypeOrInterest={"Active Trial"}
            clearSelect={this.clearSelect}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(null, {
  GET_ACTIVE_TRAIL_LIST,
  SELECTED_TEST_DATA,
  GET_PAGE_NUMBER_PER_PAGE,
  CLEAR_SELECTED_ROWS,
})(UsersList);
