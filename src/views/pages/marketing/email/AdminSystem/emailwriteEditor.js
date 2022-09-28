import React, { Fragment, useEffect, useState, useRef } from "react";
import { Input, FormGroup, ButtonGroup } from "reactstrap";
import { makeStyles } from "@material-ui/styles";
import { Button, Select, MenuItem } from "@material-ui/core";
import MUIEditor from "react-mui-draft-wysiwyg";
import { EditorState, Modifier } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "../components/index.css";
import AttachFiles from "../components/attacheFiles";
import { stateFromHTML } from "draft-js-import-html";
import SaveFolderSelect from "./folderSelect";
import MainSmartList from "./MainSmartList";
import ReactEmailTemplater from "../components/ReactEmailTemplater";
import EmailFieldMerge from "./mergeField";
import { connect } from "react-redux";

const getLogedInUser = () => {
  return JSON.parse(localStorage.getItem("userdata"))?.data;
};
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

const EmailWriteOrEdit = (props) => {
  const classes = useStyles();
  const {
    getAllSmartList,
    openEmailwriteEditor,
    setEmailwriteEditor,
    setViewTemplate,
    Addtemplate,
    updaTetetemplate,
    getlistofdataofapicall,
    viewTemplate,
  } = props;
  const [fromList, setFromList] = useState([]);
  const EmailEditorRef = useRef(null);
  const [emailBodyType, setEmailBodyType] = useState("BASIC");
  const [fileUploaded, setFileUploaded] = useState([]);
  const [MainFolderSelected, setMainFolderSelected] = useState({});
  const [SubFolderSelected, setSubFolderSelected] = useState({});
  const [SelectTypeToSendEmail, setSelectTypeToSendEmail] =
    useState("smartlist");
  const [smartlistRows, setSmartListRows] = useState([]);
  const [smartlistId, setSmartListId] = useState([]);
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const [templatePayload, setTemplatePayload] = useState({
    from: "",
    to: [],
    subject: "",
    title: "",
    template: "",
    repeat_mail: "",
    follow_up: 4,
    design: "",
    immediately: false,
    content_type: "",
    html: "",
    isPlaceHolders: false,
  });

  const EditorChange = (newState) => {
    setEditorState(newState);
  };

  const handleFeildValue = (e) => {
    let { name, value } = e.target;
    setTemplatePayload({ ...templatePayload, [name]: value });
  };

  useEffect(() => {
    if (viewTemplate === null) {
      setEditorState(EditorState.createEmpty());
    }
    setTemplatePayload({
      ...templatePayload,
      isPlaceHolders: templatePayload.isPlaceHolders,
    });

    if (viewTemplate) {
      setTemplatePayload(viewTemplate);
      if (viewTemplate.template) {
        try {
          setEditorState(
            EditorState.createWithContent(stateFromHTML(viewTemplate.template))
          );
        } catch (error) { }
      }

      if (viewTemplate.content_type) {
        setEmailBodyType(
          viewTemplate.content_type === "text" ? "BASIC" : "BUILDER"
        );
      }
      if (viewTemplate?.smartLists.length > 0) {
        setSelectTypeToSendEmail("smartlist");
        setTemplatePayload((templatePayload) => {
          return { ...templatePayload, smartLists: viewTemplate.smartLists };
        });
      } else {
        setSelectTypeToSendEmail("toemail");
      }
    }
  }, [viewTemplate, getAllSmartList]);

  useEffect(() => {
    let bussinessEmail = getLogedInUser()?.email;
    setFromList([bussinessEmail]);
    if (bussinessEmail?.length > 0) {
      setTemplatePayload((prevState) => {
        return { ...prevState, from: bussinessEmail };
      });
    }
  }, []);

  const AddNewTemplate = async (folderId) => {
    let payload = {};
    if (emailBodyType !== "BASIC") {
      const template = await EmailEditorRef.current.getHTML();
      // payload = {
      //   ...templatePayload,
      //   template: template.html,
      //   html: template.html,
      //   design: JSON.stringify(template.design),
      //   content_type: "builder",
      // };
    } else {
      // const template = draftToHtml(
      //   convertToRaw(editorState.getCurrentContent())
      // );
      // payload = {
      //   ...templatePayload,
      //   template,
      //   html: template,
      //   content_type: "text",
      // };
    }
    // let formData = new FormData();
    // for (let file of fileUploaded) {
    //   formData.append("attachments", file);
    // }
    // const update_payload = { ...payload };
    // delete payload["smartLists"];
    // delete payload["to"];

    // if (SelectTypeToSendEmail === "smartlist") {
    //   formData.append("smartLists", JSON.stringify(smartlistId));
    //   update_payload.smartLists = props.getAllSmartlistId;
    //   delete templatePayload["to"];
    // } else {
    //   formData.append("to", JSON.stringify(templatePayload.to));
    //   delete templatePayload["smartLists"];
    // }

    // let dataEntries = Object.entries(payload);
    // dataEntries.map((v, i) => {
    //   formData.append(v[0], v[1]);
    //   return v;
    // });

    // if (viewTemplate) {
    //   updaTetetemplate(formData, viewTemplate?._id);
    // } else {
    //   Addtemplate(formData, folderId?._id);
    // }
    setEmailwriteEditor("list");
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

  const SaveTemplate = () => {
    AddNewTemplate(SubFolderSelected);
  };

  const handleopenemaileditor = () => {
    setEmailwriteEditor("add");
    setViewTemplate(null);
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
      {viewTemplate === null && (
        <div className="d-flex justify-content-end w-100">
          <Button onClick={handleopenemaileditor} variant="outlined">
            Add Template
          </Button>
        </div>
      )}
      {openEmailwriteEditor === "add" && (
        <Fragment>
          <div className="d-flex justify-content-between mb-2">
            <ButtonGroup>
              <Button
                onClick={() => {
                  setEmailBodyType("BASIC");
                }}
                className={`${emailBodyType === "BASIC"
                    ? `btn btn-primary `
                    : "btn btn-outline-primary "
                  }`}
              >
                BASIC
              </Button>
              <Button
                onClick={() => {
                  setEmailBodyType("BUILDER");
                }}
                className={`${emailBodyType === "BUILDER"
                    ? `btn btn-primary `
                    : "btn btn-outline-primary "
                  }`}
              >
                BUILDER
              </Button>
            </ButtonGroup>
            <div>
              <Button
                className={classes.continueBtn}
                onClick={() => {
                  setEmailwriteEditor("list");
                  setViewTemplate(null);
                }}
              >
                Cancel
              </Button>
              {viewTemplate ? (
                <Button
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
                  FolderList={getlistofdataofapicall}
                  SaveTemplate={SaveTemplate}
                />
              )}
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap">
            <div>
              <div className="d-flex">
                <div className="mb-0 mr-1">
                  <span>From</span>
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
                      defaultValue={viewTemplate?.from}
                      onChange={handleFeildValue}
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
                <div
                  className="ml-1"
                  style={{
                    maxWidth: 270,
                  }}
                >
                  {SelectTypeToSendEmail === "smartlist" ? (
                    <div>
                      <MainSmartList
                        viewTemplate={viewTemplate}
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
                        name="To"
                        type="text"
                        defaultValue={templatePayload?.to?.join(",")}
                        placeholder="example@gmail.com, example@gmail.com, ..."
                        onChange={handleToList}
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
            </div>
          </div>
          {emailBodyType === "BASIC" ? (
            <MUIEditor editorState={editorState} onChange={EditorChange} />
          ) : (
            <ReactEmailTemplater
              ref={EmailEditorRef}
              setEmailBodyType={setEmailBodyType}
              EditorChange={EditorChange}
              design={viewTemplate?.design}
            />
          )}
        </Fragment>
      )}
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
export default connect(mapStateToProps, null)(EmailWriteOrEdit);
