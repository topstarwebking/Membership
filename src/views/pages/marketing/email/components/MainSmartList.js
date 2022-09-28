import React, { useState, useEffect } from "react";
import { Chip, Drawer, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import SmartListForEmail from "./SmartListForEmail";

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

const BuyNowModal = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { getAllSmartList,
    smartlistRows,
    setSmartListRows,
    smartlistId,
    setSmartListId,
    viewTemplate
  } = props
  const toggleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let ids = []
    let rows = []
    if (getAllSmartList?.length > 0) {
      for (let folder of getAllSmartList) {
        for (let smlist of folder?.smartlists) {
          if (viewTemplate?.smartLists?.includes(smlist?._id)) {
            rows.push(smlist)
            ids.push(smlist?._id)
          }
        }
      }
      setSmartListId(ids)
      setSmartListRows(rows)
    }

  }, [viewTemplate?.smartLists])

  const filterSmartlist = (sml) => {
    if (smartlistId?.includes(sml?._id)) {
      let smListId = smartlistId?.filter(item => item !== sml?._id)
      let smListRows = smartlistRows?.filter(item => item?._id !== sml?._id)
      setSmartListRows(smListRows)
      setSmartListId(smListId)
    } else {
      setSmartListRows([...smartlistRows, sml])
      setSmartListId([...smartlistId, sml?._id])
    }
  }
  const handleSelectItem = (item) => {
    filterSmartlist(item)
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
        {smartlistRows?.length === 0 && (
          <Chip
            size="small"
            className={classes.SelectSmList}
            label={"Select smartlist"}
          />
        )}
        {
          smartlistRows?.map((item, i) => {
            return (
              <Chip
                icon={<CloseIcon onClick={()=>{filterSmartlist(item)}} />}
                size="small"
                className={classes.SelectSmList}
                label={item?.smartlistname}
                key={i}
              />
            );
          })}
      </div>
      <Drawer
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
                  smartlistRows={smartlistRows}
                  setSmartListRows={setSmartListRows}
                  getAllSmartList={getAllSmartList}
                  handleSelectItem={handleSelectItem}
                  smartlistId={smartlistId}
                />
              </Col>
            </Row>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getAllSmartList: state.EmailMarketing.getAllSmartList,
  };
};

export default connect(mapStateToProps, null)(BuyNowModal);
