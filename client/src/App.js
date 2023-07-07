import React from "react";
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
import Analytics from "./components/Main/Analytics";
import Menu from "./components/Main/Menu";
import Profile from "./components/Main/Profile";
import Staff from "./components/Main/Staff";


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
        <Route path="/staff" element={<Staff/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

