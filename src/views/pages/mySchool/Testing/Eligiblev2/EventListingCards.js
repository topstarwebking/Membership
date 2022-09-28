import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { Card } from "@material-ui/core";
import { Eye, Edit, Trash2 } from "react-feather";
import AirplayOutlinedIcon from '@material-ui/icons/AirplayOutlined';
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { SELECTED_EVENT } from "../../../../../redux/actions/test";
import NoDataImage from "../../../../../assets/img/nodatafound.png"
import "./style.css"
import notFound from "../../../../../assets/img/notfound.jpg"
import { connect } from "react-redux";
import moment from "moment";
import { DELETE_APPOINTMENT_OR_EVENT } from "../../../../../redux/actions/appointment";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";


const dataTwo = {
  labels: [],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19],
      backgroundColor: ["#f08396", "#826cde"],
      borderColor: ["#f08396", "#826cde"],
      borderWidth: 1,
    },
  ],
};

const dataOne = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [12],
      backgroundColor: ["#4ec34e"],
      borderColor: ["#4ec34e"],
      borderWidth: 1,
    },
  ],
};

const EventListingCards = (props) => {
  const { fetchAllEvents, SELECTED_EVENT, DELETE_APPOINTMENT_OR_EVENT } = props
  const [eventToDelete, setEventToDelete] = useState()
  const [openSweetAlart, setOpenSweetAlart] = useState(false)
  const handleSelectedEvent = (selected) => {
    SELECTED_EVENT(selected)
  }

  const handleDeleteIcon = (event) => {
    setEventToDelete(event)
    setOpenSweetAlart(true)
  }

  const handleEventDelete = () => {
    DELETE_APPOINTMENT_OR_EVENT(eventToDelete)
    setOpenSweetAlart(false)
  }

  return (
    <div>
      <Row className="mt-2">
        <Col sm={9} md={9} lg={9}>
          {fetchAllEvents?.length > 0 ? (
            fetchAllEvents?.map((item, i) => {
              return (
                <Card className="mb-2" key={i}>
                  <Row className="">
                    <Col sm={4} md={4} lg={4}>
                      <Link to={`/app/school/test/event-details/${item?._id}`} className="d-flex align-items-center" onClick={() => handleSelectedEvent(item)}>
                        {/* {console.log(item?.eventBanner)} */}
                        {item?.eventBanner ? (
                          <img
                            className="mr-1"
                            style={{ width: "110px" }}
                            src={item?.eventBanner}
                            alt=""
                          />)
                          : (
                            <img
                              className="mr-1"
                              style={{ width: "110px" }}
                              src={notFound}
                              alt=""
                            />
                          )}

                        <div>
                          <p
                            className="mb-0 text-capitalize"
                            style={{ fontSize: "16px", paddingBottom: "4px" }}
                          >
                            {item?.title}
                          </p>
                          <p className="mb-0 text-capitalize" style={{ color: "#656565" }}>
                            {item?.eventStreet ? item?.eventStreet : "N/A"}, {item?.eventCity ? item?.eventCity : "N/A"}, {item?.eventState ? item?.eventState : "N/A"}
                          </p>
                        </div>
                      </Link>
                    </Col>
                    <Col sm={2} md={2} lg={2} className="d-flex align-items-center w-100">
                      <div>
                        <p className="mb-0" style={{ color: "#656565" }}>{moment(item?.start).format("MM/DD/YYYY")}</p>
                        <p className="mb-0" style={{ color: "#656565" }}>{moment(item?.start_time).format("hh:mm A")} to {moment(item?.end_time).format("hh:mm A")}</p>
                      </div>
                    </Col>
                    <Col sm={4} md={4} lg={4} className="d-flex align-items-center w-100" >
                      <div className="w-100">
                        <div className="d-flex justify-content-center ">
                          <p className="mb-0" style={{ fontSize: "16px", color: "#656565", paddingBottom: "5px" }}>
                            {item?.appointment_type}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="mb-0" style={{ fontSize: "14px", color: "#656565" }}>{item?.appointment_type === "Promotion Test" ? "Recommended" : "Invited"} : <b>0</b></p>
                          <p className="mb-0" style={{ fontSize: "14px", color: "#656565" }}>{"Registered"} : <b>0</b></p>
                          <p className="mb-0" style={{ fontSize: "14px", color: "#656565" }}>{item?.appointment_type === "Promotion Test" ? "Promoted" : "Attended"} : <b>0</b></p>
                        </div>
                      </div>
                    </Col>
                    <Col sm={2} md={2} lg={2} className="d-flex justify-content-center align-items-center">
                      <div className="d-flex align-items-center">
                        <Link
                          className="p-0"
                          to={`/app/event/Edit/${item._id}`}
                        >
                          <Edit size={18} className='mr-1' style={{ color: '#0184FF' }} />
                        </Link>
                      </div>
                      <div className="d-flex align-items-center">
                        <Button className="p-0"
                          onClick={() => { handleDeleteIcon(item) }}
                        >
                          <Trash2 size={18} className='mr-1' style={{ color: '#EB5757' }} />
                        </Button>
                      </div>
                      <Link to={`/app/school/test/event-preview/${item?._id}`}><AirplayOutlinedIcon size={20} /></Link>
                    </Col>
                  </Row>
                </Card>
              )
            })
          ) : (
            <center>
              <img
                src={NoDataImage}
                style={{ height: "60vh" }}
                alt="No Data"

              />
              <h4>No Data Found!</h4>
            </center>
          )}
        </Col>
        <Col sm={3} md={3} lg={3}>
          <div>
            <Card className="mb-2">
              <div className="p-1">
                <div to="event-details" style={{ color: "#656565" }}>Events Overview</div>
                <div style={{ width: "80%", margin: "auto" }} className="mt-4">
                  <Doughnut
                    data={dataOne}
                    options={{
                      cutoutPercentage: 94,
                      plugins: {
                        legend: {
                          display: false,
                          position: "right",
                          align: "start",
                          labels: {
                            usePointStyle: true,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div
                className="d-flex justify-content-around"
                style={{ borderTop: "1px solid #c0c0c0" }}
              >
                <div className="pt-1" style={{ color: "#1f75fa" }}>
                  <p className="mb-0 text-center">Completed</p>
                  <p className="text-center">18</p>
                </div>
                <div style={{ padding: "0.4px", backgroundColor: "#c0c0c0" }} />
                <div className="pt-1" style={{ color: "#f48383" }}>
                  <p className="mb-0 text-center">Completed</p>
                  <p className="text-center">18</p>
                </div>
              </div>
            </Card>
            <Card className="mb-2">
              <div className="p-1">
                <div className="d-flex justify-content-between">
                  {" "}
                  <p style={{ color: "#656565" }}>Statistics</p>{" "}
                  <span style={{ color: "#656565", fontSize: "12px" }}>
                    Last 7 days
                  </span>
                </div>
                <div style={{ width: "80%", margin: "auto" }} className="mt-4">
                  <Doughnut
                    data={dataTwo}
                    options={{
                      cutoutPercentage: 94,
                      plugins: {
                        legend: {
                          display: false,
                          position: "right",
                          align: "start",
                          labels: {
                            usePointStyle: true,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div
                className="d-flex justify-content-around"
                style={{ borderTop: "1px solid #c0c0c0" }}
              >
                <div className="pt-1">
                  <p className="mb-0 text-center" style={{ color: "#c0c0c0" }}>
                    Completed
                  </p>
                  <p className="text-center">18</p>
                </div>
                <div style={{ padding: "0.4px", backgroundColor: "#c0c0c0" }} />
                <div className="pt-1">
                  <p className="mb-0 text-center" style={{ color: "#c0c0c0" }}>
                    Completed
                  </p>
                  <p className="text-center">18</p>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={openSweetAlart}
        title="Delete Event "
        onConfirm={handleEventDelete}
        onCancel={() => {
          setOpenSweetAlart(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Remove"}
        description=" Are you sure you want to delete?"
      />
    </div>
  );
};

export default connect(null, { SELECTED_EVENT, DELETE_APPOINTMENT_OR_EVENT })(EventListingCards);
