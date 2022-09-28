import {
  FETCH_TEST_LIST,
  DELETE_TEST_DATA,
  SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
  SELECT_STUDENT_FOR_REGESTER,
} from "../../../../redux/actions/test";
import TestPaper from "./testData";
import ActionForEyemodal from "./ActionForEyemodal";
import { Avatar } from "@material-ui/core";
import { ArrowDown } from "react-feather";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { RowSkeleton } from "./components/studentTable";
import { useHistory, useParams } from "react-router-dom";
import ConfirmationModal from "../../../../components/gloabal/confirmation";
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
  ".gKsGGb": {
    minWidth: "30px !important",
    background: "red",
  },
};
const UsersList = (props) => {
  const history = useHistory();
  const [defaultAlert, setdefaultAlert] = useState(false);
  const [defaultAlert2, setdefaultAlert2] = useState(false);
  const [studentid, setstudentid] = useState(null);
  const [pending, setPending] = React.useState(true);

  const {
    activeEvent,
    testList,
    FETCH_TEST_LIST,
    DELETE_TEST_DATA,
    SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
    SelectedTestToRecommand,
    SELECT_STUDENT_FOR_REGESTER,
  } = props;
  const getAllIds = (data) => {
    let ids = [];
    for (let item of data) {
      ids.push(item?._id);
    }
    return ids;
  };

  useEffect(() => {
      FETCH_TEST_LIST(activeEvent?._id);
  }, [activeEvent?._id]);
  const handleSelectRows = async (state) => {
    let _ids = await getAllIds(state.selectedRows);
    let studnetforregiser = await filterpayload(state?.selectedRows);
    await SELECT_STUDENT_FOR_TEST_OR_RECOMAND(_ids);
    await SELECT_STUDENT_FOR_REGESTER(studnetforregiser);
  };

  const filterpayload = (data) => {
    const list = [];
    for (let item of data) {
      // console.log(data)
      let payload = {
        studentId: item?.studentId?._id,
        firstName: item?.firstName,
        lastName: item?.lastName,
        rating: 0,
        current_rank_img: item?.current_rank_img,
        next_rank_img: item?.next_rank_img,
        next_rank_name: item?.next_rank_name,
        memberprofileImage: item?.memberprofileImage,
        primaryPhone: item?.phone,
        program: item?.program,
        current_rank_name: item?.current_rank_name,
        userId: item?.userId,
        isPaid: false,
      };
      list.push(payload);
    }
    return list;
  };
  const handeleAlert = () => {
    setdefaultAlert(false);
  };
  const handlePageChange = (page) => {
    history.memberpage = page;
  };
  const handlePageRowChange = (rowCount) => {
    history.memberrowCount = rowCount;
  };
  const ConFirmDelete = () => {
    DELETE_TEST_DATA(SelectedTestToRecommand, activeEvent?._id);
    setdefaultAlert(false);
  };
  const ConFirmDeleteSingelstudent = () => {
    DELETE_TEST_DATA([studentid], activeEvent?._id);
    setdefaultAlert2(false);
  };
  useEffect(() => {
    if (props.testList !== null) {
      setPending(false);
    }
  }, []);
  // console.log(props.selectedrow)
  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.firstNae,
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
      selector: (row) => row.currentrnk_img,
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
      selector: (row) => row.next_rakimg,
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
      selector: (row) => row.lastProoedDate,
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
      name: "Status",
      sortable: false,
      width: 100,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      cell: (row) => {
        return (
          <>
            <TestPaper studentData={row} selectedrow={props.selectedrow}/>
          </>
        );
      },
    },
    {
      selector: (row) => row.Action,
      name: "Action",
      sortable: false,
      width: 100,
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
          {testList === null ? (
            [1, 2, 3, 4, 5].map((i) => {
              return <RowSkeleton key={i} />;
            })
          ) : (
            <div>
            {!testList?.data || testList?.data?.length===0 ? <img src={dataNotFoundImage} style={{width:"200px",display:"block",margin:"auto"}}/>:null}
         
            <DataTable
              pageSize={5}
              responsive={true}
              columns={columns}
              paginationPerPage={5}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePageRowChange}
              paginationRowsPerPageOptions={[5, 10, 50, 100, 150]}
              data={testList?.data || []}
              noHeader
              defaultSortDirection={"asc"}
              defaultSortField="firstName"
              defaultSortAsc={true}
              pagination
              sortIcon={<ArrowDown style={{ color: "#bababa" }} />}
              selectableRows
              selectedrow={props.selectedrow}
              onSelectedRowsChange={handleSelectRows}
              highlightOnHover
              customStyles={customStyles}
            />
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={defaultAlert}
        title="Delete Location?"
        onConfirm={() => {
          ConFirmDelete(studentid);
        }}
        onCancel={() => {
          setdefaultAlert(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you want to Delete it ?"
      />
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={defaultAlert2}
        title="Delete Location?"
        onConfirm={() => {
          ConFirmDeleteSingelstudent();
        }}
        onCancel={handeleAlert}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you want to Delete it ?"
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activeEvent: state.appointmentAndEvent.selectedEvent,
    testList: state.test.testList,
    SelectedTestToRecommand: state.test.SelectedTestToRecommand,
    selectstudentforpramote: state.test.selectstudentforpramote,
  };
};

export default connect(mapStateToProps, {
  FETCH_TEST_LIST,
  DELETE_TEST_DATA,
  SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
  SELECT_STUDENT_FOR_REGESTER,
})(UsersList);
