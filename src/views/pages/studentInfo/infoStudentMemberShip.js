import React, { Fragment } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Button,
} from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import {
  GET_STUDENT_PURCHASE_LIST,
  DeleteMembershipFromStudent,
} from "../../../redux/actions/shop";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { Drawer } from "@material-ui/core";
import MembershipMain from "../shop/membership/membershipMain";
import MemberShipTable from "./componets/memberShipTable";

class UsersList extends React.Component {
  state = {
    defaultAlert: false,
    modal: false,
    purchaseList: null,
  }

  componentDidMount() {
    this.props.GET_STUDENT_PURCHASE_LIST();
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  selectTodelete = (id) => {
    this.setState({ memberShipTodelete: id, defaultAlert: true });
  };
  ConFirmDelete = () => {
    this.props.DeleteMembershipFromStudent(this.state?.memberShipTodelete);
    this.setState({ defaultAlert: false });
  };
  render() {
    const IsSmallDevise = window.matchMedia('(max-width:1064px)').matches;
    const { purchaseList } = this.props;
    return (
      <Fragment>
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
        <Card>
          <CardHeader>
            <div className="d-flex justify-content-end w-100">
              <Button.Ripple color="primary" onClick={this.toggleModal}>
                Add New +
              </Button.Ripple>
              <Drawer anchor={'right'}
                onClose={this.toggleModal}
                PaperProps={{
                  elevation: 0, style: {
                    width: IsSmallDevise ? "100%" : "50%",
                    padding: "10px"

                  }
                }}
                open={this.state.modal}>
                <div>
                  <div>
                    <IconButton
                      onClick={this.toggleModal}
                      className="rounded-circle"
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <MembershipMain CloseDrawerMS={this.toggleModal} isStudentInfo={true} />
                </div>
              </Drawer>
            </div>
          </CardHeader>
        </Card>
        <MemberShipTable selectTodelete={this.selectTodelete} data={purchaseList?.membership_details} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchaseList: state.shop?.purchaseList,
  };
};

export default connect(mapStateToProps, {
  GET_STUDENT_PURCHASE_LIST,
  DeleteMembershipFromStudent,
})(UsersList);
