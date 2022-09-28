import React, { useEffect } from "react";
import { FormGroup, Col, Input, Form, Row, CustomInput } from "reactstrap";
import { connect } from "react-redux";
import MUIEditor, { MUIEditorState } from "react-mui-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Button, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { UPDATE_TICKET_USER } from "../../../../redux/actions/support";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const InputUpload = styled("input")({
  display: "none",
});

const EditTicketForm = (props) => {
  const { SelectedEdit, backTotable } = props;
  const [type, setType] = React.useState("Billing");
  const [subject, setSubject] = React.useState("");
  const [ticket_image, setTicket_image] = React.useState("");
  const [editorState, setEditorState] = React.useState(
    MUIEditorState.createEmpty()
  );
  console.log(SelectedEdit);
  const customContentStateConverter = (contentState) => {
    const newBlockMap = contentState.getBlockMap().map((block) => {
      const entityKey = block.getEntityAt(0);
      if (entityKey !== null) {
        const entityBlock = contentState.getEntity(entityKey);
        const entityType = entityBlock.getType();
        switch (entityType) {
          case "IMAGE": {
            const newBlock = block.merge({
              type: "atomic",
              text: "img",
            });
            return newBlock;
          }
          default:
            return block;
        }
      }
      return block;
    });
    const newContentState = contentState.set("blockMap", newBlockMap);
    return newContentState;
  };

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(SelectedEdit?.description);
    let editorState = EditorState.createWithContent(
      customContentStateConverter(
        ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
      )
    );

    setEditorState(editorState);
  }, [SelectedEdit]);

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
    props.UPDATE_TICKET_USER(payload, SelectedEdit?._id);
  };
  return (
    <div>
      <div className="d-flex justify-content-start align-items-center">
        <Button size="small" onClick={backTotable}>
          <ArrowBackIcon /> Back
        </Button>
        <Typography className="m-1">
          <b>Edit Ticket </b>({SelectedEdit?.subject})
        </Typography>
      </div>
      <br />
      <br />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="12" md="8" lg="8">
            <FormGroup>
              <span>Subject:</span>
              <Input
                defaultValue={SelectedEdit?.subject}
                onChange={handleChange}
                type="text"
                name="subject"
                placeholder="Subject"
              />
            </FormGroup>
          </Col>
          <Col sm="6" md="2" lg="2">
            <FormGroup>
              <span>Seclect Type:</span>
              <CustomInput
                name="type"
                onChange={handleChange}
                defaultValue={SelectedEdit?.type}
                type="select"
              >
                <option value="Billing">Billing</option>
                <option value="Membership">Membership</option>
                <option value="General">General</option>
              </CustomInput>
            </FormGroup>
          </Col>
          <Col sm="6" md="2" lg="2">
            <FormGroup>
              <span>Status:</span>
              <CustomInput
                name="status"
                defaultValue={SelectedEdit?.status}
                onChange={handleChange}
                type="select"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Pending">Pending</option>
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
                  <Typography color="secondary">
                    {ticket_image !== null
                      ? "Click on the button for change"
                      : null}
                  </Typography>
                </div>
                <div>
                  <Button
                    variant="contained"
                    type="submit"
                    className="rounded"
                    style={{ backgroundColor: "#00cfe8", color: "#fff" }}
                  >
                    <b>Save</b>
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

export default connect(null, { UPDATE_TICKET_USER })(EditTicketForm);
