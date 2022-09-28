import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Chip,
  Collapse,
  TablePagination,
  Checkbox,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { CustomInput, Input } from "reactstrap";
import { getStripeList } from "../../../../redux/actions/stripe";
import Updatecandidate from "./Updatecandidate";
import {
  CANDIDATE_REMOVE,
  UPDATE_CANDIDATE_STRIPE,
} from "../../../../redux/actions/newstudent/index";
import NestedTable from "./NestedTable";
import moment from "moment";
import { GET_CANDIDATE_LIST } from "../../../../redux/actions/newstudent/index";
import { RowSkeleton } from "./components/studentTable";
import { SELECT_STUDENT_FOR_CANDIDATE } from "../../../../redux/actions/test";
import StudentlistuserEyeModal from "../../../dashboard1/StudentlistuserEyeModal"
import SaveImg from "../../../../assets/img/pages/save.png"

const useStyles = makeStyles(() => ({
  cardStyle: {
    boxShadow: "0 5px 10px #e4e0e0",
    borderRadius: "8px",
  },
  avtStyle: {
    height: "30px",
    width: "30px",
  },
  inputStyle: {
    height: "3em",
    borderRadius: "0.4em",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
  row: {
    display: "grid",
    gridTemplateColumns: "30% 10% 15% 10% 10% 10% 14%",
    padding: "0px",
  },
  displaybox: {
    padding: "0em",
    display: "flex",
    alignItems: "center",
    fontSize: "0.9em",
    cursor: "pointer",
  },
}));

const CandidateTable = (props) => {
  const classes = useStyles();
  const {
    candidate_list,
    GET_CANDIDATE_LIST,
    CANDIDATE_REMOVE,
    stripeList,
    UPDATE_CANDIDATE_STRIPE,
    SelectStudentForCandidate,
    SELECT_STUDENT_FOR_CANDIDATE,
    handleFilter
  } = props;


  const [collapase, setCollapse] = useState(null);
  const [rowIdWhichIsEnabled, setRowIdWhichIsEnabled] = useState("")
  const [pageNumber, setpageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setloading] = useState(true);


  const handlePagination = (event, value) => {
    setloading(true);
    setpageNumber(value);
    GET_CANDIDATE_LIST(value, rowsPerPage);
    setloading(false);
  };

  const handleOpenCollapse = (id) => {
    if (collapase === id) {
      setCollapse(null);
    } else {
      setCollapse(id);
    }
  };

  useEffect(() => {
    if (candidate_list === null) {
      setloading(true);
    } else {
      setloading(false);
    }
  }, [candidate_list, pageNumber, rowsPerPage]);

  const HandleselecteOne = (e, item) => {
    let { value } = e.target;
    if (SelectStudentForCandidate?.includes(value)) {
      let IdAfterRemove = SelectStudentForCandidate?.filter(
        (id) => id !== value
      );
      SELECT_STUDENT_FOR_CANDIDATE(IdAfterRemove);
    } else {
      SELECT_STUDENT_FOR_CANDIDATE([...SelectStudentForCandidate, value]);
    }
  };

  const handleSelectAll = () => {
    if (SelectStudentForCandidate.length > 0) {
      SELECT_STUDENT_FOR_CANDIDATE([]);
    } else {
      let studentIdfordelete = [];
      for (let item of candidate_list?.data) {
        studentIdfordelete.push(item?._id);
      }
      SELECT_STUDENT_FOR_CANDIDATE(studentIdfordelete);
    }
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value)
    GET_CANDIDATE_LIST(event, event.target.value);
  };

  const stripes = useMemo(() => {
    const val = stripeList?.find((item) => item?.candidate) || [];
    return val?.stripes?.sort((a, b) => parseInt(a.order, 10) - parseInt(b, 10))
  }, [stripeList])

  const lastStripe = useMemo(() => stripes && findLast(stripes, e => e.stripe_name.toLowerCase().includes("stripe")), [stripes])

  return (
    <>
      <Card>
        <div className={classes.divStyle}>
          <div className="pl-1 pr-1 pt-0">
            <div className={`${classes.row}`}>
              <div>
                <Checkbox
                  align="start"
                  checked={SelectStudentForCandidate?.length > 0 ? true : false}
                  onChange={handleSelectAll}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <b>Student</b>
              </div>
              <div className={classes.displaybox} style={{ marginLeft: "-15px", }}>
                <b>Rank</b>
              </div>
              <div className={`${classes.displaybox} mr-2`} style={{ marginLeft: "-10px", }}>
                <b>Recommended</b>
              </div>
              <div className={classes.displaybox}>
                <b>Candidate</b>
              </div>
              <div className={classes.displaybox}>
                <b>Stripe</b>
              </div>
              <div className={classes.displaybox} style={{ marginLeft: "30px" }}>
                <b>Manage</b>
              </div>
              <div className={classes.displaybox} style={{ marginLeft: '50px' }}>
                <b>Action</b>
              </div>
            </div>
            {loading
              ? [1, 2, 3, 4, 5].map((i) => {
                return <RowSkeleton key={i} />;
              })
              : candidate_list?.data?.map((item, i) => {
                return (
                  <div key={i} style={{ borderTop: "1px solid #dddddd" }}>
                    <div className={classes.row}>
                      <div className={`${classes.displaybox}`}>
                        <Checkbox
                          onChange={(e) => HandleselecteOne(e, item)}
                          align="center"
                          inputProps={{ "aria-label": "primary checkbox" }}
                          value={item?._id}
                          checked={
                            SelectStudentForCandidate?.includes(item?._id)
                              ? true
                              : false
                          }
                        />
                        {collapase === "pannel" + i ? (
                          <ExpandLessIcon
                            className="mr-1"
                            onClick={() => handleOpenCollapse("pannel" + i)}
                          />
                        ) : (
                          <ExpandMoreIcon
                            className="mr-1"
                            onClick={() => handleOpenCollapse("pannel" + i)}
                          />
                        )}
                        <Avatar
                          style={{ widht: "2em", height: "2em" }}
                          src={item?.memberprofileImage}
                          alt={item?.firstName}
                        />
                        <span className="m-1">
                          {item?.firstName} {item?.lastName}
                        </span>
                      </div>
                      <div className={classes.displaybox}>
                        <Avatar
                          style={{
                            height: "2em",
                            widht: "2em",
                            marginLeft: "-15px",
                            objectFit: "contain !importent",
                          }}
                          src={item?.current_rank_img}
                          alt={item?.current_rank_name}
                        ></Avatar>
                      </div>
                      <div className={classes.displaybox}>
                        {moment(item?.lastPromotedDate).format("MM/DD/YYYY")}
                      </div>
                      <ChildStripeChange
                        key={item?._id}
                        item={item}
                        i={i}
                        handleFilter={handleFilter}
                        stripeList={stripeList}
                        UPDATE_CANDIDATE_STRIPE={UPDATE_CANDIDATE_STRIPE}
                        CANDIDATE_REMOVE={CANDIDATE_REMOVE}
                        rowIdWhichIsEnabled={rowIdWhichIsEnabled}
                        setRowIdWhichIsEnabled={setRowIdWhichIsEnabled}
                      />
                    </div>
                    <Collapse in={collapase === "pannel" + i}>
                      <div className="p-1">
                        {/* {console.log(item?.stripe_history, "item?.stripe_history")} */}
                        <NestedTable lastStripe={lastStripe} data={item?.stripe_history} selectedItem={item?.joinHistory} />
                      </div>
                    </Collapse>
                  </div>

                );
              })}
            <div className="mr-4">
              <TablePagination
                component="div"
                count={Number(candidate_list?.totalCount) || 0}
                page={pageNumber}
                onPageChange={handlePagination}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage="Rows per page"
                rowsPerPageOptions={[5, 10, 20, 50, 100, 150, 200]}
              />

            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    active_student: state.student.active_student,
    stripeList: state.stripe.stripeList,
    SelectStudentForCandidate: state.test.SelectStudentForCandidate,
    candidate_list: state.student.filter_candidate_data || state.student.candidate_list,
  };
};

