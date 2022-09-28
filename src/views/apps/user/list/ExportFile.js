import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  CustomInput
} from "reactstrap"
import {
  Download,
} from "react-feather"


const toastCss = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: true,
  };
};
class ExportFile extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      fileFormat: "csv",
      fileName: ""
    }
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }))

  }


  exportToFile = () => {
    const { fileName, fileFormat } = this.state;
    const { exportData } = this.props;
    if (fileName && fileFormat) {
      const fullNameOfFile = `${fileName}.${fileFormat}`
      exportData(fullNameOfFile)
      this.toggleModal()
      this.setState({
        fileName:""
      })
    }

    else {
      // toast.error(("Please give file name").replace(/\\/g, ""), toastCss());
    }
  };
  render() {
    return (
      <React.Fragment>
        <Button className="btn-lg fides1 btn waves-effect waves-light" onClick={this.toggleModal}>
          <Download size={21} />
          <br></br>
          Export
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered">
          <ModalHeader toggle={this.toggleModal}>Export To Excel</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Input
                type="text"
                value={this.state.fileName}
                onChange={e => this.setState({ fileName: e.target.value })}
                placeholder="Enter File Name"
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                type="select"
                id="selectFileFormat"
                name="customSelect"
                value={this.state.fileFormat}
                onChange={e => this.setState({ fileFormat: e.target.value })}
              >
                <option>xlsx</option>
                <option>csv</option>
              </CustomInput>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.exportToFile}>
              Export
            </Button>
            <Button color="flat-danger" onClick={this.toggleModal}>

              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ExportFile