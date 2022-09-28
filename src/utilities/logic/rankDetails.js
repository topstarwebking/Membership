import { toast } from "react-toastify";

const toastCSS = () => {
  return {
    position: "top-center",
    autoClose: 5000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};

const RankDetails = {
  getRankDetails: (programList, item) => {
    let current_rank_name = item?.current_rank_name;
    let next_rank_name;
    let nextIndex;
    let registerdId = item?._id;
    let filterProgramRank = programList?.filter(
      (_item) => _item?.programName === item?.program
    )[0]?.program_rank;
    for (let i = 0; i < filterProgramRank?.length; i++) {
      if (filterProgramRank[i]?.rank_name === current_rank_name) {
        nextIndex = i;
        break;
      }
    }
    if (filterProgramRank?.length !== undefined) {
      if (nextIndex === undefined) {
        current_rank_name = filterProgramRank[0]?.rank_name || "no data";
        next_rank_name = filterProgramRank[1]?.rank_name || "no data";
      } else {
        try {
          if (nextIndex === filterProgramRank.length - 2) {
            current_rank_name = filterProgramRank[nextIndex + 1].rank_name;
            next_rank_name = "Rank Not Available";
          } else {
            current_rank_name = filterProgramRank[nextIndex + 1].rank_name;
            next_rank_name = filterProgramRank[nextIndex + 2].rank_name;
          }
        } catch (error) {
          toast.info('Congratulation 🎉 ( No next rank available in the current program)', toastCSS());
        }

      }
    }
    return {
      current_rank_name: current_rank_name,
      next_rank_name: next_rank_name,
      registerdId: registerdId,
    };
  },
  getUpdateAddRankDetails: (programList, item) => {
    let current_rank_name = item?.current_rank_name;
    let next_rank_name;
    let nextIndex;
    let filterProgramRank = programList?.filter(
      (_item) => _item?.programName === item?.programName
    )[0]?.program_rank;
    for (let i = 0; i < filterProgramRank?.length; i++) {
      if (filterProgramRank[i]?.rank_name === current_rank_name) {
        nextIndex = i;
        break;
      }
    }
    if (nextIndex === undefined) {
      current_rank_name = filterProgramRank[0]?.rank_name || "no data";
      next_rank_name = filterProgramRank[1]?.rank_name || "no data";
    } else {
      try {
        if (nextIndex === filterProgramRank.length - 1) {
          current_rank_name = filterProgramRank[nextIndex].rank_name;
          next_rank_name = "Rank Not Available";
        } else {
          current_rank_name = filterProgramRank[nextIndex].rank_name;
          next_rank_name = filterProgramRank[nextIndex + 1].rank_name;
        }
      } catch (error) {
        toast.info('Congratulation 🎉 ( No next rank available in the current program)', toastCSS());
      }


    }
    return {
      current_rank_name: current_rank_name,
      next_rank_name: next_rank_name,
      programName: item?.programName,
    };
  },
};

export default RankDetails;
