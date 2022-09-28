import React, { useState } from "react";
import { connect } from "react-redux";
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
import {
  CREATE_TEMPLATE_SUBFOLDER_FOR_ADMIN,
  EDIT_TEXT_SUB_FOLDER_FOR_ADMIN,
} from "../../../../../../redux/actions/admin/Text";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalForm = (props) => {
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
      let value = await props.EDIT_TEXT_SUB_FOLDER_FOR_ADMIN(
        { subFolderName: state.subFolderName.toLowerCase() },
        props.subFolder
      );
      if (value) {
        setState({ ...state, fileName: "" });
        setOpen();
      }
    } else {
      if (state.subFolderName.length) {
        let createFolderData = { subFolderName: state.subFolderName.trim() };
        let response = await props.CREATE_TEMPLATE_SUBFOLDER_FOR_ADMIN(
          createFolderData,
          props.mainFolder
        );
        if (response) {
          setState({ ...state, fileName: "" });
          setOpen();
        }
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
            background: "#00a6e1",
            fontWeight: "bold !important",
            margin: "1em",
            "&:hover": {
              background: "#00a6e1",
            },
          }}
          className="rounded"
          onClick={handleClickOpen}
        >
          + Add Subfolder
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
          {props.item ? "Edit Sub Folder" : "Add New Sub Folder"}
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
                        name="subFolderName"
                        defaultValue={state.subFolderName}
                        onChange={(e) =>
                          setState({
                            ...state,
                            [e.target.name]: e.target.value,
                          })
                        }
                        id="subFolderName"
                        placeholder="Sub Folder Name"
                      />
                      <Label for="nameFloating">Sub Folder Name</Label>
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <div className="d-flex justify-content-end">
                      <FormGroup className="form-label-group">
                        <Button
                          variant="contained"
                          type="submit"
                          style={{
                            background: "#00a6e1",
                            fontWeight: "bold",
                            color: "#fff",
                            borderRadius: "5px",
                          }}
                          className="mr-1 mb-1"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          type="reset"
                          style={{
                            fontWeight: "bold",
                            borderRadius: "5px",
                          }}
                          className="mb-1"
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                      </FormGroup>
                    </div>
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

export default connect(null, {
  CREATE_TEMPLATE_SUBFOLDER_FOR_ADMIN,
  EDIT_TEXT_SUB_FOLDER_FOR_ADMIN,
})(ModalForm);
