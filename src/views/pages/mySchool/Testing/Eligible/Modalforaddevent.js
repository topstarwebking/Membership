import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
// import Appointment from "../../../../apps/appointment/Appointment";
import { X } from "react-feather";

const Modalforaddevent = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function modalToggle() {
    setIsModalOpen((p) => !p);
  }

  return (
    <div>
      <div className="section-header">
        <div className="d-flex justify-content-between align-items-center">
          <span className="section-title">All Events</span>
          <button
            className="custom-inline-btn ml-1"
            style={{ height: "2.5em" }}
            onClick={modalToggle}
          >
            Add
          </button>
        </div>
        <div className="divider" />
      </div>
      <Dialog open={isModalOpen} maxWidth="xl">
        <DialogTitle>
          <div className="d-flex justify-content-end">
            <IconButton onClick={modalToggle}>
              <X />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="card" style={{ minWidth: "1600px" }}>
            {/* <Appointment /> */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modalforaddevent;
