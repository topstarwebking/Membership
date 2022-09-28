import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Chip } from "@material-ui/core";
import { Edit, Trash } from "react-feather";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  MERGE_DOCOMENT,
  EDIT_DOCUMENT_IN_FOLDER,
} from "../../../../redux/actions/document/document";
import { saveAs } from "file-saver";
import ConfirmationModal from "../../../../components/gloabal/confirmation";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import EditFolderDoc from "./EditFolderDoc";
import MoveDocfolder from "./MoveDocfolder";
var DocxMerger = require("docx-merger");

const toastCSS = () => {
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

const EditAnddeletFolderDoc = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [edit, setedit] = React.useState(false);
  const [MoveDoc, setMoveDoc] = React.useState(false);
  const open = Boolean(anchorEl);
  const {
    item,
    OpenAlert,
    activeFolder,
    setProgress,
    activeMainFolder,
    userinformation,
  } = props;
  const [defaultAlert, setdefaultAlert] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setedit(false);
    setMoveDoc(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl(null);
  };
  const EditState = () => {
    setedit(true);
    setAnchorEl(true);
    setAnchorEl(null);
  };

  const handleMerge = async () => {
    setAnchorEl(null);
    setProgress(true);
    if (props.isrecommendedOrregistered === "student") {
      let res = await props.MERGE_DOCOMENT(
        props.isrecommendedOrregistered,
        item.document,
        props.data
      );
      if (res) {
        setProgress(false);
        setdefaultAlert(true);
      } else {
        setProgress(false);
        setdefaultAlert(true);
      }
    } else {
      let res = await props.MERGE_DOCOMENT(
        props.isrecommendedOrregistered,
        item.document,
        props?.data
      );
      if (res) {
        setProgress(false);
        setdefaultAlert(true);
      } else {
        setProgress(false);
        setdefaultAlert(true);
      }
    }
  };
  const onconfirm = () => {
    if (props.getPdfOFallStudnets !== null) {
      let serverBuffer = [];
      for (let buf of props.getPdfOFallStudnets) {
        serverBuffer.push(buf?.data);
      }
      const docx = new DocxMerger({}, serverBuffer);
      docx.save("blob", (data) => {
        saveAs(data, "yourfilename.docx");
      });
      setdefaultAlert(false);
    } else {
      toast.info("Unable To Download", toastCSS());
      setdefaultAlert(false);
    }
  };
  const movedoc = () => {
    setMoveDoc(true);
    setAnchorEl(null);
    setAnchorEl(null);
  };
  return (
    <div>
      <Chip
        size="small"
        style={{ color: "none", cursor: "pointer", background: "none" }}
        label={<MoreVertIcon fontSize="small" onClick={handleClick} />}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            left: "50%",
            transform: "translateX(-77%) translateY(32%)",
          },
        }}
        MenuListProps={{
          style: {
            padding: 0,
          },
        }}
      >
        <MenuItem
          onClick={EditState}
          d
          disabled={
            activeMainFolder?.adminId !== undefined &&
            userinformation?.role === 0
              ? true
              : false
          }
        >
          <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
          Rename
        </MenuItem>
        <MenuItem
          onClick={movedoc}
          disabled={
            activeMainFolder?.adminId !== undefined &&
            userinformation?.role === 0
              ? true
              : false
          }
        >
          <FolderOpenIcon
            style={{ color: "#2796f3", marginRight: "0.5em" }}
            size={16}
          />
          Move
        </MenuItem>
        <MenuItem
          onClick={() => {
            OpenAlert(item, "folder");
          }}
          disabled={
            activeMainFolder?.adminId !== undefined &&
            userinformation?.role === 0
              ? true
              : false
          }
        >
          <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />
          Delete
        </MenuItem>
        {props?.data?.length > 0 ? (
          <MenuItem onClick={handleMerge}>
            <CallMergeIcon
              style={{ color: "#40a7e1", marginRight: "0.8em" }}
              fontSize="small"
            />
            Merge
          </MenuItem>
        ) : null}
      </Menu>

      {edit ? (
        <EditFolderDoc
          item={item}
          data={activeFolder}
          documentFolderList={props?.documentFolderList}
          IsEdit={true}
          activeMainFolder={activeMainFolder}
        />
      ) : null}
      {MoveDoc && (
        <MoveDocfolder
          item={item}
          data={activeFolder}
          documentFolderList={props?.documentFolderList}
          IsEdit={true}
          activeMainFolder={activeMainFolder}
        />
      )}
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/dwonload.png"
        open={defaultAlert}
        title="Download it! ?"
        onConfirm={onconfirm}
        onCancel={() => {
          setdefaultAlert(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Download"}
        description=""
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getPdfOFallStudnets: state.document.getPdfOFallStudnets,
  };
};

export default connect(mapStateToProps, {
  MERGE_DOCOMENT,
  EDIT_DOCUMENT_IN_FOLDER,
})(EditAnddeletFolderDoc);
