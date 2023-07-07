import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import Input from "../Login/Input";
import { Calendar} from 'primereact/calendar';


export default function Profile(){

    const [detailsChanged, setDetailsChanged] = useState(false);
    const [first_name, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [dob, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [new_first_name, setNewFirstName] = useState("");
    const [new_surname, setNewSurname] = useState("");
    const [new_email, setNewEmail] = useState("");

    useEffect(() => {
        console.log('here')
        fetchDetails();
      }, [detailsChanged]);

    const user_name = localStorage.getItem("user");
    
    // I'm going to presume nobody over 100 or younger than 18 is going to be running a business
    let today = new Date();
    let year = today.getFullYear();
    let minYear = year - 100;
    let maxYear = year - 18;

    let minDate = new Date();
    minDate.setFullYear(minYear);

    let maxDate = new Date();
    maxDate.setFullYear(maxYear);

    const fetchDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/adminAccounts/${user_name}`);
            const jsonData = await response.json();
            setFirstName(jsonData.first_name);
            setSurname(jsonData.surname);
            setDOB(jsonData.dob)
            setEmail(jsonData.email);

        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {

          if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))){
            // setError("Please enter a valid email address")
            return
          }
          
          const firstNameToSend = new_first_name.length > 0 ? new_first_name : first_name;
          const surnameToSend = new_surname.length > 0 ? new_surname : surname;
          const emailToSend = new_email.length > 0 ? new_email : email

          // Check if the user has entered new values for each respective field
          const body = { user_name,
                         firstNameToSend,
                         surnameToSend,
                         emailToSend};
          const response = await fetch(`http://localhost:3000/adminAccounts/${user_name}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
        
          setDetailsChanged(true);
          
        } catch (err) {
          console.error(err.message);
        }
    }
    
    return(
        <>
        <Navbar/>
            <div className="bg-hero-pattern">
                <h1>Profile</h1>
                {detailsChanged && <p>Details have been updated</p>}
                <div className="flex justify-center w-full items-center ">
                    <div className="text-center pr-20">
                        <h2>Current Details</h2>
                        <ul className="text-xl font-nunito-regular text-left inline-block border-solid border-black border-4 rounded-lg p-10 bg-white">
                            <li>User name: {user_name}</li>
                            <li>First name: {first_name}</li>
                            <li>Surname: {surname}</li>
                            <li>DOB: {dob}</li>
                            <li>Email: {email}</li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <h2>Edit Personal Details</h2>
                        <p className="mb-5"> Submit the detail(s) you want to change below </p>
                        
                            <form className="text-xl font-nunito-regular text-left inline-block border-solid border-black border-4 rounded-lg p-10 bg-white" onSubmit={handleSubmit}>
                            <Input placeholder="First Name" value={new_first_name} onChange={e => setNewFirstName(e.target.value)}/>
                            <Input placeholder="Surname" value={new_surname} onChange={e => setNewSurname(e.target.value)}/>
                            <Input placeholder="Email" value={new_email} onChange={e => setNewEmail(e.target.value)}/>
                            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5" type="submit">Change</button>
                            </form>
                        
                    </div>
                </div>
            </div>
        <Footer/>
        </>
    );
}