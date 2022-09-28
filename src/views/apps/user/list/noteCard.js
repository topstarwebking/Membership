import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { DELETE_NOTE_BY_STUDENTID } from "../../../../redux/actions/newstudent";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import EditNoteModal from "./editNoteModal";
import EditDeletNote from "./EditDeletNote";
import { ArrowDown } from "react-feather";
import moment from "moment";
import DataTable from "react-data-table-component";
import { Button, Chip } from "@material-ui/core";
import NoRankSvg from "../../../../assets/img/not_found.jpg";

const customStyles = {
  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#4F4F4F",
      width: "100%",
      display: "flex",
      justifyContent: "start",
      backgroundColor: "#eaf4fe",
    },
  },
  columnsCell: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#4F4F4F",
      width: "100%",
      display: "flex",
      justifyContent: "start",
    },
  },
};
const NoteCard = (props) => {
  const { NotesByStudentId, studentType, tillDate } = props;
  const [note, setnote] = useState(null);
  const [defaultAlert, setDefaultAlert] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const [id, setId] = useState("");
  
  const ConFirmDelete = (note) => {
    props.DELETE_NOTE_BY_STUDENTID(note, studentType, tillDate, note.noteType, props.studentInfo?._id);
    setDefaultAlert(false);
  };
  const handleDefalt = (item) => {
    setDefaultAlert(true);
    setnote(item);
  };
  const toggleReadMore = (Id) => {
    setIsReadMore(!isReadMore);
    if (Id === id) {
      setId("");
    } else {
      setId(Id);
    }
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => row.Date,
      sortable: false,
      cell: (params) => {
        return (
          <>
            <span>{moment(params?.date).format("MM/DD/YYYY")}</span>
          </>
        );
      },
    },
    {
      selector: (row) => row.noteType,
      name: "Note Type",
      sortable: true,
    },

    {
      selector: (row) => row.followupType,
      name: "Followup",
      sortable: true,
    },
    {
      selector: (row) => row.Note,
      name: "Note",
      sortable: true,
      cell: (params) => {
        return (
          <>
            <div className="text">
              {params?.note.length > 100 ? (
                <>
                  {id === params?._id
                    ? params?.note
                    : params?.note.slice(0, 50)}
                  <Chip
                    variant="outlined"
                    onClick={() => {
                      toggleReadMore(params?._id);
                    }}
                    style={{
                      color: id === params?._id ? "#e10020" : "#00a6e1",
                      height: "15px",
                    }}
                    size="small"
                    label={id === params?._id ? " show less" : "read more"}
                  />
                </>
              ) : (
                params?.note
              )}
            </div>
          </>
        );
      },
    },
    {
      field: "Action",
      name: "Action",
      sortable: false,
      disableClickEventBubbling: true,
      cell: (params) => {
        return (
          <>
            <EditDeletNote
              OpenAlert={handleDefalt}
              item={params}
              
              EditNoteModal={<EditNoteModal note={params}></EditNoteModal>}
            />
          </>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          overflowX: "hidden !important",
        }}
      >
        {NotesByStudentId.length > 0 ? (
          <DataTable
            responsive={true}
            columns={columns}
            data={NotesByStudentId || []}
            noHeader
            defaultSortDirection={"asc"}
            defaultSortField="firstName"
            defaultSortAsc={true}
            pagination
            sortIcon={<ArrowDown style={{ color: "#bababa" }} />}
            highlightOnHover
            customStyles={customStyles}
          />
        ) : (
          <div className="d-flex justify-content-center mt-5 pt-1">
           <div className="align-self-center">
              <img src={NoRankSvg} height="160px" alt="No rank found" />
              <b />
              <h4>No Record Found !</h4>
          </div>
          </div>
        )}
      </div>
      <SweetAlert
        title="Are you sure?"
        warning
        show={defaultAlert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={() => {
          ConFirmDelete(note);
        }}
        onCancel={() => {
          setDefaultAlert(false);
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
    </Fragment>
  );
};

export default connect(null, { DELETE_NOTE_BY_STUDENTID })(NoteCard);
