import * as React from "react";
import Menu from "@material-ui/core/Menu";
import { Button } from "@material-ui/core";
import Addcredit from "./components/Addcredit";
import History from "./components/Histroy";
import EditCredit from "./components/EditCredit";
const EditDeleteFolder = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div>
      <Button
        onClick={handleClick}
        variant="outlined"
        style={{ color: "#36ca74", borderRadius: "8px" }}
      >
        View
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
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
        <Addcredit item={props.item} />
        <History item={props.item} />
        {props.item?.textCreditHistory?.length > 0 && (
          <EditCredit item={props.item} />
        )}
      </Menu>
    </div>
  );
};

export default EditDeleteFolder;
