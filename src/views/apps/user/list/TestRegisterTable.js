import { Avatar, Chip } from "@material-ui/core";
import { ArrowDown } from "react-feather";
import React, { Fragment, useEffect } from "react";
import {
  GET_REGISTERED_FOR_TEST,
  SELECT_STUDENTID_FOR_PRAMOTE,
  SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
} from "../../../../redux/actions/test";
import DataTable from "react-data-table-component";
import moment from "moment";
import { GET_PROGRAM_LIST } from "../../../../redux/actions/programe";
import "react-toastify/dist/ReactToastify.css";
import RankDetails from "../../../../utilities/logic/rankDetails";
import { connect } from "react-redux";
import ActionForEyemodal from "./ActionForEyemodal";
import { RowSkeleton } from "./components/studentTable";
import { useHistory, useParams } from "react-router-dom";
import TestPaper from "./testData";
import dataNotFoundImage from "../../../../assets/img/not_found.jpg";

const customStyles = {
  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#4F4F4F",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  },
  columnsCell: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#4F4F4F",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  },
  // ".gKsGGb": {
  //   minWidth: "30px !important",
  //   background: "red",
  // },
};
const UsersList = (props) => {
  const history = useHistory();
  const {
    activeEvent,
    registeredTestList,
    GET_REGISTERED_FOR_TEST,
    GET_PROGRAM_LIST,
    SELECT_STUDENTID_FOR_PRAMOTE,
    SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
  } = props;


  useEffect(() => {
    GET_REGISTERED_FOR_TEST(activeEvent?._id);
    GET_PROGRAM_LIST();
  }, [activeEvent?._id]);

  const getAllIds = (data) => {
    let ids = [];
    for (let item of data) {
      ids.push(item?._id);
    }
    return ids;
  };
  const getitems = (data) => {
    let items = [];
    for (let item of data) {
      items.push(modifyPayloadPramote(item));
    }
    return items;
  };
  const handleSelectRows = async (state) => {
    let _ids = await getAllIds(state.selectedRows);
    let studentForprammote = await getitems(state?.selectedRows);
    await SELECT_STUDENT_FOR_TEST_OR_RECOMAND(_ids);
    await SELECT_STUDENTID_FOR_PRAMOTE(studentForprammote);
  };
  const handlePageChange = (page) => {
    history.memberpage = page;
  };
  const handlePageRowChange = (rowCount) => {
    history.memberrowCount = rowCount;
  };
  const modifyPayloadPramote = (item) => {
    return RankDetails.getRankDetails(props?.programList, item);
  };
  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.firstName,
      sortable: true,
      width: "150px",
      style: {
        display: "flex",
        justifyContent: "flex-start",
      },
      cell: (row) => (
        <div>
          <span
            className="text-capitalize"
            style={{ paddingLeft: "0.8" }}
          >{`${row.firstName} ${row.lastName}`}</span>
        </div>
      ),
    },
    {
      selector: (row) => row.program,
      name: "Program",
      sortable: true,
      width: 130,
      style: {
        display: "flex",
        justifyContent: "center",
      },
    },
    {
      selector: (row) => row.current_rank_img,
      name: "Rank",
      sortable: true,
      width: 130,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      cell: (row) => {
        return (
          <>
            <Avatar
              style={{
                height: "2em",
                widht: "2em",
                margin: "0px",
                objectFit: "contain !importent",
              }}
              src={row?.current_rank_img}
            />
          </>
        );
      },
    },
    {
      selector: (row) => row.next_rank_img,
      name: "Next Rank",
      sortable: true,
      width: 130,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      cell: (row) => {
        return (
          <>
            <Avatar
              style={{
                height: "2em",
                widht: "2em",
                margin: "0px",
                objectFit: "contain !importent",
              }}
              src={row?.next_rank_img}
            />
          </>
        );
      },
    },
    {
      selector: (row) => row.lastPromotedDate,
      name: "Last Promoted",
      sortable: true,
      width: 160,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      cell: (row) => {
        return (
          <>
            <span>{moment(row?.lastPromotedDate).format("MM/DD/YYYY")}</span>
          </>
        );
      },
    },
    {
      selector: (row) => row.method,
      name: "Status",
      sortable: true,
      width: 100,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      cell: (row) => {
        return (
          <>
            <TestPaper studentData={row} selectedrow={props.selectedrow} />
          </>
        );
      },
    },

    {
      selector: (row) => row.Action,
      name: "Action",
      sortable: false,
      width: 200,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      cell: (row) => {
        return (
          <>
            <ActionForEyemodal item={row?.studentId} />
          </>
        );
      },
    },
  ];
  return (
    <Fragment>
      <div className="card m-0">
        <div>
          {registeredTestList === null ? (
            [1, 2, 3, 4, 5].map((i) => {
              return <RowSkeleton key={i} />;
            })
          ) : (
            <div>
              {!registeredTestList?.data || registeredTestList?.data?.length === 0 ? <img src={dataNotFoundImage} style={{ width: "200px", display: "block", margin: "auto" }} /> : null}

              <DataTable
                responsive={true}
                columns={columns}
                paginationPerPage={5}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePageRowChange}
                paginationRowsPerPageOptions={[5, 10, 50, 100, 150]}
                data={registeredTestList?.data || []}
                noHeader
                defaultSortDirection={"asc"}
                defaultSortField="firstName"
                defaultSortAsc={true}
                pagination
                sortIcon={<ArrowDown style={{ color: "#bababa" }} />}
                selectableRows
                onSelectedRowsChange={handleSelectRows}
                highlightOnHover
                customStyles={customStyles}
              />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activeEvent: state.appointmentAndEvent.selectedEvent,
    registeredTestList: state.test.registeredTestList,
    programList: state.program.programList,
    SelectedTestToRecommand: state.test.SelectedTestToRecommand,
    selectstudentforpramote: state.test.selectstudentforpramote,
  };
};

export default connect(mapStateToProps, {
  GET_REGISTERED_FOR_TEST,
  SELECT_STUDENTID_FOR_PRAMOTE,
  SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
  GET_PROGRAM_LIST,
})(UsersList);
