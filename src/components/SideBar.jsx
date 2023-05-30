import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='sidenav'>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/addscenario">Add Scenario</NavLink>
            </li>
            <li>
                <NavLink to="/allscenarios">All Scenarios</NavLink>
            </li>
            <li>
                <NavLink to="/addvehicle">Add Vehicle</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default SideBar