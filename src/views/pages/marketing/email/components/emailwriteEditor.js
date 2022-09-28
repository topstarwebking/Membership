import React, { Fragment, useEffect, useState, useRef } from "react";
import { Input, FormGroup, ButtonGroup, CustomInput } from "reactstrap";

import { makeStyles } from "@material-ui/styles";
import {
  ADD_TEMPLATE_TO_EMAIL,
  UPDATE_TEMPLATE_TO_EMAIL,
  SEND_EMAIL,
  GET_CATEGORIES_EMAIL,
} from "../../../../../redux/actions/email";
import { Get_User_Info } from "../../../../../redux/actions/auth/loginActions"
import { CardContent, Card, Button, Select, MenuItem } from "@material-ui/core";
import MUIEditor from "react-mui-draft-wysiwyg";
import { EditorState, Modifier } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";
import { convertToRaw } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import draftToHtml from "draftjs-to-html";
import { GET_ALL_TYPE_STUDENT } from "../../../../../redux/actions/member/index";
import "./index.css";
import AttachFiles from "./attacheFiles";
import SaveFolderSelect from "./folderSelect";
import MainSmartList from "./MainSmartList";
import ReactEmailTemplater from "./ReactEmailTemplater";
import ActivationUpon from "./ActivationUpon";
import moment from "moment";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";
import EmailFieldMerge from "./mergeField";

const toastCss = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};
const getLogedInUser = () => {
  return JSON.parse(localStorage.getItem("userdata"))?.data;
};

