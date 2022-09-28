import React, { useMemo, useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { ChevronDown } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { GET_RANKS_REPORT_BY_PROGRAM } from "../../../../../redux/actions/statictics";
const Ranks = ({ selectedProgram, studentType }) => {
  const [params, setParams] = useState({
    programName: "",
  });
  const dispatch = useDispatch();
  const { rankReports } = useSelector((state) => state.statictics);

  useMemo(() => {
    if (params.programName !== "") {
      dispatch(GET_RANKS_REPORT_BY_PROGRAM(params));
    }
  }, [params, GET_RANKS_REPORT_BY_PROGRAM]);

  useMemo(() => {
    if (selectedProgram !== "" && studentType !== "All") {
      setParams((p) => ({
        ...p,
        programName: selectedProgram,
        studentType: studentType,
      }));
    } else {
      setParams((p) => ({ programName: selectedProgram }));
    }
  }, [selectedProgram, studentType]);

  // const [years] = useState(() => {
  //   let data = [];
  //   let currentYear = new Date().getFullYear();
  //   for (let i = 5; i > 0; i--) {
  //     data.push(currentYear - i);
  //   }
  //   data.reverse();
  //   return [currentYear, ...data];
  // });

  // function changeYear(key) {
  //   setParams((x) => ({
  //     ...x,
  //     year: key,
  //   }));
  // }

  // function yearList() {
  //   return (
  //     <React.Fragment>
  //       {years.map((x) => (
  //         <DropdownItem key={x} onClick={() => changeYear(x)} tag="a">
  //           {x}
  //         </DropdownItem>
  //       ))}
  //     </React.Fragment>
  //   );
  // }

  // function changeMonth(index) {
  //   setParams((x) => ({
  //     ...x,
  //     month: index,
  //   }));
  // }

  // function monthList() {
  //   return (
  //     <React.Fragment>
  //       {month.map((x) => (
  //         <DropdownItem
  //           key={x.index}
  //           onClick={() => changeMonth(x.index)}
  //           tag="a"
  //         >
  //           {x.name}
  //         </DropdownItem>
  //       ))}
  //     </React.Fragment>
  //   );
  // }

  // function rankStateCal(rank) {
  //   const thisMonth = rank?.this_month?.total || 0;
  //   const PrevMonth = rank?.last_month?.total || 0;
  //   let sign = thisMonth > PrevMonth ? "+" : "-";
  //   let distance = thisMonth - PrevMonth;
  //   return { sign, distance };
  // }

  return (
    <>
      <div className="stat-table mb-2">
        <div className="d-flex justify-content-between stat-thead dark-back p-1">
          <span style={{ flex: 2 }}>Image</span>
          <span className="rank-title" style={{ flex: 5 }}>
            Rank Name
          </span>
          <span style={{ flex: 1, minWidth: 35 }}>#</span>
          {/* <span style={{ flex:1, minWidth:35 }}>%</span> */}
        </div>
        {rankReports &&
          rankReports.map((rank, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center stat-tr px-1"
            >
              <div style={{ flex: 2 }}>
                {rank.rank_image !== "" ? (
                  <img
                    src={rank.rank_image}
                    alt="belt"
                    height={30}
                    width={40}
                  />
                ) : (
                  <span style={{ fontSize: 12 }}>no image</span>
                )}
              </div>

              <span style={{ flex: 5, minWidth: 100 }}>
                <span style={{ paddingLeft: 10 }}>{rank.rank_name}</span>
              </span>
              <span style={{ flex: 1, minWidth: 35 }}>
                {rank?.total_students}
              </span>
              {/* <div style={{ flex: 1, minWidth:35 }}>
                <span
                  style={
                    rankStateCal(rank).sign === "+"
                      ? { color: "#008000" }
                      : { color: "#ff0000" }
                  }
                >
                  {rankStateCal(rank).distance}
                </span>
                {rankStateCal(rank).sign === "+" ? (
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
          {rankReports &&
            rankReports.reduce((a, b) => a + b?.total_students || a, 0)}
        </span>
      </div>
    </>
  );
};

export default Ranks;
