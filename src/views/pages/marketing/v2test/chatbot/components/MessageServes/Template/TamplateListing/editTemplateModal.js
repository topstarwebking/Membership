import { Edit } from "react-feather";
import { connect } from "react-redux";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Slide from "@material-ui/core/Slide";
import { IconButton, Button } from "@material-ui/core";
import React, { useState } from "react";
import { CardBody, FormGroup, Row, Col, Input, Form, Label } from "reactstrap";
import {
  UPLOAD_TEMPLATE,
  UPDATE_TEPLATE,
} from "../../../../../../../../../redux/actions/marketing/text";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ModalForm = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [templateText, setTemplateText] = useState({ ...props.item });
  const handlesubmit = (e) => {
    e.preventDefault();
    const payload = {
      template_name: templateText.template_name,
      text: templateText.text,
    };
    if (props.item) {
      props.UPDATE_TEPLATE(payload, templateText?._id, props.subFolderId);
    } else {
      props.UPLOAD_TEMPLATE(payload, props.rootFolderId, props.subFolderId);
    }
    setOpen(false);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTemplateText({
      ...templateText,
      [name]: value,
    });
  };

  return (
    <div>
      <Tooltip title="Edit" aria-label="edit">
        {props.item ? (
          <IconButton
            onClick={handleClickOpen}
            size="small"
            className="rounded-circle"
          >
            <Edit size={16} />
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            type="button"
            size="small"
            fontSize="16px"
            className="m-1 rounded"
            disabled={props.subfolderdata?.adminId !== undefined}
            style={{
              background: "#40a7e1",
              color: "#fff",
              width:'auto'
            }}
            onClick={handleClickOpen}
          >
            Add Template
          </Button>
        )}
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
      >
        <DialogTitle>SMS Template</DialogTitle>
        <DialogContent>
          <CardBody>
            <Form className="mt-10" onSubmit={handlesubmit}>
              <Row>
                <Col sm="12">
                  <FormGroup className="form-label-group">
                    <Input
                      type="text"
                      maxLength={30}
                      placeholder="Template name"
                      style={{ marginBottom: 8 }}
                      name={"template_name"}
                      className="full_height_Width"
                      defaultValue={templateText?.template_name}
                      onChange={changeHandler}
                    />
                    <Input
                      id="smsText"
                      type="textarea"
                      rows={3}
                      defaultValue={templateText?.text}
                      maxLength={templateText.maxCharacterCount}
                      placeholder="Type your message here..."
                      className="full_height_Width"
                      name={"text"}
                      onChange={changeHandler}
                    />
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 4,
                      }}
                    >
                      <span
                        style={{
                          cursor: "pointer",
                          height: 30,
                          width: 50,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* <EmojiEmotionsOutlinedIcon /> */}
                      </span>
                      <span
                        style={{
                          height: 30,
                          color: "#808080",
                        }}
                      >
                        {templateText.characterCount}
                        {templateText.maxCharacterCount}
                      </span>
                    </div>
                    <Label for="nameFloating">SMS Template</Label>
                  </FormGroup>
                </Col>
                <Col
                  sm="12"
                  style={{ display: "flex", justifyContent: "right" }}
                >
                  <FormGroup className="form-label-group">
                    <Button
                      variant="outlined"
                      type="cancel"
                      className="mr-1 mb-0 rounded"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      className="mb-0 rounded"
                      style={{
                        background: "#40a7e1",
                        color: "#fff",
                      }}
                    >
                      Save
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </DialogContent>
      </Dialog>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    subFolderId: state.template.subFolderId,
    rootFolderId: state.template.rootFolderId,
    subfolderdata: state.template?.subfolderdata,
  };
};
export default connect(mapStateToProps, { UPLOAD_TEMPLATE, UPDATE_TEPLATE })(
  ModalForm
);
