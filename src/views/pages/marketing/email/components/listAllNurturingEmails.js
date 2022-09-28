import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  CardContent,
  IconButton,
  Card,
  Typography,
  Checkbox,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Switch from "@material-ui/core/Switch";
import {
  DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER,
  UPDATE_TEMPLATE_TO_EMAIL,
  MAKE_TEMPLATE_AS_FAVORITES,
  SWAP_TEMPLATE,
  MAKE_TEMPLATE_AS_ACTIVATE,
  GET_CATEGORIES_EMAIL,
} from "../../../../../redux/actions/email";
import { connect } from "react-redux";
import moment from "moment";
import { Clock } from "react-feather";

const useStyles = makeStyles(() => ({
  cardroot: {
    padding: "6px",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    "&:hover": {
      boxShadow: "0 3px 10px 0 #ccc",
    },
  },
  SelectSmList: {
    borderRadius: "4px",
    background: "#eaf4fe",
    color: "#2796f3",
    fontWeight: "bold",
    marginRight: "6px",
  },
}));

const ListAllNurturingEmails = (props) => {
  const classes = useStyles();
  const userId = localStorage.getItem("user_id");
  const {
    DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER,
    UPDATE_TEMPLATE_TO_EMAIL,
    MAKE_TEMPLATE_AS_FAVORITES,
    MailIndexType,
    subFolderActiveName,
    SWAP_TEMPLATE,
    MAKE_TEMPLATE_AS_ACTIVATE,
    GET_CATEGORIES_EMAIL,
  } = props;
  const { elements, handleView, handleselecteOne, selectedId } = props;
  const [items, setItems] = useState([]);

  const onDragEnd = (result) => {
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
    let startedFrom = elements[result?.source.index];
    let destination = elements[result?.destination.index];
    let payload = {
      newPositionOfFirstSelected: result?.destination.index,
      FirstSelectedOid: startedFrom._id,
      DateOfFirstSelectedOid: startedFrom?.sent_date,

      newPositionOfSecondSelected: result?.source.index,
      SecondSelectedOid: destination._id,
      DateOfSecondSelectedOid: destination?.sent_date,
    };
    SWAP_TEMPLATE(startedFrom.folderId, payload);
    setTimeout(() => {
      GET_CATEGORIES_EMAIL("/api/email_nurturing");
    }, 300);
  };

  const handleMailInStar = (item) => {
    let payload = {
      is_Favorite: !item?.is_Favorite,
    };

    if (MailIndexType === 0) {
      MAKE_TEMPLATE_AS_FAVORITES(
        "/api/email_compose",
        payload,
        item?._id,
        item?.folderId
      );
    } else if (MailIndexType === 1) {
      MAKE_TEMPLATE_AS_FAVORITES(
        "/api/email_nurturing",
        payload,
        item?._id,
        item?.folderId
      );
    } else if (MailIndexType === 2) {
      MAKE_TEMPLATE_AS_FAVORITES(
        "/api/email_system",
        payload,
        item?._id,
        item?.folderId
      );
    }
  };
  const handleActiavateChange = (item) => {
    let payload = {
      tempId: [item?._id],
      isActive: item?.inActiveUsers.includes(userId),
    };

    if (MailIndexType === 0) {
      MAKE_TEMPLATE_AS_ACTIVATE("/api/email_compose", payload, item?.folderId);
    } else if (MailIndexType === 1) {
      MAKE_TEMPLATE_AS_ACTIVATE(
        "/api/email_nurturing",
        payload,
        item?.folderId
      );
    } else if (MailIndexType === 2) {
      MAKE_TEMPLATE_AS_ACTIVATE("/api/email_system", payload, item?.folderId);
    }
    console.log(MailIndexType);
    console.log(item?._id);
    if (item?._id) {
      console.log(item?.isActive);
    }
  };

  useEffect(() => {
    setItems(elements);
  }, [elements]);

  const getSmartList = (smartlist) => {
    let smartlistName = [];
    for (let folder of props?.getAllSmartList) {
      for (let item of folder?.smartlists) {
        if (smartlist?.includes(item?._id)) {
          smartlistName.push(item);
        }
      }
    }
    return smartlistName;
  };

  return (
    <div>
      <DragDropContext onDragEnd={MailIndexType === 1 ? onDragEnd : null}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => {
                return (
                  <Draggable
                    Draggable
                    draggableId={item?._id}
                    index={index}
                    key={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card className={`${classes.cardroot} m-1`}>
                          <CardContent className="mb-0 p-0 d-flex justify-content-start">
                            <Checkbox
                              checked={selectedId.includes(item?._id)}
                              value={item?._id}
                              onChange={handleselecteOne}
                            />

                            <div
                              className="rowd d-flex flex-row align-items-center"
                              style={{ width: "100%", cursor: "pointer" }}
                              onClick={() => {
                                handleView(item);
                              }}
                            >
                              <div className="mr-3">
                                <Typography
                                  variant="h6"
                                  color="textSecondary"
                                  className="mb-0 text-capitalize"
                                >
                                  {index + 1}
                                </Typography>
                              </div>

                              <div className="col-sm-12 col-md-3 col-lg-3">
                                <Typography
                                  variant="h6"
                                  className="pl-0 mb-0 col-8 text-truncate"
                                >
                                  {item?.subject}
                                </Typography>
                                <Typography
                                  color="textSecondary"
                                  className="mb-0 text-capitalize"
                                ></Typography>
                              </div>

                              <div className="col-sm-12 col-md-4 col-lg-4">
                                <Typography className="pl-0 mb-0">
                                  Send to
                                </Typography>
                                <div
                                  color="textSecondary"
                                  className="mb-0 d-flex "
                                >
                                  {getSmartList(item?.smartLists)?.length > 0
                                    ? getSmartList(item?.smartLists)?.map(
                                        (item, i) => {
                                          return (
                                            <Chip
                                              size="small"
                                              className={classes.SelectSmList}
                                              label={item?.smartlistname}
                                              key={i}
                                            />
                                          );
                                        }
                                      )
                                    : null}
                                </div>
                              </div>
                              <div className="col-sm-12 col-md-3 col-lg-3 ml-2">
                                <Typography
                                  color="textSecondary"
                                  className="mb-0"
                                >
                                  <span className="flex flex-row justify-content-center">
                                    {index === 0 ? (
                                      <>Send immediately</>
                                    ) : item?.days ? (
                                      <>
                                        Send {item?.days} days{" "}
                                        {item?.days_type || "after"} <br /> the
                                        previus message
                                      </>
                                    ) : (
                                      <>
                                        Send at{" "}
                                        {moment(item.sent_date).format(
                                          "MMM DD, YYYY"
                                        )}
                                      </>
                                    )}
                                  </span>
                                </Typography>
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-3 col-lg-3">
                              <span className="flex flex-row justify-content-center">
                                {item?.isActive
                                  ? "Deactivate template"
                                  : "Acitvate template"}
                              </span>
                              <Switch
                                checked={!item?.inActiveUsers.includes(userId)}
                                onChange={() => handleActiavateChange(item)}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    getAllSmartList: state.EmailMarketing.getAllSmartList,
  };
};
export default connect(mapStateToProps, {
  DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER,
  UPDATE_TEMPLATE_TO_EMAIL,
  MAKE_TEMPLATE_AS_FAVORITES,
  SWAP_TEMPLATE,
  MAKE_TEMPLATE_AS_ACTIVATE,
  GET_CATEGORIES_EMAIL,
})(ListAllNurturingEmails);
