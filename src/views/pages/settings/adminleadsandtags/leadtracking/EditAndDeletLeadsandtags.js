import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Edit, Trash } from "react-feather";

const EditAndDeletefolder = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { item, opentAlert, EditFolder, type } = props;
  const [edit, setIsedit] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setIsedit(false);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const editSmartlistfolder = () => {
    setIsedit(!edit);
  };
  return (
    <div>
      <div className="ml-1">
        <MoreVertIcon
          fontSize="small"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
        <MenuItem onClick={editSmartlistfolder}>
          <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            opentAlert(type, item?._id);
          }}
        >
          <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
          Delete
        </MenuItem>
      </Menu>
      {edit ? EditFolder : null}
    </div>
  );
};

export default EditAndDeletefolder;
