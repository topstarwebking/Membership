import React from "react"
import { Row, Col,CardBody,Card,CardHeader, CardTitle } from "reactstrap"
import "../../../../../assets/scss/pages/users.scss"




class TopProgram extends React.Component {
  render() {
    return (
      <React.Fragment>
        
        <Row>
          <Col lg="3" md="12">
          <Card>
                <CardHeader className="pd-add cd-h">
                    <CardTitle style={{textAlign:"center",fontSize:"17px",color:"white"}}>Monthly Payment</CardTitle>
                </CardHeader>
                
              <CardBody className="cd_height1">
                  <Row>
                     <div className="box">
                        <div className="lf-text">
                          <p className="st-1">In House Received:</p>
                        </div>
                        <div className="rh-text">
                           <p className="st-2">$40000</p>
                        </div>
                     </div>
                    
                     <div className="box">
                        <div className="lf-text">
                        <p className="st-1">Auto Pay Recived:</p>
                        </div>
                        <div className="rh-text">
                        <p className="st-2">$30000</p>
                        </div>
                     </div>
                    
                     <div className="box">
                        <div className="lf-text">
                        <p className="st-1">Total Recived:</p>
                        </div>
                        <div className="rh-text">
                        <p className="st-2">$70000</p>
                        </div>
                     </div>
                  </Row>
              </CardBody>
          </Card>
          </Col>
          
        </Row>
      </React.Fragment>
    )
  }
}

export default TopProgram
