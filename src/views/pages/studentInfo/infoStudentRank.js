import React from "react";
import {
  CardBody,
  Input,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { ContextLayout } from "../../../utility/context/Layout";
import {
  GET_RANK_BY_STUDENT_ID,
  RANK_REMOVE_OF_STUDENT_ID,
} from "../../../redux/actions/newstudent";
import { connect } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import SweetAlert from "react-bootstrap-sweetalert";
import { ChevronDown } from "react-feather";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import AddRank from "./rank/addRank";
import { Avatar } from "@material-ui/core";
import moment from "moment";
import EditDeleteRank from './EditDeleteRank'

class UsersLists extends React.Component {
  state = {
    checkboxSelectionIds: [],
    rowData: null,
    modal: false,
    sweetAlert: false,
    pageSize: 20,
    actionOnRank: {},
    loading: true,
    defaultColDef: {
      resizable: true,

      flex: 1,
    },
    searchVal: "",
    columnDefs: [
      {
        headerName: "Rank image",
        field: "rank_name",
        cellRendererFramework: (params) => {
          return <Avatar alt={params?.value} src={params?.data?.rank_image} />;
        },
      },
      {
        headerName: "Rank",
        field: "rank_name",
      },
      {
        headerName: "Program name ",
        field: "programName",
      },
      {
        headerName: "Days to ready",
        field: "day_to_ready",
      },
      {
        headerName: "Created",
        field: "createdAt",
        cellRendererFramework: (params) => {
          return <span>{moment(params.value).format("MM/DD/YYYY")}</span>;
        },
      },
      {
        headerName: "Manage",
        cellRendererFramework: (params) => {
          return (
            <div>
              <EditDeleteRank params={params} openAlert={this.RankOnAction} />
            </div>
          );
        },
      },
    ],
    getRowHeight: function (params) {
      return 50;
    },
  };

  componentDidMount() {
    this.props.GET_RANK_BY_STUDENT_ID();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.getRankByStudentId !== this.props.getRankByStudentId) {
      this.setState({
        rowData: this.props.getRankByStudentId,
        loading: false,
      });
    }
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column);
    var modelObj = null;
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val,
      };
    }
    filter.setModel(modelObj);
    this.gridApi.onFilterChanged();
  };

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        pageSize: val,
      });
    }
  };
  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
    this.setState({
      searchVal: val,
    });
  };

  handleDeleteStudent = () => {
    const studentIds = this.state.checkboxSelectionIds;
    this.props.STUDENTS_REMOVE(studentIds);
  };

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    let checkboxSelectionIds = [];
    selectedRows.forEach(function (selectedRow, index) {
      let paymentslistobject = selectedRow["_id"];
      checkboxSelectionIds.push(paymentslistobject);
    });

    this.setState({ checkboxSelectionIds: checkboxSelectionIds });
  }

  RankOnAction = (rank) => {
    this.setState({ ...this.state, actionOnRank: rank, sweetAlert: true });
  };

  ConFirmDelete = () => {
    this.props.RANK_REMOVE_OF_STUDENT_ID(this.state?.actionOnRank?._id);
    this.setState({ sweetAlert: false });
  };

  render() {
    const { rowData, columnDefs, defaultColDef, pageSize } = this.state;
    return (
      <React.Fragment>
        <SweetAlert
          title="Are you sure?"
          warning
          show={this.state.sweetAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="danger"
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          onConfirm={this.ConFirmDelete}
          onCancel={() => {
            this.setState({ ...this.state, sweetAlert: false });
          }}
        >
          You won't be able to revert this!
        </SweetAlert>
        <Row className="app-user-list">
          <Col sm="12">
            <CardBody style={{ padding: "0.5rem 1rem" }}>
              <div className="ag-theme-material ag-grid-table">
                <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                  <div className="sort-dropdown">
                    <UncontrolledDropdown className="ag-dropdown p-1">
                      <DropdownToggle tag="div">
                        1 - {pageSize} of 150
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(150)}
                        >
                          150
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="filter-actions d-flex">
                      <Input
                        className="mr-1"
                        type="text"
                        placeholder="search..."
                        onChange={(e) => this.updateSearchQuery(e.target.value)}
                        value={this.state.searchVal}
                      />
                    </div>
                    <AddRank />
                  </div>
                </div>
                {!this.state.loading ? (
                  <>
                    {this.state.rowData !== null ? (
                      <ContextLayout.Consumer>
                        {(context) => (
                          <AgGridReact
                            gridOptions={{}}
                            rowSelection="multiple"
                            defaultColDef={defaultColDef}
                            columnDefs={columnDefs}
                            rowData={rowData}
                            onGridReady={this.onGridReady}
                            colResizeDefault={"shift"}
                            animateRows={true}
                            pagination={true}
                            pivotPanelShow="always"
                            paginationPageSize={pageSize}
                            resizable={true}
                            getRowHeight={this.state.getRowHeight}
                            enableRtl={context.state.direction === "rtl"}
                            onSelectionChanged={this.onSelectionChanged.bind(
                              this
                            )}
                          />
                        )}
                      </ContextLayout.Consumer>
                    ) : null}
                  </>
                ) : (
                  <div id="loading-bar">
                    <Spinner loading={true} />
                  </div>
                )}
              </div>
            </CardBody>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getRankByStudentId: state.student.getRankByStudentId,
  };
};

export default connect(mapStateToProps, {
  GET_RANK_BY_STUDENT_ID,
  RANK_REMOVE_OF_STUDENT_ID,
})(UsersLists);
