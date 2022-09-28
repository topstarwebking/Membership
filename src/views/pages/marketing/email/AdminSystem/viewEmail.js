import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Typography,
  Chip,
} from "@material-ui/core";
import {
  KeyboardBackspace,
  Delete,
  Edit,
  Star,
  StarBorder,
  ExpandMore,
  FileCopy,
} from "@material-ui/icons";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";
import { connect } from "react-redux";

const colorList = [
  "#3371FF",
  "#35068D",
  "#B9160C",
  "#2EB90C",
  "#E70CAE",
  "#B2071C",
];

function hexToRGB(hex, alpha) {
  try {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  } catch (error) {
    return hex;
  }
}
const useStyles = makeStyles(() => ({
  CardStyle: {
    paddingTop: "0px",
    boxShadow: "0 4px 20px 0 rgb(0 0 0 / 5%)",
    width: "100%",
  },
  contentStyle: {
    position: "relative",
    overflow: "auto",
    height: "74vh",
    width: "100%",
  },
  fileAttached: {
    height: "8rem",
    width: "8rem",
    border: "2px dashed",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eaf4fe",
  },
  SelectSmList: {
    borderRadius: "4px",
    background: "#eaf4fe",
    color: "#2796f3",
    fontWeight: "bold",
    marginRight: "6px",
  },
}));

const backTolist = null;
const ViewEmail = (props) => {
  const classes = useStyles();
  const [isStart, setIsStart] = useState(null);
  const [SweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [bgColor, setBgColor] = useState("#B9160C");
  const [smlistInTemplate, setsmListInTemplate] = useState([])
  const {
    viewTemplate,
    handleView,
    setEmailwriteEditor,
    setViewTemplate,
    getAllSmartList,
    updaTetetemplate,
    deletTemplate,
  } = props;
  const handleMailInStar = (item) => {
    let payload = {
      is_Favorite: !item?.is_Favorite,
    };
    let formData = new FormData();
    let dataEntries = Object.entries(payload);
    dataEntries.map((v, i) => {
      formData.append(v[0], v[1]);
      return v;
    });
    updaTetetemplate(
      formData,
      item?._id,
      item?.folderId
    );
    setIsStart(!isStart);
  };

  useEffect(() => {
    setIsStart(viewTemplate?.is_Favorite);
    setBgColor(colorList[Math.floor(Math.random() * colorList.length)]);
  }, [viewTemplate]);

  const ConFirmDelete = () => {
    deletTemplate(viewTemplate?._id);
    handleView(backTolist);
    setSweetAlertOpen(false)
    setEmailwriteEditor("list");

  };

  const handleEdit = (item) => {
    setViewTemplate(item);
    setEmailwriteEditor("add");
  };
  const getSmartList = () => {
    let smartlistName = []
    for (let folder of getAllSmartList) {
      for (let item of folder?.smartlists) {
        if (viewTemplate?.smartLists?.includes(item?._id)) {
          smartlistName.push(item)
        }
      }
    }
    setsmListInTemplate(smartlistName)
  }
  useEffect(() => {
    getSmartList()
  }, [])

  return (
    <Fragment>
      <div className="p-1">
        <Card className={`mb-1 ${classes.CardStyle}`}>
          <CardContent className={"d-flex justify-content-between p-0"}>
            <div className="d-flex justify-content-start align-items-center">
              <IconButton
                onClick={() => {
                  setEmailwriteEditor("list");
                  setViewTemplate(null);
                }}
                className={"rounded-circle"}
              >
                <KeyboardBackspace />
              </IconButton>
              <Typography className="mb-0">
                <b>{viewTemplate?.subject}</b>
              </Typography>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <IconButton
                onClick={() => {
                  handleMailInStar(viewTemplate);
                }}
                className={"rounded-circle"}
              >
                {isStart ? (
                  <Star style={{ color: "#ffc107" }} fontSize="small" />
                ) : (
                  <StarBorder fontSize="small" />
                )}
              </IconButton>
              <IconButton
                className={"rounded-circle"}
                onClick={() => {
                  handleEdit({ ...viewTemplate });
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => {
                  setSweetAlertOpen(true);
                }}
                className={"rounded-circle"}
              >
                <Delete />
              </IconButton>
            </div>
          </CardContent>
        </Card>
        <Card className={classes.CardStyle}>
          <CardContent className={classes.contentStyle}>
            <div className="d-flex justify-content-start">
              <Avatar
                src="hs"
                alt={viewTemplate?.from}
                style={{
                  background: hexToRGB(bgColor, 0.16),
                  color: bgColor,
                }}
                className="mr-1"
              />
              <div className="d-flex flex-column">
                <div style={{ width: "270px" }}>
                  <Typography className="mb-0">
                    Support@nextlevelmedia.com
                  </Typography>
                  <div className="d-flex justify-content-start">
                    <p>
                      To:{" "}
                      {viewTemplate && viewTemplate.to && viewTemplate.to[0]}
                    </p>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        tag="div"
                        className="font-small-3 cursor-pointer d-flex justify-content-between"
                      >
                        <div className="text-secondary ml-1">
                          More <ExpandMore />
                        </div>
                      </DropdownToggle>
                      <DropdownMenu tag="ul" left={"true"} className="p-50">
                        <DropdownItem tag="li" className="px-25">
                          Emails :
                          <strong className="text-truncate">
                            {viewTemplate &&
                              viewTemplate.to &&
                              viewTemplate?.to?.join(", ")}
                          </strong>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
                {
                  smlistInTemplate.length > 0 ? (
                    <div>
                      <span>Smart List: </span>
                      {smlistInTemplate?.map((item, i) => {
                        return (
                          <Chip
                            size="small"
                            className={classes.SelectSmList}
                            label={item?.smartlistname}
                            key={i}
                          />
                        );
                      })}
                    </div>
                  ) : null}
              </div>
            </div>
            <div className="mt-2">
              <div
                dangerouslySetInnerHTML={{ __html: viewTemplate?.template }}
              />
            </div>
            <br />
            {viewTemplate?.attachments?.map((item, i) => {
              return (
                <a
                  target="blank"
                  href={item}
                  key={i}
                  className={classes.fileAttached}
                >
                  <FileCopy style={{ fontSize: "4rem" }} />
                </a>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={SweetAlertOpen}
        title="Delete file ?"
        onConfirm={ConFirmDelete}
        onCancel={() => {
          setSweetAlertOpen(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you want to delete?"
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    getAllSmartList: state.EmailMarketing.getAllSmartList,
  };
};
export default connect(mapStateToProps, null)(ViewEmail);
