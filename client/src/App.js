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
import Home from "./components/Landing/Home";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/successfulCreation" element={<Login userCreated="User successfully created. Enter login details." />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

