import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import { Edit, Trash } from "react-feather";

const EditAndDeleteFolder = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [edit, setedit] = React.useState(false);
  const open = Boolean(anchorEl);
  const { item, OpenAlert } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setedit(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const EditState = () => {
    setedit(true);
  };
  
  return (
    <div>
      <IconButton className="rounded m-0 p-0" onClick={handleClick}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
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
        <MenuItem onClick={EditState}>
          <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            OpenAlert(item?._id);
          }}
        >
          <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
          Delete
        </MenuItem>
      </Menu>
      {edit ? props.editfolder : null}
    </div>
  );
};

export default EditAndDeleteFolder;
