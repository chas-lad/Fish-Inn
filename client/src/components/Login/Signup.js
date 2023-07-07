import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { Password } from 'primereact/password';
import { Calendar} from 'primereact/calendar';
import Input from "./Input";
import LoginHeader from "./LoginHeader";

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import BackgroundVideo from "./BackgroundVideo";

export default function Signup(){
    const [user_name, setUserName] = useState("");
    const [first_name, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [dob, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userCreated, setUserCreated] = useState();
    const [error, setError] = useState();
   
    

    // I'm going to presume nobody over 100 or younger than 18 is going to be running a business
    let today = new Date();
    let year = today.getFullYear();
    let minYear = year - 100;
    let maxYear = year - 18;

    let minDate = new Date();
    minDate.setFullYear(minYear);

    let maxDate = new Date();
    maxDate.setFullYear(maxYear);
    
    const footer = (
        <>
            <p>Suggestions</p>
            <ul>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>At least one special character</li>
                <li>Minumum 8 and maximum 8 characters</li>
            </ul>
        </>
    )

    const handleSubmit = async e => {
        e.preventDefault();
        try {
        
            console.log(error)
          // General field validation checks
          if(user_name === "" ||
             first_name === "" || 
             surname === "" ||
             dob === "" || 
             email === "" || 
             password  === ""){
            setError("Please enter values for all fields")
            return
          }

          if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))){
            setError("Please enter a valid email address")
            return
          }

          if(!/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,16}$/.test(password)){
            setError("Please enter a password that meets the requirements")
            return
          }

          // check if the account exists already
          let response = await fetch(`http://localhost:3000/adminAccounts/${user_name}`);
          let jsonData = await response.json();

          if(jsonData.hasOwnProperty("user_name")){
                setError("The account already exists")
                return
            }
        
          const body = { user_name,
                         first_name,
                         surname,
                         dob,
                         email,
                         password};
          response = await fetch("http://localhost:3000/adminAccounts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
          jsonData = await response.json();
          
          if(jsonData.rowCount === 1)
          {
            setUserCreated(1)
          }
          
        } catch (err) {
          console.error(err.message);
        }
      };

    return (
        <>
        <BackgroundVideo/>
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        {userCreated && (<Navigate to="/successfulCreation"/>)}
        <LoginHeader
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
        
        <form onSubmit={handleSubmit}>
        <Input placeholder="User Name" value={user_name} onChange={e => setUserName(e.target.value)}/>
        <Input placeholder="First Name" value={first_name} onChange={e => setFirstName(e.target.value)}/>
        <Input placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)}/>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
        <div className="my-2">
        <Calendar  minDate={minDate} maxDate={maxDate} dateFormat="dd/mm/yy" placeholder="DOB" value={dob} onChange={e => setDOB(e.target.value)}/>
        </div>
        <div className="my-2">
        <Password 
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            promptLabel="Choose a password"
            strongRegex="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,16}$" 
            weakLabel="Too simple" 
            mediumLabel="Average complexity" 
            strongLabel="Complex password"
            toggleMask
            footer={footer}/>
        </div>
        <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5" type="submit">Login</button>

      </form>
      { error && <p>{error}</p>}
      </div>
      </div>
      </>
    );
}