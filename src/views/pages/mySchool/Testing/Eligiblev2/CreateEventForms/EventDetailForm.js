import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "../style.css"
import { CustomInput, Input } from "reactstrap";


const EventDetailForm = (props) => {
    const { setPayload, payload, setCategory, category, selectedEvent, action } = props
    const handleOnChange = (e) => {
        let { value, name } = e.target
        setPayload({ ...payload, [name]: value })
    }


    return (
        <>
            <div className="row ">
                <div className="col-md-1">
                    <div className="verticalText">
                        <h1>BASIC</h1>
                    </div>
                </div>
                <div className="col-md-10 ml-2">
                    <div className="headerIcons">
                        <i className="fa fa-align-left"></i>
                        <div className="headerText">
                            <span>Enter your event  Title & Description</span>
                        </div>
                    </div>

                    <div className="row my-2">
                        <div className="col-md-12 mb-1">
                            <label>Name</label>

                            <Input
                                required
                                onChange={handleOnChange}
                                name="title"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.title : payload?.title}
                                style={{ height: "50px" }}
                                placeholder="Event Name"
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Event Type</label>
                            <CustomInput
                                required
                                onChange={handleOnChange}
                                style={{ height: "50px" }}
                                type="select"
                                name="appointment_type"
                                id="appointmentType"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.appointment_type : payload?.appointment_type}
                            >
                                <option value={'General Event'}>General Event</option>
                                <option value={'Promotion Test'}>Promotion Test</option>
                            </CustomInput>
                        </div>
                        <div className="col-md-3">
                            <label>Event Category</label>
                            <div className="d-flex">
                                <Button
                                    className="p-1"
                                    onClick={() => setCategory("Public")}
                                    style={{
                                        color: category === "Public" ? "#0483fd" : "#6b6b6b",
                                        height: 50,
                                        background: category === "Public" ? "#e6f3fe" : "",
                                        borderRadius: "4px",
                                        // width: "100px",
                                        border: category === "Public" ? "1px solid #0483fd" : "1px solid #b8c2cc",
                                    }}
                                >
                                    Public
                                </Button>
                                <Button
                                    className="ml-1 p-1"
                                    onClick={() => setCategory("Private")}
                                    style={{
                                        color: category !== "Public" ? "#0483fd" : "#6b6b6b",
                                        height: 50,
                                        background: category !== "Public" ? "#e6f3fe" : "",
                                        borderRadius: "4px",
                                        // width: "100px",
                                        border: category !== "Public" ? "1px solid #0483fd" : "1px solid #b8c2cc",
                                    }}
                                >
                                    Private
                                </Button>
                            </div>

                        </div>
                        <div className="col-md-3 mb-1">
                            <label>Color</label>
                            <Input
                                required
                                type="color"
                                onChange={handleOnChange}
                                name="app_color"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.app_color : payload?.app_color}
                                style={{ height: "50px" }}
                            />
                        </div>
                        <div className="col-md-12 mt-1">
                            <label>Description</label>
                            <Input
                                required
                                type='textarea'
                                name='notes'
                                rows={4}
                                defaultValue={action === "Edit" ? selectedEvent[0]?.notes : payload?.notes}
                                placeholder='Add text......'
                                onChange={handleOnChange} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetailForm;

