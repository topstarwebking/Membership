import React, { useState } from "react";
import { Card, Row, Col} from "reactstrap";
import "../../../../../../assets/scss/pages/dashboard2.scss"
import PersonOutlinedIcon from "@material-ui/icons/PersonOutline";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PeopleIcon from "@material-ui/icons/People";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLaundryServiceOutlined"
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import EqualizerIcon from "@material-ui/icons/Equalizer";

const SingleStat = (props) => {
  const { data, staticticsCount } =props

  const [option, setOption] = useState("BBC");
  const stp = (p) => setOption(p);


  return (
    <div >

      {/* <div className="d-flex justify-content-between">
        <div className="stat-filter-area">
          <button
            onClick={() => stp("BBC")}
            className={
              option === "BBC"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            BBC
          </button>
          <button
            onClick={() => stp("LC")}
            className={
              option === "LC"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            LC
          </button>
          <button
            onClick={() => stp("IC")}
            className={
              option === "IC"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            IC
          </button>
          <button
            onClick={() => stp("AC")}
            className={
              option === "AC"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            AC
          </button>
        </div>
      </div> */}

      <Row>
        {
          staticticsCount?.map((item, i) => {
            return (
              <Col md="2" style={{ paddingRight: "10px" }} key={i}>
                <Card>
                  <div className="p-1">
                    <span>{item?.studentType === undefined ? "Total" : item?.studentType}</span>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="mini-card-amt">{item?.studentType === undefined ? item?.totalCount :  item?.count}</span>
                      <div style={{ marginTop: "15px" }}>
                        {
                          item?.studentType === "Active Student" ? <PersonOutlinedIcon style={{ color: "#FB8700" }} /> 
                          : 
                          item?.studentType === "Active Trial" ? <GroupAddIcon style={{ color: "#00D12E" }} /> 
                          : 
                          item?.studentType === "Leads" ? <EqualizerIcon style={{ color: "#FFCB0A" }} /> 
                          : 
                          item?.studentType === "Former Student" ? <PeopleIcon style={{ color: "#0184FF" }} />
                          :
                          item?.studentType === "Former Trial" ? <LocalLibraryOutlinedIcon style={{ color: "#00D12E" }} />
                          :
                          item?.studentType === undefined ? <GroupAddIcon style={{ color: "#155871" }} /> : null
                        }
                        
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </div>
  );
};

export default SingleStat;

const years = ["No Year Selected", 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
const months = [
  "No Month Selected",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
