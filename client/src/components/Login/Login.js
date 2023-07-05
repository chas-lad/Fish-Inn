import React, { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';

import LoginHeader from "./LoginHeader"; 
import { useLocation } from "react-router-dom";

export default function Login({userCreated}) {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState()
  
  // useEffect is essential here to extract value from local storage
  // each time the app loads we will check to see if a user has logged in
  // Using a usestate in here doesn't cause infinite loop here as we have used empty
  // dependency array so that effect is only executed on initial mount.

  useEffect(() => {
    console.log('hereforsure!')
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  },[]);

  // logout the user
  const handleLogout = () => {
    setUser();
    setUserName("");
    setPassword("");
    localStorage.clear();
  };

  // login the user
  const handleSubmit = async e => {
    e.preventDefault();
    try {

      if(user_name === "" || password  === ""){
        setError("Please enter values into both fields")
        return
      }
      const response = await fetch(`http://localhost:3000/adminAccounts/${user_name}`);
      const jsonData = await response.json();
      
      if(jsonData.hasOwnProperty("error"))
      {
        setError(jsonData.detail)
        return
      }
      if(jsonData.password === password)
      {
        localStorage.setItem("user", jsonData.user_name);
        setUser(jsonData.user_name)
        return
      }
      setError("Incorrect Password for this account")
    } catch (err) {
      console.error(err.message);
    }
  };

  // if there's a redirect to landing page
  if (user) {
    return (
      // TODO <LandingPage> 
      <div>
        {user.name} is logged in
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }


  // if there's no user, show the login form
  return (
    <div>
      {userCreated && <p>{userCreated}</p>}
      <LoginHeader
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
        />
        
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_name">user_name: </label>
        <InputText value={user_name} onChange={e => setUserName(e.target.value)} />
        <div>
        <label htmlFor="password">password: </label>
        <InputText value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      { error && <p>{error}</p>}
    </div>
  );
};