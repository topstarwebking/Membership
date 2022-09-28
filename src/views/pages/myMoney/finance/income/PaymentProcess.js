import { connect } from "react-redux";
import { Dialog, DialogContent, Button, Chip } from "@material-ui/core";
import { Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState, Fragment } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Settings from "@material-ui/icons/Settings";
import moment from "moment";
import CardDetails from "./CreaditCardDetails";
import NumberFormat from "react-number-format";
import { MEMBERSHIP_EMI_PAYMENT } from "../../../../../redux/actions/shop";

const PaymentProcess = (props) => {
    const { row, paymentSystem, month, year, MEMBERSHIP_EMI_PAYMENT } = props
    const [OpenDialog, setOpenDialog] = useState(false);
    const studentName = row?.name ? row?.name.split(" ") : []
    const [cardDetails, setCardDetails] = useState({
        pan: "",
        cvv: "",
        card_holder_name: "",
        expiry_month: "",
        expiry_year: "",
        address: "",
        street_no: "",
        zip: "",
    });
    // console.log(studentName, row)
    const CreatedBy = JSON.parse(localStorage.getItem("userdata"))?.data
        ?.username;
    const [payload, setPayload] = useState({
        Amount: row?.amount,
        balance: row?.balance,
        cheque_number: "",
        createdBy: CreatedBy,
        emiId: row?.emiId,
        payment_type: "cash",
        ptype: row?.ptype,
    })

    const changeHandler = (e, cardDetail = false) => {
        const { value, name } = e.target;
        if (cardDetail) {
            setCardDetails({
                ...cardDetails,
                [name]: value,
            });
        } else {
            setPayload({
                ...payload,
                [name]: value,
            });
        }
    };
    const membershipAction = () => {
        if (payload?.payment_type === "card") {
            payload.cardDetails = cardDetails;
        }
        let res = MEMBERSHIP_EMI_PAYMENT(payload, row?._id, row?.emiId, paymentSystem, month, year);
        if (res) {
            setOpenDialog(false)
        }

    }

    return (
        <Fragment>
            <Chip icon={<Settings fontSize="small" />} label='Process' size='small' onClick={() => { setOpenDialog(true) }} />
            <Dialog open={OpenDialog} onClose={() => { setOpenDialog(false) }}>
                <DialogTitle id="alert-dialog-title">Process Payment</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description"> */}
                    <Row>
                        <Col md="12" sm="12">
                            <Form>
                                <Row>
                                    <Col sm="12">
                                        <FormGroup>
                                            <div>
                                                <Label for="pname">Membership Name</Label>
                                            </div>
                                            <Input type="text"
                                                defaultValue={row?.membership_name}
                                                id="pname" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="4" md="4">
                                        <FormGroup>
                                            <div>
                                                <Label for="fName">First Name</Label>
                                            </div>
                                            <Input type="text"
                                                defaultValue={studentName[0]}
                                                id="fName" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="4" md="4">
                                        <FormGroup>
                                            <div>
                                                <Label for="lname">Last Name</Label>
                                            </div>
                                            <Input type="text"
                                                defaultValue={studentName[1]}
                                                id="lname" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="4" md="4">
                                        <FormGroup>
                                            <div>
                                                <Label for="amount">Amount</Label>
                                            </div>
                                            <Input type="text"
                                                defaultValue={row?.amount.toFixed(2)}
                                                id="amount" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="4" md="4">
                                        <FormGroup>
                                            <div>
                                                <Label for="due-date">Due Date</Label>
                                            </div>
                                            <Input
                                                type="text"
                                                defaultValue={moment(row?.date).format("MM-DD-YYYY")}
                                                id="due-date"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="4" md="4">
                                        <FormGroup>
                                            <div>
                                                <Label for="payment_type">Payment Type</Label>
                                            </div>
                                            <Input
                                                type="select"
                                                name="payment_type"
                                                id="payment_type"
                                                defaultValue={payload?.payment_type}
                                                onChange={changeHandler}
                                            >
                                                <option value="cash">Cash</option>
                                                <option value="card">Card</option>
                                                <option value="cheque">Cheque</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    {payload.payment_type === "card" && (
                                        <CardDetails cardDetails={cardDetails} changeHandler={changeHandler} />
                                    )}
                                    {payload.payment_type === "cheque" && (
                                        <>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <div>
                                                        <Label htmlFor="cheque_number">Check Number</Label>
                                                    </div>
                                                    <NumberFormat
                                                        required
                                                        name="cheque_number"
                                                        id="cheque_number"
                                                        value={payload?.cheque_number}
                                                        placeholder="Check number"
                                                        onChange={changeHandler}
                                                        format="#### #### ####"
                                                        className="form-control"
                                                    />
                                                    {!payload?.cheque_number && (
                                                        <span style={{ color: "red", fontSize: "12px" }}>
                                                            cheque number required!
                                                        </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </>
                                    )}
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => { setOpenDialog(false) }}
                        className="rounded"
                        variant="contained"
                        color="inherit"
                    >
                        cancel
                    </Button>
                    <Button
                        onClick={membershipAction}
                        color="primary"
                        variant="contained"
                        className="rounded"
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};
// const mapStateToProps = (state) => {
//   return {
//     viewActiveStudentInfo: state.member.viewActiveStudentInfo,
//     getStudentFinanceInfo: state.billingFinance.getStudentFinanceInfo,
//   };
// };

export default connect(null, { MEMBERSHIP_EMI_PAYMENT })(PaymentProcess);
