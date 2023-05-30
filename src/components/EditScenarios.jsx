import React,{ useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditScenarios = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [scenarioName, setScenarioName] = useState("");
    const [scenarioTime, setScenarioTime] = useState();
    const [message, setMessage] = useState("");
    const fetchScenariosById = () => {
        axios.get('http://localhost:3000/scenarios/'+params.id)
        .then((response) => {
            setScenarioName(response.data.scenarioName);
            setScenarioTime(response.data.scenarioTime)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        fetchScenariosById()
    },[]);


    const editScenarioDetails = () => {
        // Make the put request to update 
        axios.put('http://localhost:3000/scenarios/'+params.id, {
            scenarioName,
            scenarioTime
        })
        .then((response) => {
            console.log(response);
            setMessage("Scenario Details Updated Successfully")
        })
        .catch((error) => {
            console.log(error)
        })
    }
  return (
    <div>
        <h1>Edit Scenario</h1>
        {/* {message && <h3 style={{ color: 'green', marginTop: 20 }}>{message}</h3>} */}
          <form onSubmit={editScenarioDetails}>
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
              <button onSubmit={editScenarioDetails} style={{ backgroundColor: '#48d248' }}>Edit</button>
              {/* <button onClick={resetForm} style={{ backgroundColor: 'orange'}}>Reset</button> */}
              {/* <button onClick={goToHome} style={{ backgroundColor: 'lightblue' }}>Go Back</button> */}
            </div>
          </form>
    </div>
  )
}

export default EditScenarios