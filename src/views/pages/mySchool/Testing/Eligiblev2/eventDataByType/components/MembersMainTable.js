import React, { useEffect, useState } from "react";
import {
    Avatar,
    Chip,
    Card,
    CardContent,
    Dialog,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import "../../../../../../../assets/scss/pages/users.scss";
import StudentManageMenu from "../../../../../../apps/user/list/UserMoreMenu";
import { connect } from "react-redux";
import { ArrowDown } from "react-feather";
import { ACTIVE_EVENT } from "../../../../../../../redux/actions/appointment";

import {
    Add_TEST_DATA, MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT,
    MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT, HandleEventButton,
    MANAGE_EVENT_SELECTED_REGISTER_STUDENT, ADD_INVITE_FOR_EVNET, FETCH_APPOINMENT_DETAILS, FETCH_EVENT_DETAILS
} from "../../../../../../../redux/actions/test/index"
import StudentlistuserEyeModal from "../../../../../../dashboard1/StudentlistuserEyeModal";
import { } from "../../../../../../../redux/actions/programe";
import { GET_AFTER_CAMPS } from "../../../../../../../redux/actions/member";
import DataTable from "react-data-table-component";
import confirmImg from "../../../../../../../assets/img/deletebox.png"
import "../../style.css"

import {
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Badge,
} from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import ConfirmationModal from "../../../../../../../components/gloabal/confirmation";
// import "./index.css";

const customStyles = {
    headCells: {
        style: {
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#4F4F4F",
            width: "100%",
        },
    },
    columnsCell: {
        style: {
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#4F4F4F",
            width: "100%",
        },
    },
};
const useStyles = makeStyles((theme) => ({
    cardroot: {
        width: "100%",
        height: "100%",
        boxShadow:
            " 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
        marginTop: "6px",
        overflow: "scroll",
        padding: "0",
    },
    rowstart: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "start",
    },
    inputStyle: {
        height: "3em",
        width: "100%",
        borderRadius: "0.4em",
        border: "1px solid #b8c2cc",
        "& div": {
            padding: "0px !important",
        },
    },
    textFontSize: {
        fontSize: "1em",
        width: "1.2em",
        height: "1,2em",
    },
    rows: {
        style: {
            minHeight: "72px", // override the row height
        },
    },
}));

export const RowSkeleton = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.cardroot}>
            <CardContent>
                <div className={classes.rowstart}>
                    <Skeleton animation="wave" variant="circle" width={40} height={40} />
                    <div style={{ width: "60em", paddingLeft: "8px" }}>
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            width={"100%"}
                            height={10}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={"100%"}
                            height={10}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
