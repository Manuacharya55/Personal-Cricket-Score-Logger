import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Maiden = ({economy}) => {
    const data = {
        labels: ["Match 1", "Match 2", "Match 3", "Match 4", "Match 5"],
        datasets: [
          {
            label: "Values",
            data: economy,
            backgroundColor: "rgb(43, 111, 167)",
          },
        ],
      };
    
      // Options for the bar chart
      const options = {
        responsive: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      };
  return (
    <Bar data={data} options={options} />
  )
}

export default Maiden