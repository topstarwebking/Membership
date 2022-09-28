import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
  CardHeader,
  Modal,
  ModalBody,
} from "reactstrap";
import {
  GET_PROGRAM_LIST,
  DELETE_PROGRAM_CATEGORY,
} from "../../../../../redux/actions/programe";
import SweetAlert from "react-bootstrap-sweetalert";
import { connect } from "react-redux";
import AddSubUser from "./subCategoryModal";
import "../../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../../assets/scss/pages/users.scss";
import CreateCategoryForm from "../createCategory";
import NoDataImage from "../../../../../assets/img/nodatafound.png";
import EditandDeletCategrory from "./EditandDeletCategrory";
import { Table, TableCell, TableBody, TableRow } from "@material-ui/core";

const ListProgramCategory = (props) => {
  const { GET_PROGRAM_LIST, DELETE_PROGRAM_CATEGORY } = props;
  const [state, setstate] = useState({
    anchorEl: null,
    modalOpen: false,
    editCategoryStatus: false,
    editCategory: {},
    rowData: null,
    CategoryIdManage: null,
    defaultAlert: false,
    send: false,
    collapse: true,
  });

  const handleCancel = () => {
    setstate({ ...state, defaultAlert: false });
  };
  const UpdateCategory = (data) => {
    setstate({
      ...state,
      modalOpen: true,
      editCategoryStatus: true,
      editCategory: data,
    });
  };

  const toggleModal = () => {
    setstate({ ...state, modalOpen: !state.modalOpen });
  };
  useEffect(() => {
    GET_PROGRAM_LIST();
  }, [GET_PROGRAM_LIST]);

  const ConFirmDelete = () => {
    let { program, selectPName, handleSelectProgram } = props;
    DELETE_PROGRAM_CATEGORY(state.CategoryIdManage);
    let getSelectProgram = program.programList.filter(
      (item) => item.programName === selectPName
    )[0];
    handleSelectProgram(
      getSelectProgram?.program_category,
      getSelectProgram?.program_rank,
      getSelectProgram?.programName
    );
    setstate({ ...state, defaultAlert: false, actionFolder: null });
  };
  const DeleteCategory = (id) => {
    setstate({
      ...state,
      defaultAlert: !state.defaultAlert,
      CategoryIdManage: id,
    });
  };
  return (
    <div>
      <Row className="app-user-list">
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5 style={{ fontSize: "20px" }}>Categories</h5>
            </CardHeader>
            <CardBody>
              <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                <div className="sort-dropdown">
                  <AddSubUser />
                </div>
                <div className="filter-actions d-flex">
                  <Input
                    className="w-70 mr-1 mb-1 mb-sm-0"
                    type="text"
                    placeholder="Search..."
                    //  onChange={(e) => this.updateSearchQuery(e.target.value)}
                    // value={this.state.searchVal}
                  />
                </div>
              </div>
              {props?.ListselectedProgramCategory?.length ? (
                <Table>
                  <TableRow>
                    <TableCell style={{ padding: "0.5em" }}>
                      <b>Program</b>
                    </TableCell>
                    <TableCell style={{ padding: "0.5em" }}>
                      <b>Category</b>
                    </TableCell>
                    <TableCell style={{ padding: "0.5em" }}>
                      <b>Manage</b>
                    </TableCell>
                  </TableRow>
                  <TableBody>
                    {props?.ListselectedProgramCategory?.length > 0
                      ? props?.ListselectedProgramCategory?.map((item, i) => {
                          return (
                            <TableRow key={item?._id}>
                              <TableCell style={{ padding: "0.5em" }}>
                                {item?.programName}
                              </TableCell>
                              <TableCell style={{ padding: "0.5em" }}>
                                {item?.category}
                              </TableCell>
                              <TableCell style={{ padding: "0.5em" }}>
                                <EditandDeletCategrory
                                  OpenAlert={DeleteCategory}
                                  item={item}
                                  toggleModal={toggleModal}
                                  UpdateCategory={UpdateCategory}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })
                      : null}
                  </TableBody>
                </Table>
              ) : (
                <center>
                  <img
                    src={NoDataImage}
                    height="160px"
                    alt="No category found"
                  />
                  <b />
                  <h4>No Program Category Found !</h4>
                </center>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <SweetAlert
        title="Are you sure?"
        warning
        show={state?.defaultAlert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={ConFirmDelete}
        onCancel={() => {
          handleCancel();
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
      <Modal
        isOpen={state.modalOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
      >
        <ModalBody>
          <CreateCategoryForm
            toggleModal={toggleModal}
            editCategoryStatus={state.editCategoryStatus}
            editCategory={state.editCategory}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    program: state.program,
  };
};
export default connect(mapStateToProps, {
  DELETE_PROGRAM_CATEGORY,
  GET_PROGRAM_LIST,
})(ListProgramCategory);
