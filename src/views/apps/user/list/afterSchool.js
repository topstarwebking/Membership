import React from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import {
  GET_AFTER_SCHOOL_LIST,
  GET_PAGE_NUMBER_PER_PAGE,
  CLEAR_SELECTED_ROWS,
} from "../../../../redux/actions/newstudent/index";
import { connect } from "react-redux";
import { SELECTED_TEST_DATA } from "../../../../redux/actions/test";
import "../../../../assets/scss/pages/users.scss";
import StudentTable from "./components/studentTable";
import ActionsOnStudent from "./components/actions";

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
            breadCrumbTitle="After School"
            breadCrumbParent="Members"
            breadCrumbActive="After School"
          />
          <StudentTable
            activeUserActionComponent={
              <ActionsOnStudent
                studentType="After School"
                clearSelect={this.clearSelect}
                checkboxSelectionIds={checkboxSelectionIds}
                selectedRows={selectedRows}
                getDataBack={this.props.GET_AFTER_SCHOOL_LIST}
              />
            }
            StudentTypeOrInterest={"After School"}
            SELECTED_TEST_DATA={this.props.SELECTED_TEST_DATA}
            getDataBack={this.props.GET_AFTER_SCHOOL_LIST}
            checkboxSelectionIds={checkboxSelectionIds}
            onSelectionChanged={this.onSelectionChanged.bind(this)}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(null, {
  GET_AFTER_SCHOOL_LIST,
  SELECTED_TEST_DATA,
  GET_PAGE_NUMBER_PER_PAGE,
  CLEAR_SELECTED_ROWS,
})(UsersList);
