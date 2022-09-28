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
import {
  DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER,
  UPDATE_TEMPLATE_TO_EMAIL,
  MAKE_TEMPLATE_AS_FAVORITES,
} from "../../../../../redux/actions/email";
import { connect } from "react-redux";
import moment from "moment";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles(() => ({
  cardroot: {
    padding: "6px",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    "&:hover": {
      boxShadow: "0 3px 10px 0 #ccc",
    },
  },
}));

const ListAllEmails = (props) => {
  const classes = useStyles();
  const {
    DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER,
    MAKE_TEMPLATE_AS_FAVORITES,
    MailIndexType,
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
      updateTo: startedFrom?.templete_Id,
      ObjectIdOfupdateTo: startedFrom?._id,
      updateFrom: destination?.templete_Id,
      ObjectIdOfupdateFrom: destination?._id,
    };

    if (MailIndexType === 0) {
      DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER("/api/email_compose", payload);
    } else if (MailIndexType === 1) {
      DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER("/api/email_nurturing", payload);
    } else if (MailIndexType === 2) {
      DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER("/api/email_system", payload);
    }
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
    }
    if (MailIndexType === 1) {
      MAKE_TEMPLATE_AS_FAVORITES(
        "/api/email_nurturing",
        payload,
        item?._id,
        item?.folderId
      );
    }
    if (MailIndexType === 2) {
      MAKE_TEMPLATE_AS_FAVORITES(
        "/api/email_system",
        payload,
        item?._id,
        item?.folderId
      );
    }
  };
  
  useEffect(() => {
    setItems(elements);
  }, [elements]);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className="row m-1"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable draggableId={item?._id} index={index} key={index}>
                  {(provided, snapshot) =>
                    MailIndexType === 0 ? (
                      <div
                        className="col-sm-12 col-md-2 col-lg-3 mt-1"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card
                          style={{ height: "100%", borderRadius: 10 }}
                          className={`shadow`}
                        >
                          <CardContent>
                            <iframe
                              scrolling="no"
                              className="shadow-sm"
                              style={{
                                position: "relative",
                                overflow: "hidden",
                                width: "100%",
                                border: "none",
                                height: "160px",
                                borderRadius: 10,
                              }}
                              title={`${item?.template}`}
                              srcDoc={item?.template}
                            />
                            <div
                              className="d-flex justify-content-end"
                              style={{ marginTop: "-3rem" }}
                            >
                              <div></div>
                              <Chip
                                className="rounded"
                                style={{
                                  color: "#47aee0",
                                  background: "#fffff",
                                }}
                                onClick={() => {
                                  handleView(item);
                                }}
                                icon={<VisibilityIcon />}
                                label="View"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div
                        className="col-sm-12 col-lg-12 col-md-12"
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
                            {MailIndexType === 0 && (
                              <IconButton
                                onClick={() => {
                                  handleMailInStar(item);
                                }}
                                className={"rounded-circle"}
                              >
                                {item?.is_Favorite ? (
                                  <StarIcon
                                    style={{ color: "#ffc107" }}
                                    fontSize="small"
                                  />
                                ) : (
                                  <StarOutlineIcon fontSize="small" />
                                )}
                              </IconButton>
                            )}

                            <div
                              className="rowd d-flex align-items-center"
                              style={{ width: "100%", cursor: "pointer" }}
                              onClick={() => {
                                handleView(item);
                              }}
                            >
                              <div className="col-sm-12 col-md-4 col-lg-4">
                                <Typography
                                  variant="h6"
                                  className="pl-0 mb-0 col-8 text-truncate"
                                >
                                  {<b>{item?.subject}</b>}
                                </Typography>
                              </div>

                              <div className="col-sm-12 col-md-3 col-lg-3">
                                <Typography className="pl-0 mb-0">
                                  Send to
                                </Typography>
                                <Typography
                                  color="textSecondary"
                                  className="mb-0"
                                >
                                  {item?.smartLists.length > 0 ? (
                                    <>
                                      {item?.smartLists?.map((item, i) => {
                                        return (
                                          <Chip
                                            size="small"
                                            className={classes.SelectSmList}
                                            label={item?.stdtype}
                                            key={i}
                                          />
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <>{item?.to.join(",") || "-"}</>
                                  )}
                                </Typography>
                              </div>
                              <div className="col-sm-12 col-md-2 col-lg-2">
                                <Typography className="pl-0 mb-0">
                                  Sent Time
                                </Typography>
                                <Typography
                                  color="textSecondary"
                                  className="mb-0"
                                >
                                  {moment(
                                    `${item?.sent_date} ${item?.sent_time}`
                                  ).format("MM/DD/YYYY, hh:mm A")}
                                </Typography>
                              </div>
                              {item?.attachments?.length > 0 && (
                                <div className="col-sm-12 col-md-2 col-lg-2">
                                  <Chip
                                    size="small"
                                    variant="outlined"
                                    icon={<AttachmentIcon />}
                                    label={item?.attachments?.length}
                                  />
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  }
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default connect(null, {
  DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER,
  UPDATE_TEMPLATE_TO_EMAIL,
  MAKE_TEMPLATE_AS_FAVORITES,
})(ListAllEmails);
