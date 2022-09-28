import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import { Edit, Trash } from "react-feather";

const EditDeleteStripActionPopMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [edit, SetEdit] = React.useState(false);
  const open = Boolean(anchorEl);
  const { EditNoteModal, item, OpenAlert } = props;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    SetEdit(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button>
        <MoreVertIcon fontSize="small" onClick={handleClick} />
      </Button>
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
        <MenuItem
          onClick={() => {
            SetEdit(true);
          }}
        >
          <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            OpenAlert(item);
          }}
          
        >
          <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
          Remove
        </MenuItem>
      </Menu>
      {edit ? EditNoteModal : null}
    </div>
  );
};

export default EditDeleteStripActionPopMenu;
