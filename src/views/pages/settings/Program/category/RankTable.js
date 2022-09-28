import React, { Fragment, useState } from "react";
import { Card, CardBody, Input, Row, Col, CardHeader, Table } from "reactstrap";
import {
  DELETE_PROGRAM_RANK,
  GET_PROGRAM_LIST,
} from "../../../../../redux/actions/programe";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import AddNewProgramRank from "./addnewProgramRank";
import "../../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../../assets/scss/pages/users.scss";
import NoRankSvg from "../../../../../assets/img/not_found.jpg";
import {
  Avatar,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import EditAndDeleteRank from "./EditAndDeleteRank";

export const ListProgramRank = (props) => {
  const [state, setstate] = useState({
    modalOpen: false,
    editRankStatus: false,
    editRank: {
      programName: "",
      rank_order: "",
      day_to_ready: "",
      lession_to_ready: "",
      rank_name: "",
      rank_image: "",
      programId: "",
    },
    rankIdManage: null,
    defaultAlert: false,
    rowData: null,
    pageSize: 10,
    isVisible: true,
    reload: false,
    collapse: true,
    status: "Opened",
    role: "All",
    selectStatus: "All",
    verified: "All",
    department: "All",
    defaultColDef: {
      resizable: true,
      editable: false,
      sortable: true,
      flex: 1,
    },
    searchVal: "",
  });
  const { ListselectedProgramRank } = props;

  const toggleModal = () => {
    setstate({ ...state, modalOpen: !state.modalOpen });
  };
  const toggleModal2 = (item) => {
    setstate({
      ...state,
      modalOpen: !state.modalOpen,
      editRank: item,
      editRankStatus: true,
    });
  };
  const ConFirmDelete = (action) => {
    let {
      program,
      selectPName,
      handleSelectProgram,
      GET_PROGRAM_LIST,
      DELETE_PROGRAM_RANK,
    } = props;
    if (action === "confirmAlert") {
      DELETE_PROGRAM_RANK(state.rankIdManage);
      GET_PROGRAM_LIST();
      let getSelectProgram = program.programList.filter(
        (item) => item.programName === selectPName
      )[0];
      handleSelectProgram(
        getSelectProgram?.program_category,
        getSelectProgram?.program_rank,
        getSelectProgram?.programName
      );
    }
    setstate({ ...state, defaultAlert: false, actionFolder: null });
  };
  const handleCancel = () => {
    setstate({ ...state, defaultAlert: false });
  };
  const DeleteRank = (type, id) => {
    if (type === "delete")
      setstate({ ...state, defaultAlert: true, rankIdManage: id });
  };
  // const updateSearchQuery = (val) => {
  //   gridApi.setQuickFilter(val);
  //   setstate({
  //     searchVal: val,
  //   });
  // };
  const UpdateRank = (data) => {
    let {
      programName,
      rank_order,
      day_to_ready,
      lession_to_ready,
      rank_name,
      rank_image,
      _id,
    } = data;
    let er = {
      programName: programName,
      rank_order: rank_order,
      day_to_ready: day_to_ready,
      lession_to_ready: lession_to_ready,
      rank_name: rank_name,
      rank_image: rank_image,
      programId: _id,
    };
    setstate({
      modalOpen: true,
      editRankStatus: true,
      editRank: er,
    });
  };
  return (
    <Fragment>
      <Row className="app-user-list">
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5 style={{ fontSize: "20px" }}>Ranks</h5>
              <div className="sort-dropdown">
                <AddNewProgramRank
                  modalOpen={state.modalOpen}
                  toggleModal={toggleModal}
                  editRankStatus={state.editRankStatus}
                  editRank={state.editRank}
                />
              </div>
            </CardHeader>
            <CardBody>
              <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                <div className="filter-actions d-flex">
                  {/* <Input
                    className="w-70 mr-1 mb-1 mb-sm-0 px-2"
                    type="text"
                    placeholder="search..."
                    // onChange={(e) => updateSearchQuery(e.target.value)}
                    // value={state.searchVal}
                  /> */}
                </div>
              </div>
              {ListselectedProgramRank === undefined ? (
                <div>
                  <center>
                    <img src={NoRankSvg} height="160px" alt="No rank found" />
                    <b />
                    <h4>No Program Rank Found !</h4>
                  </center>
                </div>
              ) : ListselectedProgramRank?.length !== 0 ? (
                <div
                  className="ag-theme-material ag-grid-table"
                  style={{ height: "70vh" }}
                >
                  <Table>
                    <TableHead style={{ backgroundColor: "rgb(234 244 254)" }}>
                      <TableRow>
                        <TableCell
                          style={{ padding: "0.6em", fontSize: "14px" }}
                        >
                          <b>Profile</b>
                        </TableCell>
                        <TableCell
                          style={{ padding: "0.6em", fontSize: "14px" }}
                        >
                          <b> Program</b>
                        </TableCell>
                        <TableCell
                          style={{ padding: "0.6em", fontSize: "14px" }}
                        >
                          <b> Rank Name</b>
                        </TableCell>
                        <TableCell
                          style={{ padding: "0.6em", fontSize: "14px" }}
                        >
                          <b>Day to ready</b>
                        </TableCell>
                        <TableCell
                          style={{ padding: "0.6em", fontSize: "14px" }}
                        >
                          <b> Lession to ready</b>
                        </TableCell>
                        <TableCell
                          style={{ padding: "0.6em", fontSize: "14px" }}
                        >
                          <b> Rank order</b>
                        </TableCell>
                        <TableCell
                          style={{ padding: "0.6em", fontSize: "14px" }}
                        >
                          <b>Manage</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {ListselectedProgramRank !== null
                      ? ListselectedProgramRank.map((item, i) => {
                          return (
                            <TableBody>
                              <TableRow>
                                <TableCell style={{ padding: "0.6em" }}>
                                  <img
                                    src={item?.rank_image}
                                    style={{ width: "44px" }}
                                  />
                                </TableCell>
                                <TableCell
                                  style={{ padding: "0.6em", fontSize: "14px" }}
                                >
                                  {item?.programName}
                                </TableCell>
                                <TableCell
                                  style={{ padding: "0.6em", fontSize: "14px" }}
                                >
                                  {item?.rank_name}
                                </TableCell>
                                <TableCell
                                  style={{ padding: "0.6em", fontSize: "14px" }}
                                >
                                  {item?.day_to_ready}
                                </TableCell>
                                <TableCell
                                  style={{ padding: "0.6em", fontSize: "14px" }}
                                >
                                  {item?.lession_to_ready}
                                </TableCell>
                                <TableCell
                                  style={{ padding: "0.6em", fontSize: "14px" }}
                                >
                                  {item?.rank_order}
                                </TableCell>
                                <TableCell
                                  style={{ padding: "0.6em", fontSize: "14px" }}
                                >
                                  <EditAndDeleteRank
                                    OpenAlert={DeleteRank}
                                    item={item}
                                    toggleModal={toggleModal2}
                                    UpdateCategory={UpdateRank}
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          );
                        })
                      : null}
                  </Table>
                </div>
              ) : (
                <div>
                  <center>
                    <img src={NoRankSvg} width="230px" alt="No rank found" />
                    <b />
                    <h5>No Program Rank Found!</h5>
                  </center>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <SweetAlert
        title="Are you sure?"
        warning
        show={state.defaultAlert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={() => {
          ConFirmDelete("confirmAlert");
        }}
        onCancel={() => {
          handleCancel();
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    program: state.program,
  };
};
export default connect(mapStateToProps, {
  DELETE_PROGRAM_RANK,
  GET_PROGRAM_LIST,
})(ListProgramRank);
