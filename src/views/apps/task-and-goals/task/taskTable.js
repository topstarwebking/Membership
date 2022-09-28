import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Card, CardContent, IconButton, Typography } from "@material-ui/core";
import { columns } from "./Tablecells/column";
import { today_columns } from "./Tablecells/todayColumns";
import { DeleteForever } from "@material-ui/icons";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import NoDataImage from "../../../../assets/img/nodatafound.png";
import { GET_TASK_FOLDER_LIST } from "../../../../redux/actions/task-and-goals/task";

const customStyles = {
  title: {
    style: {
      fontWeight: "900",
    },
  },
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
};
const toastCSS = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};

const Tasktable = (props) => {
  const { taskFolderList, taskToDisplayToUser, breadCrumbValue } = props;
  const [listOftask, setListOfTask] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  const [todayBol, setTodayBol] = useState(false);
  const { featureType, filtertype, otherFilter } = useParams();

  useEffect(() => {
    setListOfTask(taskFolderList);
  }, [taskFolderList]);

  const filterTaskByStatus = async () => {
    let afterFilter = await taskFolderList[0]?.subFolder?.task?.filter(
      (item) => item?.status === filtertype || item?.priority === filtertype
    );
    setListOfTask(afterFilter);
  };

  useEffect(() => {
    if (filtertype !== "all") {
      filterTaskByStatus();
    }
  }, [filtertype]);

  useEffect(() => {
    const { subFolderName } = breadCrumbValue[0];
    if (subFolderName) {
      setTodayBol(true);
    }
  }, [breadCrumbValue]);

  const handleSelectRows = (state) => {
    setSelectedState(state);
  };

  const columnsFilter = () => {
    return todayBol ? columns : today_columns;
  };

  const deleteRows = () => {
    let idsToDelete = selectedState?.selectedRows?.map((value) => value._id);
    let afterdelete = listOftask?.filter(
      (item) => !idsToDelete.includes(item?._id)
    );
    setListOfTask(afterdelete);
    setSelectedState({});
    toast.info("Tasks has been deleted !", toastCSS());
  };

  return (
    <Card className="rounded">
      <CardContent>
        {selectedState?.selectedCount && (
          <div className="d-flex justify-content-end align-items-center">
            <Typography className="mb-0">
              Selected Rows {selectedState?.selectedCount}
            </Typography>

            <IconButton className="rounded-circle" onClick={deleteRows}>
              <DeleteForever />
            </IconButton>
          </div>
        )}
        {taskToDisplayToUser?.length === 0 ?
          <center>
            <img
              src={NoDataImage}
              height="160px"
              alt="No Task for Today"
            />
            <b />
            <h4>No Task for Today!</h4>
          </center> :
          <DataTable
            columns={columnsFilter()}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[30, 50, 100]}
            data={taskToDisplayToUser}
            noHeader
            defaultSortAsc={false}
            pagination
            selectableRows
            onSelectedRowsChange={handleSelectRows}
            highlightOnHover
            defaultSortDirection={"asc"}
            defaultSortField="name"
            sortIcon={<ArrowDownwardIcon />}
            customStyles={customStyles}
            taskFolderList={taskFolderList}
          />

        }

      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    taskFolderList: state?.TaskAndGoalsTaskReducer?.taskFolderList,
    taskToDisplayToUser: state?.TaskAndGoalsTaskReducer?.taskToDisplayToUser,
    breadCrumbValue: state?.TaskAndGoalsTaskReducer?.breadCrumbValue,
  };
};
export default connect(mapStateToProps, { GET_TASK_FOLDER_LIST })(Tasktable);
