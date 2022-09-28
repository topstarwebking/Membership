import { CardContent, Card, IconButton } from "@material-ui/core";
import { Drawer, useMediaQuery } from "@material-ui/core";
import React, { Fragment, useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import EmailSideBar from "./EmailSideBar";
import ListAllEmails from "./index";
const Emailsidbarandcontent = (props) => {
  const [FolderMenuOpen, setFolderMenuOpen] = useState(false);
  const IsSmallDevise = useMediaQuery("(max-width:1224px)");
  const {
    ApicallforgetData,
    getlistofdataofapicall,
    deleteSubFolder,
    deletFolder,
    Tabsvalue,
    createFolderApiCall,
    UpdatefolderApiCall,
    crearesubfolderApiCall,
    updateSubfolderApiCall,
    setEmailwriteEditor,
    openEmailwriteEditor,
    Addtemplate,
    updaTetetemplate,
    deletTemplate,
  } = props;
  const [ActiveManiFolder, setActiveMainFolder] = useState(null);
  const [ActiveSubfolder, setActiveSubfolder] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchdata = async () => {
    if (ActiveSubfolder) {
      let findActiveMainFolder = await getlistofdataofapicall?.filter(
        (item) => item?._id === ActiveManiFolder?._id
      );
      if (findActiveMainFolder?.length > 0) {
        let findActivesubfolder = await findActiveMainFolder[0].folder?.filter(
          (item) => item?._id === ActiveSubfolder?._id
        );
        if (findActivesubfolder?.length) {
          await setActiveSubfolder(findActivesubfolder[0]);
        }
      }

    } else {
      let findActiveMainFolder = await getlistofdataofapicall?.filter(
        (item) => item?._id === ActiveManiFolder?._id
      );
      await setActiveMainFolder(findActiveMainFolder[0]);
    }
  };

  useEffect(() => {
    ApicallforgetData();
  }, [ApicallforgetData]);

  useEffect(() => {
    fetchdata();
  }, [fetchdata]);

  const handleClick = (item) => {
    if (ActiveManiFolder?._id === item?._id) {
      setActiveMainFolder(null);
    } else {
      setActiveMainFolder(item);
    }
  };

  const handleSubfolder = (item) => {
    setActiveSubfolder(item);
    setEmailwriteEditor("list");
  };
  
  return (
    <>
      <Card className="card">
        <CardContent style={{ width: "100%" }} className="p-0">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-start">
                {IsSmallDevise && (
                  <IconButton
                    onClick={() => {
                      setFolderMenuOpen(!FolderMenuOpen);
                    }}
                    className="rounded-circle"
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-start">
                <Fragment>
                  {IsSmallDevise ? (
                    <Drawer
                      onClose={() => {
                        setFolderMenuOpen(!FolderMenuOpen);
                      }}
                      open={FolderMenuOpen}
                    >
                      <EmailSideBar
                        getlistofdataofapicall={getlistofdataofapicall}
                        handleClick={handleClick}
                        ActiveManiFolder={ActiveManiFolder}
                        handleSubfolder={handleSubfolder}
                        deletFolder={deletFolder}
                        deleteSubFolder={deleteSubFolder}
                        createFolderApiCall={createFolderApiCall}
                        UpdatefolderApiCall={UpdatefolderApiCall}
                        crearesubfolderApiCall={crearesubfolderApiCall}
                        updateSubfolderApiCall={updateSubfolderApiCall}
                        openEmailwriteEditor={openEmailwriteEditor}
                        setEmailwriteEditor={setEmailwriteEditor}
                        ActiveSubfolder={ActiveSubfolder}
                      />
                    </Drawer>
                  ) : (
                    <div className="d-flex flex-column  align-items-center">
                      <EmailSideBar
                        getlistofdataofapicall={getlistofdataofapicall}
                        handleClick={handleClick}
                        ActiveManiFolder={ActiveManiFolder}
                        handleSubfolder={handleSubfolder}
                        deletFolder={deletFolder}
                        deleteSubFolder={deleteSubFolder}
                        createFolderApiCall={createFolderApiCall}
                        UpdatefolderApiCall={UpdatefolderApiCall}
                        crearesubfolderApiCall={crearesubfolderApiCall}
                        updateSubfolderApiCall={updateSubfolderApiCall}
                        openEmailwriteEditor={openEmailwriteEditor}
                        setEmailwriteEditor={setEmailwriteEditor}
                        ActiveSubfolder={ActiveSubfolder}
                      />
                    </div>
                  )}
                </Fragment>
              </div>
              <div style={{ background: "#f6f8fa" }} className="w-100">
                <ListAllEmails
                  ActiveSubfolder={ActiveSubfolder}
                  Tabsvalue={Tabsvalue}
                  getlistofdataofapicall={getlistofdataofapicall}
                  setEmailwriteEditor={setEmailwriteEditor}
                  openEmailwriteEditor={openEmailwriteEditor}
                  Addtemplate={Addtemplate}
                  updaTetetemplate={updaTetetemplate}
                  deletTemplate={deletTemplate}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Emailsidbarandcontent;