export default connect(mapStateToProps, {
  getStripeList,
  CANDIDATE_REMOVE,
  GET_CANDIDATE_LIST,
  UPDATE_CANDIDATE_STRIPE,
  SELECT_STUDENT_FOR_CANDIDATE,
})(CandidateTable);


const ChildStripeChange = (props) => {
  const classes = useStyles();
  const { stripeList, i, item, UPDATE_CANDIDATE_STRIPE, CANDIDATE_REMOVE, rowIdWhichIsEnabled, setRowIdWhichIsEnabled, handleFilter } = props
  const [isDisable, setIsDisable] = useState(!(rowIdWhichIsEnabled === item?._id) || true)
  const [candidateVal, setCandidateVal] = useState(item?.candidate || "")
  const [currStripeVal, setCurrStripeVal] = useState(item?.current_stripe || "Stripe 1")
  const [openPromoteModal, setOpenPromoteModal] = useState(false)
  const [openJoinOrQuit, setOpenJoinOrQuit] = useState(false)
  const [openQuitReasonModal, setOpenQuitReasonModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [quitReason, setQuitReason] = useState("")
  const [notes, setNotes] = useState(false)
  const [isJoinedOrNotJoined, setIsJoinedOrNotJoined] = useState(true)

  useEffect(() => {
    setCurrStripeVal(item?.current_stripe)
  }, [item.current_stripe])

  useEffect(() => {
    if (rowIdWhichIsEnabled !== item?._id) {
      setIsDisable(true)
    }
  }, [item._id, rowIdWhichIsEnabled])


  const stripes = useMemo(() => {
    const val = stripeList?.find((item) => item?.candidate === candidateVal) || [];
    return val?.stripes?.sort((a, b) => parseInt(a.order, 10) - parseInt(b, 10))
  }, [candidateVal, stripeList])

  const currentStripe = useMemo(() => stripes?.find(e => e.stripe_name === currStripeVal), [stripes, currStripeVal])
  const nextStripeIndex = useMemo(() => stripes?.findIndex(e => e.stripe_name === currStripeVal) + 1, [stripes, currStripeVal])
  const nextStripe = stripes && stripes[nextStripeIndex]
  const lastStripe = useMemo(() => stripes && findLast(stripes, e => e.stripe_name.toLowerCase().includes("stripe")), [stripes])

  const handleReasonChange = (e) => {
    setQuitReason(e.target.value)
  }

  const handlePromoteOkay = () => {
    if (isDisable) {
      if (!nextStripe) return
      let payload = {
        studentId: item.studentId,
        candidate: candidateVal,
        current_stripe: nextStripe?.stripe_name,
      }
      updateCandidateStripe(item._id, payload);
      setOpenPromoteModal(false)
    } else {
      let payload = {
        studentId: item.studentId,
        candidate: candidateVal,
        current_stripe: currStripeVal,
      }
      updateCandidateStripe(item._id, payload);
      setOpenPromoteModal(false)
      handleCancelEdit()
    }
  };

  const updateCandidateStripe = async (id, payload) => {
    await UPDATE_CANDIDATE_STRIPE(id, payload)
    handleFilter()
  }

  const handleNotJoin = () => {
    setOpenQuitReasonModal(true)
  }

  const handleQuit = () => {
    let payload = {
      "quite": true,
      "reason": quitReason,
      "current_stripe": currStripeVal,
      "candidate": candidateVal
    }
    updateCandidateStripe(item._id, payload);
    setOpenQuitReasonModal(false)
    setIsJoinedOrNotJoined(true)
  } 

  const handleJoin = () => {
    let payload = {
      "join": true,
      "current_stripe": currStripeVal,
      "candidate": candidateVal
    }
    updateCandidateStripe(item._id, payload);
    setOpenJoinOrQuit(false)
    setIsJoinedOrNotJoined(true)
  }

  const handleEdit = () => {
    setIsDisable(false)
    setRowIdWhichIsEnabled(item._id)
    setIsJoinedOrNotJoined(false)
  };

  const handleCancelEdit = () => {
    setIsDisable(true)
    setRowIdWhichIsEnabled("")
  };

  const handleDeleteOpenModal = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteStudent = () => {
    CANDIDATE_REMOVE([item?._id]);
    setOpenDeleteModal(false);
  };


  return (
    <>
      <div className={classes.displaybox}>
        <CustomInput
          style={{ marginRight: "0.8em" }}
          type="select"
          id="candidate"
          className="candidates"
          name="candidate"
          value={candidateVal}
          disabled={isDisable}
          onChange={(e) => {
            setCandidateVal(e.target.value)
          }}
        >
          {stripeList?.map((stripe) => {
            return (
              <option value={stripe?.candidate} key={stripe?._id}>
                {stripe?.candidate}
              </option>
            );
          })}
        </CustomInput>
      </div>

      <div className={classes.displaybox}>
        <CustomInput
          style={{ marginRight: "0.8em" }}
          required
          type="select"
          id="current_stripe"
          name="current_stripe"
          className="candidates"
          value={currStripeVal}
          disabled={isDisable}
          onChange={(e) => {
            setCurrStripeVal(e.target.value)
          }}
        >
          {
            stripes?.length > 0 ? (
              stripes?.map((stripe) => {
                return (
                  <option
                    value={stripe?.stripe_name}
                    key={stripe?._id}
                  >
                    {stripe?.stripe_name}
                  </option>
                );
              }))
              : <option>Not Selected</option>
          }
        </CustomInput>
      </div>
      <div className={classes.displaybox} style={{ marginLeft: "25px" }}>
        {
          isJoinedOrNotJoined ? item?.joinHistory[item?.joinHistory?.length - 1]?.join ?
            <Chip
              label={<b>Join</b>}
              style={{
                background: "#90EE90",
                color: "#fff",
                paddingLeft: "5px",
                paddingRight: "5px",
                paddingTop: "2px"
              }}
              size="small"
            />
            :
            <Chip
              label={<b>Not Join</b>}
              style={{
                backgroundColor: "rgb(244 113 117 / 29%)", 
                color: "rgb(255 24 24)",
                paddingLeft: "5px",
                paddingRight: "5px",
                paddingTop: "2px"
              }}

              size="small"
            />
            : <Chip
              label={<b>Promote</b>}
              style={{
                background: "rgba(1, 132, 255, 0.15)",
                color: "rgb(1, 132, 255)",
                paddingLeft: "5px",
                paddingRight: "5px",
                paddingTop: "2px"
              }}
              onClick={() => {
                const isLastStripe = currentStripe?._id === lastStripe?._id
                if (isLastStripe) {
                  setOpenJoinOrQuit(true)
                } else {
                  setOpenPromoteModal(true)
                }
                if (item?.joinHistory[item?.joinHistory.length - 1]?.quite) {
                  setNotes(true)
                } else {
                  setNotes(false)
                }
              }}
              size="small"
            />
        }

      </div>

      <div className={classes.displaybox} style={{ marginLeft: "50px" }}>
        <StudentlistuserEyeModal studentId={item?.studentId} />
        <Updatecandidate
          handleEdit={handleEdit}
          handleCancelEdit={handleCancelEdit}
          isDisable={isDisable}
          handleDelete={handleDeleteOpenModal}
        />
      </div>

      <SweetAlert
        title="Are you sure?"
        warning
        show={openDeleteModal}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, Delete"
        cancelBtnText="Cancel"
        onConfirm={handleDeleteStudent}
        onCancel={() => {
          setOpenDeleteModal(false);
        }}
      >
        Are you sure you want to delete?
      </SweetAlert>

      {/* <SweetAlert
        title="Are you sure?"
        warning
        show={openPromoteModal}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, Promote"
        cancelBtnText="Cancel"
        onConfirm={handlePromoteOkay}
        onCancel={() => {
          setOpenPromoteModal(false);
        }}
      >
        Are you sure you want to Promote?
      </SweetAlert> */}

      <Dialog open={openPromoteModal}>
        <div style={{ borderRadius: '50px', width: "300px" }}>
          <div
            onClick={() => setOpenPromoteModal(false)}
            className="p-1"
            style={{ display: "flex", justifyContent: "end", fontSize: "20px", marginTop: "-6px", cursor: "pointer" }}
          >X</div>
          <DialogContent className="candidateTable">
            <div className="w-100">
              <center>
                <img
                  style={{ width: "120px", objectFit: "contain" }}
                  alt="confimation"
                  src={SaveImg}
                />
              </center>
            </div>
            <center>
              <Typography variant="h6">
                <p>Do want to promote <span style={{ fontWeight: "bold" }}> {`${item?.firstName} ${item?.lastName}`}</span> from {currStripeVal} to {nextStripe?.stripe_name}? </p>
              </Typography>
            </center>
            <div className="d-flex justify-content-between align-items-center mt-1 mb-1">
              <Button
                className="rounded btn btn-sm"
                style={{ backgroundColor: "#90EE90", color: "#fff", width: "120px" }}
                onClick={handlePromoteOkay}
              >

                <b>Yes</b>
              </Button>
              <Button
                style={{ backgroundColor: "#F47175", color: "#fff", width: "120px" }}
                className="rounded btn btn-sm "
                onClick={() => setOpenPromoteModal(false)}
              >
                <b>No</b>
              </Button>
            </div>
          </DialogContent>
        </div>
      </Dialog>

      <Dialog open={openJoinOrQuit}>
        <div style={{ borderRadius: '50px', width: "300px" }}>
          <div
            onClick={() => setOpenJoinOrQuit(false)}
            className="p-1"
            style={{ display: "flex", justifyContent: "end", fontSize: "20px", marginTop: "-6px", cursor: "pointer" }}
          >X</div>
          {/* {notes === true ? (
            <DialogContent className="candidateTable">
              <div className="w-100">
                <center>
                  <img
                    style={{ width: "120px", objectFit: "contain" }}
                    alt="confimation"
                    src={SaveImg}
                  />
                </center>
                <center>
                  <Typography variant="h6" style={{ fontSize: "16px" }}>
                    <b>This member was already added as Not Join for {lastStripe?.stripe_name}.</b>
                  </Typography>
                  <p style={{ fontSize: "14px" }}>To promote for the next Candidate action required.</p>
                </center>
              </div>
            </DialogContent>
          ) : ( */}
          <DialogContent className="candidateTable">
            <div className="w-100">
              <center>
                <img
                  style={{ width: "120px", objectFit: "contain" }}
                  alt="confimation"
                  src={SaveImg}
                />
              </center>
            </div>
            <center>
              <Typography variant="h6">
                <b>Mark Final Status</b>
              </Typography>
            </center>
            <div className="d-flex justify-content-between align-items-center mt-1 mb-1">
              <Button
                style={{ backgroundColor: "#90EE90", color: "#fff", width: "120px" }}
                className="rounded btn btn-sm"
                onClick={handleJoin}
              >

                <b>Join</b>
              </Button>
              <Button
                className="rounded btn btn-sm"
                style={{ backgroundColor: "#F47175", color: "#fff", width: "120px" }}
                onClick={handleNotJoin}
              >
                <b>Not Join</b>
              </Button>
            </div>
          </DialogContent>
          {/* )} */}
        </div>
      </Dialog>

      <div>
        <Dialog
          open={openQuitReasonModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div
            onClick={() => setOpenQuitReasonModal(false)}
            className="p-1"
            style={{ display: "flex", justifyContent: "end", fontSize: "20px", cursor: "pointer" }}
          >X</div>
          <DialogTitle id="alert-dialog-title">{`Why did ${item?.firstName} ${item?.lastName} not join?`}</DialogTitle>
          <DialogContent>
            <Input
              onChange={handleReasonChange}
              value={quitReason}
              name="text"
              type="textarea"
              style={{ width: "400px", height: "100px" }}
              placeholder="Enter reason the member did not join the program here"
            />
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleQuit}
              style={{background: "#0184ff"}}
              autoFocus 
              className="btn text-light">
              Submit
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

const findLast = (arr, predicate) => {
  if (!Array.isArray(arr)) {
    throw TypeError("Not an array")
  }
  if (typeof predicate !== "function") {
    throw TypeError("Not a function")
  }
  let lastElem = null
  for (const index in arr) {
    const elem = arr[index]
    if (predicate(elem, index)) {
      lastElem = elem
    }
  }
  return lastElem;
}
