import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from '../api/axios';

const Graph = () => {
  const [data, setData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const token = localStorage.getItem('accessToken');

  const config = {
      headers: {
          'Authorization': `Bearer ${token}`, // Use the Bearer token here
          'Content-Type': 'multipart/form-data'
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('grpah',config);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    renderGraph();
  }, [data]);

  const renderGraph = () => {
    if (data.length === 0) return;

    // Destroy existing chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    const flattenedData = data.reduce((acc, curr) => {
      acc.labels.push(...curr.labels);
      acc.values.push(...curr.values);
      return acc;
    }, { labels: [], values: [] });

    const ctx = document.getElementById('myChart').getContext('2d');

    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: flattenedData.labels,
        datasets: [
          {
            label: 'Values',
            data: flattenedData.values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChartInstance(newChartInstance);
  };

  return <canvas id="myChart" />;
};

export default Graph;