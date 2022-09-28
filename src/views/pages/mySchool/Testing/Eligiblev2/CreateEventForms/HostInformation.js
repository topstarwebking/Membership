import React from "react";
import "../style.css"
import { Input } from "reactstrap";


const HostInformation = (props) => {
    const { setPayload, payload, selectedEvent, action } = props
    // console.log(selectedEvent)
    const handleOnChange = (e) => {
        let { value, name, type } = e.target
        setPayload({ ...payload, [name]: type === 'number' ? Number(value) : value })

    }
    return (
        <div className="mb-4">
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
                    <div className="row mt-2 mb-2">
                        <div className="col-md-6">
                            <label>Host Name</label>
                            <Input
                                required
                                onChange={handleOnChange}
                                style={{ height: "50px" }}
                                type="text"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.hostName : payload?.hostName}
                                name="hostName"
                                placeholder="Type Host Name"
                            />
                        </div>
                        <div className="col-md-6">

                            <label>Host Email</label>
                            <Input
                                required
                                onChange={handleOnChange}
                                style={{ height: "50px" }}
                                name="hostEmail"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.hostEmail : payload?.hostEmail}
                                type="email"
                                placeholder=" Enter Email"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">

                            <label>Mobile Number</label>
                            <Input
                                required
                                onChange={handleOnChange}
                                style={{ height: "50px" }}
                                name="hostMobileNumber"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.hostMobileNumber : payload?.hostMobileNumber}
                                type="number"
                                placeholder="Mobile Number"
                            />

                        </div>
                        <div className="col-md-6">

                            <label>Alternate Mobile Number</label>
                            <Input
                                required
                                onChange={handleOnChange}
                                style={{ height: "50px" }}
                                name="hostAlternateNumber"
                                defaultValue={action === "Edit" ? selectedEvent[0]?.hostAlternateNumber : payload?.hostAlternateNumber}
                                type="number"
                                placeholder="Alternate Mobile Number"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostInformation;