import React, { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import '../../index.css';
import LoginHeader from "./LoginHeader"; 
import BackgroundVideo from "./BackgroundVideo";
import { Navigate } from "react-router-dom";
import { Password } from "primereact/password";

export default function Login({userCreated}) {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState()
  
  // useEffect is essential here to extract value from local storage
  // each time the user will try to go to this login route they will be redirected to
  // the landing page for as long as they have not logged out.
  // Using a usestate in here doesn't cause infinite loop here as we have used empty
  // dependency array so that effect is only executed on initial mount.

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  },[]);

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
      setError("Incorrect password for this account")
    } catch (err) {
      console.error(err.message);
    }
  };

  // if there's a redirect to landing page
  if (user) {
    return (
      // TODO Create a redirect outside of the styling of these two login pages
      <Navigate to="/home"/>
      // <div>
      //   {user.name} is logged in
      //   <button onClick={handleLogout}>logout</button>
      // </div>
    );
  }


  // if there's no user, show the login form
  return (
    <>
    <BackgroundVideo/>
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {userCreated && <p>{userCreated}</p>}
        <LoginHeader
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
          />
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px">
          <div className="my-2">
            <InputText className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="User Name" value={user_name} onChange={e => setUserName(e.target.value)} />
          </div>
          <div className="my-2">
            <Password className="rounded-md appearance-none relative block w-full  py-2  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" toggleMask feedback={false} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div >
          </div>
          <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5" type="submit">Login</button>
        </form>
        { error && <p className="text-white">{error}</p>}
      </div>
    </div>
    </>
  );
};