import moment from "moment";

export const sortStringByAccending = (data, keyname) => {
  let res = data.sort(function (a, b) {
    return a[keyname].localeCompare(b[keyname]);
  });
  return res;
};

export const sortByDate = (data, keyname) => {
  let res = data.sort(function (a, b) {
    return (
      new Date(moment(a[keyname]).format("dd/mm/yyyy")).getTime() -
      new Date(moment(b[keyname]).format("dd/mm/yyyy")).getTime()
    );
  });
};
