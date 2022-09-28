import React from "react"
import { Card, CardBody, CardHeader, CardTitle, Input } from "reactstrap"
import AddNewDetails from "./billing/billingModal"
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { GET_STUDENT_FINANCE_INFO, DELETE_STUDENT_FINANCE_INFO } from '../../../redux/actions/billing';
import { ContextLayout } from "../../../utility/context/Layout"
import { AgGridReact } from "ag-grid-react";
import EditDeleteFinance from './EditDeleteFinance'
import NoDataImage from "../../../../src/assets/img/nodatafound.png";


class DataTableFixedHeader extends React.Component {
  state = {
    rowData: [],
    actionOn: {},
    modal: false,
    editCategoryStatus: false,
    editCategory: {},
    defaultAlert: false,
    pageSize: 10,
    collapse: true,
    status: "Opened",
    role: "All",
    defaultColDef: {
      resizable: true,
      flex: 1
    },
    searchVal: "",
    columnDefs: [
      {
        headerName: "Card Holer",
        field: "card_holder_name",

      },
      // {
      //   headerName: "Card type",
      //   field: "card_type",
      // },
      {
        headerName: "Card type",
        field: "card_type",
      },
      // {
      //   headerName: "Card Category",
      //   field: "Credit_card_type",
      // },
      {
        headerName: "Card Number",
        field: "pan",
        cellRendererFramework: () => {
          return (
            <>
              <span>**** **** ****</span>
            </>
          );
        }
      },
      {
        headerName: "CVV",
        field: "cvv",
        cellRendererFramework: () => {
          return (
            <>
              <span>***</span>
            </>
          );
        }
      },
      {
        headerName: "Card Expiry",
        field: "expiry_date",
      },
      // {
      //   headerName: "Expiry year",
      //   field: "expiry_year",
      // },
      {
        headerName: "Action",
        field: "",
        cellRendererFramework: (params) => {
          return (
            <>
              {/* <Trash2
                className="mr-50"
                size={18}
                onClick={() =>
                  this.actionOn('delete', params.data)
                }
              />
              <Edit
                className="mr-50"
                size={18}
                onClick={() =>
                  this.actionOn('edit', params.data)
                }
              /> */}
              <EditDeleteFinance actionOn={this.actionOn} params={params.data} />
            </>
          );
        }
      }
    ],
    getRowHeight: function (params) {
      return 50;
    }
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
  }

  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
    this.setState({
      searchVal: val
    })
  }

  componentDidMount() {
    this.props.GET_STUDENT_FINANCE_INFO();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.getStudentFinanceInfo !== this.props.getStudentFinanceInfo) {

      this.setState({
        rowData: this.props.getStudentFinanceInfo,
        loading: false
      })
    }
  }
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }
  actionOn = (type, item) => {
    if (type === 'delete') {
      this.setState({ actionOn: item, defaultAlert: true })
    } else {
      this.setState({ actionOn: item, modal: true })
    }
  }

  ConFirmDelete = () => {
    this.props.DELETE_STUDENT_FINANCE_INFO(this.state?.actionOn?._id)
    this.setState({ defaultAlert: false })
  }
  render() {
    const { defaultColDef, columnDefs, rowData, pageSize, modal, actionOn } = this.state
    return (
      <div>
        <Card>
          <CardHeader className="d-flex justify-content-between">
            <CardTitle>Finance</CardTitle>
            <div className="d-flex ">
              <div className="filter-actions d-flex">
                <Input
                  className="mr-1"
                  type="text"
                  placeholder="Search..."
                  onChange={e => this.updateSearchQuery(e.target.value)}
                  value={this.state.searchVal}
                />
              </div>
              <AddNewDetails toggleModal={this.toggleModal} modal={modal} actionOn={actionOn} />
            </div>
          </CardHeader>
          <CardBody>
            {
              rowData.length > 0 ? (
                <div className="ag-theme-material ag-grid-table" style={{ height: '70vh' }}>
                  <ContextLayout.Consumer>
                    {context => (
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onGridReady={this.onGridReady}
                        animateRows={false}
                        floatingFilter={false}
                        pagination={true}
                        paginationPageSize={pageSize}
                        resizable={true}
                        getRowHeight={this.state.getRowHeight}
                        enableRtl={context.state.direction === "rtl"}
                      />
                    )}
                  </ContextLayout.Consumer>
                </div>
              ) : (
                <center>
                  <img
                    src={NoDataImage}
                    height="160px"
                    alt="No Data"
                  />
                  <b />
                  <h4>No Data</h4>
                </center>
              )}
          </CardBody>
        </Card>
        <SweetAlert title="Are you sure?"
          warning
          show={this.state.defaultAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="danger"
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          onConfirm={this.ConFirmDelete}
          onCancel={() => { this.setState({ defaultAlert: false }) }}
        >
          You won't be able to revert this!
        </SweetAlert>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    getStudentFinanceInfo: state.billingFinance.getStudentFinanceInfo
  }
}
export default connect(mapStateToProps, { GET_STUDENT_FINANCE_INFO, DELETE_STUDENT_FINANCE_INFO })(DataTableFixedHeader);

