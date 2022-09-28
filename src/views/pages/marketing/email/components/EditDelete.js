import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Edit, Trash } from "react-feather";
import { IconButton } from "@material-ui/core";

const EditDeleteFolder = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { DeleteFolder, editFolder } = props;
  const [activeComponent, setActiveComponet] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton className="ml-1" onClick={handleClick}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
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
            setActiveComponet("edit");
          }}
        >
          <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setActiveComponet("delete");
          }}
        >
          <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
          Delete
        </MenuItem>
      </Menu>

      {activeComponent === "edit" && editFolder}
      {activeComponent === "delete" && DeleteFolder}
    </div>
  );
};

export default EditDeleteFolder;
