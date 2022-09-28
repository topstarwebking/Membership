import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import { Edit, Trash } from "react-feather";
import { IconButton } from "@material-ui/core";

const EditDeleteStripActionPopMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { openModal2, item, OpenAlert, ModifyValueSendDeleteBooleon } = props;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    ModifyValueSendDeleteBooleon(item)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
       <div className="ml-1">
        <IconButton
          onClick={handleClick}
          fontSize="normal"
          className="rounded-circle "
          style={{color:"#1aa6e0"}}
        >
          <MoreVertIcon fontSize="medium" />
        </IconButton>
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

        <MenuItem onClick={() => {
          openModal2(item);
        }}>
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
    </div>
  );
};

export default EditDeleteStripActionPopMenu;
