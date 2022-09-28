import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Label,
} from "reactstrap";
import {
  CREATE_DOCUMENT_SUB_FOLDER,
  GET_DOCUMENT_FOLDER_LIST,
  UPLOAD_DOCUMENT,
} from "../../../../redux/actions/document/document";
import { Upload, File } from "react-feather";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

class FloatingLabels extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
  }
  state = {
    document: "",
    document_name: "",
    subFolder: [],
    rowData: [],
    selectedSubFolder: "",
  };
  componentDidMount() {
    this.props.GET_DOCUMENT_FOLDER_LIST();
  }

  fileHandler = (e) => {
    this.setState({
      ...this.state,
      document: e.target.files[0],
      document_name: e.target.files[0].name,
    });
  };

  changeHandler(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  onsubmit(e) {
    e.preventDefault();
    this.props.UPLOAD_DOCUMENT(
      this.state.selectedSubFolder,
      this.state.document,
      this.state.document_name
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.folderList !== this.props.folderList) {
      this.setState({
        rowData: this.props.folderList,
        loading: false,
        subFolder: this.props.folderList[0].subFolder,
      });
    }
  }
  SelectMainFolder = (e) => {
    this.setState({
      subFolder: this.props.folderList[e.target.value].subFolder,
    });
  };
  SelectSubFolder = (e) => {
    this.setState({ ...this.state, selectedSubFolder: e.target.value });
  };

  render() {
    const { rowData, subFolder } = this.state;

    return (
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Form className="mt-10" onSubmit={this.onsubmit.bind(this)}>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label> Upload Document</Label>
                  <div className="my-2">
                    {this.state.document ? (
                      <img
                        src={this.state.document}
                        alt="selectImage"
                        width="100"
                        height="100"
                      />
                    ) : (
                      <File size="32" />
                    )}
                  </div>
                  <input
                    style={{ display: "none" }}
                    type={"file"}
                    ref={this.myRef}
                    onChange={this.fileHandler}
                  />
                  <Button
                    color="outline-primary"
                    type="button"
                    size="sm"
                    onClick={() => {
                      this.myRef.current.click();
                    }}
                  >
                    <Upload
                      size={12}
                      style={{
                        margin: "0 0.5em 0 0",
                      }}
                    />
                    Upload
                  </Button>
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup className="form-label-group">
                  <Label for="mainfolder">Folder Name</Label>
                  <Input
                    defaultValue={this.state.document_name}
                    onChange={this.SelectMainFolder}
                    type="select"
                    name="selectedFolder"
                    id="mainfolder"
                  >
                    {rowData.map((collapseItem, id) => {
                      return (
                        <option key={id} value={id}>
                          {collapseItem.folderName}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup className="form-label-group">
                  <Label for="subfolder">Sub Folder Name</Label>
                  <Input
                    defaultValue={this.state.selectedSubFolder}
                    type="select"
                    onChange={this.SelectSubFolder}
                    name="selectedSubFolder"
                    id="subfolder"
                  >
                    <option value={""}>Not Seleced </option>
                    {subFolder.map((subfolder, id) => {
                      return (
                        <option key={id} value={subfolder._id}>
                          {subfolder.subFolderName}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup className="form-label-group">
                  <Button
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    Save
                  </Button>
                  <Button outline color="warning" type="reset" className="mb-1">
                    Delete
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    folderList: state.document.documentFolderList,
  };
};
export default connect(mapStateToProps, {
  CREATE_DOCUMENT_SUB_FOLDER,
  GET_DOCUMENT_FOLDER_LIST,
  UPLOAD_DOCUMENT,
})(FloatingLabels);
