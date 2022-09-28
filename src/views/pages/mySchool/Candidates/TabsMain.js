import React from "react";
import { Card, CardBody, Row, Col, CardHeader } from "reactstrap";
import "../../../../assets/scss/pages/users.scss";
import CandidateTable from "../../../apps/user/list/CandidateTable";

class UserEdit extends React.Component {
  state = {
    activeTab: "1",
  };

  toggle = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };
  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="headingtext">
                Candidate & Stripe Management{" "}
              </CardHeader>
              <CardBody className="pt-2">
                <CandidateTable />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default UserEdit;
