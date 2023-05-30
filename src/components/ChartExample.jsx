import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart, Title } from 'chart.js/auto';

const ChartExample = ({vehicleList, updateVehicleList, scenarioTime }) => {
  useEffect(() => {
    Chart.register(Title);
  }, []);


  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isMoving) {
      intervalId = setInterval(moveElement, 100);
    } 
    else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isMoving,vehicleList]);

  const moveElement = () => {
    const startTime = new Date().getTime(); // Get the start time in milliseconds
    const duration = scenarioTime * 1000; // Convert scenarioTime to milliseconds
  
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
  
      if (elapsedTime >= duration) {
        clearInterval(intervalId);
        setIsMoving(false);
        return;
      }
  
      const updatedVehicleList = vehicleList.map((vehicle) => {
        const { positionX, positionY, vehicleSpeed, selectedDirection } = vehicle;
  
        switch (selectedDirection) {
          case 'upwards':
            return { ...vehicle, positionY: positionY + vehicleSpeed };
          case 'downwards':
            return { ...vehicle, positionY: positionY - vehicleSpeed };
          case 'backwards':
            return { ...vehicle, positionX: positionX - vehicleSpeed };
          case 'towards':
            return { ...vehicle, positionX: positionX + vehicleSpeed };
          default:
            return vehicle;
        }
      });
  
      updateVehicleList(updatedVehicleList);
    }, 100);
  };
  


  const startMoving = () => {
    setIsMoving(true);
  };

  const stopMoving = () => {
    setIsMoving(false);
  };

 
  const chartData = {
    datasets: [
      {
        label: 'Data',
        data: vehicleList.map((vehicle) => ({
          x: vehicle.positionX,
          y: vehicle.positionY,
          r: 10
        })),
        backgroundColor: ['rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: 10,
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        min: 0,
        max: 10,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Simulation Project',
      },
      legend: {
        display: false,
      },
    },
  };
  
  return (
    <div style={{ backgroundColor: "white", marginTop: 20 }}>
      <div style={{ position: 'relative', height: '400px', width: '400px' }}>
        <Bubble data={chartData} options={chartOptions} />
      </div>
      <div className='button-container'>
        <button style={{ backgroundColor: 'green'}} onClick={startMoving}>Start</button>
        <button style={{ backgroundColor: 'red'}} onClick={stopMoving}>Stop</button>
      </div>
    </div>
  );
};

export default ChartExample;
