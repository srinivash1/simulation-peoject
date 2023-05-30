import './App.css';
import SideBar from './components/SideBar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddScenario from './components/AddScenario';
import AddVehicle from './components/AddVehicle';
import AllScenarios from './components/AllScenarios';
import EditScenarios from './components/EditScenarios';
import EditVehicle from './components/EditVehicle';

function App() { 
  return (
    <>
      <SideBar />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/addscenario" element={<AddScenario />}/>
          <Route path="/addvehicle" element={<AddVehicle />}/>
          <Route path="/allscenarios" element={<AllScenarios />}/>
          <Route path='/editscenarios/:id' element={<EditScenarios />} />
          <Route path='/editvehicle/:id' element={<EditVehicle />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
