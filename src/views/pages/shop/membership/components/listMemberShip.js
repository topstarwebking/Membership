import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
} from "@material-ui/core";
import BuyNowModal from "../buyNowModal";
import {
  GET_MEMBERSHIP_FOLDER_LIST,
  DELETE_MEMBERSHIP_FOLDER,
  GET_STUDENT_LIST,
  DELETE_MEMBERSHIP,
} from "../../../../../redux/actions/shop";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import Skeleton from "@material-ui/lab/Skeleton";
import EditDeleteMemership from "./EditAndDeleteMembership";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import NewMembership from "../addMembershipModal";
import { useMediaQuery } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useParams } from "react-router-dom";
import { GET_ACTIVE_STUDENT_INFO } from "../../../../../redux/actions/member";

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
const ListMemberShip = (props) => {
  const IsSmallDevise = useMediaQuery("(max-width:1224px)");
  const { membershipList, folderId, userinformation, getstudentInfoById, GET_ACTIVE_STUDENT_INFO } = props;
  const { studentId } = useParams();
  const [itemToDelete, setitemToDelete] = useState({
    id: null,
    defaultAlert: false,
  });

  const handleDelete = (id) => {
    setitemToDelete({ id: id, defaultAlert: true });
  };
  const ConFirmDelete = () => {
    props.DELETE_MEMBERSHIP(itemToDelete?.id);
    setitemToDelete({ id: null, defaultAlert: false });
  };

  useEffect(() => {
    if (studentId) {
      GET_ACTIVE_STUDENT_INFO(studentId);
    }

  }, [GET_ACTIVE_STUDENT_INFO]);

  console.log(getstudentInfoById);

  return (
    <div className="p-1">
      <div className="d-flex justify-content-between w-100 p-1">
        {IsSmallDevise ? (
          <IconButton
            onClick={() => {
              props.setFoldermenuOpen(!props.FoldermenuOpen);
            }}
            className="rounded-circle pt-0"
          >
            <MenuIcon />
          </IconButton>
        ) : null}
        <div className="d-flex justify-content-between w-100">
          <div></div>
          <NewMembership isEdit={false} userinfo={null} />
        </div>
      </div>
      {membershipList?.length === 0 ?
        <>
          <div className="d-flex justify-content-center w-100 pb-0">

            <img
              src={"/images/no-doc-in-file.png"}
              alt="nodata"
              style={{ height: "400px", objectFit: "contain" }}
            />

          </div>
          <div className="d-flex justify-content-center w-100 pt-0">
            <h3>No Membership found!</h3>
          </div>
        </>
        : <Grid container spacing={2}>
          {membershipList === undefined
            ? [1, 2, 3, 4, 5, 6].map((item) => {
              return (
                <Grid item sm={12} md={6} lg={6} key={item} className="p-1">
                  <Card>
                    <CardContent>
                      <div
                        className={
                          "d-flex justify-content-center align-items-center"
                        }
                      >
                        <Skeleton
                          animation="wave"
                          variant="circle"
                          width={40}
                          height={40}
                        />
                        <div style={{ width: "60%", paddingLeft: "8px" }}>
                          <Skeleton
                            animation="wave"
                            variant="rect"
                            width={"100%"}
                            height={10}
                          />
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={"70%"}
                            height={10}
                          />
                        </div>
                      </div>
                      <br />
                      <div>
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={"100%"}
                          height={10}
                        />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={"100%"}
                          height={10}
                        />
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={"70%"}
                          height={10}
                        />
                        <br />
                        <Skeleton
                          animation="wave"
                          variant="rect"
                          width={"40%"}
                          height={20}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
            : membershipList?.map((v) => {
              return (
                <Grid
                  item
                  sm={12}
                  md={6}
                  lg={6}
                  key={v?._id}
                  style={{ width: "100%" }}
                >
                  <Card
                    style={{
                      boxShadow: "none",
                      width: "100%",
                      height: "100%",
                      marginBottom: "1em",
                      margin: "0",
                      background: hexToRGB(v?.color, 0.1),
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <Chip
                        className="text-capitalize"
                        size="medium"
                        label={`Total $ ${v?.total_price}`}
                        style={{
                          color: "#fff",
                          background: hexToRGB(v?.color, 0.8),
                          fontWeight: "bold",
                          borderTopLeftRadius: "0px",
                          borderTopRightRadius: "0px",
                          borderBottomLeftRadius: "0.8em",
                          borderBottomRightRadius: "0.8em",
                          margin: "0 1em",
                          fontSize: "1em",
                        }}
                      />
                      <div>
                        {userinformation?.role === 1 ? (
                          <EditDeleteMemership
                            bg={hexToRGB(v?.color, 0.8)}
                            folderId={folderId}
                            userinfo={v}
                            handeldelete={handleDelete}
                            itemId={v?._id}
                            pricingOption={props.pricingOption}
                          />
                        ) : v?.adminId !== undefined ? (
                          <HttpsOutlinedIcon
                            style={{ color: v.color, padding: "1px" }}
                          />
                        ) : (
                          <EditDeleteMemership
                            bg={hexToRGB(v?.color, 0.8)}
                            folderId={folderId}
                            userinfo={v}
                            handeldelete={handleDelete}
                            itemId={v?._id}
                            pricingOption={props.pricingOption}
                          />
                        )}
                      </div>
                    </div>
                    <CardContent className="pt-0">
                      <div
                        className="text-capitalize "
                        style={{
                          paddingBottom: "0px",
                          fontWeight: "bold",
                          fontSize: "1em",
                          color: v?.color,
                        }}
                      >
                        <p className="mb-0">
                          Name: <b>{v.membership_name}</b>
                        </p>
                        <p className="mb-0">
                          Type: <b>{v.membership_type}</b>
                        </p>
                      </div>
                    </CardContent>
                    <div className="p-1 d-flex justify-content-between align-items-center">
                      <BuyNowModal
                        CloseDrawerMS={props.CloseDrawerMS}
                        memberShipDetail={v}
                        bg={hexToRGB(v?.color, 0.8)}
                        studentList={getstudentInfoById}
                        type={"student_profile"}
                        price={v?.total_price}
                      />
                      <Typography
                        className="text-capitalize mb-0 pb-0 text-end"
                        style={{
                          fontWeight: "bold",
                          color: v?.color,
                          fontSize: "0.8em",
                        }}
                      >
                        Payment Type {v?.payment_type}
                      </Typography>
                    </div>
                  </Card>
                </Grid>
              );
            })}
        </Grid>}
      <SweetAlert
        title="Are you sure?"
        warning
        show={itemToDelete?.defaultAlert}
        reverseButtons
        showCancel
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={ConFirmDelete}
        onCancel={() => {
          setitemToDelete({ id: null, defaultAlert: false });
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
    </div>
  );
};

// GET_STUDENT_LIST
const mapStateToProps = (state) => {
  return {
    studentList: state.shop.studentList,
    getstudentInfoById: state.member.getstudentInfoById,
  };
};

export default connect(mapStateToProps, {
  GET_MEMBERSHIP_FOLDER_LIST,
  GET_ACTIVE_STUDENT_INFO,
  DELETE_MEMBERSHIP_FOLDER,
  GET_STUDENT_LIST,
  DELETE_MEMBERSHIP,
})(ListMemberShip);
