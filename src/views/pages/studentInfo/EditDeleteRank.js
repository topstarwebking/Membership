import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import { Edit, Trash } from "react-feather";
import EditRank from "./rank/editRank";

const EditDeleteRank = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { openAlert, params } = props;
  const [edit, setedit] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setedit(false);
  };
  const handleClose = () => {
    setedit(false);
  };
  
  return (
    <div>
      <div>
        <Button>
          <MoreVertIcon fontSize="small" onClick={handleClick} />
        </Button>
      </div>
      <div>
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
              setedit(true);
              setAnchorEl(null);
            }}
          >
            <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              openAlert(props.params.data);
            }}
          >
            <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
            Delete
          </MenuItem>
        </Menu>
      </div>
      {edit ? <EditRank editData={params?.data} /> : null}
    </div>
  );
};

export default EditDeleteRank;
