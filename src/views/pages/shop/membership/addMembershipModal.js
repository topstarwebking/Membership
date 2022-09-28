import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { Button } from "@material-ui/core";
import NewMembership from "./NewMembershipForm";
class ModalForm extends React.Component {
  state = {
    activeTab: "1",
    modal: false,
  };

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    const { isEdit, userinfo } = this.props;
    return (
      <React.Fragment>
        <Button
          variant="contained"
          onClick={this.toggleModal}
          style={{
            background: "#2796f3",
            color: "#ffff",
            borderRadius: "6px",
          }}
        >
          Add New
        </Button>
        <Dialog open={this.state.modal} onClose={this.toggleModal}>
          <DialogActions className="d-flex justify-content-between">
            <div>Add New Membership</div>
            <IconButton onClick={this.toggleModal}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <NewMembership
              toggle={this.toggleModal}
              isEdit={isEdit ? isEdit : false}
              userinfo={userinfo}
            />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}
export default ModalForm;
