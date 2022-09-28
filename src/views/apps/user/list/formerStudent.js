import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import {
  GET_FORMER_LIST,
  CLEAR_SELECTED_ROWS,
  GET_PAGE_NUMBER_PER_PAGE,
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
    this.props.GET_FORMER_LIST();
    this.props.SELECTED_TEST_DATA([]);
    this.props.CLEAR_SELECTED_ROWS(true);
  };

  render() {
    const { selectedRows, checkboxSelectionIds } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Breadcrumbs
            breadCrumbTitle="Former Members"
            breadCrumbParent="Members"
            breadCrumbActive="Former Members"
          />
          <br />
          <StudentTable
            activeUserActionComponent={
              <ActionsOnStudent
                studentType="Former Trial"
                clearSelect={this.clearSelect}
                checkboxSelectionIds={checkboxSelectionIds}
                selectedRows={selectedRows}
                getDataBack={this.props.GET_FORMER_LIST}
              />
            }
            SELECTED_TEST_DATA={this.props.SELECTED_TEST_DATA}
            getDataBack={this.props.GET_FORMER_LIST}
            checkboxSelectionIds={checkboxSelectionIds}
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            StudentTypeOrInterest={"Former Student"}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(null, {
  GET_FORMER_LIST,
  SELECTED_TEST_DATA,
  GET_PAGE_NUMBER_PER_PAGE,
  CLEAR_SELECTED_ROWS,
})(UsersList);
