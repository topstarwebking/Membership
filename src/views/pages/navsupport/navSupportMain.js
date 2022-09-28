import React from "react";
import { Row, Col } from "reactstrap";
import MainSupportTicket from "./mainSupportTicket";
import TicketCounts from "./ticketCounts";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

class Navsupport extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Support"
          breadCrumbParent="Home"
          breadCrumbActive="Support"
        />
        <Row>
          <Col lg="12" sm="12" md="12">
            <TicketCounts />
            <MainSupportTicket />
            <supportTab1 />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Navsupport;
