import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_STUDENT_COUNT_DATA_ACTION } from "./../../redux/actions/dashboard2";
import { Bar, defaults } from "react-chartjs-2";

defaults.global.legend.align = "end";

const StudentCountChart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GET_STUDENT_COUNT_DATA_ACTION());
  }, [dispatch]);

  const { studentCount } = useSelector((state) => state.dashboard2);

  return (
    <>
      <Bar
        data={{
          labels: studentCount.labels,
          datasets: [
            {
              label: "Student Count",
              data: studentCount.datasets,
              backgroundColor: "#0184FF",
              borderWidth: 1,
              barThickness: 15,
            },
          ],
        }}
        height={230}
        width={1000}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              padding: 20,
              usePointStyle: true,
              boxWidth: 8,
            },
          },
        }}
      />
    </>
  );
};

export default StudentCountChart;
