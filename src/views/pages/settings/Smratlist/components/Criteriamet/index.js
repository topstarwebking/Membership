import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import InputAutoComplete from "../../../../marketing/email/components/autoComplete";
import usaTown from "../../../../../../../src/views/pages/newstudent/usa-state-list/usaTown.json";
import StateList from "../../../../../../../src/views/pages/newstudent/usa-state-list/usaStateList.json";
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
    gridTemplateColumns: "100%",
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
  const [openCollapsed, setOpenCollased] = useState("");
  const classes = useStyles();
  const { setSmartList, smartList } = props;
  const handleOpenCollapse = (id) => {
    if (openCollapsed === id) {
      setOpenCollased("");
    } else {
      setOpenCollased(id);
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    if (Number(value) === 0) {
      setSmartList({
        ...smartList,
        [name]: [],
      });
    } else {
      setSmartList({
        ...smartList,
        [name]: [Number(value)],
      });
    }
  };
  const stateHandeler = (e, newValue) => {
    setSmartList({
      ...props.smartList,
      state: [newValue.name],
    });
  };
  const townHandler = (e, newValue) => {
    setSmartList({
      ...props.smartList,
      town: [newValue.town],
    });
  };
  return (
    <div>
      <List dense className="mb-0 p-0">
        <ListItem>
          <b>Criteria Met</b>
        </ListItem>
        <ListItem
          className={`${classes.listItem} `}
          button
          onClick={() => handleOpenCollapse("pannel8")}
        >
          <ListItemText primary={"Renewals"} />
          <ListItemIcon>
            {openCollapsed?.includes("pannel8") ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel8"}>
          <div>
            <div
              className={`${classes.flexcontainerForOneeliments} d-flex m-1`}
            >
              <TextField
                fullWidth
                style={{
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  height: "40px",
                }}
                variant={"outlined"}
                size="small"
                label="Eenter Days Left"
                type="number"
                placeholder="Eenter Days Left"
                name="renewal"
                onChange={handlechange}
              />
            </div>
          </div>
        </Collapse>

        <ListItem
          className={`${classes.listItem} `}
          button
          onClick={() => handleOpenCollapse("pannel9")}
        >
          <ListItemText primary={"Age"} />
          <ListItemIcon>
            {openCollapsed?.includes("pannel9") ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel9"}>
          <div>
            <div
              className={`${classes.flexcontainerForOneeliments} d-flex m-1`}
            >
              <TextField
                fullWidth
                style={{
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  height: "40px",
                }}
                variant={"outlined"}
                size="small"
                label="Enter Age"
                type="number"
                placeholder="Enter Age"
                name="age"
                onChange={handlechange}
              />
            </div>
          </div>
        </Collapse>
        <ListItem
          className={`${classes.listItem} `}
          button
          onClick={() => handleOpenCollapse("pannel10")}
        >
          <ListItemText primary={"Attendance"} />
          <ListItemIcon>
            {openCollapsed?.includes("pannel10") ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel10"}>
          <div>
            <div
              className={`${classes.flexcontainerForOneeliments} d-flex m-1`}
            >
              <TextField
                fullWidth
                style={{
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  height: "40px",
                }}
                variant={"outlined"}
                size="small"
                label="Number of missed class"
                type="number"
                placeholder="Number of missed class"
                name="last_asttended"
                onChange={handlechange}
              />
            </div>
          </div>
        </Collapse>
        <ListItem
          className={`${classes.listItem} `}
          button
          onClick={() => handleOpenCollapse("pannel16")}
        >
          <ListItemText primary={"Location"} />
          <ListItemIcon>
            {openCollapsed?.includes("pannel16") ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel16"}>
          <div>
            <div className="m-1">
              <div>State</div>
              <div className={`${classes.flexcontainerForOneeliments}`}>
                <InputAutoComplete
                  labelName={"State"}
                  keyName="name"
                  data={StateList}
                  isEdit={true}
                  handleSelect={stateHandeler}
                />
              </div>
            </div>
            <div className=" m-1">
              <div>City</div>
              <div className={`${classes.flexcontainerForOneeliments}`}>
                <InputAutoComplete
                  labelName={"City"}
                  keyName="town"
                  data={usaTown}
                  isEdit={true}
                  handleSelect={townHandler}
                />
              </div>
            </div>
            <div className=" m-1">
              <div>Zip</div>
              <div className={`${classes.flexcontainerForOneeliments}`}>
              <TextField
                  className={`${classes.flexcontainerForOneeliments}`}
                  fullWidth
                  style={{
                    borderRadius: "0.4em",
                    border: "1px solid #b8c2cc",
                    height: "40px",
                  }}
                  variant={"outlined"}
                  size="small"
                  label="Zip Code"
                  type="number"
                  placeholder="Zip Code"
                  name="zipPostalCode"
                  onChange={handlechange}
                />
              </div>
            </div>
          </div>
        </Collapse>
      </List>
    </div>
  );
};

export default CostomInfo;
const status = { active: "Active", inactive: "Inactive" };
