import React from "react";
import { Row, Col, Badge } from "reactstrap";
import {
  GET_FORMER_TRAIL_LIST,
  GET_PAGE_NUMBER_PER_PAGE,
  CLEAR_SELECTED_ROWS,
} from "../../../../../../../redux/actions/newstudent/index";
import { connect } from "react-redux";
import { SELECTED_TEST_DATA } from "../../../../../../../redux/actions/test";
import "../../../../../../../assets/scss/pages/users.scss";
import MembersMainTable from "./MembersMainTable";

class FormalTrialTable extends React.Component {
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
    this.props.GET_FORMER_TRAIL_LIST();
    this.props.SELECTED_TEST_DATA([]);
    this.props.CLEAR_SELECTED_ROWS(true);
  };

  render() {
    const { selectedRows, checkboxSelectionIds } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12">
            <MembersMainTable
              SELECTED_TEST_DATA={this.props.SELECTED_TEST_DATA}
              getDataBack={this.props.GET_FORMER_TRAIL_LIST}
              checkboxSelectionIds={checkboxSelectionIds}
              onSelectionChanged={this.onSelectionChanged.bind(this)}
              StudentTypeOrInterest={"Former Trial"}
            />
        </Col>
      </Row>
    );
  }
}
export default connect(null, {
  GET_FORMER_TRAIL_LIST,
  SELECTED_TEST_DATA,
  GET_PAGE_NUMBER_PER_PAGE,
  CLEAR_SELECTED_ROWS,
})(FormalTrialTable);
