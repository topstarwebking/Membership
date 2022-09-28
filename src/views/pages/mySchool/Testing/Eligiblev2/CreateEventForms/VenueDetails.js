import React, { useEffect, useState } from "react";
import {
    useFormContext,
} from "react-hook-form";
import "../style.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "reactstrap";


const VenueDetails = (props) => {
    const { setPayload, payload, selectedEvent, action } = props

    const handleOnChange = (e) => {
        let { value, name, type } = e.target
        setPayload({ ...payload, [name]: value })
    }
    // const handleDateChange = (value, name) => {
    //     if (name === "startDate") {
    //         setPayload({ ...payload, start: value, start_time: value });
    //     } else {
    //         setPayload({ ...payload, end: value, end_time: value });
    //     }
    // };

    useEffect(() => {
        if (action === "Edit") {
            payload.start = new Date(selectedEvent[0]?.start)
            payload.end = new Date(selectedEvent[0]?.end)
        } else {
            payload.start = new Date()
            payload.end = new Date()
        }
    }, [])

    return (
        <>
            <div className="row mb-2">
                <div className="col-md-1">
                    <div className="verticalText">
                        <h1>VENUE</h1>
                    </div>
                </div>
                <div className="col-md-10 ml-2">
                    <div className="headerIcons">
                        <i className="fa fa-map-marker"></i>
                        <div className="headerText">
                            <span>Event Address</span>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6 mb-1">
                            <label>Start Date & Time</label>
                            <DatePicker
                                className="form-control w-100"
                                style={{ height: "50px" }}
                                selected={payload?.start}
                                onChange={(date) => {
                                    setPayload({ ...payload, start: date, start_time: date });
                                    // handleDateChange(date, "startDate");
                                }}
                                showTimeSelect
                                id="startDate"
                                name="startDate"
                                dateFormat="MM/d/yyyy h:mm a"
                            />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label>End Date & Time</label>
                            {/* {console.log(new Date(selectedEvent[0]?.end_time), payload?.end)} */}
                            <DatePicker
                                className=" form-control w-100"
                                // style={{ height: "50px" }}
                                selected={payload?.end}
                                onChange={(date) => {
                                    setPayload({ ...payload, end: date, end_time: date });
                                    // handleDateChange(date, "endDate");
                                }}
                                showTimeSelect
                                id="endDate"
                                name="endDate"
                                dateFormat="MM/d/yyyy h:mm a"
                            />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label>Location</label>
                            <Input
                                required
                                style={{ height: "50px" }}
                                name="eventLocation"
                                type="text"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.eventLocation : payload?.eventLocation}
                                onChange={handleOnChange}
                                placeholder="Location"
                            />
                        </div>
                        <div className="col-md-6 mb-1">
                            <label>Street</label>
                            <Input
                                required
                                style={{ height: "50px" }}
                                type="text"
                                name="eventStreet"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.eventStreet : payload?.eventStreet}
                                onChange={handleOnChange}
                                placeholder="Street"
                            />
                        </div>
                        <div className="col-md-4 mb-1">
                            <label>City</label>
                            <Input
                                required
                                style={{ height: "50px" }}
                                name="eventCity"
                                type="text"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.eventCity : payload?.eventCity}
                                onChange={handleOnChange}
                                placeholder="City Name"
                            />
                        </div>
                        <div className="col-md-4 mb-1">
                            <label>State</label>
                            <Input
                                required
                                style={{ height: "50px" }}
                                name="eventState"
                                type="text"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.eventState : payload?.eventState}
                                onChange={handleOnChange}
                                placeholder="State Name"
                            />
                        </div>
                        <div className="col-md-4 mb-1">
                            <label>ZIP</label>
                            <Input
                                required
                                style={{ height: "50px" }}
                                name="zip"
                                type="number"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.zip : payload?.zip}
                                onChange={handleOnChange}
                                placeholder="ZIP Code"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VenueDetails