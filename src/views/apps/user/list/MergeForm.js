import React from "react";
import { Button } from "reactstrap";
import { Printer } from "react-feather";
import Document from "../../../pages/documents/components/Documents";
import { Dialog, DialogContent } from "@material-ui/core";

class MergeForm extends React.Component {
  state = { modal: false };
  toggleModal = () => {
    this.setState((prevState) => ({ modal: !prevState.modal }));
  };
  render() {
    return (
      <React.Fragment>
        <Button
          style={{ color: "gray", padding: "0.5em" }}
          onClick={this.toggleModal}
          disabled={this.props.data.length > 0 ? false : true}
        >
          <Printer size={21} />
          <br/>
          <span style={{ fontSize: "1em" }}>Print</span>
        </Button>
        <Dialog fullScreen open={this.state.modal}>
          <DialogContent>
            <div>
              <div className="d-flex justify-content-end shadow-sm mb-2">
                <Button
                  onClick={this.toggleModal}
                  variant="contained"
                  color="primary"
                >
                  close
                </Button>
              </div>
              <Document
                from={"student"}
                data={this.props.data}
                isrecommendedOrregistered={
                  this.props?.isrecommendedOrregistered
                }
              />
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}
export default MergeForm;
