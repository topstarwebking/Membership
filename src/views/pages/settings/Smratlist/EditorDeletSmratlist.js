import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import { Edit, Trash } from "react-feather";
import EditSmartList from "./EditSmartList";
const EditorDeletSmratlist = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { item, OpenAlert ,userinformation,activeFolderdata} = props;
  const [isedit, setIsedit] = React.useState(false);
  const handleClick = (event) => {
    setIsedit(false);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsedit(false);
  };
  const handledit = () => {
    setAnchorEl(null);
    setIsedit(true);
  };
  return (
    <div>
      <div className="ml-1">
        <IconButton
          onClick={handleClick}
          fontSize="small"
          className="rounded-circle p-0"
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </div>
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
          onClick={() => {
            handledit();
          }}
        >
          <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            OpenAlert("smartlist",item?._id);
          }}
        >
          <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />
          Delete
        </MenuItem>
      </Menu>
      {isedit ? <EditSmartList item={item}  userinformation={userinformation} activeFolderdata={activeFolderdata} /> : null}
    </div>
  );
};

export default EditorDeletSmratlist;
