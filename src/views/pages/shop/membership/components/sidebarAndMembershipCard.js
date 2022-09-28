import React from "react";
import MemberShipFolder from "./foldersidebar";
import ListMemberShip from "./listMemberShip";
import {
  Card,
  CardContent,
  Drawer,
  useMediaQuery,
} from "@material-ui/core";

const SideBarAndMemberShipCard = (props) => {
  const IsSmallDevise = useMediaQuery("(max-width:1224px)");
  const {
    handleActiveFOlder,
    allFolderWithMS,
    FoldermenuOpen,
    setFoldermenuOpen,
    activeFolderMS,
  } = props;
  return (
    <div>
      <br />
      <Card style={{ boxShadow: "none", height: "100%" }}>
        <CardContent className="d-flex p-0 mb-0 pb-1">
          {IsSmallDevise ? (
            <Drawer
              variant="persistent"
              onClose={() => {
                setFoldermenuOpen(!FoldermenuOpen);
              }}
              PaperProps={{
                elevation: 0,
                style: {
                  width: IsSmallDevise ? "25%" : "50%",
                },
              }}
              open={FoldermenuOpen}
            >
              <div style={{ width: "100%" }}>
                <MemberShipFolder
                  folderListWithMS={allFolderWithMS}
                  activeFolderMS={activeFolderMS}
                  handleActiveFOlder={handleActiveFOlder}
                  userinformation={props.userinformation}
                />
              </div>
            </Drawer>
          ) : (
            <MemberShipFolder
              userinformation={props.userinformation}
              folderListWithMS={allFolderWithMS}
              activeFolderMS={activeFolderMS}
              handleActiveFOlder={handleActiveFOlder}
            />
          )}
          <div style={{ width: "100%" }}>
            <ListMemberShip
              userinformation={props.userinformation}
              CloseDrawerMS={props.CloseDrawerMS}
              membershipList={activeFolderMS?.membership}
              folderId={activeFolderMS?._id}
              FoldermenuOpen={FoldermenuOpen}
              setFoldermenuOpen={setFoldermenuOpen}
              activeFolderMS={activeFolderMS}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SideBarAndMemberShipCard;
