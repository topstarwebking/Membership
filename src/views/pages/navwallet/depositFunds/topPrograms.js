import React from "react"
import { DollarSign,PhoneCall ,Square,} from "react-feather"
// import Input from "react-select/src/components/Input"
// import Input from "react-select/src/components/Input"
import { Row, Col,CardBody,Card, CustomInput, Button } from "reactstrap"
import "../../../../assets/scss/pages/users.scss"
import DepositForm from "./depositForm"

class TopProgram extends React.Component {
  render() {
    return (
      <React.Fragment>
           <div className="title-deposit-form">
               <h3>Deposit Fund or Select a Plan</h3>
           </div>
        <Row>
          <Col lg="4" md="12">
          <Card>
               
              <CardBody  className="card-content">
                 <DollarSign className="icon-circle-diposit"
                    fontSize="25"
                 />
                   <h3 className="mass1"> Deposit Funds</h3>
                   <p className="mass">Use CMA Planner to contact/chat with leads and students via text messaging.</p>
                   <form>
                       <CustomInput type="select">
                          <option>Select Location</option>
                          <option>Quentin Rd</option>
                        </CustomInput>
                   </form>
              </CardBody>
          </Card>
            
          </Col>
          <Col lg="4" md="12">
          <Card>
                 <CardBody  className="card-content">
                    <Square className="icon-circle-diposit"
                        fontSize="25"
                    />
                      <h3 className="mass1"> SMS</h3>
                      <p className="mass">Use CMA Planner to contact/chat with leads and students via text messaging.</p>
                      <form>
                          <CustomInput type="select">
                             <option>Select Location</option>
                             <option>Quentin Rd</option>
                          </CustomInput>
                      </form>
                  </CardBody>
          </Card>
            
          </Col>
          <Col lg="4" md="12">
          <Card>
                  <CardBody  className="card-content">
                    <PhoneCall className="icon-circle-diposit"
                        fontSize="25"
                    />
                      <h3 className="mass1"> Voice</h3>
                      <p className="mass">Use CMA Planner to track staff activity & improve efficiency By monitoring phone calls.</p>
                      <form>
                      <CustomInput type="select">
                            <option>Select Location</option>
                            <option>Quentin Rd</option>
                      </CustomInput>
                      </form>
                  </CardBody>
          </Card>
            
          </Col>
        </Row>
         
           <div className="title-deposit-form">
               <h3>Select Payment Method</h3>
           </div>
         <Row>
          <Col lg="1" md="12">
          </Col>  
          <Col lg="5" md="12">
          <Card className="crdheight">
              <CardBody >
                <DepositForm/>
                   
              </CardBody>
          </Card>
            
          </Col>
          <Col lg="5" md="12">
          <Card className="crdheight">
                  <CardBody  className="card-content">
                    <h4 className="T-total">Selected Plan: None</h4>
                    <div className="T-total">
                       <h5 className="T-total-h5" >Total</h5>
                       <p  className="T-total-p">$0.00</p>
                    </div> 
                    <Button className="cnfn-btn"> Confirm & PAY</Button>
                    <p>You agree to authorize the use of your card for this deposit and future payments.</p>
                  </CardBody>
          </Card>
            
          </Col>
          <Col lg="1" md="12">
           </Col>
        </Row>

      </React.Fragment>
    )
  }
}

export default TopProgram
