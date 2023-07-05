import React, { useState} from "react";
import { Navigate } from "react-router-dom";
import { Password } from 'primereact/password';
import { Calendar} from 'primereact/calendar'
import { InputText } from 'primereact/inputtext';


import LoginHeader from "./LoginHeader";
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

export default function Signup(){
    const [user_name, setUserName] = useState("");
    const [first_name, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [dob, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userCreated, setUserCreated] = useState();
    const [error, setError] = useState();

    console.log(userCreated)

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
    
          if(user_name === "" ||
             first_name === "" || 
             surname === "" ||
             dob === "" || 
             email === "" || 
             password  === ""){
            setError("Please enter values for all fields")
            return
          }

          console.log(email)
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
        // TODO inspect element on the password generator to view CSS and 
        // apply the same CSS on other elements
        <>
        {userCreated && (<Navigate to="/successfulCreation"/>)}
        <LoginHeader
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
        
        <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="user_name">user_name: </label>
        <InputText value={user_name} onChange={e => setUserName(e.target.value)} />
        </div>
        <div>
        <label htmlFor="first_name">first_name: </label>
        <InputText value={first_name} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div>
        <label htmlFor="surname">surname: </label>
        <InputText value={surname} onChange={e => setSurname(e.target.value)} />
        </div>
        <div>
        <label htmlFor="dob">DOB: </label>
        <Calendar value={dob} onChange={e => setDOB(e.target.value)}/>
        </div>

        <div>
        <label htmlFor="email">email: </label>
        <InputText value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
        <label htmlFor="password">password: </label>
        <Password 
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
        <button type="submit">Login</button>
      </form>
      { error && <p>{error}</p>}
        </>
    );
}