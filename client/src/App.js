import React from "react";
import Modal from "react-modal"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

//components
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import Error from "./components/Errors/Error";
import Home from "./components/Main/Home";
import Analytics from "./components/Analytics/Analytics";
import Menu from "./components/Menu/Menu";
import Profile from "./components/Main/Profile";
import EmployeeList from "./components/Employees/EmployeeList";
import EmployeeRota from "./components/Employees/EmployeeRota";

Modal.setAppElement('#root')

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/successfulCreation" element={<Login userCreated="User successfully created. Enter login details." />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/employeeList" element={<EmployeeList/>}/>
        <Route path="/employeeRota" element={<EmployeeRota/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

