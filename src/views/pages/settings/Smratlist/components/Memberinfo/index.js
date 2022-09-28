import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Collapse,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles(() => ({
  selectBtn: {
    border: "1px solid #b8c2cc",
    borderRadius: "6px !important",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  listItem: {
    "&:hover": {
      background: "#eaf4fe",
      color: "#2796f3",
    },
  },
  SelectSmList: {
    borderRadius: "6px",
    background: "#eaf4fe",
    color: "#2796f3",
    fontWeight: "bold",
    marginRight: "6px",
    cursor: "pointer",
  },
  flexcontainer: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    background: "#f3f5f7",
    padding: "0.5em",
  },
  flexcontainerForOneeliments: {
    display: "grid",
    gridTemplateColumns: "90%",
    background: "#f3f5f7",
    padding: "0.5em",
  },
  sideBar__list__element: {
    li: {
      borderBottom: "1px solid rgb(212, 212, 212)",
    },
  },
}));

const Memberinfo = (props) => {
  const { smartList ,isExit } = props;
  const [openCollapsed, setOpenCollased] = useState("");
  const classes = useStyles();

  const handleOpenCollapse = (id) => {
    if (openCollapsed === id) {
      setOpenCollased("");
    } else {
      setOpenCollased(id);
    }
  };



  return (
    <div>
      <List dense className="mb-0 p-0">
        <ListItem>
          <b>
            Member Info <span>*</span>
          </b>
        </ListItem>
        <ListItem
          className={`${classes.listItem} `}
          button
          onClick={() => handleOpenCollapse("pannel1")}
        >
          <ListItemText primary={"Member Type"} />
          <ListItemIcon>
            {openCollapsed === "pannel1" ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel1"}>
          <div className={classes.flexcontainer}>
            {Object.keys(studentType).map((item, i) => {
              return (
                <ListItem key={i}>
                  <div className="d-flex align-items-center">
                    <Checkbox
                      style={{ height: "0.8em", width: "0.8em" }}
                      checked={isExit("studentType",studentType[item])}
                      onChange={(e) => {
                        props.addToSmartList(e,"studentType", studentType[item]);
                      }}
                    />
                    <span className="ml-1">{studentType[item]}</span>
                  </div>
                </ListItem>
              );
            })}
          </div>
        </Collapse>
      </List>
    </div>
  );
};

export default Memberinfo;
const studentType = {
  activetrial: "Active Trial",
  formertrial: "Former Trial",
  activestudent: "Active Student",
  leadstudnet: "Leads",
  formerstudnet: "Former Student",
};
