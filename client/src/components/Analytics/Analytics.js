import Navbar from "../Main/Navbar";
import Footer from "../Main/Footer";

import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import Sales from "./Sales";
import Customers from "./Customers";

export default function Analytics(){

    const [selectedOption, setSelectedOption] = useState('')
    const options = ['Sales', 'Customers']

    return(
        <>
        <Navbar/>
        <div className="bg-hero-pattern">


        <h1>Analytics</h1>
        <Dropdown value={selectedOption} placeholder="Select analytic type to view" options={options} onChange={(e) => setSelectedOption(e.value)}/>
        {selectedOption === '' || selectedOption === 'Sales' ? <Sales/> : <Customers/>}

        </div>
        <Footer/>
        </>
    );
}