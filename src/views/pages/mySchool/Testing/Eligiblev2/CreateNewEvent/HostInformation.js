import React, { useState } from "react"
import {
    Input,
} from "reactstrap";

const HostInformation = (props) => {
    const { setMainPayload } = props
    const [payload, setPayload] = useState({})

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setPayload({ ...payload, [name]: value })
        setMainPayload(payload)
    }
    return (
        <>
            <div className="row">
                <div className="col-md-1">
                    <div className="verticalText">
                        <h1>HOST</h1>
                    </div>
                </div>
                <div className="col-md-10 ml-2">
                    <div className="headerIcons">
                        <i className="fa fa-user-md"></i>
                        <div className="headerText">
                            <span>Add Host Info</span>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Host Name</label>
                                <Input
                                    style={{ height: "50px" }}
                                    id="host-name"
                                    label="Host Name"
                                    name="hostName"
                                    variant="outlined"
                                    type="text"
                                    className="form-control"
                                    placeholder="Type Host Name"
                                    margin="normal"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">

                            <div className="form-group">
                                <label>Email</label>
                                <Input
                                    style={{ height: "50px" }}
                                    id="email"
                                    name="hostEmail"
                                    label="email"
                                    variant="outlined"
                                    type="text"
                                    className="form-control"
                                    placeholder="Type Email"
                                    margin="normal"
                                    onChange={handleOnChange}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label>Mobile Number</label>
                                <Input
                                    name="hostMobileNumber"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    variant="outlined"
                                    placeholder="Type Mobile Number"
                                    margin="normal"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">

                            <div className="form-group">
                                <label>Alternative Mobile Number</label>
                                <Input
                                    name="hostAlternateNumber"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    variant="outlined"
                                    placeholder="Type Alternative Mobile Number"
                                    margin="normal"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HostInformation
