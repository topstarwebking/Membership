import React, {useState} from "react"
import {
    Input,
} from "reactstrap";

function EventVenue(props) {
    const {setMainPayload} = props
    const [payload, setPayload] = useState({})

    const handleOnChange = (e) => {
        let {name, value} = e.target;
        setPayload({...payload, [name] : value})
        setMainPayload(payload)
    }
    return (
        <>
            <div className="row">
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
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Start Date & Time</label>
                                <Input
                                    name="start"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    variant="outlined"
                                    placeholder="Start Time and Date"
                                    margin="normal"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>End Date & Time</label>
                                <Input
                                    name="end"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    placeholder="End Time and Date"
                                    margin="normal"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Location</label>
                                <Input
                                    name="eventLocation"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    placeholder="Type Location"
                                    margin="normal"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Street</label>
                                <Input
                                    name="eventStreet"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    placeholder="Type Street"
                                    margin="normal"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>City</label>
                                <Input
                                    name="eventCity"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    placeholder="Type City Name"
                                    onChange={handleOnChange}
                                    margin="normal"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>State</label>
                                <Input
                                    name="eventState"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    placeholder="Type State Name"
                                    onChange={handleOnChange}
                                    margin="normal"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">

                            <div className="form-group">
                                <label>ZIP</label>
                                <Input
                                    name="zip"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    placeholder="Type ZIP Code"
                                    onChange={handleOnChange}
                                    margin="normal"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventVenue