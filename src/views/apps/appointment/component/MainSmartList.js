import React, { useState, useEffect } from "react";
import { Chip, Dialog, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import SmartListForEmail from "./smartlistforappt";
import { GET_ALL_SMART_LIST } from "../../../../redux/actions/email";

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
  SelectSmList: {
    borderRadius: "6px",
    background: "#eaf4fe",
    color: "#2796f3",
    fontWeight: "bold",
    marginRight: "6px",
    cursor: "pointer",
  },
}));

const MainSmartlist = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [smartlistId, setSmartListId] = useState([]);
  const [SmartListRows, setSmartListRows] = useState([]);
  const { smartlist, setSmartLis } = props;
  const toggleModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    let ids = [];
    let rows = [];
    if (props.getAllSmartList?.length > 0) {
      for (let folder of props.getAllSmartList) {
        for (let smlist of folder?.smartlists) {
          if ([""]?.smartLists?.includes(smlist?._id)) {
            rows.push(smlist);
            ids.push(smlist?._id);
          }
        }
      }
      setSmartListId(ids);
      setSmartListRows(rows);
    }
  }, []);

  const filterSmartlist = (sml) => {
    if (smartlistId?.includes(sml?._id)) {
      let smListId = smartlistId?.filter((item) => item !== sml?._id);
      let smListRows = SmartListRows?.filter((item) => item?._id !== sml?._id);
      setSmartListRows(smListRows);
      setSmartListId(smListId);
      setSmartLis(smListRows);
    } else {
      setSmartListRows([...SmartListRows, sml]);
      setSmartListId([...smartlistId, sml?._id]);
      setSmartLis([...smartlist, sml]);
    }
  };
  const handleSelectItem = (item) => {
    filterSmartlist(item);
  };
  return (
    <div>
      <Typography className="mb-0">Select Smart List</Typography>
      <div
        className={classes.selectBtn}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {SmartListRows?.length > 0 && (
          <Chip
            size="small"
            className={classes.SelectSmList}
            label={"Select smartlist"}
          />
        )}
        {SmartListRows?.map((item, i) => {
          return (
            <Chip
              icon={
                <CloseIcon
                  onClick={() => {
                    filterSmartlist(item);
                  }}
                />
              }
              size="small"
              className={classes.SelectSmList}
              label={item?.smartlistname}
              key={i}
            />
          );
        })}
      </div>
      <Dialog
        anchor="right"
        open={open}
        PaperProps={{
          elevation: 0,
          style: {
            width: "40%",
          },
        }}
      >
        <div className="p-1">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start">
              <IconButton onClick={toggleModal} className="rounded-circle">
                <CloseIcon />
              </IconButton>
              <Typography className="mt-1">
                <b>Smart List</b>
              </Typography>
            </div>
          </div>
          <div>
            <Row>
              <Col sm="12" lg="12" md="12">
                <SmartListForEmail
                  handleSelectItem={handleSelectItem}
                  smartlistId={smartlistId}
                />
              </Col>
            </Row>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getAllSmartList: state.EmailMarketing.getAllSmartList,
  };
};
export default connect(mapStateToProps, { GET_ALL_SMART_LIST })(MainSmartlist);
