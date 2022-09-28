

import React from "react"
import {
    FormGroup,
    Input,
    CustomInput,
    Row,
    Col,
    Card,
    CardBody,
    Label
} from "reactstrap"

import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ADD_STUDENT_FINANCE_INFO, GET_STUDENT_FINANCE_INFO, UPDATE_STUDENT_FINANCE_INFO } from '../../../../redux/actions/billing';

class AddCardInfo extends React.Component {

    state = {
        card_type: this.props?.actionOn.card_type ? this.props?.actionOn?.card_type: "credit",
        status: "active",
        pan: this.props?.actionOn?.pan ?this.props?.actionOn?.pan: "",
        cvv: this.props?.actionOn?.cvv ?this.props?.actionOn?.cvv: "",
        expiry_month: this.props?.actionOn?.expiry_date ? this.props?.actionOn?.expiry_date.substr(0,2) : "",
        expiry_year: this.props?.actionOn?.expiry_date ? this.props?.actionOn?.expiry_date.substr(2,3) : "",
        address: {
            address: this.props?.actionOn?.address ?this.props?.actionOn?.address?.address: "",
            street_no:  this.props?.actionOn?.address ?this.props?.actionOn?.address?.street_no: "",
            zip: this.props?.actionOn?.address ?this.props?.actionOn?.address?.zip: "",
        }
    }

    handleOnChange = (e, isAddress) => {
        let { name, value } = e.target
        if (isAddress) {
          this.setState({ ...this.state, address: {...this.state.address, [name]: value} })
        } else {
          this.setState({ ...this.state, [name]: value })
        }
    }
    addInfoToCard = () => {
        let payload = this.state
        if (payload?.address?.zip.toString().length != 5) {
            alert('Please add 5 digit valid zip code')
        } else if (payload?.pan?.toString().length != 16) {
            alert('Please add 16 digit valid card number')
        } else if (payload?.cvv?.toString().length != 3) {
            alert('Please add 3 digit valid CVV number')
        } else {
            if (this.props.actionOn?.pan !== undefined) {
                this.props.UPDATE_STUDENT_FINANCE_INFO(this.props?.actionOn?._id, payload)
            } else {
                this.props.ADD_STUDENT_FINANCE_INFO(payload)
            }
        }
    }

