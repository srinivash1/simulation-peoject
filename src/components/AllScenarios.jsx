import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import {AiOutlinePlus} from 'react-icons/ai';
import {FiEdit2} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AllScenarios = () => {
  const navigate = useNavigate();
  const [scenarios, setScenarios] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  
  // Fetching scenarios from scenarios api
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
    fetchScenarios();
    fetchVehiclesList()
  },[])

  const fetchVehiclesList = () => {
    axios.get('http://localhost:3000/vehicles')
    .then((response) => {
      setVehicles(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const goToScenarioPage = () => {
    navigate("/addscenario")
  }

  const goToVehiclePage = () => {
    navigate("/addvehicle")
  }

  const deleteScenario = (id) => {
    axios.delete('http://localhost:3000/scenarios/'+id)
    .then((response) => {
      const deleteById = scenarios.filter(scenario => scenario.id !== id);
      setScenarios(deleteById)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const goToEditScenario = (id) => {
    navigate("/editscenarios/"+id)
  }

  // Get the count of number of vehicles for that particular scenario
  const countVehicles = (sName) => {
    return vehicles.filter((vehicle) => vehicle.scenarioName === sName).length;
  }


  return (
    <div className='all-scenarios'>
        <h1>All Scenarios</h1>
        <div className='button-container'>
          <button onClick={goToScenarioPage} style={{ backgroundColor: 'lightblue' }}>New Scenario</button>
          <button onClick={goToVehiclePage} style={{ backgroundColor: '#48d248'}}>Add Vehicle</button>
          <button style={{ backgroundColor: 'orange' }}>Delete All</button>
        </div>
        <table>
        <thead>
          <tr>
            <th>Scenario Id</th>
            <th>Scenario Name</th>
            <th>Scenario Time</th>
            <th>No:of Vehicles</th>
            <th>Add Vehicles</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {
              scenarios.map((scenario) => {
                return (
                  <tr key={scenario.id}>
                    <td>{scenario.id}</td>
                    <td>{scenario.scenarioName}</td>
                    <td>{scenario.scenarioTime}S</td>
                    <td>{countVehicles(scenario.scenarioName)}</td>
                    <td>
                      <AiOutlinePlus onClick={goToVehiclePage} />
                    </td>
                    <td>
                      <FiEdit2 onClick={() => goToEditScenario(scenario.id)}/>
                    </td>
                    <td>
                      <FiTrash2 onClick={() => deleteScenario(scenario.id)}/>
                    </td>
                  </tr> 
                )
              })
            }
        </tbody>
      </table>
    </div>
  )
}

export default AllScenarios