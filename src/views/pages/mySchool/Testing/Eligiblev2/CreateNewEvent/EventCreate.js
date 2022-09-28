import React, { useState } from "react"
import {
    Typography,
    Card,
    Button,
    Stepper,
    Step,
    StepLabel,

} from "@material-ui/core";
import {
    FormGroup,
    Label,
    Input,
    CustomInput,
} from "reactstrap";


const EventCreate = (props) => {
    const { setMainPayload } = props
    const [payload, setPayload] = useState({})
    const [eventActive, setEventActive] = useState()

    const handleClickBtn = (event) => {
        setEventActive(event.target.id);
    }

    const handleOnChange = (e) => {
        let { name, value } = e.target
        setPayload({ ...payload, [name]: value })
        setMainPayload(payload)
    }

    // console.log(payload)
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
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Event Title</label>
                                        <Input
                                            name="title"
                                            style={{ height: "50px" }}
                                            className="form-control"
                                            placeholder="Give Your Ticket A Name"
                                            margin="normal"
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <FormGroup >
                                        <Label htmlFor="category">Event Category</Label>
                                        <CustomInput
                                            style={{ height: "50px" }}
                                            type="select"
                                            name="category"
                                            onChange={handleOnChange}
                                            id="category"
                                        >
                                            <option value="">Select One</option>
                                            <option value="event">Event</option>
                                            <option value="appointment">Appointment</option>
                                        </CustomInput>
                                    </FormGroup>
                                </div>
                                <div className="col-md-3">
                                    <label>Event Type</label>
                                    <div className="d-flex">
                                        <Card
                                            className={`p-1 ${eventActive === "8" ? "btn btn-primary" : "btn btn-primary disabled"}`}
                                            id={"8"}
                                            onClick={handleClickBtn}
                                        >
                                            Public
                                        </Card>
                                        <Card className={`p-1 ml-1 ${eventActive === "9" ? "btn btn-primary" : "btn btn-primary disabled"}`}
                                            id={"9"}
                                            onClick={handleClickBtn}
                                        >
                                            Private
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group" style={{ marginBottom: "0.5rem" }}>
                                <label>Event Information</label>
                                <textarea
                                    name="notes"
                                    className="form-control"
                                    placeholder="Information"
                                    onChange={handleOnChange}
                                    rows="4"
                                    margin="normal"
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventCreate