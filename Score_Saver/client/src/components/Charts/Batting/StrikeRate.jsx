import React from 'react'
import { Line } from 'react-chartjs-2'; // Line chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StrikeRate = ({strikeRate}) => {
    const data = {
        labels: ["Match 1", "Match 2", "Match 3", "Match 4", "Match 5"],
        datasets: [
          {
            label: "Data",
            data: strikeRate, // Data points for the line chart
            fill: false,
            backgroundColor: "rgb(43, 111, 167)" // Disable filling below the line
          },
        ],
      };
    
      const options = {
        responsive: false, // Non-responsive chart
        plugins: {
          legend: {
            position: "top", // Legend position
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
    <Line data={data} options={options} />
  )
}

export default StrikeRate