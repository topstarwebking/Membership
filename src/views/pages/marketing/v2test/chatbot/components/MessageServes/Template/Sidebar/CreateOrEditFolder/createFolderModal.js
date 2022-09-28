import React, { useState } from "react";
import Slide from "@material-ui/core/Slide";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Label,
} from "reactstrap";
import { Plus } from "react-feather";
import { connect } from "react-redux";
import {
  CREATE_TEMPLATE_FOLDER,
  EDIT_FOLDER,
} from "../../../../../../../../../../redux/actions/marketing/text";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateFolderModalForm = (props) => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(props.item ? true : false);
  const [state, setState] = useState({
    ...props.item,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let onSubmit = async (e) => {
    e.preventDefault();
    if (props.item) {
      let value = await props.EDIT_FOLDER(
        { folderName: state.fileName.toLowerCase() },
        props.item
      );
      if (value) {
        setState({ ...state, fileName: "" });
        setOpen();
      }
    } else {
      if (state.fileName.length) {
        let createFolderData = {
          folderName: state.fileName,
        };
        props.CREATE_TEMPLATE_FOLDER(createFolderData);
        setState({ ...state, fileName: "" });
        setOpen();
      }
    }
  };
  return (
    <div>
      {props.item ? null : (
        <Button
          style={{
            color: "#fff",
            display: "flex",
            flex: 1,
            width: "100%",
            background: "#00a6e1",
            fontWeight: "bold !important",
            borderRadius: "5px !important",
            "&:hover": {
              background: "#00a6e1",
            },
          }}
          onClick={handleClickOpen}
        >
          + Add Folder
        </Button>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
      >
        <DialogTitle>
          {props.item ? "Edit Folder" : " Add New Folder"}
        </DialogTitle>
        <DialogContent>
          <Card>
            <CardBody>
              <Form className="mt-10" onSubmit={onSubmit}>
                <Row>
                  <Col sm="12">
                    <FormGroup className="form-label-group">
                      <Input
                        type="text"
                        name="fileName"
                        defaultValue={state.folderName}
                        onChange={(e) =>
                          setState({
                            ...state,
                            [e.target.name]: e.target.value,
                          })
                        }
                        id="folderName"
                        placeholder="Folder Name"
                      />
                      <Label for="nameFloating">Folder Name</Label>
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
                      <Button
                        outline
                        color="warning"
                        type="reset"
                        className="mb-1"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default connect(null, { CREATE_TEMPLATE_FOLDER, EDIT_FOLDER })(
  CreateFolderModalForm
);
