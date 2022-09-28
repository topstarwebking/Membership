import React, { useState, useRef } from "react";
import { Download, Phone, Trash2, X } from "react-feather";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import MergeForm from "../MergeForm";
import CandidateModal from "../CandidateModal";
import TestModal from "../TestModal";
import {
  STUDENTS_REMOVE,
  GET_ACTIVE_STUDENT,
} from "../../../../../redux/actions/newstudent";
import { GET_COUNT_OF_STUDENT_BY_TYPE } from "../../../../../redux/actions/member";
import { GET_CANDIDATE_LIST } from "../../../../../redux/actions/newstudent";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";
import moment from "moment";
import { CSVLink } from "react-csv";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import AddIcon from "@material-ui/icons/Add";
import FloatingLabels from "../../../../../views/pages/shop/testing/TestingMain";
import { Dialog, DialogContent } from "@material-ui/core";

const ActionsOnStudent = (props) => {
  const {
    selectedRows,
    checkboxSelectionIds,
    clearSelect,
    studentType,
    getDataBack,
    listofStudentdata,
  } = props;

  

  const [alertopen, setAlertOpen] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [openProductForm, setOpenProductForm] = useState(false);
  const csvLink = useRef();

  const ConFirmDelete = async () => {
    const res = await props.STUDENTS_REMOVE(checkboxSelectionIds);
    if (res) {
      clearSelect();
      props.GET_COUNT_OF_STUDENT_BY_TYPE();
      getDataBack();
    }
    setAlertOpen(false);
  };

  const handleCancel = () => {
    setAlertOpen(false);
  };
  const handleOpenProductForm = () => {
    setOpenProductForm(!openProductForm);
  };

  const formateDataForExport = () => {
    let csvlist = [];
    for (let row of listofStudentdata) {
      let item = {
        "Full Name": `${row?.firstName}  ${row?.lastName}`,
        DOB: moment(row?.dob).format("MM/DD/YYYY"),
        Age: row?.age,
        "Primary Phone": row?.primaryPhone,
        "Secondary Phone": row?.secondaryNumber,
        Email: row?.email,
        Status: row?.status?.toLowerCase() === "active" ? "Active" : "New",
        Program: row?.program,
        Rank: row?.rank_order,
        "Membership Type":
          row?.membership_details?.slice(-1)[0]?.membership_type ||
          row?.data?.membership_type ||
          "None",
        "Start Date": moment(row?.createdAt).format("MM/DD/YYYY"),
        "End Date": moment(
          row?.membership_details?.slice(-1)[0]?.expiry_date
        ).format("MM/DD/YYYY"),
        Rating: row?.rating,
        Tag: row?.after_camp?.join(),
        State: row?.state,
        Street: row?.street,
        Town: row?.town,
        "Zip Postal Code": row?.zipPostalCode,
        "Complete profile": `https://mymember.com/student-info/${row._id}`,
        Note: row?.notes,
      };

      csvlist.push(item);
    }
    setCsvData(csvlist);
  };

  const downloadCsv = async () => {
    await formateDataForExport();
    csvLink.current.link.click();
  };
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="st-list pl-1">
          <h6>
            Total Members{" "}
            <span className="st-number">
              {props.listofStudentdata?.length || 0}
            </span>
          </h6>
        </div>
        <div className="list-icon d-flex justify-content-end">
          {checkboxSelectionIds.length > 0 ? (
            <>
              <Button
                style={{ color: "#565656" }}
                className="btn-lg  btn waves-effect waves-danger"
                onClick={handleOpenProductForm}
              >
                <LocalMallOutlinedIcon size={20} />
                <br></br>
                Buy
              </Button>
              <Dialog
                fullWidth
                maxWidth="lg"
                open={openProductForm}
                onClose={handleOpenProductForm}
              >
                <div className="close-icon d-flex justify-content-end w-100">
                  <X
                    className="cursor-pointer m-1"
                    size={20}
                    onClick={handleOpenProductForm}
                  />
                </div>
                <DialogContent>
                  <FloatingLabels />
                </DialogContent>
              </Dialog>
            </>
          ) : (
            ""
          )}

          <Link to={`/data-list/add-new-student/${studentType}`}>
            <Button
              style={{ color: "#565656" }}
              className="btn-lg btn waves-effect waves-light"
            >
              <AddIcon size={20} />
              <br></br>
              Add
            </Button>
          </Link>
          <Button
            style={{ color: "#565656" }}
            className="btn-lg  btn waves-effect waves-light"
          >
            <Phone size={20} />
            <br></br>
            Contact
          </Button>
          <CandidateModal
            selectedRows={selectedRows}
            clearSelect={clearSelect}
            gobackData={props.GET_CANDIDATE_LIST}
          />
          <TestModal
            checkboxSelectionIds={checkboxSelectionIds}
            getDataBack={props.getDataBack}
            clearSelect={props.clearSelect}
            onSelectionChanged={props.onSelectionChanged}
          />
          <MergeForm
            data={checkboxSelectionIds}
            isrecommendedOrregistered={"student"}
          />
          <Button
            onClick={downloadCsv}
            style={{ color: "#565656" }}
            className="btn-lg  btn waves-effect waves-light"
          >
            <Download size={20} />
            <br></br>
            Export
          </Button>
          {checkboxSelectionIds.length > 0 ? (
            <Button
              style={{ color: "#565656" }}
              className="btn-lg  btn waves-effect waves-danger"
              onClick={() => {
                setAlertOpen(true);
              }}
            >
              <Trash2 size={20} />
              <br></br>
              Delete
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={alertopen}
        title="Delete Location?"
        onConfirm={ConFirmDelete}
        onCancel={handleCancel}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description="  You won't be able to revert this!"
      />
      <CSVLink
        data={csvData}
        filename={studentType + "_StudentList.csv"}
        className="hidden"
        ref={csvLink}
        target="_blank"
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    active_student: state.student.active_student,
    listofStudentdata: state.student.listofStudentdata,
  };
};

export default connect(mapStateToProps, {
  STUDENTS_REMOVE,
  GET_ACTIVE_STUDENT,
  GET_CANDIDATE_LIST,
  GET_COUNT_OF_STUDENT_BY_TYPE,
})(ActionsOnStudent);
