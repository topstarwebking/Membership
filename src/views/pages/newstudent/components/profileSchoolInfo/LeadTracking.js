import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import {
  Chip,
  TextField,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import EditAndDeletelead from "./EditAndDeletelead";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
const IsSmallDevise = window.matchMedia("(max-width:624px)").matches;
const LeadTracking = (props) => {
  const {
    isEdit,
    data,
    keyname,
    value,
    setvalue,
    title,
    HandleClick,
    HandleClick2,
    studentinfo,
  } = props;
  const [openModalByid, setOpenModalById] = useState(null);
  const openModal = (item) => {
    props.openSweetAlt();
    setOpenModalById(item);
  };
  return (
    <React.Fragment>
      <Chip
        style={{
          background: "#bedff3",
          color: "#3092d7",
          marginLeft: "1em",
          borderRadius: "4px",
          height: "36px",
        }}
        onClick={() => {
          openModal(keyname);
        }}
        disabled={!isEdit}
        size="small"
        label={<b>{studentinfo !== undefined ? "Manage" : "Manage"}</b>}
      />

      <Modal
        isOpen={openModalByid === keyname}
        className="modal-dialog-centered modal-sm"
        style={{
          width: IsSmallDevise ? "100%" : "600px",
        }}
      >
        <ModalBody>
          <div style={{ height: "70vh", overflow: "scroll" }}>
            <h4>
              <span style={{ color: "#2196f4" }}>{title}</span>
            </h4>
            <br />
            <div className="d-flex justify-content-between">
              <TextField
                fullWidth
                style={{
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  height: "40px",
                  marginRight: "10px",
                }}
                variant={"outlined"}
                size="small"
                rows={1}
                type="text"
                name={keyname}
                placeholder={title}
                onChange={(e) => {
                  setvalue(e.target.value);
                }}
                required
              />
              <Button
                style={{
                  color: "#fff",
                  background: "#00a6e1",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
                onClick={() => {
                  HandleClick(keyname, value);
                }}
              >
                Add
              </Button>
            </div>
            <div>
              <Table denes="true">
                <TableBody>
                  {data?.length > 0
                    ? data.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell
                              style={{ padding: "0.3em" }}
                              align="left"
                            >
                              {item[keyname]}
                            </TableCell>
                            <TableCell
                              style={{
                                padding:
                                  item?.adminId !== undefined ? "1em" : "0.3em",
                              }}
                              align="right"
                            >
                              {item?.adminId !== undefined ? (
                                <div>
                                  <HttpsOutlinedIcon
                                    fontSize="small"
                                    style={{ color: "#757575" }}
                                  />
                                </div>
                              ) : (
                                <EditAndDeletelead
                                  askeDeleteConfirmation={
                                    props.askeDeleteConfirmation
                                  }
                                  item={item}
                                  openModalByid={openModalByid}
                                  keyname={keyname}
                                  placeholder={title}
                                  setvalue={setvalue}
                                  HandleClick2={HandleClick2}
                                  value={value}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </div>
            <div className="d-flex justify-content-end m-1">
              <Button
                variant="outlined"
                onClick={() => {
                  props.oncancel();
                  setOpenModalById(null);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    userinformation: state.userinfo.userinformation,
  };
};
export default connect(mapStateToProps, null)(LeadTracking);
