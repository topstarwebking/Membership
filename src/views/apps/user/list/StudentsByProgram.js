import React from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { GET_ACTIVE_STUDENT } from "../../../../redux/actions/newstudent";
import { GET_PROGRAM_LIST } from "../../../../redux/actions/programe";
import { connect } from "react-redux";
import "../../../../assets/scss/pages/users.scss";
import { SELECTED_TEST_DATA } from "../../../../redux/actions/test";
import "react-toastify/dist/ReactToastify.css";
import StudentTable from "./components/studentTable";
import ActionsOnStudent from "./components/actions";

class UsersLists extends React.Component {
  state = {
    checkboxSelectionIds: [],
    rowData: null,
    selectedRows: [],
    data: [],
    loading: true,
  };

  componentDidMount() {
    this.props.GET_ACTIVE_STUDENT();
    this.props.GET_PROGRAM_LIST();
  }
  onSelectionChanged(selectIds, selectedRows) {
    this.setState({
      checkboxSelectionIds: selectIds,
      selectedRows: selectedRows,
    });
  }
  clearSelect = () => {
    this.setState({
      selectedRows: [],
      checkboxSelectionIds: [],
    });
    this.props.GET_PROGRAM_LIST();
    this.props.SELECTED_TEST_DATA([]);
  };

  render() {
    const { selectedRows, checkboxSelectionIds } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Breadcrumbs
            breadCrumbTitle="Students By Program"
            breadCrumbParent="Students"
            breadCrumbActive="Students By Program"
          />
          <br />
          <StudentTable
            activeUserActionComponent={
              <ActionsOnStudent
                studentType="Students By Program"
                clearSelect={this.clearSelect}
                checkboxSelectionIds={checkboxSelectionIds}
                selectedRows={selectedRows}
                getDataBack={this.props.GET_ACTIVE_STUDENT}
              />
            }
            flag={true}
            programList={this.props.programList}
            SELECTED_TEST_DATA={this.props.SELECTED_TEST_DATA}
            getDataBack={this.props.GET_ACTIVE_STUDENT}
            checkboxSelectionIds={checkboxSelectionIds}
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            StudentTypeOrInterest={"By Program"}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    programList: state.program.programList,
  };
};

export default connect(mapStateToProps, {
  GET_ACTIVE_STUDENT,
  GET_PROGRAM_LIST,
  SELECTED_TEST_DATA,
})(UsersLists);
