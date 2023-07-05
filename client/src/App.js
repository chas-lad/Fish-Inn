import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

//components
import Login from "./components/Login/Login"
import Signup from "./components/Login/Signup";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        {/* <Route path='/successfulCreation' element={<Navigate to='/' />} /> */}
        <Route path='/successfulCreation' element={<Login userCreated="User successfully created. Enter login details." />} />
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;

