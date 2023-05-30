import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import {FiEdit2} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';
import ChartExample from './ChartExample';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [vehicleList, setVehicleList] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const fetchVehicleData = () => {
    axios.get('http://localhost:3000/vehicles')
    .then((response) => {
      setVehicleList(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const fetchScenarios = () => {
    axios.get('http://localhost:3000/scenarios')
    .then((response) => {
      setScenarios(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    fetchVehicleData()
    fetchScenarios()
  },[])

  

  //Fetching the scenario Time
  const scenarioTime = scenarios.length > 0 ? scenarios[0].scenarioTime : 0;
  

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/vehicles/'+id)
    .then((response) => {
      const deleteData = vehicleList.filter(vehicle => id !== vehicle.id)
      setVehicleList(deleteData)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const updateVehicleList = (updatedList) => {
    setVehicleList(updatedList);
  };


  // Edit the vehicle Details
  const handleEditVehicle = (id) => {
    navigate("/editvehicle/"+id)
  }
  return (
    <div className='Home'>
    <table>
    <thead>
      <tr>
        <th>Vehicle Id</th>
        <th>Vehicle Name</th>
        <th>Position X</th>
        <th>Position Y</th>
        <th>Speed</th>
        <th>Direction</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {
          vehicleList.map((vehicle) => {
            return (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.vehicleName}</td>
                <td>{vehicle.positionX}</td>
                <td>{vehicle.positionY}</td>
                <td>{vehicle.vehicleSpeed}</td>
                <td>{vehicle.selectedDirection}</td>
                <td>
                  <FiEdit2 onClick={() => handleEditVehicle(vehicle.id)}/>
                </td>
                <td>
                  <FiTrash2 onClick={() => handleDelete(vehicle.id)}/>
                </td>
              </tr> 
            )
          })
        }
    </tbody>
  </table>
  <ChartExample vehicleList={vehicleList} updateVehicleList={updateVehicleList} scenarioTime={scenarioTime}/>
</div>
  )
}

export default Home