    render() {
        const { actionOn } = this.props
        return (
            <Card>
                <CardBody>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label>Card Type </Label>
                                <CustomInput onChange={this.handleOnChange} defaultValue={actionOn?.card_type} type="select" name="card_type">
                                    <option value="credit">Credt card</option>
                                    <option value="debit">Debit card</option>
                                </CustomInput>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label>Card Category</Label>
                                <CustomInput onChange={this.handleOnChange} defaultValue={actionOn?.credit_card_type} type="select" name="credit_card_type">
                                    <option value="Discover">Discover </option>
                                    <option value="Visa">Visa </option>
                                    <option value="Amex">American Express </option>
                                    <option value="Mastercard">Master Card </option>
                                </CustomInput>
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <Label>Card Holder Name</Label>
                                <Input defaultValue={actionOn?.card_holder_name} onChange={this.handleOnChange}
                                    placeholder='Enter name'
                                    type="text"
                                    name="card_holder_name"
                                />
                            </FormGroup>
                        </Col>

                        <Col md="6" sm="6">
                            <FormGroup>
                                <Label>Card Number</Label>
                                <Input defaultValue={actionOn?.pan} onChange={this.handleOnChange}
                                    type="number"
                                    name="pan"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6" sm="6">
                            <FormGroup>
                                <Label>CVV </Label>
                                <Input defaultValue={actionOn?.cvv} onChange={this.handleOnChange} name='cvv' type="number" />
                            </FormGroup>
                        </Col>
                        <Col md="6" sm="6">
                            <FormGroup>
                                <Label>Expiry Month </Label>
                                <CustomInput onChange={this.handleOnChange} defaultValue={actionOn?.expiry_date ?actionOn?.expiry_date.substr(0,2) : ""} type="select" name="expiry_month">
                                    <option value=''>--Select Month--</option>
                                    <option value='01'>01</option>
                                    <option value='02'>02</option>
                                    <option value='03'>03</option>
                                    <option value='04'>04</option>
                                    <option value='05'>05</option>
                                    <option value='06'>06</option>
                                    <option value='07'>07</option>
                                    <option value='08'>08</option>
                                    <option value='09'>09</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>
                                </CustomInput>
                            </FormGroup>
                        </Col>
                        <Col md="6" sm="6">
                            <FormGroup>
                                <Label>Expiry Year </Label>
                                <CustomInput onChange={this.handleOnChange} defaultValue={actionOn?.expiry_date ?actionOn?.expiry_date.substr(2,3) : ""} type="select" name="expiry_year">
                                    <option value=''>--Select year--</option>
                                    <option value='22'>2022</option>
                                    <option value='23'>2023</option>
                                    <option value='24'>2024</option>
                                    <option value='25'>2025</option>
                                    <option value='26'>2026</option>
                                    <option value='27'>2027</option>
                                    <option value='28'>2028</option>
                                    <option value='29'>2029</option>
                                    <option value='30'>2030</option>
                                    <option value='31'>2031</option>
                                    <option value='33'>2033</option>
                                    <option value='34'>2034</option>
                                    <option value='35'>2035</option>
                                    <option value='36'>2036</option>
                                    <option value='37'>2037</option>
                                    <option value='38'>2038</option>
                                    <option value='39'>2039</option>
                                    <option value='40'>2040</option>
                                    <option value='41'>2041</option>
                                    <option value='42'>2042</option>
                                    <option value='43'>2043</option>
                                    <option value='44'>2044</option>
                                </CustomInput>
                            </FormGroup>
                        </Col>
                        {/* <Col md="6">
                            <FormGroup>
                                <Label >Zip code</Label>
                                <Input onChange={this.handleOnChange} defaultValue={actionOn?.zip_postal} name="zip_postal" type="text" />
                            </FormGroup>
                        </Col> */}
                        

                        <Col md="6" sm="6" >
        <FormGroup className="form-label-group">
          <div>
            <Label for="Address">Address</Label>
          </div>
          <Input
            required
            type="text"
            name="address"
            id="Address"
            placeholder="Address"
            defaultValue={actionOn?.address?.address}
            onChange={(e) => this.handleOnChange(e, true)}
          />
        </FormGroup>
      </Col>
      <Col md="6" sm="6">
        <FormGroup className="form-label-group">
          <div>
            <Label for="Street">Street</Label>
          </div>
          <Input
            required
            type="text"
            name="street_no"
            id="Street"
            placeholder="Street"
            defaultValue={actionOn?.address?.street_no}
            onChange={(e) => this.handleOnChange(e, true)}
          />
        </FormGroup>
      </Col>
      <Col md="6" sm="6">
        <FormGroup className="form-label-group">
          <div>
            <Label for="Zip">Zip</Label>
          </div>
          <Input
            required
            type="number"
            name="zip"
            id="Zip"
            placeholder="Zip"
            defaultValue={actionOn?.address?.zip}
            onChange={(e) => this.handleOnChange(e, true)}
            format="#####"
            className="form-control"
          />
        </FormGroup>
      </Col>

      <Col md="6" sm="6">
                            <FormGroup>
                                <Label >Status</Label>
                                <CustomInput onChange={this.handleOnChange} defaultValue={actionOn?.status} type="select" name="status" id="status">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </CustomInput>
                            </FormGroup>
                        </Col>

                        {/* <Col md="12">
                            <FormGroup>
                                <span >Billing Address</span>
                                <Input onChange={this.handleOnChange} defaultValue={actionOn?.billing_address} name="billing_address" type="text" />
                            </FormGroup>
                        </Col> */}
                        {/* <Col md="12">
                            <FormGroup>
                                <span>Notes</span>
                                <Input onChange={this.handleOnChange}
                                    defaultValue={actionOn?.notes}
                                    type="textarea"
                                    name="notes"
                                />
                            </FormGroup>
                        </Col> */}
                        <Col md="12">
                            <div className='d-flex justify-content-end'>
                                <button type="button" className="btn btn-primary" onClick={this.addInfoToCard}>Continue
                                    <span role='img' aria-label='party emoji here' className='ml-1'>🎉</span>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </CardBody >
            </Card >
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps, { ADD_STUDENT_FINANCE_INFO, GET_STUDENT_FINANCE_INFO, UPDATE_STUDENT_FINANCE_INFO })(AddCardInfo);

