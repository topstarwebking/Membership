import { Card } from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import {
  GET_EXPENSES_LIST_FOR_ADMIN,
  DELETE_EXPANSES_FOR_ADMIN,
} from "../../../../../../redux/actions/mymoney";
import EditDeletexpence from "./EditDeletexpence";
import { DataGrid } from "@material-ui/data-grid";
import AddExpence from "./AddExpence";
import ConfirmationModal from "../../../../../../components/gloabal/confirmation";

const LeadTrackingandaftercamp = (props) => {
  const {
    GET_EXPENSES_LIST_FOR_ADMIN,
    getexpenseCategoryListforAdmin,
    DELETE_EXPANSES_FOR_ADMIN,
  } = props;
  const [Id, setId] = React.useState(null);
  const [defaltAlert, setdefaultAlert] = React.useState(false);
  const columns = [
    {
      field: "expense_category_type",
      headerName: "Category Name",
      filter: false,
      sortable: false,
      disableColumnMenu: true,
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      filter: false,
      sortable: false,
      disableColumnMenu: true,
      width: 200,

      renderCell: (params) => {
        return (
          <>
            <span>{moment(params.row?.createdAt).format("MM/DD/YYYY")}</span>
          </>
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      filter: false,
      sortable: false,
      disableColumnMenu: true,
      width: 200,

      renderCell: (params) => {
        return (
          <>
            <span>
              <EditDeletexpence
                opentAlert={opentAlert}
                item={params?.row}
                EditFolder={<AddExpence IsEdit={true} item={params?.row} />}
              />
            </span>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    GET_EXPENSES_LIST_FOR_ADMIN();
  }, [GET_EXPENSES_LIST_FOR_ADMIN]);

  const opentAlert = (id) => {
    setId(id);
    setdefaultAlert(true);
  };
  const HandleDelete = () => {
    DELETE_EXPANSES_FOR_ADMIN(Id);
    setdefaultAlert(false);
  };
  return (
    <div style={{ height: "80vh" }}>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="d-flex justify-content-between">
            <div>Expense</div> <AddExpence />
          </div>
        </Col>
        <Col lg={5} md={4} sm={12}>
          <Card
            style={{
              height: 630,
              width: "100%",
              overflowX: "hidden !important",
            }}
          >
            <DataGrid
              rows={getexpenseCategoryListforAdmin || []}
              columns={columns}
              getRowId={(row) => row._id}
              disableSelectionOnClick
            />
          </Card>
        </Col>
      </Row>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={defaltAlert}
        title="Delete file ?"
        onConfirm={HandleDelete}
        onCancel={() => {
          setdefaultAlert(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you want to delete?"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getexpenseCategoryListforAdmin:
      state.adminFinance?.getexpenseCategoryListforAdmin,
  };
};
export default connect(mapStateToProps, {
  GET_EXPENSES_LIST_FOR_ADMIN,
  DELETE_EXPANSES_FOR_ADMIN,
})(LeadTrackingandaftercamp);
