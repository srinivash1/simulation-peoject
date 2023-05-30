## React App to simulate the items

### Getting Started with Vite
This project was bootstrapped with Vite.
To install the project using Vite run the command in the project directory
npm create vite@latest

### Install necessary Packages
npm install json-server
npm install axios 
npm install react-router-dom

### Available Scripts

In the project directory, you can run:
npm run dev Runs the app in the development mode. Open http://localhost:5173 to view it in your browser.

### Json-sever
In the Project directory open another tab, you can run:
Create a seperate folder called data inside that file called db.json
Inside that file Create a {} with necessary Routes ->  Scenarios: [], vehicles: []
Run the command "json-server --watch data/db.json"

## Summary
This project is a React.js application that allows users to create, display, update, and delete scenarios and vehicles. It provides a simulation feature where vehicles can be animated and moved based on the selected scenario and vehicle parameters.

## Features:
Create, display, update, and delete scenarios and vehicles.
Each scenario can have multiple vehicles.
Vehicles can move based on their direction and speed.
Vehicles are displayed using a chart to visualize their positions.
Simulation time is defined for each scenario, and vehicles move within that time limit.

## Technologies Used:

React.js: The application is built using the React.js library for building user interfaces.
React Router: Used for managing and navigating between different pages within the application.
Chart.js: Utilized to visualize the positions of vehicles and animate their movement.
Axios: Used to make HTTP requests to a JSON server for data storage and retrieval.
JSON Server: A lightweight backend server that provides RESTful APIs for data storage.