const useStyles = makeStyles(() => ({
  CardStyle: {
    boxShadow: "0 4px 20px 0 rgb(0 0 0 / 5%)",
    borderRadius: "0rem",
  },
  sendTem: {
    borderRadius: "8px !important",
    background: "#00a6e1 !important",
    color: "#fff",
    fontWeight: "bold",
  },
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

const EmailWriteOrEdit = (props) => {
  const classes = useStyles();
  const {
    ADD_TEMPLATE_TO_EMAIL,
    UPDATE_TEMPLATE_TO_EMAIL,
    SEND_EMAIL,
    template,
    userinfo,
    Get_User_Info,
    setViewTemplate,
    getAllSmartList,
  } = props;
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const { MailIndexType, setEditOrAddOrListTemplate, FolderList } = props;
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const EmailEditorRef = useRef(null);
  const [date, setdate] = useState({
    sent_date: new Date(),
    sent_time: new Date(),
  });
  const [templatePayload, setTemplatePayload] = useState({
    from: getLogedInUser()?.email,
    to: [],
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

  const [MainFolderSelected, setMainFolderSelected] = useState({});
  const [SubFolderSelected, setSubFolderSelected] = useState({});
  const [fromList, setFromList] = useState(null);
  const [fileUploaded, setFileUploaded] = useState([]);
  const [SelectTypeToSendEmail, setSelectTypeToSendEmail] = useState("smartlist");
  const [smartlistRows, setSmartListRows] = useState([]);
  const [smartlistId, setSmartListId] = useState([]);
  const [emailBodyType, setEmailBodyType] = useState("BASIC");

  const EditorChange = (newState) => {
    setEditorState(newState);
  };

  const handleFeildValue = (e) => {
    let { name, value } = e.target;
    if (name === "from") {
      setTemplatePayload({ ...templatePayload, from: getLogedInUser()?.firstname + " " + value });
    } else
      setTemplatePayload({ ...templatePayload, [name]: value });
  };
  const handleToList = (e) => {
    let { value } = e.target;
    templatePayload.to = value.split(",");
    setTemplatePayload({ ...templatePayload });
  };
  const handleSelectMainFolder = (e, item) => {
    setMainFolderSelected(item);
  };
  const handleSelectsubFolder = (e, item) => {
    setSubFolderSelected(item);
  };
  useEffect(() => {

    let bussinessEmail = getLogedInUser()?.email;

    setFromList([bussinessEmail]);
    if (bussinessEmail?.length > 0) {
      setTemplatePayload((prevState) => {
        return { ...prevState, from: bussinessEmail };
      });
    }
  }, []);

  useEffect(() => {
    Get_User_Info()
    if (template === null) {
      setEditorState(EditorState.createEmpty());
    }
    setTemplatePayload({
      ...templatePayload,
      isPlaceHolders: templatePayload?.isPlaceHolders,
    });
    if (template) {
      setTemplatePayload(template);
      if (template.template) {
        try {
          setEditorState(
            EditorState.createWithContent(stateFromHTML(template.template))
          );
        } catch (error) { }
      }

      if (template.content_type) {
        setEmailBodyType(
          template.content_type === "text" ? "BASIC" : "BUILDER"
        );
      }
      if (template?.smartLists.length > 0) {
        setSelectTypeToSendEmail("smartlist");
        setTemplatePayload((templatePayload) => {
          return { ...templatePayload, smartLists: template.smartLists };
        });
      } else {
        setSelectTypeToSendEmail("toemail");
      }
    }
  }, [template, getAllSmartList, Get_User_Info]);

  const AddNewTemplate = async (folderId, send = false) => {
    if (templatePayload?.adminId !== undefined) {
      let payload = {};
      if (emailBodyType !== "BASIC") {
        const template = await EmailEditorRef.current.getHTML();
        payload = {
          ...templatePayload,
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
          ...templatePayload,
          template,
          html: template,
          content_type: "text",
        };
      }
      if (date.sent_date) {
        payload.sent_date = moment(date.sent_date).format("YYYY-MM-DD");
        payload.sent_time = moment(date.sent_date).format("HH:mm");
      }

      let formData = new FormData();
      for (let file of fileUploaded) {
        formData.append("attachments", file);
      }
      const update_payload = { ...payload };
      delete payload["smartLists"];
      delete payload["to"];
      delete payload["adminId"];
      delete payload["_id"];
      delete payload["createdAt"];
      delete payload["updatedAt"];
      delete payload["_v"];
      if (SelectTypeToSendEmail === "smartlist") {
        formData.append("smartLists", JSON.stringify(smartlistId));
        update_payload.smartLists = props.getAllSmartlistId;
        payload.isPlaceHolders = true;
        delete templatePayload["to"];
      } else {
        formData.append("to", JSON.stringify(templatePayload.to));
        delete templatePayload["smartLists"];
      }
      let dataEntries = Object.entries(payload);
      dataEntries.map((v, i) => {
        formData.append(v[0], v[1]);
        return v;
      });
      if (send) {
        SEND_EMAIL(`/api/email_compose`, formData);
        setEditOrAddOrListTemplate("list");
      } else {
        if (template) {
          if (MailIndexType === 0) {
            UPDATE_TEMPLATE_TO_EMAIL(
              "/api/email_compose",
              formData,
              template?._id,
              template?.folderId
            );
          } else if (MailIndexType === 1) {
            UPDATE_TEMPLATE_TO_EMAIL(
              "/api/email_nurturing",
              formData,
              template?._id,
              template?.folderId
            );
          } else if (MailIndexType === 2) {
            UPDATE_TEMPLATE_TO_EMAIL(
              "/api/email_system",
              formData,
              template?._id,
              template?.folderId
            );
          }
          setViewTemplate(null);
          setEditOrAddOrListTemplate("list");
        } else {
          if (folderId?._id === undefined) {
            toast.error("Please Select folder", toastCss());
            return;
          }
          if (MailIndexType === 0) {
            ADD_TEMPLATE_TO_EMAIL(
              `/api/email_compose`,
              formData,
              folderId?._id
            );
          } else if (MailIndexType === 1) {
            ADD_TEMPLATE_TO_EMAIL(
              `/api/email_nurturing`,
              formData,
              folderId?._id
            );
          } else if (MailIndexType === 2) {
            ADD_TEMPLATE_TO_EMAIL(`/api/email_system`, formData, folderId?._id);
          }
          setEditOrAddOrListTemplate("list");
        }
      }
    } else {
      let payload = {};
      if (emailBodyType !== "BASIC") {
        const template = await EmailEditorRef.current.getHTML();
        payload = {
          ...templatePayload,
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
          ...templatePayload,
          template,
          html: template,
          content_type: "text",
        };
      }
      if (date.sent_date) {
        payload.sent_date = moment(date.sent_date).format("YYYY-MM-DD");
        payload.sent_time = moment(date.sent_date).format("HH:mm");
      }

      let formData = new FormData();
      for (let file of fileUploaded) {
        formData.append("attachments", file);
      }
      const update_payload = { ...payload };
      delete payload["smartLists"];
      delete payload["to"];

      if (SelectTypeToSendEmail === "smartlist") {
        formData.append("smartLists", JSON.stringify(smartlistId));
        payload.isPlaceHolders = true;
        update_payload.smartLists = props.getAllSmartlistId;
        delete templatePayload["to"];
      } else {
        formData.append("to", JSON.stringify(templatePayload.to));
        delete templatePayload["smartLists"];
      }

      let dataEntries = Object.entries(payload);
      dataEntries.map((v, i) => {
        formData.append(v[0], v[1]);
        return v;
      });
      if (send) {
        SEND_EMAIL(`/api/email_compose`, formData);
        setEditOrAddOrListTemplate("list");
      } else {
        if (template) {
          if (MailIndexType === 0) {
            UPDATE_TEMPLATE_TO_EMAIL(
              "/api/email_compose",
              formData,
              template?._id,
              template?.folderId
            );
          } else if (MailIndexType === 1) {
            UPDATE_TEMPLATE_TO_EMAIL(
              "/api/email_nurturing",
              formData,
              template?._id,
              template?.folderId
            );
          } else if (MailIndexType === 2) {
            UPDATE_TEMPLATE_TO_EMAIL(
              "/api/email_system",
              formData,
              template?._id,
              template?.folderId
            );
          }
          setViewTemplate(null);
          setEditOrAddOrListTemplate("list");
        } else {
          if (folderId?._id === undefined) {
            toast.error("Please Select folder", toastCss());
            return;
          }
          if (MailIndexType === 0) {
            ADD_TEMPLATE_TO_EMAIL(
              `/api/email_compose`,
              formData,
              folderId?._id
            );
          } else if (MailIndexType === 1) {
            ADD_TEMPLATE_TO_EMAIL(
              `/api/email_nurturing`,
              formData,
              folderId?._id
            );
          } else if (MailIndexType === 2) {
            ADD_TEMPLATE_TO_EMAIL(`/api/email_system`, formData, folderId?._id);
          }
          setEditOrAddOrListTemplate("list");
        }
      }
    }
  };
  const handleDateChange = (value, keyname) => {
    setdate({
      ...date,
      [keyname]: value,
    });
  };

  const handleSubmit = () => {
    setTemplatePayload({
      ...templatePayload,
      sent_date: date.sent_date,
      sent_time: date.sent_time,
    });
  };
  const SaveTemplate = () => {
    setSweetAlertOpen(true);
  };

  const selectPlaceholder = (placeholder) => {
    setEditorState(insertText(placeholder, editorState));
    setTemplatePayload({ ...templatePayload, isPlaceHolders: true });
  };
  const insertText = (text, editorValue) => {
    const currentContent = editorValue.getCurrentContent();
    const currentSelection = editorValue.getSelection();

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      text
    );

    const newEditorState = EditorState.push(
      editorValue,
      newContent,
      "insert-characters"
    );
    return EditorState.forceSelection(
      newEditorState,
      newContent.getSelectionAfter()
    );
  };

  return (
    <Fragment>
      <Card className={`m-1 ${classes.CardStyle}`}>
        <CardContent className="pb-1">
          <div className="d-flex justify-content-between mb-2">
            <ButtonGroup>
              <button
                type="button"
                className={` ${emailBodyType === "BASIC"
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
                className={`${emailBodyType === "BUILDER"
                  ? `btn btn-primary `
                  : "btn btn-outline-primary "
                  }`}
              >
                BUILDER
              </button>
            </ButtonGroup>
            <div>
              <Button
                onClick={() => {
                  setEditOrAddOrListTemplate("list");
                }}
                className={classes.continueBtn}
              >
                Cancel
              </Button>

              {template ? (
                <Button
                  disabled={
                    templatePayload?.adminId !== undefined &&
                    MailIndexType === 0
                  }
                  style={{
                    color: "#2796f3",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                  onClick={AddNewTemplate}
                >
                  Save
                </Button>
              ) : (
                <SaveFolderSelect
                  MainFolderSelected={MainFolderSelected}
                  handleSelectMainFolder={handleSelectMainFolder}
                  handleSelectsubFolder={handleSelectsubFolder}
                  FolderList={FolderList}
                  SaveTemplate={SaveTemplate}
                />
              )}
              {MailIndexType === 0 && (
                <Button
                  className={classes.sendTem}
                  onClick={() => AddNewTemplate("", true)}
                >
                  Send
                </Button>
              )}
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap">
            <div>
              <div className="d-flex">
                <div className="mb-0 mr-1">
                  <span>From</span>
                  {/* {fromList?.length > 0 && ( */}
                  <CustomInput
                    onChange={handleFeildValue}
                    type="select"
                    id="Email"
                    name="from"
                  >
                    <option >
                      {userinfo?.bussinessEmail}
                    </option>
                    <option >
                      {userinfo?.email}
                    </option>
                  </CustomInput>
                </div>
                <div>
                  <span>To: </span>
                  <div>
                    <Select
                      variant="outlined"
                      style={{ width: "10em" }}
                      value={SelectTypeToSendEmail}
                      className={`pl-1 ${classes.inputStyle}`}
                      onChange={(e) => {
                        if (e.target.value === "smartlist") {
                          setTemplatePayload({
                            ...templatePayload,
                            smartLists: [],
                            to: [],
                          });
                        } else {
                          setSmartListRows([]);
                          setTemplatePayload({
                            ...templatePayload,
                            smartLists: [],
                            to: [],
                          });
                        }
                        setSelectTypeToSendEmail(e.target.value);
                      }}
                    >
                      <MenuItem value="smartlist">Smart List</MenuItem>
                      <MenuItem value="toemail">Email Address</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ml-1"
              style={{
                maxWidth: 270,
              }}
            >
              {SelectTypeToSendEmail === "smartlist" ? (
                <div>
                  <MainSmartList
                    viewTemplate={template}
                    smartlistRows={smartlistRows}
                    setSmartListRows={setSmartListRows}
                    smartlistId={smartlistId}
                    setSmartListId={setSmartListId}
                  />
                </div>
              ) : (
                <FormGroup className="mb-0">
                  <span>To Emails</span>
                  <Input
                    onChange={handleToList}
                    name="To"
                    type="text"
                    value={templatePayload.to.join(",")}
                    placeholder="example@gmail.com, example@gmail.com, ..."
                  />
                </FormGroup>
              )}
            </div>
            <div className="ml-1 mr-1">
              <FormGroup className="mb-0">
                <span>Subject</span>
                <Input
                  onChange={handleFeildValue}
                  name="subject"
                  value={templatePayload.subject}
                  type="text"
                />
              </FormGroup>
            </div>
            <div className="mr-1">
              <FormGroup>
                <span>Schedule</span>
                <ActivationUpon
                  value={templatePayload}
                  MailIndexType={MailIndexType}
                  handleDateChange={handleDateChange}
                  setTemplatePayload={setTemplatePayload}
                  templatePayload={templatePayload}
                  handleSubmit={handleSubmit}
                  dateAndtime={date}
                />
              </FormGroup>
            </div>
            {emailBodyType === "BASIC" ? (
              <div className="d-flex justify-content-end align-items-center">
                <AttachFiles
                  setFileUploaded={setFileUploaded}
                  fileUploaded={fileUploaded}
                />
                <EmailFieldMerge selectPlaceholder={selectPlaceholder} />
              </div>
            ) : null}
          </div>
          {emailBodyType === "BASIC" ? (
            <MUIEditor
              editorState={editorState}
              onChange={
                templatePayload?.adminId !== undefined ? () => { } : EditorChange
              }
            />
          ) : (
            <ReactEmailTemplater
              ref={EmailEditorRef}
              setEmailBodyType={setEmailBodyType}
              EditorChange={
                templatePayload?.adminId !== undefined ? () => { } : EditorChange
              }
              design={template?.design}
            />
          )}
        </CardContent>
      </Card>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/savefolder.png"
        open={sweetAlertOpen}
        title="Save as Template ?"
        onConfirm={() => {
          AddNewTemplate(SubFolderSelected);
        }}
        onCancel={() => {
          setSweetAlertOpen(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Save"}
        description=""
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    smartlist: state.EmailMarketing.smartlist,
    selectedtemplist: state.EmailMarketing.selectedtemplist,
    userinfo: state.userinfo?.userInfo,
    getAllTypeStudent: state.member.getAllTypeStudent,
    getAllSmartList: state.EmailMarketing.getAllSmartList,
    getAllSmartlistId: state.EmailMarketing.getAllSmartlistId,
  };
};
export default connect(mapStateToProps, {
  ADD_TEMPLATE_TO_EMAIL,
  UPDATE_TEMPLATE_TO_EMAIL,
  SEND_EMAIL,
  Get_User_Info,
  GET_ALL_TYPE_STUDENT,
  GET_CATEGORIES_EMAIL,
})(EmailWriteOrEdit);
