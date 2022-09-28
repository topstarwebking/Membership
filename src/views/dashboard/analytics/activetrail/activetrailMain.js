import React from "react"
import {
  Row,
  Col,
} from "reactstrap"
// import TopProgramn from "./topProgram"
import TabsMain from "./TabsMain" 


class ActiveTrailMain extends React.Component {
  render() {
    return (
      <React.Fragment>
       
        <Row>
          <Col className="mb-1 invoice-header" md="12" sm="12">
              {/* <TopProgramn/> */}
              <TabsMain/>
          </Col>
          
        </Row>
      </React.Fragment>
    )
  }
}

export default ActiveTrailMain
