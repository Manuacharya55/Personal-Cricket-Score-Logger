import React from 'react';
import { Pie } from 'react-chartjs-2'; // Pie chart component
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TotalBoundaries = ({fours,sixes}) => {
    if(!fours || !sixes){
      fours = 0;
      sixes = 0;
    }
    const data = {
        labels: ["6`s", "4`s"], // Labels for each slice
        datasets: [
          {
            data: [fours?.reduce((acc,num)=> acc+num , 0), sixes?.reduce((acc,num)=> acc+num,0)] || [0,0], // Values for the slices
            backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"], // Colors for each slice
            borderColor: ["rgb(75, 192, 192)", "rgb(255, 99, 132)"], // Border color for each slice
            borderWidth: 1,
          },
        ],
      };
    
      // Options for the pie chart
      const options = {
        responsive: false, // Non-responsive pie chart
        plugins: {
          legend: {
            position: "top", // Position of the legend
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.raw + "%";
              },
            },
          },
        },
      };
  return (
    <Pie data={data} options={options} />
  )
}

export default TotalBoundaries