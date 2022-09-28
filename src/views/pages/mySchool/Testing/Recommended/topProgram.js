import React from "react"
import { Row, Col } from "reactstrap"
import Eligible from "./Eligible"
import Registered from "./Registered"
import Recommended from "./Recommended"

class TopProgram extends React.Component {
  render() {
    return (
      <React.Fragment>

        <Row>
          <Col lg="4" md="12">
            <Eligible />
          </Col>
          <Col lg="4" md="12" className="text-center align-middle">

            <Recommended />
          </Col>
          <Col lg="4" md="12" className="text-center align-middle">
            <Registered />

          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default TopProgram