const StudentTable = (props) => {
    const {
        ACTIVE_EVENT,
        Add_TEST_DATA,
        MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT,
        MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT,
        listofStudentdata,
        SELECTED_TEST_DATA,
        getDataBack,
        fetchAllEvents,
        activeUserActionComponent,
        GET_AFTER_CAMPS,
        onSelectionChanged,
        usersChatAlertList,
    } = props;
    const rowsPerPage = 10;

    const [selectedId, setSelectedId] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
    const [defaultAlert, setdefaultAlert] = useState(false);
    const [payload, setPayload] = useState("promotion test")

    const pageNumber = 0;
    const history = useHistory();
    const classes = useStyles();
    const { eventId } = useParams()

    const [activeAppointment, setActiveAppointment] = useState([])

    useEffect(() => {
        FETCH_APPOINMENT_DETAILS(eventId).then(resp => {
            setActiveAppointment(resp.data.result)
        })
    }, [eventId])

    const getRatingColor = (RatingCount, attendnce) => {
        if (RatingCount >= 0 && RatingCount <= 7 && attendnce > 0) {
            return "#60aa0ed4"; // green
        } else if (RatingCount >= 8 && RatingCount <= 14) {
            return "#ffc107"; // yellow
        } else if (RatingCount === 0) {
            return "gray";
        } else {
            return "#ff3f00";
        }
    };

    useEffect(() => {
        history.memberpage = 1;
        history.memberrowCount = 10;
        if (!history?.fromback) {
            history.fromback = false;
            history.updated = false;
            getDataBack();
            GET_AFTER_CAMPS();
        }
        if (history?.updated) {
            getDataBack();
            GET_AFTER_CAMPS();
            history.fromback = false;
            history.updated = false;
        }
    }, [GET_AFTER_CAMPS, getDataBack]);

    useEffect(() => {
        onSelectionChanged(selectedId, selectedRows, pageNumber, rowsPerPage);
        if (selectedRows.length > 0) {
            SELECTED_TEST_DATA(selectedRows);
        } else {
            SELECTED_TEST_DATA([]);
        }
    }, [SELECTED_TEST_DATA, selectedId, selectedRows]);



    const getAllIds = (data) => {
        let ids = [];
        for (let item of data) {
            ids.push(item?._id);
        }
        console.log(ids)
        return ids;
    };

    const handleSelectRows = async (state) => {
        let _ids = await getAllIds(state.selectedRows);
        await setSelectedId(_ids);
        await setSelectedRows(state.selectedRows);
    };


    const RCcolumns = [
        {
            name: "Full Name",
            selector: (row) => row.firstName,
            sortable: true,
            width: "220px",
            style: {
                display: "flex",
                justifyContent: "flex-start",
            },
            cell: (row) => (
                <div>
                    <Link
                        to={`/student-info/${row._id}`}
                        title={`${row?.firstName} ${row?.lastName}`}
                        style={{ cursor: "pointer" }}
                        className="d-flex align-items-center justify-content-start text-capitalize"
                    >
                        <Avatar
                            style={{ width: "1.8em", height: "1.8em" }}
                            alt={row?.firstName}
                            src={row?.memberprofileImage}
                            className="mr-1"
                        />
                        {row?.firstName} {row?.lastName}
                    </Link>
                </div>
            ),
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            cell: (row) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        className="rounded textstart"
                        style={{
                            padding: 6,
                            textAlign: "center",
                            background:
                                row?.status?.toLowerCase() === "active"
                                    ? "#def8e7"
                                    : row?.status?.toLowerCase() === "expired"
                                        ? " #f9d2d0"
                                        : "#efebeb",
                            color:
                                row?.status?.toLowerCase() === "active"
                                    ? "#55a65b"
                                    : row?.status?.toLowerCase() === "expired"
                                        ? "#ff3f00"
                                        : "#454040",
                            fontWeight: "bold",
                            fontSize: "0.9em",
                        }}
                    >
                        {row?.status?.toLowerCase() === "active"
                            ? "Active"
                            : row?.status?.toLowerCase() === "expired"
                                ? "Expired"
                                : "New"}
                    </div>
                </div>
            ),
        },
        {
            name: "Program",
            selector: (row) => row.program,
            sortable: true,
            cell: (row) => <div>{row?.program === "" ? "N/A" : row?.program}</div>,
        },
        {
            name: "Rank",
            selector: (row) => row.rank_order,
            sortable: true,
            cell: (row) => (
                <div>
                    <Avatar
                        style={{
                            width: "1.8em",
                            height: "1.8em",
                            margin: "0px",
                            objectFit: "contain !importent",
                        }}
                        src={row?.current_rank_img}
                        alt={`${row?.current_rank_name}`}
                    />
                </div>
            ),
        },
        // {
        //     name: "Type",
        //     selector: (row) => row.membership_type,
        //     sortable: true,
        //     cell: (row) => (
        //         <div>
        //             {row?.membership_details?.slice(-1)[0]?.membership_type ||
        //                 row?.data?.membership_type ||
        //                 "N/A"}
        //         </div>
        //     ),
        // },
        {
            name: "Start Date",
            selector: (row) => row.membership_start,
            sortable: true,
            cell: (row) => (
                <div>
                    {row?.membership_start === undefined
                        ? "N/A"
                        : moment(row?.membership_start).format("MM/DD/YYYY")}
                </div>
            ),
        },
        {
            name: "End Date",
            selector: (row) => row.membership_expiry,
            sortable: true,
            cell: (row) => (
                <div>
                    {row?.membership_expiry === undefined
                        ? "N/A"
                        : moment(row?.membership_expiry).format("MM/DD/YYYY")}
                </div>
            ),
        },
        {
            name: "Rating",
            selector: (row) => row.rating,
            sortable: true,
            cell: (row) => (
                <div>
                    <Avatar
                        className={classes.textFontSize}
                        style={{
                            fontWeight: "bold",
                            width: "2em",
                            height: "2em",
                            backgroundColor: getRatingColor(
                                Number(row?.rating),
                                row?.attendedclass_count
                            ),
                        }}
                    >
                        {row?.rating}
                    </Avatar>
                </div>
            ),
        },
        // {
        //     name: "Tag",
        //     selector: (row) => row.after_camp,
        //     sortable: true,
        //     // style: {
        //     //     paddingLeft: "1rem",
        //     // },
        //     cell: (row) =>
        //         row?.after_camp === 0 ? (
        //             <div style={{ cursor: "pointer" }}>
        //                 <Chip
        //                     size="small"
        //                     label={"None"}
        //                     style={{ color: "#00a6e1", background: "#b7c9cf !important" }}
        //                 />
        //             </div>
        //         ) : (
        //             <UncontrolledButtonDropdown
        //                 tag="li"
        //                 className="dropdown-user nav-item"
        //             >
        //                 <DropdownToggle className="p-0">
        //                     <Chip
        //                         label={"Selected"}
        //                         size="small"
        //                         style={{ color: "#00a6e1", background: "#b7c9cf !important" }}
        //                     />
        //                 </DropdownToggle>
        //                 <DropdownMenu right>
        //                     {row?.after_camp?.map((item, i) => {
        //                         return (
        //                             <DropdownItem
        //                                 style={{
        //                                     width: "100%",
        //                                     color: "#00a6e1",
        //                                     background: "#eaf4fe !important",
        //                                     fontWeight: "600",
        //                                 }}
        //                                 key={i}
        //                             >
        //                                 {item}
        //                             </DropdownItem>
        //                         );
        //                     })}
        //                 </DropdownMenu>
        //             </UncontrolledButtonDropdown>
        //         ),
        // },
        {
            name: "Action",
            sortable: true,
            style: {
                paddingLeft: "1rem",
            },
            cell: (row) => (
                <div className="d-flex justify-content-start p-0">
                    <StudentlistuserEyeModal studentInfo={row} />
                    <StudentManageMenu
                        item={row}
                        alertCount={usersChatAlertList[row?._id]}
                    />
                </div>
            ),
        },
    ];


    const handlePageChange = (page) => {
        history.memberpage = page;
    };
    const handlePageRowChange = (rowCount) => {
        history.memberrowCount = rowCount;
    };


    const handleregister = async () => {
        // const selectedEvent = fetchAllEvents.filter((item) => item?._id === eventId )
        if (
            activeAppointment?.appointment_type?.toLowerCase() === "promotion test"
        ) {
            let list = props.getSelectedTestToRecommand.map(e => {
                const { isInvitee, ...rest } = e
                return rest
            });
            await props.Add_TEST_DATA(list, activeAppointment?._id);

        } else {
            const list = props.getSelectedTestToRecommand.map(i => {
                return {
                    studentId: i?.studentId,
                    firstName: i?.firstName,
                    lastName: i?.lastName,
                    memberprofileImage: i?.memberprofileImage,
                    primaryPhone: i?.primaryPhone,
                    isInvitee: i?.isInvitee,
                    program: i.program,
                    current_rank_img: i?.current_rank_img || "no data",
                    next_rank_img: i?.next_rank_img || "no data",
                    next_rank_name: i?.next_rank_name || "no data",
                    current_rank_name: i?.current_rank_name || "no data",
                };
            });

            await props.ADD_INVITE_FOR_EVNET(list, activeAppointment?._id);
        }
        
        MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT(false);
        MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT(true);
        setdefaultAlert(false);
        history.fromback = true
        history.goBack()
    };

    return (
        <React.Fragment>
            <div>
                <div className="card m-0">
                    <div className="d-flex justify-content-between p-2">
                        <div className="d-flex">
                            <h5 style={{ marginTop: "5px" }}>Total Member</h5>
                            <Badge className="ml-1 countBadge">{props.listofStudentdata?.length || 0}</Badge>
                        </div>
                        <div className="d-flex">
                            <div>
                                <button className="btn btn-outline-primary">Send Invitation</button>
                            </div>
                            <div className="ml-1">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setSweetAlertOpen(true);
                                    }}
                                >
                                    Add Guest
                                </button>
                            </div>
                        </div>
                        {/* <Dialog
                            style={{ padding: "20px !important" }}
                            open={sweetAlertOpen}
                            onClose={() => handleClickCancel(false)}
                            aria-labelledby="confirm-dialog"
                        >

                            <div style={{ padding: "10px" }}>
                                <div
                                    onClick={handleClickCancel}
                                    style={{ display: "flex", justifyContent: "end", fontSize: "20px", cursor: "pointer" }}
                                >X</div>
                                <img src={confirmImg} style={{ height: "180px", width: "200px", padding: "10px" }} />
                                <h3><b>Do you want to add?</b></h3>
                                <DialogActions className="justify-content-between">
                                    <Button
                                        variant="contained"
                                        onClick={handleClickCancel}
                                        color="secondary"
                                    >
                                        No
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={Handleregister}
                                        color="default"
                                    >
                                        Yes
                                    </Button>
                                </DialogActions>
                            </div>
                        </Dialog> */}
                    </div>
                    {activeUserActionComponent}
                    {listofStudentdata === null ? (
                        [1, 2, 3, 4, 5, 12].map((i) => {
                            return <RowSkeleton key={i} />;
                        })
                    ) : (
                        <DataTable
                            responsive={true}
                            columns={RCcolumns}
                            paginationPerPage={history?.memberrowCount || 10}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handlePageRowChange}
                            paginationRowsPerPageOptions={[
                                10, 50, 100, 150, 200, 250, 300, 400,
                            ]}
                            clearSelectedRows={props.clearSelectedRow}
                            paginationDefaultPage={history?.memberpage || 1}
                            data={listofStudentdata || []}
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
                    )}
                </div>
            </div>
            <ConfirmationModal
                primaryColor="#0483fd"
                secondaryColor="#fff"
                imagePath="/images/icons8-ok-96.png"
                open={sweetAlertOpen}
                title="Add Guest to Event"
                onConfirm={handleregister}
                onCancel={() => {
                    setSweetAlertOpen(false);
                }}
                onCancelButtonTitle={"Cancel"}
                contiunuebuttonTitle={"Add"}
            // description="Are you sure you want to Add Guest?"
            />
        </React.Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        fetchAllEvents: state.appointmentAndEvent.fetchAllEvents,
        handleaddtoevent: state.test.handleaddtoevent,
        activeEvent: state.appointmentAndEvent.activeEvent,
        listofStudentdata: state.student.listofStudentdata,
        manageEventModalOpenRegisterStudent:
            state.test.manageEventModalOpenRegisterStudent,
        manageRegitsertModalOpenRegisterStudent:
            state.test.manageRegitsertModalOpenRegisterStudent,
        membershipList: state.shop.membershipList,
        getAfterCamps: state.member.getAfterCamps,
        usersChatAlertList: state.V2textChat?.usersChatAlertList,
        getSelectedTestToRecommand: state.test.getSelectedTestToRecommand,
        clearSelectedRow: state.student.clearSelectedRow,
    };
};

export default connect(mapStateToProps, {
    HandleEventButton,
    MANAGE_EVENT_SELECTED_REGISTER_STUDENT,
    ACTIVE_EVENT,
    ADD_INVITE_FOR_EVNET,
    MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT,
    MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT,
    Add_TEST_DATA,
    GET_AFTER_CAMPS,
})(StudentTable);

