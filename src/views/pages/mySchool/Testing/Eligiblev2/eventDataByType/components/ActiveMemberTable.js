import React from "react";
import { Row, Col } from "reactstrap";
import {
  GET_ACTIVE_STUDENT,
  GET_ACTIVE_TRAIL_LIST,
  CLEAR_SELECTED_ROWS,
  GET_PAGE_NUMBER_PER_PAGE,
} from "../../../../../../../redux/actions/newstudent";
import { SELECTED_TEST_DATA } from "../../../../../../../redux/actions/test";
import { connect } from "react-redux";
import "../../../../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../../../../assets/scss/pages/users.scss";
import MembersMainTable from "./MembersMainTable";
// import StudentTable from "../../../../../../apps/user/list/components/studentTable";

class ActiveMemberTable extends React.Component {
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
      rowData: this.props.active_student,
      checkboxSelectionIds: [],
    });
    this.props.SELECTED_TEST_DATA([]);
    this.props.CLEAR_SELECTED_ROWS(true);
  };
  render() {
    const { checkboxSelectionIds} = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <MembersMainTable
            SELECTED_TEST_DATA={this.props.SELECTED_TEST_DATA}
            getDataBack={this.props.GET_ACTIVE_STUDENT}
            checkboxSelectionIds={checkboxSelectionIds}
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            StudentTypeOrInterest={"Active Student"}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(null, {
  GET_ACTIVE_STUDENT,
  SELECTED_TEST_DATA,
  GET_ACTIVE_TRAIL_LIST,
  GET_PAGE_NUMBER_PER_PAGE,
  CLEAR_SELECTED_ROWS,
})(ActiveMemberTable);