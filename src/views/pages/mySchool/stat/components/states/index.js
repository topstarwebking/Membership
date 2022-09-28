import React, { useState, useEffect } from "react";
import SingleStat from "./SingleStat";
import { GET_STUDENET_COUNT_STATISTICS } from "./../../../../../../redux/actions/statictics";
import { connect } from "react-redux";

const Index = (props) => {
  const { selectedProgram, statisticsCount, GET_STUDENET_COUNT_STATISTICS } = props
  useEffect(() => {
    GET_STUDENET_COUNT_STATISTICS()
  }, [GET_STUDENET_COUNT_STATISTICS])

  // const [data, setData] = useState([
  //   {
  //     subData: [
  //       {
  //         pathColor: "#0184FF",
  //         trailColor: "#d6d6d6",
  //         title: "Member",
  //         count: 10,
  //         label: "Member",
  //         icon: (
  //           <div className="sch-icon">
  //             <PersonOutlinedIcon style={{ color: "#FB8700" }} />
  //           </div>
  //         ),
  //       },
  //       {
  //         pathColor: "#FF753A",
  //         trailColor: "#d6d6d6",
  //         title: "Active Trails",
  //         count: 15,
  //         label: "Active Trails",
  //         icon: (
  //           <div className="sch-icon">
  //             <GroupAddIcon style={{ color: "#00D12E" }} />
  //           </div>
  //         ),
  //       },
  //       {
  //         pathColor: "#FFCA0D",
  //         trailColor: "#d6d6d6",
  //         title: "Lead",
  //         count: 20,
  //         label: "Lead",
  //         icon: (
  //           <div className="sch-icon">
  //             <EqualizerIcon style={{ color: "#FFCB0A" }} />
  //           </div>
  //         ),
  //       },
  //       {
  //         pathColor: "#FF5A5A",
  //         trailColor: "#d6d6d6",
  //         title: "Former Members",
  //         count: 10,
  //         label: "Former Members",
  //         icon: (
  //           <div className="sch-icon">
  //             <PeopleIcon style={{ color: "#0184FF" }} />
  //           </div>
  //         ),
  //       },
  //       {
  //         pathColor: "#FF5A5A",
  //         trailColor: "#d6d6d6",
  //         title: "Former Trials",
  //         count: 10,
  //         label: "Former Trials",
  //         icon: (
  //           <div className="sch-icon">
  //             <LocalLibraryOutlinedIcon style={{ color: "#00D12E" }} />
  //           </div>
  //         ),
  //       },
  //       {
  //         pathColor: "#FF5A5A",
  //         trailColor: "#d6d6d6",
  //         title: "Total",
  //         count: 100,
  //         label: "Total",
  //         icon: (
  //           <div className="sch-icon">
  //             <GroupAddIcon style={{ color: "#155871" }} />
  //           </div>
  //         ),
  //       },
  //     ]
  //   }
  // ]);

  // const { todayState, thisMonthState, lastMonthState, past90DayState } =
  //   useSelector((state) => state.statictics);

  // useMemo(() => {
  //   setData((p) => {
  //     let findIndex = p.findIndex((x) => x.subData.label === "TODAY");
  //     if (findIndex > -1) {
  //       p[findIndex].count = todayState;
  //     }
  //     return [...p];
  //   });
  // }, [todayState]);

  // useMemo(() => {
  //   setData((p) => {
  //     let findIndex = p.findIndex((x) => x.subData.label === "THIS_MONTH");
  //     if (findIndex > -1) {
  //       p[findIndex].count = thisMonthState;
  //     }
  //     return [...p];
  //   });
  // }, [thisMonthState]);

  // useMemo(() => {
  //   setData((p) => {
  //     let findIndex = p.findIndex((x) => x.subData.label === "LAST_MONTH");
  //     if (findIndex > -1) {
  //       p[findIndex].count = lastMonthState;
  //     }
  //     return [...p];
  //   });
  // }, [lastMonthState]);

  // useMemo(() => {
  //   setData((p) => {
  //     let findIndex = p.findIndex((x) => x.label === "LAST_3_MONTH");
  //     if (findIndex > -1) {
  //       p[findIndex].count = past90DayState;
  //     }
  //     return [...p];
  //   });
  // }, [past90DayState]);


  return (
    <>
      <div>
        <SingleStat selectedProgram={selectedProgram} staticticsCount={statisticsCount} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    statisticsCount: state.statictics.statisticsCount
  };
};

export default connect(mapStateToProps, {
  GET_STUDENET_COUNT_STATISTICS
})(Index);