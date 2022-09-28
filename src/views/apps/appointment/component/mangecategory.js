import React, { useState, useEffect } from "react";
import {
  CustomInput,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from "../../../../redux/actions/appointment";
import { connect } from "react-redux";
import { Dialog } from "@material-ui/core";

const IsSmallDevise = window.matchMedia('(max-width:664px)').matches;
const ManageCategory = (props) => {
  const { handleCloseOpen, open, CREATE_CATEGORY, UPDATE_CATEGORY, item, IscategoryEdit } = props
  const [payload, setPayload] = useState({
    app_color: "#a30a0a",
    app_event_name: '',
    category: ''
  })

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (IscategoryEdit) {
      UPDATE_CATEGORY(payload, item?._id)
    } else {
      CREATE_CATEGORY(payload)
    }
    handleCloseOpen()
  }
  const handleChange = (e) => {
    let { name, value } = e.target
    setPayload({ ...payload, [name]: value })
  }
  useEffect(() => {
    if (item !== null || undefined) {
      let { app_event_name, app_color, category } = item
      setPayload({ app_event_name, app_color, category })
    }
  }, [item])
  return (
    <Dialog
      onClose={handleCloseOpen}
      open={open}
      PaperProps={{
        style: {
          width: IsSmallDevise ? '90%' : '500px'
        }
      }}
    >
      <div className="p-1">
        <Form onSubmit={handleOnSubmit}>
          <Row>
            <Col sm="9" md='9' lg='9'>
              <Label htmlFor="app_event_name">Appointment Category</Label>
              <FormGroup>
                <Input
                  type="text"
                  name="app_event_name"
                  required
                  defaultValue={item?.app_event_name}
                  onChange={handleChange}
                  id="app_event_name"
                  placeholder="Name"
                />
              </FormGroup>
            </Col>
            <Col sm="3" md="3" lg="3">
              <FormGroup>
                <Label htmlFor="app_color">Color</Label>
                <Input
                  name="app_color"
                  onChange={handleChange}
                  type="color"
                  defaultValue={item?.app_color}
                  required
                  id="app_color"
                />
              </FormGroup>
            </Col>
            <Col sm="12" md='12' lg='12'>
              <FormGroup>
                <Label htmlFor="category">Category</Label>
                <CustomInput type="select"
                  name="category"
                  required
                  defaultValue={item?.category}
                  onChange={handleChange} id="category">
                  <option value=''>Select One</option>
                  <option value='event'>Event</option>
                  <option value='appointment'>Appointment</option>
                </CustomInput>
              </FormGroup>
            </Col>
            <Col sm="12">
              <div className="d-flex justify-content-end">
                <Button.Ripple
                  outline color="secondary"
                  onClick={handleCloseOpen}
                  className="mr-1"
                >
                  Cancel
                </Button.Ripple>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1"
                >
                  Save
                </Button.Ripple>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Dialog>
  )
}

export default connect(null, {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
})(ManageCategory);
