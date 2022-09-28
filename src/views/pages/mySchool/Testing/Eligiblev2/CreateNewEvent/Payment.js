import React, {useState} from "react"
import {
    Input,
} from "reactstrap";

export default function Payment(props){
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
                        <h1>TICKET</h1>
                    </div>
                </div>
                <div className="col-md-10 ml-2">
                    <div className="headerIcons">
                        <i className="fa fa-ticket"></i>
                        <div className="headerText">
                            <span>Let's Create Tickets</span>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Ticket Name</label>
                                <Input
                                    name="ticketName"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    placeholder="Give Your Ticket A Name"
                                    onChange={handleOnChange}
                                    margin="normal"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Ticket Available Quantity</label>
                                <Input
                                    name="ticketAvailabeQuantity"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    placeholder="How Many Ticket Are Available"
                                    margin="normal"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Ticket Price</label>
                                <Input
                                    name="ticktePrice"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    placeholder="Price Per Ticket"
                                    margin="normal"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Total Income</label>
                                <Input
                                    name="totalIncome"
                                    style={{ height: "50px" }}
                                    className="form-control"
                                    placeholder="Total Income"
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