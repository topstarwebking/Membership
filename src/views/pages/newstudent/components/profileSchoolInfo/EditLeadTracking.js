// import React, { useState } from "react";
// import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
// import { connect } from "react-redux";
// import { TextField } from "@material-ui/core";
// import { EDIT_LEADS_TRACKING } from "../../../../../redux/actions/member";
// const IsSmallDevise = window.matchMedia("(max-width:624px)").matches;

// const Editleadmodal = (props) => {
//   const { item, keyname, title, setvalue, HandleClick2, value } = props;
//   const [modalOpen, setmodalOpen] = useState(true);
//   const handlemodal = () => {
//     HandleClick2(keyname, value, item);
//     setmodalOpen(false);
//   };
//   return (
//     <React.Fragment>
//       <Modal
//         isOpen={modalOpen}
//         toggle={() => {
//           setmodalOpen(!modalOpen);
//         }}
//         style={{
//           width: IsSmallDevise ? "100%" : "30%",
//         }}
//         className="modal-dialog-centered modal-lg"
//       >
//         <ModalHeader
//           toggle={() => {
//             setmodalOpen(!modalOpen);
//           }}
//         >
//           Edit {title}
//         </ModalHeader>
//         <ModalBody>
//           <div className="d-flex justify-content-between">
//             <TextField
//               fullWidth
//               style={{
//                 borderRadius: "0.4em",
//                 border: "1px solid #b8c2cc",
//                 height: "40px",
//               }}
//               variant={"outlined"}
//               size="small"
//               rows={1}
//               type="text"
//               name={keyname}
//               placeholder={title}
//               defaultValue={item[keyname]}
//               onChange={(e) => {
//                 setvalue(e.target.value);
//               }}
//               required
//             />
//           </div>

//           <div className="d-flex justify-content-end m-1">
//             <Button
//               color="danger"
//               onClick={() => {
//                 setmodalOpen(false);
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               color="primary"
//               className="ml-1"
//               onClick={() => {
//                 handlemodal(keyname, value, item);
//               }}
//             >
//               Add
//             </Button>
//           </div>
//         </ModalBody>
//       </Modal>
//     </React.Fragment>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     getLeadTrackingList: state.member.getLeadTrackingList,
//   };
// };

// export default connect(mapStateToProps, { EDIT_LEADS_TRACKING })(Editleadmodal);
//
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Input } from "reactstrap";
import { DialogTitle, FormGroup, FormLabel } from "@material-ui/core";

const EditleadsAndtags = (props) => {
  const [open, setOpen] = React.useState(true);
  const { item, keyname, title, setvalue, HandleClick2, value } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const handlemodal = () => {
    HandleClick2(keyname, value, item);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="LeadTracking Name"
              name="leads_category"
              id="leads_category"
              defaultValue={item[keyname]}
              onChange={(e) => {
                setvalue(e.target.value);
              }}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{
              color: "#878787",
              borderRadius: "6px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handlemodal}
            variant="contained"
            style={{
              background: "#40a7e1",
              color: "#ffff",
              borderRadius: "6px",
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditleadsAndtags;
