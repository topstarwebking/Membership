import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Content from "../../../documents/components/Content";
import ListAllEmails from "./listAllEmails";
import EmailwriteEditor from "./emailwriteEditor";
import ViewEmail from "./viewEmail";
import { GET_ALL_SMART_LIST } from "../../../../../redux/actions/email";
import { connect } from "react-redux";

const AdminSystem = (props) => {
  const [viewTemplate, setViewTemplate] = useState(null);
  const [selectedId, setSelectedId] = useState([]);
  const {
    ActiveSubfolder,
    Tabsvalue,
    getlistofdataofapicall,
    setEmailwriteEditor,
    openEmailwriteEditor,
    Addtemplate,
    updaTetetemplate,
    deletTemplate,
    GET_ALL_SMART_LIST
  } = props;
  const handleView = (template) => {
    setViewTemplate(template);
    setEmailwriteEditor("view");
  };
  const handleselecteOne = (e, item) => {
    let { value } = e.target;
    if (selectedId?.includes(value)) {
      let IdAfterRemove = selectedId?.filter((id) => id !== value);
      setSelectedId(IdAfterRemove);
    } else {
      setSelectedId((preStuff) => [...preStuff, value]);
    }
  };

  useEffect(() => {
    GET_ALL_SMART_LIST()
  }, [GET_ALL_SMART_LIST])
  return (
    <div className="p-1 mt-1 w-100">
      <EmailwriteEditor
        Tabsvalue={Tabsvalue}
        viewTemplate={viewTemplate}
        setViewTemplate={setViewTemplate}
        getlistofdataofapicall={getlistofdataofapicall}
        setEmailwriteEditor={setEmailwriteEditor}
        openEmailwriteEditor={openEmailwriteEditor}
        Addtemplate={Addtemplate}
        updaTetetemplate={updaTetetemplate}
        deletTemplate={deletTemplate}
      />
      {openEmailwriteEditor === "content" && Tabsvalue === 1 ? (
        <Grid container={true} spacing={2} className="p-0 m-0">
          <Grid item sm={12} md={12} lg={12}>
            <h4>SYSTEM TUTORIAL</h4>
            <p
              className="p-1 pr-5"
              content
              style={{
                background: "#eaf4fe",
              }}
            >
              System emails is a powerful tool designed to allow mymember users
              to automate notification emails upon entry to the system. Email
              campaigns are activated when system detects a specific smartlist
              criteria is met. Set it and forget it! Watch the videos below to
              use documents with ease!
            </p>
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <Content
              hedding={"ACTIVATE YOUR FIRST EMAIL"}
              content={
                ("Learn how to activate your first smartlist email. This email will",
                  `"Send Immediately" upon the smartlist criteria being met.`)
              }
              link={"https://www.youtube.com/embed/bidOMaCs3vM"}
            />
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <Content
              hedding={"AUTOMATE ADDITIONAL EMAILS"}
              content={
                "Learn how to create additional emails to send after the first email is sent out. This set it and forget it feature will allow notification emails to continue to send out with your desired content."
              }
              link={"https://www.youtube.com/embed/5RfLIC-3dzY"}
            />
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <Content
              hedding={"MANAGE YOUR CAMPAIGN"}
              content={
                "Learn how to edit, delete, and use our powerful drag and drop feature to change automation sequences with ease."
              }
              link={"https://www.youtube.com/embed/0NFRvVdmmE4"}
            />
          </Grid>
        </Grid>
      ) : (
        <>
          {openEmailwriteEditor === "list" ? (
            <div>
              <ListAllEmails
                Tabsvalue={Tabsvalue}
                ActiveSubfolder={ActiveSubfolder}
                setViewTemplate={setViewTemplate}
                openEmailwriteEditor={openEmailwriteEditor}
                handleView={handleView}
                handleselecteOne={handleselecteOne}
                selectedId={selectedId}
              />
            </div>
          ) : (
            openEmailwriteEditor === "view" && (
              <ViewEmail
                setViewTemplate={setViewTemplate}
                openEmailwriteEditor={openEmailwriteEditor}
                handleView={handleView}
                viewTemplate={viewTemplate}
                setEmailwriteEditor={setEmailwriteEditor}
                Addtemplate={Addtemplate}
                updaTetetemplate={updaTetetemplate}
                deletTemplate={deletTemplate}
              />
            )
          )}
        </>
      )}
    </div>
  );
};


export default connect(null, { GET_ALL_SMART_LIST })(AdminSystem);
