function useMonth() {
  var month = [
    { name: "January", index: 1 },
    { name: "February", index: 2 },
    { name: "March", index: 3 },
    { name: "April", index: 4 },
    { name: "May", index: 5 },
    { name: "June", index: 6 },
    { name: "July", index: 7 },
    { name: "August", index: 8 },
    { name: "September", index: 9 },
    { name: "October", index: 10 },
    { name: "November", index: 11 },
    { name: "December", index: 12 },
  ];

  function getMonthName(index) {
    return month.find((x) => x.index === index).name;
  }

  return {
    getMonthName,
    month,
  };
}

export default useMonth;
