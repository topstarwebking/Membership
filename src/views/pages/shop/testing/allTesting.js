import React, { useState, useEffect, Fragment } from "react";
import {
  GET_PRODECT_FOLDER,
  DELETE_PRODECT_FOLDER,
  DELETE_PRODECT,
} from "../../../../redux/actions/shop";
import EditDeleteActionPopMenu from "./EditDeleteActionPopMenu";
import BuyNowModalForProdect from "./BuyNowModalForProdect";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import {
  List,
  ListItem,
  Button,
  makeStyles,
  Card,
  Grid,
} from "@material-ui/core";
import EditTestingModal from "./EditTestingModal";
import ManageFolder from "./manageFolder";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import EditDeleteFolder from "./EditDeleteFolder";
import NewTestingModal from "./addTestingModal";
function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}
const useStyles = makeStyles(() => ({
  activeFolder: {
    background: "#eaf4fe",
    "& button": {
      color: "#2796f3",
    },
  },
  inActiveFolder: {
    "&:hover": {
      background: "#eaf4fe",
    },
  },
  folderBtn: {
    width: "100%",
    background: "transparent",
    textTransform: "inherit",
    textAlign: "left",
    justifyContent: "start",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  listWrapper: {
    width: "360px !important",
    background: "#fff",
    paddingTop: "0px",
    position: "relative",
    overflow: "scroll",
    height: "70vh",
    borderRight: "2px solid #f8f8f8",
  },
  addMianFOlder: {
    color: "#fff",
    background: "#2796f3",
    fontWeight: "bold !important",
    "&:hover": {
      background: "#2796f3",
    },
  },
}));

const TestPaper = (props) => {
  const classes = useStyles();
  const [defaultAlert, setdefaultAlert] = useState(false);
  const [defaultAlert2, setdefaultAlert2] = useState(false);
  const [folderid, setfolderId] = useState(null);
  const [selectedProductItems, setSelectedProductItems] = useState([]);
  const [deleteId, setdeleteId] = useState("");
  const [selectFolderIndex, setSelectedFolderIndex] = useState(null);
  const {
    activeFolderMS,
    GET_PRODECT_FOLDER,
    getProdectfolder,
    userinformation,
  } = props;

  const ConFirmDelete = (folderid) => {
    props.DELETE_PRODECT_FOLDER(folderid);
    setdefaultAlert(false);
  };
  const OpenAlert = (itemid) => {
    setdefaultAlert(true);
    setfolderId(itemid);
  };
  const HandleProdect = (index) => {
    setSelectedFolderIndex(index);
    setSelectedProductItems(getProdectfolder?.[index]["products"]);
  };
  const deleteTestpaper = (id) => {
    setdefaultAlert2(true);
    setdeleteId(id);
  };

  const ConFirmDeleteProdect = () => {
    props.DELETE_PRODECT(deleteId);
    setdefaultAlert2(false);
  };

  useEffect(() => {
    if (getProdectfolder === null) {
      GET_PRODECT_FOLDER();
    }
    if (selectFolderIndex !== null) {
      setSelectedProductItems(
        getProdectfolder?.[selectFolderIndex]["products"]
      );
    }
  }, [getProdectfolder, selectFolderIndex, GET_PRODECT_FOLDER]);

  return (
    <Card>
      <div className="d-flex justify-content-between w-100 p-1">
        <List dense className={classes.listWrapper}>
          <ListItem className="pb-1">
            <ManageFolder update={false} open={false} />
          </ListItem>
          {getProdectfolder
            ? getProdectfolder?.map((item, i) => {
              return (
                <ListItem
                  key={item?._id}
                  className={`d-flex justify-content-between ${item?._id === activeFolderMS?._id
                    ? classes.activeFolder
                    : classes.inActiveFolder
                    }`}
                  style={{ padding: "0.5em" }}
                >
                  <Button
                    className={classes.folderBtn}
                    onClick={() => {
                      HandleProdect(i);
                    }}
                  >
                    <img
                      src="/images/FolderM.png"
                      alt={`${item?.folderName}`}
                    />
                    <span className="f-subname">{item?.folderName}</span>
                    {/* <div className="text-gray ml-1"><small>{selectedProductItems?.length === 0 ? 'No products':''}</small></div> */}
                  </Button>
                  <div className="d-flex justify-content-end mr-1">
                    {userinformation?.role === 1 ? (
                      <EditDeleteFolder
                        item={item}
                        OpenAlert={OpenAlert}
                        folderid={folderid}
                      />
                    ) : item?.adminId !== undefined ? (
                      <Fragment>
                        <HttpsOutlinedIcon
                          style={{ color: "#757575", fontSize: "1.2em" }}
                        />
                      </Fragment>
                    ) : (
                      <EditDeleteFolder
                        item={item}
                        OpenAlert={OpenAlert}
                        folderid={folderid}
                      />
                    )}
                  </div>
                </ListItem>
              );
            })
            : null}
        </List>
        <div className="w-100">
          <div className="d-flex justify-content-end pt-0 w-100">
            <NewTestingModal />
          </div>
          {selectedProductItems?.length === 0 ?
            <>
              <div className="d-flex justify-content-center w-100 pb-0">

                <img
                  src={"/images/no-doc-in-file.png"}
                  alt="nodata"
                  style={{ height: "400px", objectFit: "contain" }}
                />

              </div>
              <div className="d-flex justify-content-center w-100 pt-0">
                <h3>No Data</h3>
              </div>
            </> : <Grid container spacing={2} className="h-10">
              {selectedProductItems?.length > 0 &&
                selectedProductItems?.map((v, i) => (
                  <Grid
                    key={i}
                    item
                    sm={props.gridNumber}
                    md={props.gridNumber}
                    lg={props.gridNumber}
                  >
                    <Card
                      style={{
                        boxShadow: "none",
                        width: "100% !important",
                        marginBottom: "1em",
                        margin: "1em",

                        background: hexToRGB(v?.color, 0.1),
                      }}
                      className='shadow-sm rounded'
                    >
                      <div className="card-body w-100">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex justify-content-start">
                            <h5
                              className="text-capitalize"
                              style={{ color: v.color }}
                            >
                              <b>{v.product_name}</b>
                            </h5>
                          </div>
                          {userinformation?.role === 1 ? (
                            <EditDeleteActionPopMenu
                              deleteTestpaper={deleteTestpaper}
                              item={v}
                              editFolder={<EditTestingModal editData={v} />}
                            />
                          ) : v?.adminId !== undefined ? (
                            <div className="p-1">
                              <HttpsOutlinedIcon style={{ color: v.color }} />
                            </div>
                          ) : (
                            <EditDeleteActionPopMenu
                              deleteTestpaper={deleteTestpaper}
                              item={v}
                              editFolder={<EditTestingModal editData={v} />}
                            />
                          )}
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>Product Type:</div>
                          <div>{v.product_type}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>Price:</div>
                          <div>{v.total_price}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>Product description:</div>
                          <div>{v.product_description}</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end p-1">
                        <BuyNowModalForProdect
                          bg={hexToRGB(v?.color, 0.8)}
                          Product={v}
                          studentData={props.studentData}
                          selectedrow={props.selectedrow}
                        />
                      </div>
                    </Card>
                  </Grid>
                ))}
            </Grid>}
        </div>
      </div>
      <SweetAlert
        title="Are you sure?"
        warning
        show={defaultAlert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={() => {
          ConFirmDelete(folderid);
        }}
        onCancel={() => {
          setdefaultAlert(false);
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
      <SweetAlert
        title="Are you sure?"
        warning
        show={defaultAlert2}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={ConFirmDeleteProdect}
        onCancel={() => {
          setdefaultAlert2(false);
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    getProdectfolder: state.shop.getProdectfolder,
    userinformation: state.userinfo.userinformation,
  };
};

export default connect(mapStateToProps, {
  GET_PRODECT_FOLDER,
  DELETE_PRODECT_FOLDER,
  DELETE_PRODECT,
})(TestPaper);
