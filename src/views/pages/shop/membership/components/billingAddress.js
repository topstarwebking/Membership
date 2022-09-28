import { makeStyles, Chip } from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(() => ({
  cardStyle: {
    width: "100%",
    boxShadow: "2px 0 14px #f8f8f8",
  },
  primaryTitle: {
    color: "#112236",
    fontWeight: 600,
  },
  editbillAddress: {
    borderRadius: "4px",
    color: "#2796f3",
    fontWeight: "bold",
    background: "#eaf4fe",
  },
}));

const BillingAddress = (props) => {
  const classes = useStyles();
  // const [modalOpen, setModalOpen] = useState(false);
  // const toggleModal = () => {
  //   setModalOpen(!modalOpen);
  // };
  return (
    <div className="p-1">
      <div className="d-flex justify-content-between">
        <span className={classes.primaryTitle}>Billing Address</span>
        <Chip onClick={props.handelToggle} size='small' icon={<EditIcon  style={{ color: "#2796f3" }} />} label={'Edit'} className={classes.editbillAddress} />
        {/* <UpdateAddress
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          handelChange={props.addressChange}
          address={props.address}
        /> */}
      </div>
      <div>{props?.address?.address},  {props?.address?.street_no}, {props?.address?.zip}</div>
    </div>
  );
};

export default BillingAddress;
