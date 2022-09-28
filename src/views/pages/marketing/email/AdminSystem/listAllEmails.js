import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CardContent, Card, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AttachmentIcon from "@material-ui/icons/Attachment";
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
  const { ActiveSubfolder, openEmailwriteEditor, handleView, Tabsvalue } =props;
  return (
    <div>
      <DragDropContext>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="row m-1"
            >
              {ActiveSubfolder?.template?.length > 0 ? (
                ActiveSubfolder?.template.map((item, index) => (
                  <Draggable draggableId={item?._id} index={index} key={index}>
                    {(provided) =>
                      Tabsvalue === 0 ? (
                        <div
                          className="col-sm-12 col-md-2  col-lg-3 mt-1"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            style={{ height: "100%", borderRadius: 10 }}
                            className={`shadow`}
                          >
                            <CardContent style={{ height: "100%" }}>
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
                                style={{ marginTop: "-3rem" }}
                                className="d-flex justify-content-end"
                              >
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
                ))
              ) : (
                <div>
                  {ActiveSubfolder !== null && openEmailwriteEditor === "list" && (
                    <center>
                      <img
                        src={"/images/no-doc-in-file.png"}
                        alt={`${"nodata"}`}
                        style={{ cursor: "pointer" }}
                      />
                    </center>
                  )}
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ListAllEmails;
