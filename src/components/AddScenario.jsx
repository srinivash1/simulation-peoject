import React,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddScenario = () => {
  const navigate = useNavigate();
  const [scenarioName, setScenarioName] = useState("");
  const [scenarioTime, setScenarioTime] = useState();
  const [message, setMessage] = useState("");

  const addScenarioDetails = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/scenarios', {
      scenarioName,
      scenarioTime
    })
    .then((response) => {
      setMessage("Scenario added sucessfully");
      resetForm()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // Reset form
  const resetForm = () => {
    setScenarioName('');
    setScenarioTime('');
    setMessage('')
  }

  //Go Back Functionality - Navigate to Home page
  const goToHome = () => {
    navigate("/");
  }

  

  return (
    <div>
        <h1>Add Scenario</h1>
        {message && <h3 style={{ color: 'green', marginTop: 20 }}>{message}</h3>}
          <form onSubmit={addScenarioDetails}>
            <div className='form-container'>
            <div className='scenario-name'>
              <label htmlFor="name">Scenario Name</label>
              <input 
                type='text'
                name='name'
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                required
              />
            </div>
            <div className='scenario-time'>
              <label htmlFor="time">Scenario Time (Seconds)</label>
              <input 
                type='text'
                name='time'
                value={scenarioTime}
                onChange={(e) => setScenarioTime(parseInt(e.target.value))}
                required
              />
            </div>
            </div>
            <div className='button-container'>
              <button onSubmit={addScenarioDetails} style={{ backgroundColor: '#48d248' }}>Add</button>
              <button onClick={resetForm} style={{ backgroundColor: 'orange'}}>Reset</button>
              <button onClick={goToHome} style={{ backgroundColor: 'lightblue' }}>Go Back</button>
            </div>
          </form>
    </div>
  )
}

export default AddScenario