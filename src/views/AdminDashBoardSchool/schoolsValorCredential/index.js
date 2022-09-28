import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  Label,
} from "reactstrap";
import { ADD_UPDATE_VALOR_CREDENTIAL, UPDATE_GATEWAY_BY_ADMIN } from "../../../redux/actions/admin/School";
import { connect } from "react-redux";

const SchoolsValorCredential = (props) => {
  const { schoolInfo, pageNumber, UPDATE_GATEWAY_BY_ADMIN } = props;
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({});
  const [buttonDisable, setButtonDisable] = useState(false);
  const [updateGateway, setUpdateGateway] = useState({
    "stripe_sec": schoolInfo?.stripe_sec,
    "stripe_pub": schoolInfo?.stripe_pub
  })

  const toggleModal = () => {
    if (openModal) {
      setPayload({});
    }
    setOpenModal(!openModal);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const addValorPayload = async () => {
    setButtonDisable(!buttonDisable);
    const res = await props.ADD_UPDATE_VALOR_CREDENTIAL(
      payload,
      schoolInfo?._id,
      pageNumber
    );
    if (res) {
      toggleModal();
    }
    setButtonDisable(!buttonDisable);
  };

  // Gateway Handles
  const handleChange = (e) => {
    let { name, value } = e.target
    setUpdateGateway({ ...updateGateway, [name]: value })
  }

  const handleGatewayUpdate = () => {
    setButtonDisable(!buttonDisable);
    UPDATE_GATEWAY_BY_ADMIN(updateGateway, schoolInfo?._id)
  }
  return (
    <div>
      <Button.Ripple
        color="success"
        size="small"
        style={{ fontSize: "12px" }}
        outline
        onClick={toggleModal}
      >
        Add
      </Button.Ripple>
      <Modal
        isOpen={openModal}
        toggle={toggleModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggleModal}>
          {schoolInfo?.epi ? " Edit Payment Info" : "Edit Payment Info"}
        </ModalHeader>
        <ModalBody>
          <CardBody>
            <Row>
              <Col sm="6" md="6">
                <Label>SECRET KEY</Label>
                <Input
                  required
                  defaultValue={schoolInfo?.stripe_sec}
                  onChange={handleChange}
                  placeholder="Enter Secret Key"
                  type="text"
                  name="stripe_sec"
                />
              </Col>
              <Col sm="6" md="6">
                <Label>PUBLISH KEY</Label>
                <Input
                  required
                  defaultValue={schoolInfo?.stripe_pub}
                  onChange={handleChange}
                  placeholder="Enter Publish Key"
                  type="text"
                  name="stripe_pub"
                />
              </Col>
              <Col md={{ size: 8, offset: 4 }} className="justify-content-end d-flex mt-2">
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mb-1"
                  onClick={handleGatewayUpdate}
                >
                  Save
                  {/* {update ? "Save" : "Update"} */}
                </Button.Ripple>
              </Col>
            </Row>

            <Row>
              <Col sm="12" md="12">
                <Typography>Valor API Credential</Typography>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>App ID</Label>
                  <Input
                    defaultValue={schoolInfo?.app_id}
                    onChange={handleOnChange}
                    placeholder="Enter Valid app_id"
                    type="text"
                    name="app_id"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Auth Key</Label>
                  <Input
                    defaultValue={schoolInfo?.auth_key}
                    onChange={handleOnChange}
                    placeholder="Enter Valid auth_key"
                    type="text"
                    name="auth_key"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>EPI Key</Label>
                  <Input
                    defaultValue={schoolInfo?.epi}
                    onChange={handleOnChange}
                    placeholder="Enter Valid EPI Key"
                    type="text"
                    name="epi"
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <div className="d-flex justify-content-end">
                  <button
                    disabled={buttonDisable}
                    type="button"
                    className="btn btn-primary"
                    onClick={addValorPayload}
                  >
                    continue
                  </button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default connect(undefined, {
  ADD_UPDATE_VALOR_CREDENTIAL,
  UPDATE_GATEWAY_BY_ADMIN
})(SchoolsValorCredential);
