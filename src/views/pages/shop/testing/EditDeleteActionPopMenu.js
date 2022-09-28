import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const EditDeleteActionPopMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { deleteTestpaper, editFolder, item } = props;
  const [activeComponent, setActiveComponet] = React.useState(null);
  const open = Boolean(anchorEl);

  const handelActivesetActiveComponet = () => {
    setActiveComponet("edit");
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setActiveComponet(null);
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
        <MenuItem onClick={handelActivesetActiveComponet}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            deleteTestpaper(item?._id);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      {activeComponent === "edit" ? editFolder : null}
    </div>
  );
};

export default EditDeleteActionPopMenu;
