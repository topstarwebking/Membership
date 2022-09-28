import {
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  Grid,
  Chip,
} from "@material-ui/core";
import React from "react";
import { MoreVertical } from "react-feather";
import { Card } from "reactstrap";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import {
  statusKeyToNumberMapping,
  statusNumberToLabelMapping,
} from "../../../../../redux/actions/todo";
import { FlagIcon } from "../../icons/FlagIcon";

import { priorityMapping } from "../../../../../redux/actions/todo";
const getStaskStatusBg = (status) => {
  if (status === "In Progress") {
    return "#ffb800";
  } else if (status === "Not completed") {
    return "#b1530f";
  } else if (status === "Completed") {
    return "#37d400";
  } else if (status === "Pending") {
    return "#ff0000";
  }
};
const Genral = () => {
  return (
    <div>
      <div className="p-1 m-1">
        <Grid spacing={2} container>
          <Grid item sm={12} md={6} lg={6}>
            <Card
              className="shadow-sm"
              style={{
                height: "300px",
                width: "100%",
                fontSize: "0.8em",
                margin: "0px",
              }}
            >
              <div className="border-bottom d-flex justify-content-between">
                <span className=" p-1">
                  <h4>Labels</h4>
                </span>
                <span className="d-flex justify-content-end p-1  ">
                  <MoreVertical></MoreVertical>
                </span>
              </div>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon
                      style={{
                        fontSize: "0.8em",
                        margin: "0px",
                        color: labledots[0],
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText>Events</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon
                      style={{
                        fontSize: "0.8em",
                        margin: "0px",
                        color: labledots[1],
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText>Business</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon
                      style={{
                        fontSize: "0.8em",
                        margin: "0px",
                        color: labledots[2],
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText>Personal</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon
                      style={{
                        fontSize: "0.8em",
                        margin: "0px",
                        color: labledots[3],
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText>Appointment</ListItemText>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item sm={12} md={6} lg={6}>
            <Card
              className="shadow-sm"
              style={{
                height: "300px",
                width: "100%",
                fontSize: "0.8em",
                margin: "0px",
              }}
            >
              <div className="border-bottom d-flex justify-content-between">
                <span className=" p-1">
                  <h4>Status</h4>
                </span>
                <span className="d-flex justify-content-end p-1  ">
                  <MoreVertical></MoreVertical>
                </span>
              </div>
              <List dense>
                {Object.keys(priorityMapping)
                  .reverse()
                  .map((key, i) => {
                    return (
                      <ListItem
                        key={key}
                        //   onClick={() => onSelect(key)}
                        className={`mr-1 ml-1`}
                      >
                        <ListItemIcon>
                          <FlagIcon color={PriorityTag[i]} />
                        </ListItemIcon>
                        <ListItemText
                          className={`mr-1 ml-1`}
                          style={{ fontWeight: "bold" }}
                        >
                          {priorityMapping[key]}
                        </ListItemText>
                      </ListItem>
                    );
                  })}
              </List>
            </Card>
          </Grid>
          <Grid item sm={12} md={6} lg={6}>
            <Card
              className="shadow-sm"
              style={{
                height: "300px",
                width: "100%",
                fontSize: "0.8em",
                margin: "0px",
              }}
            >
              <div className="border-bottom d-flex justify-content-between">
                <span className=" p-1">
                  <h4>Priority</h4>
                </span>
                <span className="d-flex justify-content-end p-1  ">
                  <MoreVertical></MoreVertical>
                </span>
              </div>
              <List>
                {Object.keys(statusKeyToNumberMapping).map((key, i) => {
                  return (
                    <ListItem key={i}>
                      <Chip
                        fullWidht
                        size="small"
                        style={{
                          margin: "0.5em",
                          color: "#fff",
                          width: "30%",
                          background: getStaskStatusBg(
                            statusNumberToLabelMapping[
                              statusKeyToNumberMapping[key]
                            ]
                          ),
                        }}
                        label={
                          statusNumberToLabelMapping[
                            statusKeyToNumberMapping[key]
                          ]
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Genral;
const PriorityTag = {
  4: "#FF3E3E",
  3: "#E2B408",
  2: "#0AB5FF",
  1: "#AAAAAA",
  0: "#18D441",
};
const labledots = {
  0: "#0184FF",
  1: "#FF7979",
  2: "#89D35B",
  3: "#C07272",
};
