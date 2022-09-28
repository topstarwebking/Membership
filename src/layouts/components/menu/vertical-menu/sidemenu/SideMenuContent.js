import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import navigationConfig from "../../../../../configs/navigationConfig";
import { GET_COUNT_OF_STUDENT_BY_TYPE } from "../../../../../redux/actions/member";
import { Link, Redirect, useLocation } from "react-router-dom";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GET_USER_INFORMATION,  } from "../../../../../redux/actions/auth/loginActions";

const useStyles = makeStyles(() => ({
  makeActive: {
    background: "#eaf4fe",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  inactive: {
    background: "#fff",
  },
  activeChip: {
    color: "#486eaf",
    widht: "100%",
    background: "#eaf4fe",
    fontWeight: "bold",
  },
  activeChipNone: {
    color: "none",
    background: "none",
  },
  Inactivepage: {
    boxShadow: "none",
    margin: "0px",
    "&.MuiAccordion-root": {
      position: "static",
      color: "#878787",
    },
    "&.MuiAccordion-rounded:last-child": {},
    "&.MuiAccordion-root.Mui-expanded": {
      margin: "0px !important",
      minHeight: "auto !important",
    },
  },
  ActivePage: {
    boxShadow: "none",
    margin: "0px",
    "&.MuiAccordion-root": {
      position: "static",
      color: "#3599f3",
    },
    "&.MuiAccordion-rounded:last-child": {},
    "&.MuiAccordion-root.Mui-expanded": {
      margin: "0px !important",
      minHeight: "auto !important",
    },
  },
}));

const SideMenuContent = (props) => {
  const {
    GET_COUNT_OF_STUDENT_BY_TYPE,
    GET_USER_INFORMATION,
  } = props;
  const classes = useStyles();
  const location = useLocation();
  const [expandedMain, setExpandedMain] = React.useState(() => {
    return (
      "panel" +
        navigationConfig.SideBarMenu.findIndex((item) => {
          return location.pathname.includes(item?.navLink)
            ? true
            : item?.children?.find((subItem) =>
                location.pathname.includes(subItem?.navLink)
              );
        }) || "0"
    );
  });

  const [NestedLastChild, setNestedLastChild] = useState(() => {
    let selectedSubItem;
    navigationConfig.SideBarMenu.forEach((item) => {
      if (item.children) {
        item.children.forEach((subItem) => {
          if (location.pathname.includes(subItem.navLink)) {
            selectedSubItem = subItem;
          }
        });
      }
    });

    if (selectedSubItem) {
      return selectedSubItem.id;
    }
    return "";
  });
  const [NestedLastChildinsidechilde, setNestedLastChildinsidechilde] =
    useState("");

  const lastNested = "";

  const MainMenuSideBar = (panel) => (event, isExpanded) => {
    setExpandedMain(isExpanded ? panel : false);
  };
  const getUserInfoRole = () => {
    return JSON.parse(localStorage.getItem("userdata"))?.data?.role;
  };

  useEffect(() => {
    GET_COUNT_OF_STUDENT_BY_TYPE();
    GET_USER_INFORMATION();
  }, [GET_USER_INFORMATION, GET_COUNT_OF_STUDENT_BY_TYPE, ]);

  // useEffect(() => {

  //   // page-not-Found
  // }, [])
  // if (getUserInfoRole() === 1) {
  //   return <Redirect to={'/admin/schools'} />
  // }

  return (
    <div>
      {navigationConfig?.SideBarMenu?.map((item, i) => {
        return (
          <Fragment key={i}>
            <Accordion
              dense={"true"}
              style={{ margin: "0px" }}
              expanded={
                item?.navLink === undefined && expandedMain === "panel" + i
              }
              onChange={MainMenuSideBar("panel" + i)}
              className={
                expandedMain === "panel" + i
                  ? classes.ActivePage
                  : classes.Inactivepage
              }
            >
              <AccordionSummary
                style={{
                  margin: "0px",
                  ...(expandedMain === "panel" + i && {
                    backgroundColor: "#eaf4fe",
                    color: "rgb(33, 150, 243)",
                  }),
                }}
                expandIcon={
                  item?.children !== undefined ? <ExpandMoreIcon /> : ""
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <span className="p-1"> {item?.icon}</span>
                {item?.navLink === undefined ? (
                  <div className="pt-1">{item?.title}</div>
                ) : (
                  <Link to={item?.navLink} className="w-100 pt-1">
                    <span
                      className="mr-1"
                      style={{
                        color:
                          expandedMain !== "panel" + i
                            ? "rgb(135, 135, 135)"
                            : "rgb(33, 150, 243)",
                      }}
                    >
                      {item?.title}
                    </span>
                  </Link>
                )}
              </AccordionSummary>
              <AccordionDetails className="p-0">
                <List dense className="w-100 m-1">
                  {item?.children !== undefined
                    ? item.children?.map((menu, i) => {
                        return (
                          <Fragment key={menu?.title + i}>
                            <Link
                              to={
                                menu.navLink === undefined
                                  ? window.location.pathname
                                  : menu?.navLink
                              }
                            >
                              <ListItem
                                button
                                style={{
                                  ...(NestedLastChild === menu?.id && {
                                    backgroundColor: "#eaf4fe",
                                    color: "rgb(33, 150, 243)",
                                  }),
                                }}
                                onClick={() => {
                                  setNestedLastChild(menu?.id);
                                }}
                              >
                                <ListItemIcon
                                  style={{
                                    color:
                                      NestedLastChild !== menu?.id
                                        ? "rgb(135, 135, 135)"
                                        : "rgb(33, 150, 243)",
                                  }}
                                >
                                  {menu?.icon}
                                </ListItemIcon>
                                <div className="w-100 d-flex justify-content-between">
                                  <Typography
                                    className="mb-0 navifont"
                                    style={{
                                      color:
                                        NestedLastChild !== menu?.id
                                          ? "rgb(135, 135, 135)"
                                          : "rgb(33, 150, 243)",
                                    }}
                                  >
                                    {menu?.title}
                                  </Typography>
                                </div>
                                {menu?.children !== undefined ? (
                                  <ExpandMore style={{ color: "gray" }} />
                                ) : (
                                  <div></div>
                                )}
                              </ListItem>
                            </Link>
                            <Collapse
                              in={
                                NestedLastChild === menu?.id &&
                                lastNested !== false
                              }
                            >
                              <List dense className="w-100 m-1">
                                {menu?.children !== undefined
                                  ? menu.children?.map((menuLast, i) => {
                                      return (
                                        <Link key={i} to={menuLast.navLink}>
                                          <ListItem
                                            button
                                            onClick={() => {
                                              setNestedLastChildinsidechilde(
                                                menuLast.navLink
                                              );
                                            }}
                                            style={{
                                              ...(NestedLastChildinsidechilde ===
                                                menuLast?.navLink && {
                                                backgroundColor: "#eaf4fe",
                                                color: "rgb(33, 150, 243)",
                                              }),
                                            }}
                                          >
                                            <ListItemIcon>
                                              {menuLast?.icon}
                                            </ListItemIcon>
                                            <Typography
                                              className="mb-0 navifont"
                                              color="textSecondary"
                                            >
                                              {menuLast?.title}
                                            </Typography>
                                          </ListItem>
                                        </Link>
                                      );
                                    })
                                  : null}
                              </List>
                            </Collapse>
                          </Fragment>
                        );
                      })
                    : null}
                </List>
              </AccordionDetails>
            </Accordion>
          </Fragment>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getCountOfStudentByType: state.member.getCountOfStudentByType,
  };
};
export default connect(mapStateToProps, {
  GET_COUNT_OF_STUDENT_BY_TYPE,
  GET_USER_INFORMATION,
  
})(SideMenuContent);
