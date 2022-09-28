import React, { useState } from "react";
import { Card, CardContent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SupportTab1 from "./supportTab1/ticketsupportForm";
import SupportTab2 from "./supportTab2/tableSupportTab2";
import { useParams } from "react-router-dom";
const userData = JSON.parse(localStorage.getItem("userdata"));

const useStyles = makeStyles({
  cardStyle: {
    borderRadius: "8px",
    boxShadow: "none",
    cursor: "pointer",
  },
  selected: {
    textTransform: "capitalize",
    backgroundColor: "#2796f3",
    fontWeight: "bold",
    color: "#fff",
    "&:hover": {
      background: "#00cfe8",
    },
  },
  unselected: {
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#00cfe8",
  },
});
const SupportTicket = () => {
  const classes = useStyles();
  const { type } = useParams();
  const [ActiveTab, setTabActive] = useState(1);

  const handleActiveTab = (id) => {
    setTabActive(id);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <div className="d-flex  justify-content-between">
          {ActiveTab === 1 || type === "My-tickets" ? <h4>All Tickets</h4> :null}
            <div className="d-flex  justify-content-end">
              {ActiveTab === 1 || type === "My-tickets" ? (
                <Button
                  style={{
                    borderRadius: 6,
                  }}
                  disabled={userData?.data?.role === 1}
                  onClick={() => handleActiveTab(0)}
                  className={classes.selected}
                >
                  Add Ticket
                </Button>
              ) : (
                <Button
                  style={{
                    borderRadius: 6,
                  }}
                  onClick={() => handleActiveTab(1)}
                  className={classes.selected}
                >
                  Back
                </Button>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div
              style={{ width: "500px", background: "#f8f8f8" }}
              className="d-flex flex-row rounded"
            ></div>
          </div>
          <br />
          <br />
          {ActiveTab === 0 && <SupportTab1 setTabActive={setTabActive} />}
          {ActiveTab === 1 || type === "My-tickets" ? <SupportTab2 />:null}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTicket;
