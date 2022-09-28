import React from "react";
import Documents from "../../../../pages/documents/components/Documents";
import { Dialog, DialogContent, Button } from "@material-ui/core";

class MergeForm extends React.Component {
  state = { modal: true };
  toggleModal = () => {
    this.setState((prevState) => ({ modal: !prevState.modal }));
  };
  render() {
    return (
      <Dialog fullScreen
        open={this.state.modal}>
        <DialogContent>
          <div>
            <div className='d-flex justify-content-end shadow-sm'>
              <Button onClick={this.toggleModal} variant='contained' color='primary' >
                close
              </Button>
            </div>
            <Documents
              from={"student"}
              data={this.props.data}
              isrecommendedOrregistered={this.props?.isrecommendedOrregistered}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
export default MergeForm;
