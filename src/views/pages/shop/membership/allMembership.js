import React from "react";
import BuyNowModal from "./buyNowModal";
import { Trash2 } from "react-feather";
import EditModal from "./editMembershipModal";
import { connect } from "react-redux";
import NoMemberShip from "../../../../assets/img/noMemberShip.svg";
import {
  GET_MEMBERSHIP_LIST,
  DELETE_MEMBERSHIP,
  GET_STUDENT_LIST,
} from "../../../../redux/actions/shop";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CardActionArea,
} from "@material-ui/core";

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
class AllMembershipList extends React.Component {
  state = {
    modal: false,
    defaultAlert: false,
    itemToDelete: null,
  };

  componentDidMount() {
    this.props.GET_MEMBERSHIP_LIST();
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  ConFirmDelete = () => {
    this.props.DELETE_MEMBERSHIP(this.state.itemToDelete?._id);
    this.setState({ defaultAlert: false });
  };
  handleDelete = (item) => {
    this.setState({ itemToDelete: item, defaultAlert: true });
  };

  render() {
    const { membershipList } = this.props;
    const { studentPageInfo } = this.props;
    return (
      <React.Fragment>
        <br />
        <Grid container spacing={1}>
          {membershipList?.length === 0 ? (
            <div
              style={{ width: "100%", height: "70vh" }}
              className="d-flex justify-content-center"
            >
              <center>
                <img
                  height="160px"
                  style={{ marginBottom: "2rem" }}
                  src={NoMemberShip}
                  alt="no mebreship found"
                />
                <h4>No Membership Found !</h4>
              </center>
            </div>
          ) : (
            membershipList?.map((v, i) => {
              return (
                <Grid
                  item
                  sm={12}
                  md={6}
                  key={v?._id}
                  lg={studentPageInfo ? 6 : 3}
                  xl={3}
                >
                  <Card
                    style={{
                      boxShadow: "none",
                      width: "100%",
                      height: "100%",
                      borderRadius: "1em",
                      background: hexToRGB(v?.color, 0.1),
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <Chip
                        className="text-capitalize"
                        size="medium"
                        label={`$ ${v?.total_price} / ${v?.duration_type} `}
                        style={{
                          color: "#fff",
                          background: hexToRGB(v?.color, 0.8),
                          fontWeight: "bold",
                          borderTopLeftRadius: "0px",
                          borderTopRightRadius: "0px",
                          borderBottomLeftRadius: "0.8em",
                          borderBottomRightRadius: "0.8em",
                          margin: "0 1em",
                          fontSize: "1.2em",
                        }}
                      />
                      <div className="m-1">
                        <EditModal bg={hexToRGB(v?.color, 0.8)} userinfo={v} />
                        <Trash2
                          color={v?.color}
                          onClick={() => {
                            this.handleDelete(v);
                          }}
                        />
                      </div>
                    </div>
                    <CardContent className="pt-0">
                      <Typography
                        className="text-uppercase "
                        style={{
                          paddingBottom: "0px",
                          fontSize: "1.2em",
                          fontWeight: "bold",
                          color: v?.color,
                        }}
                      >
                        <em>{v.membership_name}</em>
                        <br />
                      </Typography>
                    </CardContent>
                    <CardActionArea className="p-1 d-flex justify-content-between">
                      <BuyNowModal
                        studentPageInfo={studentPageInfo}
                        memberShipDetail={v}
                        bg={hexToRGB(v?.color, 0.8)}
                        studentList={this.props.shop.studentList}
                        type={"student_profile"}
                        price={v?.total_price}
                      />
                      <Typography
                        className="text-capitalize mb-0 pb-0 text-end"
                        style={{ fontWeight: "bold", color: v?.color }}
                      >
                        Payment Type {v?.payment_type}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
        <SweetAlert
          title="Are you sure?"
          warning
          show={this.state.defaultAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="danger"
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          onConfirm={this.ConFirmDelete}
          onCancel={() => {
            this.setState({ defaultAlert: false });
          }}
        >
          You won't be able to revert this!
        </SweetAlert>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shop: state.shop.membershipList,
    userinformation: state.userinfo.userinformation,

  };
};

export default connect(mapStateToProps, {
  DELETE_MEMBERSHIP,
  GET_STUDENT_LIST,
  GET_MEMBERSHIP_LIST,
})(AllMembershipList);
