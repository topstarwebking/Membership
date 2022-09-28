import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Input, Button, Label, ButtonGroup } from "reactstrap";
import { ArrowRight } from "react-feather";
import MUIEditor from "react-mui-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { SEND_EMAIL } from "../../../redux/actions/email";
import AttachFiles from "../marketing/email/components/attacheFiles";
import ReactEmailTemplater from "../marketing/email/components/ReactEmailTemplater";
import { connect } from "react-redux";
import { Select, MenuItem, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  inputStyle: {
    marginBottom: "10px",
    borderRadius: "0.4em",
    width: "100%",
    height: "2.8rem",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
}));
const getLogedInUser = () => {
  return JSON.parse(localStorage.getItem("userdata"))?.data;
};

const HorizontalForm = (props) => {
  const classes = useStyles();
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const EmailEditorRef = useRef(null);
  const [emailBodyType, setEmailBodyType] = useState("BASIC");
  const [fileUploaded, setFileUploaded] = useState([]);
  const [state, setState] = useState({
    from: "",
    to: [props.item?.email],
    subject: "",
    title: "test",
    template: "",
    repeat_mail: "every month",
    follow_up: "4",
    design: "",
    days_type: "after",
    immediately: true,
    content_type: "",
    html: "",
    isPlaceHolders: false,
  });
  const [fromList, setFromList] = useState(null);
  const { toggleModal } = props;
  const HandleSend = async () => {
    let payload = {};
    if (emailBodyType !== "BASIC") {
      const template = await EmailEditorRef.current.getHTML();
      payload = {
        ...state,
        template: template.html,
        html: template.html,
        design: JSON.stringify(template.design),
        content_type: "builder",
      };
    } else {
      const template = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      payload = {
        ...state,
        template,
        html: template,
        content_type: "text",
      };
    }

    let formData = new FormData();
    for (let file of fileUploaded) {
      formData.append("attachments", file);
    }
    delete payload?.to;
    formData.append("to", JSON.stringify(state.to));
    let dataEntries = Object.entries(payload);
    dataEntries.map((v, i) => {
      formData.append(v[0], v[1]);
      return v;
    });
    props.SEND_EMAIL(`/api/email_compose`, formData);
    toggleModal();
  };
  const handleSetSatet = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const EditorChange = (newState) => {
    setEditorState(newState);
  };

  useEffect(() => {
    let bussinessEmail = getLogedInUser()?.email;
    setFromList([bussinessEmail]);
    if (bussinessEmail?.length > 0) {
      setState({
        ...state,
        from: bussinessEmail,
      });
    }
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-center mb-2">
        <ButtonGroup>
          <button
            type="button"
            className={` ${
              emailBodyType === "BASIC"
                ? `btn btn-primary `
                : "btn btn-outline-primary"
            }`}
            onClick={() => {
              setEmailBodyType("BASIC");
            }}
          >
            BASIC
          </button>
          <button
            type="button"
            onClick={() => {
              setEmailBodyType("BUILDER");
            }}
            className={`${
              emailBodyType === "BUILDER"
                ? `btn btn-primary `
                : "btn btn-outline-primary "
            }`}
          >
            BUILDER
          </button>
        </ButtonGroup>
      </div>
      <Row>
        <Col md="3">
          <Label>From:</Label>
          {fromList?.length > 0 && (
            <Select
              className={classes.inputStyle}
              style={{
                height: "2.8em",
                padding: "0 10px",
                width: "100%",
              }}
              variant="outlined"
              name="from"
              defaultValue={state?.from}
              onChange={handleSetSatet}
            >
              {fromList?.map((itemEmail, i) => {
                return (
                  <MenuItem value={itemEmail} key={i}>
                    {itemEmail}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        </Col>
        <Col md="3">
          <Label>To:</Label>
          <Input
            type="email"
            name="to"
            id="to"
            placeholder="to"
            value={state?.to[0]}
            onChange={handleSetSatet}
          />
        </Col>
        <Col md="3">
          <Label>Subject:</Label>
          <Input
            type="text"
            name="subject"
            id="subject"
            placeholder="subject"
            onChange={handleSetSatet}
          />
        </Col>
        <Col>
          <AttachFiles
            setFileUploaded={setFileUploaded}
            fileUploaded={fileUploaded}
          ></AttachFiles>
        </Col>
        <Col md="12">
          {emailBodyType === "BASIC" ? (
            <div style={{ height: "50vh" }}>
              <MUIEditor editorState={editorState} onChange={EditorChange} />
            </div>
          ) : (
            <ReactEmailTemplater
              ref={EmailEditorRef}
              setEmailBodyType={setEmailBodyType}
              EditorChange={EditorChange}
              design={state?.design}
            />
          )}
        </Col>
        <Col md="12">
          <div className="d-flex justify-content-end">
            <Button.Ripple
              color="primary"
              className="mr-1 mb-1"
              onClick={HandleSend}
            >
              Send
              <ArrowRight size="14" />
            </Button.Ripple>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default connect(null, { SEND_EMAIL })(HorizontalForm);
