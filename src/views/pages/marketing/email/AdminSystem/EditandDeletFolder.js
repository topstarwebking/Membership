import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Edit, Trash } from "react-feather";

const EditDeleteFolder = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { editFolder, item, type, handleDelet } = props;
  const [activeComponent, setActiveComponet] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setActiveComponet(null);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="ml-1">
        <MoreVertIcon fontSize="small" onClick={handleClick} />
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
            handleDelet(type, item?._id);
          }}
        >
          <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
          Delete
        </MenuItem>
      </Menu>
      {activeComponent === "edit" && editFolder}
    </div>
  );
};

export default EditDeleteFolder;
