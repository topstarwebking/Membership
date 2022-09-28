import React, { useState } from "react";
import BuyNowForm from "./buyNowForm";
import { Chip, Drawer, IconButton } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IS_MEMBERSHIP_PAYMENT_DONE } from "../../../../redux/actions/shop";
import { connect } from "react-redux";

const BuyNowModal = (props) => {
  const {IS_MEMBERSHIP_PAYMENT_DONE} = props
  const isMobileView = useMediaQuery("(max-width:1224px)");
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
    IS_MEMBERSHIP_PAYMENT_DONE(false)
    // props.CloseDrawerMS()
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
            width: isMobileView ? "100%" : "50%",
          },
        }}
      >
        <div>
          <IconButton onClick={toggleModal} className="rounded-circle">
            <CloseIcon />
          </IconButton>
          <BuyNowForm
            toggle={toggleModal}
            CloseDrawerMS={props.CloseDrawerMS}
            memberShipDetail={props.memberShipDetail}
            studentList={props.studentList}
            type={"student profile"}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default connect(null, {IS_MEMBERSHIP_PAYMENT_DONE})(BuyNowModal);
