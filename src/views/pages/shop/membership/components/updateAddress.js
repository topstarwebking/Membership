import React from "react";
import {
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
import { Chip, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles(() => ({
    editbillAddress: {
        borderRadius: '4px',
        color: '#2796f3',
        fontWeight: 'bold',
        background: '#eaf4fe'
    }
}));
const UpdateAddress = ({ address, handelChange, toggleModal, modalOpen }) => {
const classes = useStyles()
  return (
    <div style={{zIndex:'1300'}}>
      <Chip onClick={toggleModal} size='small' icon={<EditIcon  style={{ color: "#2796f3" }} />} label={'Edit/Add'} className={classes.editbillAddress} />
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggleModal}>
          {address?.zip ? "Edit Address" : "Add Address"}
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Row>
                <Col sm="12">
                  <FormGroup>
                    <Label>Address</Label>
                    <Input
                      type="textarea"
                      name="address"
                      placeholder="address.."
                      defaultValue={address?.address}
                      onChange={handelChange}
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label>Street Number</Label>
                    <Input
                      type="text"
                      name="street_no"
                      placeholder="Street no.."
                      defaultValue={address?.street_no}
                      onChange={handelChange}
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label>Zip</Label>
                    <Input
                      type="number"
                      name="zip"
                      placeholder="Zip code.."
                      defaultValue={address?.zip}
                      onChange={handelChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={toggleModal}
                    >
                      Save
                      <span
                        role="img"
                        aria-label="party emoji here"
                        className="ml-1"
                      >
                        🎉
                      </span>
                    </button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default UpdateAddress;
