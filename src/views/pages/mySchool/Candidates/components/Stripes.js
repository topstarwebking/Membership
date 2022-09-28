import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_STRIPE_REPORT_BY_CANDIDATE } from "../../../../../redux/actions/stripe";
import { Avatar } from "@material-ui/core";


const Stripes = ({ selectedCandidate, studentType, month, year }) => {
  const [params, setParams] = useState({ candidateName: "" });
  const dispatch = useDispatch();
  const { stripeReports } = useSelector((state) => state.stripe);
  
  useMemo(() => {
    if (params.candidateName !== "" && month && year) {
      dispatch(GET_STRIPE_REPORT_BY_CANDIDATE({params, month, year}));
    }
  }, [params, year, month]);

  useMemo(() => {
    if (selectedCandidate !== "" && studentType !== "All") {
      setParams((p) => ({
        ...p,
        candidateName: selectedCandidate,
        studentType: studentType,
      }));
    } else {
      setParams((p) => ({ candidateName: selectedCandidate }));
    }
  }, [selectedCandidate, studentType]);
  return (
    <>
      <div className="stat-table mb-2">
        <div className="d-flex justify-content-between stat-thead dark-back p-1">
          <span style={{ flex: 2 }}>Image</span>
          <span className="stripe-title" style={{ flex: 5 }}>
            Stripe Name
          </span>
          <span style={{ flex: 1, minWidth: 35 }}>#</span>
          {/* <span style={{ flex:1, minWidth:35 }}>%</span> */}
        </div> 
        {
          stripeReports?.sort((a,b) => (a?._id > b?._id) ? 1 : ((b?._id > a?._id) ? -1 : 0))?.map((stripe, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center stat-tr px-1"
            >
              <div style={{ flex: 2 }}>
                {stripe.stripe_image !== "" ? (
                  <img
                    src={stripe.stripe_image}
                    alt="belt"
                    height={30}
                    width={40}
                  />
                ) : (
                  <Avatar
                    src={stripe?.stripe_image}
                    alt={stripe?.stripe_name}
                  />
                )}
              </div>

              <span style={{ flex: 5, minWidth: 100 }}>
                <span style={{ paddingLeft: 10 }}>{stripe._id}</span>
              </span>
              <span style={{ flex: 1, minWidth: 35 }}>
                {stripe?.count}
              </span>
              {/* <div style={{ flex: 1, minWidth:35 }}>
              <span
                style={
                  rankStateCal(stripe).sign === "+"
                    ? { color: "#008000" }
                    : { color: "#ff0000" }
                }
              >
                {rankStateCal(stripe).distance}
              </span>
              {rankStateCal(stripe).sign === "+" ? (
                <ChevronUp
                  size={15}
                  className="chevron"
                  style={{ color: "#008000" }}
                />
              ) : (
                <ChevronDown
                  size={15}
                  className="chevron"
                  style={{ color: "#ff0000" }}
                />
              )}
            </div> */}
            </div>
          ))}
      </div>
      <div className="d-flex justify-content-between align-items-center stat-tr stat-rank-total blue-back">
        <span>Total</span>
        <span>
          {stripeReports &&
            stripeReports.reduce((a, b) => a + b?.count || a, 0)}
        </span>
      </div>
    </>
  );
};

export default Stripes;
