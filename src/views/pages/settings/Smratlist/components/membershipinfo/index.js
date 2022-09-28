import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Collapse,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
  const { isExit, smartList } = props;
  const classes = useStyles();
  const [openCollapsed, setOpenCollased] = useState("");
  const [programrank, setprogramrank] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedCandidate, setSelectedcandidate] = useState([]);
  const [candidateStripe, setcandidateStripe] = useState([]);

  const AddRankOfProgram = (data) => {
    let allranks = [];
    for (let program of data) {
      for (let rank of program?.program_rank) {
        allranks.push(rank);
      }
    }
    setprogramrank(allranks);
  };

  const AddStripsOfCandidate = (data) => {
    let allstrips = [];
    for (let program of data) {
      for (let strips of program?.stripes) {
        allstrips.push(strips);
      }
    }
    setcandidateStripe(allstrips);
  };

  const selectPrograms = async (program) => {
    let isDuplicate = await selectedPrograms?.filter(
      (item) => item?.programName === program?.programName
    );
    if (isDuplicate?.length > 0) {
      let removeProgram = await selectedPrograms?.filter(
        (item) => item?.programName !== program?.programName
      );
      await setSelectedPrograms(removeProgram);
      await AddRankOfProgram([...removeProgram]);
    } else {
      await setSelectedPrograms([...selectedPrograms, program]);
      await AddRankOfProgram([...selectedPrograms, program]);
    }
  };

  const HandleSelectedCandidate = async (candidate) => {
    let isDuplicate = await selectedCandidate?.filter( (item) => item?.candidate === candidate?.candidate );
    if (isDuplicate?.length > 0) {
      let removeCandidate = await selectedCandidate?.filter(
        (item) => item?.candidate !== candidate?.candidate
      );
      await setSelectedcandidate(removeCandidate);
      await AddStripsOfCandidate(removeCandidate);
    } else {
      await setSelectedcandidate([...selectedCandidate, candidate]);
      await AddStripsOfCandidate([...selectedCandidate, candidate]);
    }
  };

  const handleOpenCollapse = (id) => {
    if (openCollapsed === id) {
      setOpenCollased("");
    } else {
      setOpenCollased(id);
    }
  };

  const handle_program = (e, item) => {
    props.addToSmartList(e, "program", item?.programName);
    selectPrograms(item);
  };
  const handle_candidate = (e, item) => {
    props.addToSmartList(e, "candidate", item?.candidate);
    HandleSelectedCandidate(item);
  };

  const formateDataForEditProgram = () => {
    let afterFilter = [];
    if (smartList.program) {
      for (let program of smartList?.program) {
        const defaultProgram = props.programList?.programList.filter(
          (item) => item?.programName === program
        );
        if (defaultProgram?.length > 0) {
          afterFilter.push(defaultProgram[0]);
        }
        setSelectedPrograms([...selectedPrograms, [defaultProgram[0]]]);
      }
      let allranks = [];
      for (let program of afterFilter) {
        for (let rank of program?.program_rank) {
          allranks.push(rank);
        }
      }
      setprogramrank(allranks);
      setSelectedPrograms(afterFilter);
    }
    let afterFiltercandidate = [];
    if (smartList?.candidate) {
      for (let candidate of smartList?.candidate) {
        const defaultcandidate = props.stripeList.filter((item) => item?.candidate === candidate );
        if (defaultcandidate?.length > 0) {
          afterFiltercandidate.push(defaultcandidate[0]);
        }
        setSelectedcandidate([...selectedCandidate,defaultcandidate[0]]);
      }
      let allStrips = [];
      for (let candidate of afterFiltercandidate) {
        for (let stripe of candidate?.stripes) {
          allStrips.push(stripe);
        }
      }
      setcandidateStripe(allStrips);
    }
  };

  useEffect(() => {
    formateDataForEditProgram();
  }, []);

  return (
    <div>
      <List dense className="mb-0 p-0">
        <ListItem>
          <b>Membership Info</b>
        </ListItem>
        <ListItem
          className={`${classes.listItem} `}
          button
          onClick={() => handleOpenCollapse("pannel3")}
        >
          <ListItemText primary={"Program"} />
          <ListItemIcon>
            {openCollapsed?.includes("pannel3") ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel3"}>
          <div className={classes.flexcontainer}>
            {props.programList?.programList
              ? props.programList?.programList.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="d-flex justify-content-cenetr">
                        <Checkbox
                          style={{ height: "0.8em", width: "0.8em" }}
                          checked={isExit("program", item?.programName)}
                          onChange={(e) => {
                            handle_program(e, item);
                          }}
                        />
                        <span className="ml-1">{item?.programName}</span>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="m-1">Ranks</div>
          {
            <div className={`${classes.flexcontainer} m-8`}>
              {programrank?.map((item, index) => {
                return (
                  <div key={index}>
                    <div>
                      <Checkbox
                        size="small"
                        onChange={(e) => {
                          props.addToSmartList(
                            e,
                            "current_rank_name",
                            item?.rank_name
                          );
                        }}
                        className="mb-0"
                        checked={isExit("current_rank_name", item?.rank_name)}
                      />
                      <span>{item?.rank_name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          }
        </Collapse>
        <ListItem
          className={`${classes.listItem} `}
          button
          onClick={() => handleOpenCollapse("pannel4")}
        >
          <ListItemText primary={"Candidate"} />
          <ListItemIcon>
            {openCollapsed?.includes("pannel4") ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel4"}>
          <div className={classes.flexcontainer}>
            {props.stripeList !== null
              ? props.stripeList.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="d-flex justify-content-cenetr">
                        <Checkbox
                          style={{ height: "0.8em", width: "0.8em" }}
                          checked={isExit("candidate", item?.candidate)}
                          onChange={(e) => {
                            handle_candidate(e, item);
                          }}
                        />
                        <span>{item?.candidate}</span>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="m-1">Stripe</div>
          {
            <div className={classes.flexcontainer}>
              {candidateStripe.map((item, index) => {
                return (
                  <div key={index}>
                    <div>
                      <Checkbox
                        size="small"
                        checked={isExit("current_stripe", item?.stripe_name)}
                        onChange={(e) => {
                          props.addToSmartList(
                            e,
                            "current_stripe",
                            item?.stripe_name
                          );
                        }}
                      />
                      <span className="ml-1">{item?.stripe_name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          }
          {candidateStripe?.length === 0 && (
            <center className="ml-8">
              <div className={classes.flexcontainerForOneeliments}>No data</div>
            </center>
          )}
        </Collapse>
        <ListItem
          className={`${classes.listItem} `}
          button
          onClick={() => handleOpenCollapse("pannel5")}
        >
          <ListItemText primary={"Membership"} />
          <ListItemIcon>
            {openCollapsed?.includes("pannel5") ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel5"}>
          <div className={classes.flexcontainer}>
            {props.membershipList?.data?.length > 0
              ? props.membershipList?.data?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="d-flex justify-content-cenetr">
                        <Checkbox
                          style={{ height: "0.8em", width: "0.8em" }}
                          checked={isExit(
                            "membership_name",
                            item?.membership_name
                          )}
                          onChange={(e) => {
                            props.addToSmartList(
                              e,
                              "membership_name",
                              item?.membership_name
                            );
                          }}
                        />
                        <span className="ml-1">{item?.membership_name}</span>
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
          onClick={() => handleOpenCollapse("pannel2")}
        >
          <ListItemText primary={"Status"} />
          <ListItemIcon>
            {openCollapsed?.includes("pannel2") ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel2"}>
          <div className={classes.flexcontainer}>
            {Object.keys(status).map((item, i) => {
              return (
                <div key={i}>
                  <div className="d-flex align-items-center">
                    <Checkbox
                      style={{ height: "0.8em", width: "0.8em" }}
                      checked={isExit("status", status[item])}
                      onChange={(e) => {
                        props.addToSmartList(e, "status", status[item]);
                      }}
                    />
                    <span className="ml-1">{status[item]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Collapse>
        <ListItem
          className={`${classes.listItem} `}
          button
          onClick={() => handleOpenCollapse("pannel7")}
        >
          <ListItemText primary={"Finance"} />
          <ListItemIcon>
            {openCollapsed?.includes("pannel7") ? (
              <ExpandLessIcon className="mr-1" />
            ) : (
              <ExpandMoreIcon className="mr-1" />
            )}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapsed === "pannel7"}>
          <div className={classes.flexcontainer}>
            <div className="d-flex">
              <Checkbox
                style={{ height: "0.8em", width: "0.8em" }}
                checked={isExit("finance", "expired")}
                onChange={(e) => {
                  props.addToSmartList(e, "finance", "expired");
                }}
              />
              <span className="ml-1">{"Expired"}</span>
            </div>
            <div className="d-flex">
              <Checkbox
                style={{ height: "0.8em", width: "0.8em" }}
                checked={isExit("finance", "not_expired")}
                onChange={(e) => {
                  props.addToSmartList(e, "finance", "not_expired");
                }}
              />
              <span className="ml-1">{"Not Expired"}</span>
            </div>
          </div>
        </Collapse>
      </List>
    </div>
  );
};

export default CostomInfo;
const status = { active: "Active", inactive: "Inactive" };
