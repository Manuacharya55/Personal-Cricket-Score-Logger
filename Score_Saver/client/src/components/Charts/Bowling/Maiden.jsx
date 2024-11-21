import React from 'react'
import { Bar } from 'react-chartjs-2'; // Bar chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FoursAndSixes = ({maiden}) => {
    const data = {
        labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'], 
        datasets: [
          {
            label: 'Dataset 1', 
            data: maiden,
            backgroundColor: 'rgb(43, 111, 167)', 
          }
        ],
      };
    
      const options = {
        responsive: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            barThickness: 50,
          },
          y: {
            beginAtZero: true,
          },
        },
      };
    

  return <Bar data={data} options={options} />;
}

export default FoursAndSixes