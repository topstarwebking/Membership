import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Col,
  Input,
  Button,
  Row
} from "reactstrap"
import { UPDATE_GATEWAY_USER_BY_ADMIN, GET_USER_GATEWAY_DATA } from "../../../../redux/actions/settings/schedule"

const GetwayApi = (props) => {
  const { UPDATE_GATEWAY_USER_BY_ADMIN, GET_USER_GATEWAY_DATA, userGateway } = props
  const [update, setUpdate] = useState(false)
  const [updateGateway, setUpdateGateway] = useState({
    "stripe_sec": "",
    "stripe_pub": ""
  })

  const handleChange = (e) => {
    let { name, value } = e.target
    setUpdateGateway({ ...updateGateway, [name]: value })
  }

  useEffect(() => {
    GET_USER_GATEWAY_DATA()
  }, [GET_USER_GATEWAY_DATA])

  const handleGatewayUpdate = () => {
    UPDATE_GATEWAY_USER_BY_ADMIN(updateGateway)
    setUpdate(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stripe Payment Gateway</CardTitle>
      </CardHeader>
      <CardBody>
        <Row className="mb-2">
          <Col md="4">
            <span>SECRET KEY</span>
          </Col>
          <Col md="8">
            <Input
              onChange={handleChange}
              defaultValue={userGateway.stripe_sec}
              type="text"
              name="stripe_sec"
              placeholder="Enter Secret Key"
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md="4">
            <span>PUBLISH KEY</span>
          </Col>
          <Col md="8">
            <Input
              onChange={handleChange}
              type="text"
              defaultValue={userGateway.stripe_pub}
              name="stripe_pub"
              placeholder="Enter Publish Key"
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={{ size: 8, offset: 4 }} className="justify-content-end d-flex">
            <Button.Ripple
              color="primary"
              type="submit"
              className="mb-1"
              onClick={handleGatewayUpdate}
            >
              {update ? "Save" : "Update"}
            </Button.Ripple>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    userGateway: state.setting.userGateway
  };
};

export default connect(mapStateToProps, {
  GET_USER_GATEWAY_DATA,
  UPDATE_GATEWAY_USER_BY_ADMIN
})(GetwayApi);

