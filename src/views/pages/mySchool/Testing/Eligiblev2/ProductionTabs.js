import React, { Fragment } from "react";
import { CustomInput, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import "../../../../../assets/scss/pages/users.scss";
import RecommendedTable from "../../../../apps/user/list/RecommendedTable";
import {
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    InputBase,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Button as Buttonmui } from "@material-ui/core";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
    DELETE_TEST_DATA,
    HandleEventButton,
    MANAGE_EVENT_SELECTED_REGISTER_STUDENT,
    MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT,
    SELECT_STUDENT_FOR_REGESTER,
    WITHOUT_PAY_REGISTOR,
    ADD_INVITE_FOR_EVNET,
} from "../../../../../redux/actions/test";

import {
    SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
    GET_PRAMOTE_TO_RECOMMANDE,
    SELECT_STUDENTID_FOR_PRAMOTE,
    DELETE_REGISTERED_FOR_TEST,
    DELETE_PROMOTED_STUDNETS,
} from "../../../../../redux/actions/test";
import Mergeformforall from "../../../../../views/apps/user/list/Mergeformforall";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { ACTIVE_EVENT } from "../../../../../redux/actions/appointment";
import { X } from "react-feather";
import ProductionRegister from "./eventDetailsTable/ProductionRegister";
import PromotedStudentsTable from "./eventDetailsTable/PromotedStudentsTable";
import TestRegisterTable from "../../../../apps/user/list/TestRegisterTable";
import GetpromotedStudnets from "../../../../apps/user/list/GetpromotedStudnets";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const eventColors = {
    business: "bg-success",
    work: "bg-warning",
    personal: "bg-danger",
    others: "bg-primary",
};
function hexToRGB(hex, alpha) {
    try {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    } catch (error) {
        return hex;
    }
}
const localizer = momentLocalizer(moment);

class ProductionTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1",
            defaultAlert: false,
            defaultAlert2: false,
            openToggel: false,
            dataAfterFormate: [],
            ConfirmationforInvite: false,
            defaultAlert3: false,
        };
    }
    toggle = (tab) => {
        this.setState({
            activeTab: tab,
        });
        this.props.SELECT_STUDENT_FOR_TEST_OR_RECOMAND([]);
    };

    ConFirmDelete = async () => {
        if (this.state.activeTab === "1") {
            await this.props.DELETE_TEST_DATA(this.props.SelectedTestToRecommand, this.props.activeEvent?._id);
        } else if (this.state.activeTab === "3") {
            await this.props.DELETE_PROMOTED_STUDNETS(this.props.SelectedTestToRecommand);
        } else {
            await this.props.DELETE_REGISTERED_FOR_TEST(this.props.SelectedTestToRecommand, this.props?.activeEvent?._id);
        }
        await this.setState({
            ...this.state,
            defaultAlert: false,
        });
        await this.props.SELECT_STUDENT_FOR_TEST_OR_RECOMAND([]);
        await this.props.getDataBackOfStudent
    };
    handlePramote = async () => {
        if (this.props.selectstudentforpramote?.length > 0) {
            await this.props.GET_PRAMOTE_TO_RECOMMANDE(this.props.selectstudentforpramote, this.props.eventId);
            await this.props.SELECT_STUDENTID_FOR_PRAMOTE([]);
            await this.props.SELECT_STUDENT_FOR_TEST_OR_RECOMAND([]);
            await this.setState({
                ...this.state,
                defaultAlert3: false,
            });
            await this.props.getDataBackOfStudent
        }
    };
    confirmforregiter = () => {
        this.setState({
            ...this.state,
            defaultAlert2: true,
        });
    };

    handleEventColors = (event) => {
        let style = {
            fontWeight: "bold",
            borderRadius: "8px",
            paddingTop: "0.2em",
            border: 0,
            color: event?.app_color || "#40a7e1",
            backgroundColor: hexToRGB(event?.app_color || "#40a7e1", 0.16),
        };
        return {
            style: style,
            className: eventColors[event.title],
        };
    };

    Handleregister = async () => {
        await this.props.WITHOUT_PAY_REGISTOR(this.props.selectstudnetforregister, this.props.eventId);
        await this.setState({
            defaultAlert2: false,
        });
        await this.props.SELECT_STUDENT_FOR_REGESTER([]);
    };

    HandleAddStudentToinvite = async () => {
        const list = [];
        for (var i of this.props.selectstudnetforregister) {
            let item = {
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
            list.push(item);
        }
        await this.props.ADD_INVITE_FOR_EVNET(list, this.props.activeEvent?._id);
        await this.setState({ ...this.state, ConfirmationforInvite: false });
    };
    formatEventList = async () => {
        let formated = this.props.eventsAndAppointment?.data?.map((event) => {
            let startTimeH = null;
            let startTimeM = null;
            let endTimeH = null;
            let endTimeM = null;
            if (moment(event?.start_time)?._isValid) {
                startTimeH = moment(event?.start_time)?.format("HH");
                startTimeM = moment(event?.start_time)?.format("MM");
                endTimeH = moment(event?.end_time)?.format("HH");
                endTimeM = moment(event?.end_time)?.format("MM");
            } else {
                startTimeH = event?.start_time.split(":")[0];
                startTimeM = event?.start_time.split(":")[1];
                endTimeH = event?.end_time.split(":")[0];
                endTimeM = event?.end_time.split(":")[1];
            }
            event.start = new Date(
                moment(event.start).set({
                    hour: Number(startTimeH),
                    minute: Number(startTimeM),
                })?._d
            );
            event.end = new Date(
                moment(event.end).set({
                    hour: Number(endTimeH),
                    minute: Number(endTimeM),
                })?._d
            );
            return event;
        });
        let data = formated.filter(
            (item) => item?.appointment_type.toLowerCase() !== "promotion test"
        );
        await this.setState({
            ...this.state,
            dataAfterFormate: data,
        });
    };
    componentDidMount() {
        if (this.props.eventsAndAppointment?.data !== undefined) {
            this.formatEventList();
        }
    }

    render() {
        return (
            <Fragment>
                <div className="card pt-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            { }
                            <Nav tabs className="px-1">
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: this.state.activeTab === "1",
                                        })}
                                        onClick={() => {
                                            this.toggle("1");
                                        }}
                                    >
                                        <span className="align-middle ml-50">Recommended</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: this.state.activeTab === "2",
                                        })}
                                        onClick={() => {
                                            this.toggle("2");
                                        }}
                                    >
                                        <span className="align-middle ml-50">Registered</span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        className={classnames({
                                            active: this.state.activeTab === "3",
                                        })}
                                        onClick={() => {
                                            this.toggle("3");
                                        }}
                                    >
                                        <span className="align-middle ml-50">Promoted</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                        {/* <div className="d-flex align-items-center">
                            {this.state.activeTab === "1" ? (
                                <div className="text-primary mr-5">
                                    Total Recommended: 312
                                </div>
                            ) : null}
                            <div>
                                {this.state.activeTab === "2" ? (
                                    <div className="text-primary mr-5">
                                        Total Register: 332
                                    </div>
                                ) : null}
                            </div>
                            {this.state.activeTab === "3" ? (
                                <div className="text-primary mr-5">
                                    Total Promoted: 123
                                </div>
                            ) : null}
                        </div> */}

                        {/* <div className="d-flex mr-2">
                            <InputBase
                                style={{
                                    height: "40px",
                                    borderRadius: "0.4em",
                                    border: "1px solid #b8c2cc",
                                    "& div": {
                                        padding: "0px !important",
                                    }
                                }}
                                className='pl-1'
                                type="text"
                                placeholder="Search for students..... "
                            />
                            <div className="d-flex">
                                <Grid item sm={6} lg={3} md={3} className="ml-2">
                                    <CustomInput type="select" id="select" name="customSelect" className="eventSection">
                                        <option value={'Today'}>Program</option>
                                        <option vablue={'Tomorrow'}>Tomorrow</option>
                                        <option value={'This Week'}>This Week</option>
                                        <option value={'This Month'}>This Month</option>
                                        <option value={'no filter'}>no filter</option>
                                    </CustomInput>
                                </Grid>
                                <Grid item sm={6} lg={3} md={3} className="ml-2">
                                    <CustomInput type="select" id="select" name="customSelect" className="eventSection">
                                        <option value={'Today'}>Type</option>
                                        <option vablue={'Tomorrow'}>Tomorrow</option>
                                        <option value={'This Week'}>This Week</option>
                                        <option value={'This Month'}>This Month</option>
                                        <option value={'no filter'}>no filter</option>
                                    </CustomInput>
                                </Grid>
                                <Grid item sm={6} lg={3} md={3} className="ml-2">
                                    <CustomInput type="select" id="select" name="customSelect" className="eventSection">
                                        <option value={'Today'}>Tags</option>
                                        <option value={'Tomorrow'}>Tomorrow</option>
                                        <option value={'This Week'}>This Week</option>
                                        <option value={'This Month'}>This Month</option>
                                        <option value={'no filter'}>no filter</option>
                                    </CustomInput>
                                </Grid>
                                <Grid item sm={6} lg={3} md={3} className="ml-2">
                                    <button className='btn btn-primary'>Add</button>
                                </Grid>
                            </div>
                        </div> */}
                        <div>
                            {this.state.activeTab === "1" ? (
                                <div className="d-flex juftify-content-end mr-5">
                                    <Mergeformforall
                                        data={this.props?.SelectedTestToRecommand}
                                        isrecommendedOrregistered={
                                            this.state.activeTab === "1"
                                                ? "recommended"
                                                : "registered"
                                        }
                                    />
                                    <Chip
                                        disabled={this.props?.SelectedTestToRecommand?.length === 0}
                                        size="small"
                                        style={{
                                            background: "#e74954",
                                            color: "#ffff",
                                            margin: "1px",
                                        }}
                                        label={<b>Remove</b>}
                                        onClick={() => {
                                            this.setState({
                                                ...this.state,
                                                defaultAlert: true,
                                            });
                                        }}
                                    />
                                    <Chip
                                        disabled={
                                            this.props?.selectstudnetforregister?.length === 0
                                        }
                                        size="small"
                                        style={{
                                            background: "#6ec871",
                                            color: "#ffff",
                                        }}
                                        onClick={this.confirmforregiter}
                                        label={<b>Register</b>}
                                    />
                                    {/* <Chip
                                        disabled={
                                            this.props?.selectstudnetforregister?.length === 0
                                        }
                                        size="small"
                                        style={{
                                            background: "#0184ff",
                                            color: "#ffff",
                                            margin: "1px",
                                        }}
                                        label={<b>Add to Invite</b>}
                                        onClick={() => {
                                            this.setState({
                                                ...this.state,
                                                openToggel: true,
                                            });
                                        }}
                                    /> */}
                                </div>
                            ) : null}
                            <div>
                                {this.state.activeTab === "2" ? (
                                    <div className="d-flex justify-content-between mr-5">
                                        <Mergeformforall
                                            data={this.props?.SelectedTestToRecommand}
                                            isrecommendedOrregistered={
                                                this.state.activeTab === "1"
                                                    ? "recommended"
                                                    : "registered"
                                            }
                                        />
                                        <Chip
                                            disabled={
                                                this.props.SelectedTestToRecommand?.length === 0
                                            }
                                            size="small"
                                            style={{
                                                background: "#e74954",
                                                color: "#ffff",
                                                margin: "1px",
                                            }}
                                            label={<b>Remove</b>}
                                            onClick={() => {
                                                this.setState({
                                                    ...this.state,
                                                    defaultAlert: true,
                                                });
                                            }}
                                        />
                                        <Chip
                                            disabled={
                                                this.props.SelectedTestToRecommand?.length === 0
                                                    ? true
                                                    : false
                                            }
                                            size="small"
                                            style={{
                                                background: "#6ec871",
                                                color: "#ffff",
                                            }}
                                            label={"Promote"}
                                            onClick={() => {
                                                this.setState({
                                                    ...this.state,
                                                    defaultAlert3: true,
                                                });
                                            }}
                                        />
                                    </div>
                                ) : null}
                            </div>
                            {this.state.activeTab === "3" ? (
                                <div className="d-flex justify-content-between mr-5">
                                    <Mergeformforall
                                        data={this.props?.SelectedTestToRecommand}
                                        isrecommendedOrregistered={
                                            this.state.activeTab === "1"
                                                ? "recommended"
                                                : "registered"
                                        }
                                    />
                                    <Chip
                                        disabled={this.props.SelectedTestToRecommand?.length === 0}
                                        size="small"
                                        style={{
                                            background: "#e74954",
                                            color: "#ffff",
                                            margin: "1px",
                                        }}
                                        label={<b>Remove</b>}
                                        onClick={() => {
                                            this.setState({
                                                ...this.state,
                                                defaultAlert: true,
                                            });
                                        }}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>




                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <RecommendedTable selectedrow={this.props.selectedrow}/>
                        </TabPane>
                        <TabPane tabId="2">
                            <TestRegisterTable selectedrow={this.props.selectedrow}/>
                        </TabPane>
                        <TabPane tabId="3">
                            <GetpromotedStudnets selectedrow={this.props.selectedrow}/>
                        </TabPane>
                    </TabContent>
                </div>
                <ConfirmationModal
                    primaryColor="#0483fd"
                    secondaryColor="#fff"
                    imagePath="/images/delete.png"
                    open={this.state.defaultAlert}
                    title="Remove student?"
                    onConfirm={() => {
                        this.ConFirmDelete();
                    }}
                    onCancel={() => {
                        this.setState({
                            ...this.state,
                            defaultAlert: false,
                        });
                    }}
                    onCancelButtonTitle={"Cancel"}
                    contiunuebuttonTitle={"Remove"}
                    description=" Are you sure you Remove it ?"
                />
                <ConfirmationModal
                    primaryColor="#0483fd"
                    secondaryColor="#fff"
                    imagePath="/images/delete.png"
                    open={this.state.defaultAlert2}
                    title="Add studnet to Register"
                    onConfirm={() => {
                        this.Handleregister();
                    }}
                    onCancel={() => {
                        this.setState({
                            ...this.state,
                            defaultAlert2: false,
                        });
                    }}
                    onCancelButtonTitle={"Cancel"}
                    contiunuebuttonTitle={"Register"}
                    description="Are you sure you want to register"
                />
                <ConfirmationModal
                    primaryColor="#0483fd"
                    secondaryColor="#fff"
                    imagePath="/images/delete.png"
                    open={this.state.defaultAlert3}
                    title="Promote members"
                    onConfirm={() => {
                        this.handlePramote();
                    }}
                    onCancel={() => {
                        this.setState({
                            ...this.state,
                            defaultAlert3: false,
                        });
                    }}
                    onCancelButtonTitle={"Cancel"}
                    contiunuebuttonTitle={"Promote"}
                    description="Are you sure you want to register"
                />

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeEvent: state.appointmentAndEvent.activeEvent,
        handleaddtoevent: state.test.handleaddtoevent,
        SelectedTestToRecommand: state.test.SelectedTestToRecommand,
        selectstudentforpramote: state.test.selectstudentforpramote,
        selectstudnetforregister: state.test.selectstudnetforregister,
        eventsAndAppointment: state.appointmentAndEvent.eventsAndAppointment,
    };
};

export default connect(mapStateToProps, {
    DELETE_TEST_DATA,
    SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
    GET_PRAMOTE_TO_RECOMMANDE,
    SELECT_STUDENTID_FOR_PRAMOTE,
    DELETE_REGISTERED_FOR_TEST,
    WITHOUT_PAY_REGISTOR,
    SELECT_STUDENT_FOR_REGESTER,
    DELETE_PROMOTED_STUDNETS,
    MANAGE_EVENT_SELECTED_REGISTER_STUDENT,
    ACTIVE_EVENT,
    ADD_INVITE_FOR_EVNET,
    HandleEventButton,
    MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT,
})(ProductionTabs);
