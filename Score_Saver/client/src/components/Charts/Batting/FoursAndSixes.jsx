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

const FoursAndSixes = ({fours,sixes}) => {
    const data = {
        labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'], 
        datasets: [
          {
            label: 'Fours', 
            data: fours,
            backgroundColor: 'rgba(75, 192, 192, 0.6)', 
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            barThickness: 20,
          },
          {
            label: 'Sixes', 
            data: sixes,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            barThickness: 20,
          },
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