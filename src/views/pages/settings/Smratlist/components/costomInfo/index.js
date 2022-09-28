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

const CostomInfo = (props) => {
  const { isExit } = props;
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
          <b>Custom Info</b>{" "}
        </ListItem>
        <ListItem
          className={`${classes.listItem} `}
          button
          onClick={() => handleOpenCollapse("pannel11")}
        >
          <ListItemText primary={"Lead Tracking"} />
          <ListItemIcon>
            {openCollapsed?.includes("pannel11") ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel11"}>
          <div className={classes.flexcontainer}>
            {props.getLeadTrackingList?.length > 0
              ? props.getLeadTrackingList?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="d-flex justify-content-cenetr">
                        <Checkbox
                          style={{ height: "0.8em", width: "0.8em" }}
                          checked={isExit(
                            "leadsTracking",
                            item?.leads_category
                          )}
                          onChange={(e) => {
                            props.addToSmartList(
                              e,
                              "leadsTracking",
                              item?.leads_category
                            );
                          }}
                        />
                        <span className="ml-1">{item?.leads_category}</span>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </Collapse>
        <ListItem
          className={`${classes.listItem} `}
          button
          onClick={() => handleOpenCollapse("pannel12")}
        >
          <ListItemText primary={"After Camp"} />
          <ListItemIcon>
            {openCollapsed?.includes("pannel12") ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel12"}>
          <div className={classes.flexcontainer}>
            {props.getAfterCamps?.length > 0
              ? props.getAfterCamps.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="d-flex justify-content-cenetr">
                        <Checkbox
                          style={{ height: "0.8em", width: "0.8em" }}
                          checked={isExit(
                            "after_camp",
                            item?.after_camp_category
                          )}
                          onChange={(e) => {
                            props.addToSmartList(
                              e,
                              "after_camp",
                              item?.after_camp_category
                            );
                          }}
                        />
                        <span className="ml-1">
                          {item?.after_camp_category}
                        </span>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </Collapse>
      </List>
    </div>
  );
};

export default CostomInfo;
