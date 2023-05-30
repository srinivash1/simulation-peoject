import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
  const navigate = useNavigate();
  console.log(navigate);
  const [scenarioName, setScenarioName] = useState([]);
  const [selectedScenarioName, setSelectedScenarioName] = useState("")
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleSpeed, setVehicleSpeed] = useState();
  const [positionX, setPositionX] = useState();
  const [positionY, setPositionY] = useState();
  const [message, setMessage] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");

  const fetchScenarios = () => {
    axios.get('http://localhost:3000/scenarios')
    .then((response) => {
      console.log(response)
      // Need only scenario Name mapping through it and getting the scenarioName
      setScenarioName(response.data.map(scenario => scenario.scenarioName));
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    fetchScenarios()
  },[])

  const addVehicleDetails = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/vehicles', {
      scenarioName: selectedScenarioName,
      vehicleName,
      vehicleSpeed,
      positionX,
      positionY,
      selectedDirection
    })
    .then((response) => {
      setMessage("Vehicles details updated successfully")
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // Reset form
  const resetForm = () => {
    setVehicleSpeed('')
    setSelectedScenarioName('');
    setVehicleName('');
    setPositionX('')
    setPositionY('');
    setMessage('')
    setSelectedDirection('')
  }

  const handleChange = (e) => {
    setSelectedDirection(e.target.value)
  }

  const goToHome = () => {
    navigate("/")
  }
  return (
    <div>
        <h1>Add Vehicle</h1>
        {message && <h3 style={{ color: 'green', marginTop: 20 }}>{message}</h3>}
          <form onSubmit={addVehicleDetails}>
            <div className='form-container'>
              <div className='scenario-list'>
                <label htmlFor="name">Scenario List</label>
                <select value={selectedScenarioName} onChange={(e) => setSelectedScenarioName(e.target.value)}>
                  <option value="">Scenario List</option>
                  {scenarioName.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className='vehicle-name'>
                <label htmlFor="name">Vehicle Name</label>
                <input 
                  type='text'
                  name='name'
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  required
                />
              </div>
              <div className='vehicle-speed'>
                <label htmlFor="speed">Vehicle Speed</label>
                <input 
                  type='text'
                  name='speed'
                  value={vehicleSpeed}
                  onChange={(e) => setVehicleSpeed(parseInt(e.target.value))}
                  required
                />
              </div>
              <div className='vehicle-position-x'>
                <label htmlFor="positionx">Position X</label>
                <input 
                  type='text'
                  name='positionx'
                  value={positionX}
                  onChange={(e) => setPositionX(parseInt(e.target.value))}
                  required
                />
              </div>
              <div className='vehicle-position-y'>
                <label htmlFor="positiony">Position Y</label>
                <input 
                  type='text'
                  name='positiony'
                  value={positionY}
                  onChange={(e) => setPositionY(parseInt(e.target.value))}
                  required
                />
              </div>
              <div className='vehicle-directions'>
                <label htmlFor='directions'>Direction</label>
                <select value={selectedDirection} onChange={handleChange}>
                  <option value="">select directions</option>
                  <option value="towards">Towards</option>
                  <option value="backwards">Backwards</option>
                  <option value="upwards">Upwards</option>
                  <option value="downwards">Downwards</option>
                </select>
              </div>
            </div>
            <div className='button-container'>
              <button style={{ backgroundColor: '#48d248' }}>Add</button>
              <button onClick={resetForm} style={{ backgroundColor: 'orange'}}>Reset</button>
              <button onClick={goToHome} style={{ backgroundColor: 'lightblue' }}>Go Back</button>
            </div>
          </form>
    </div>
  )
}

export default AddVehicle