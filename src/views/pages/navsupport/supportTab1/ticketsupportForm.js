import React from "react";
import { FormGroup, Col, Input, Form, Row, CustomInput } from "reactstrap";
import MUIEditor, { MUIEditorState } from "react-mui-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Button } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CREATE_TICKET } from "../../../../redux/actions/support";

const InputUpload = styled("input")({
  display: "none",
});
// CREATE_TICKET
const AddTicketForm = (props) => {
  const [type, setType] = React.useState("Billing");
  const [subject, setSubject] = React.useState("");
  const [ticket_image, setTicket_image] = React.useState("");
  const [editorState, setEditorState] = React.useState(
    MUIEditorState.createEmpty()
  );

  const EditorChange = (newState) => {
    setEditorState(newState);
  };

  const ticketImage = (e) => {
    setTicket_image(e.target.files[0]);
  };

  const handleChange = (e) => {
    let { value, name } = e.target;
    if (name === "type") {
      setType(value);
    } else {
      setSubject(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      type,
      subject,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      ticket_image,
      status: "Open",
      location: "united states of america",
    };
    props.CREATE_TICKET(payload);
    props.setTabActive(1);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="12" md="9" lg="9">
            <FormGroup>
              <span>Subject:</span>
              <Input
                onChange={handleChange}
                type="text"
                name="subject"
                placeholder="Subject"
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="3" lg="3">
            <FormGroup>
              <span>Seclect Type:</span>
              <CustomInput name="type" onChange={handleChange} type="select">
                <option value="Billing">Billing</option>
                <option value="Membership">Membership</option>
                <option value="General">General</option>
              </CustomInput>
            </FormGroup>
          </Col>
          <Col md="12" lg="12" sm="12">
            <FormGroup>
              <span> Description:</span>
              <MUIEditor editorState={editorState} onChange={EditorChange} />
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="contained-button-file">
                    <InputUpload
                      onChange={ticketImage}
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                    />
                    <Button
                      variant="contained"
                      component="span"
                      style={{ background: "#427dff", color: "#fff" }}
                    >
                      {ticket_image?.name || "+ Add file"}
                    </Button>
                  </label>
                </div>
                <div>
                  <Button
                    variant="contained"
                    type="submit"
                    className="rounded"
                    style={{ backgroundColor: "#00cfe8", color: "#fff" }}
                  >
                    <b> Add Ticket</b>
                  </Button>
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default connect(null, { CREATE_TICKET })(AddTicketForm);
