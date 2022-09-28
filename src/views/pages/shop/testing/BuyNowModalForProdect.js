import React, { useState } from "react";
import { Chip, Drawer, IconButton } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import BuyNow from "./BuyNow";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyNowModalForProdect = (props) => {
  const isMobileView = useMediaQuery("(max-width:1224px)");
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Chip
        onClick={toggleModal}
        size="small"
        style={{
          borderRadius: "1.6em",
          color: "#fff",
          background: props.bg,
          fontWeight: "bold",
        }}
        label="Buy Now"
      />
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          elevation: 0,
          style: {
            width: isMobileView ? "100%" : "30%",
          },
        }}
      >
        <div style={{ background: "#f8f8f8" }}>
          <IconButton onClick={toggleModal} className="rounded-circle">
            <CloseIcon />
          </IconButton>
          <BuyNow
            Product={props.Product}
            toggleModal={toggleModal}
            studentData={props.studentData}
            selectedrow={props.selectedrow}
          />
        </div>
      </Drawer>
      <ToastContainer />
    </div>
  );
};

export default BuyNowModalForProdect;
