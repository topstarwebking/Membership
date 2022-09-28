import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import AllTesting from "./allTesting";
class FloatingLabels extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <Breadcrumbs
            breadCrumbTitle="Store"
            breadCrumbParent="Shop"
            breadCrumbActive="Product"
          />
          <AllTesting  gridNumber={6}/>
        </Col>
      </Row>
    );
  }
}
export default FloatingLabels;
