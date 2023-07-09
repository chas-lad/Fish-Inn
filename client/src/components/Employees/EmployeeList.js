import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal'
import Navbar from "./../Main/Navbar";
import Footer from "./../Main/Footer";
import EmployeeHeading from "./EmployeeHeading";

export default function EmployeeList(){

    const [employees, setEmployees] = useState([]);


    useEffect(() => {
        fetchEmployees();
      }, [employees]);
    

    const fetchEmployees = async () => {
        try {
            const response = await fetch(`http://localhost:3000/employees`);
            const jsonData = await response.json();
            setEmployees(jsonData)

        } catch (err) {
            console.error(err.message);
        }
    };

    const listEmployees = employees.map(employee =>
        <tr key={employee.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {employee.first_name}
                </th>
                <td class="px-6 py-4">
                    {employee.surname}
                </td>
                <td class="px-6 py-4">
                    {employee.email}
                </td>
                <td class="px-6 py-4">
                    {employee.dob.substring(0, 10)}
                </td>
                <td class="px-6 py-4">
                    {employee.join_date.substring(0, 10)}
                </td>
                <td class="px-6 py-4">
                    {employee.phone_no}
                </td>
                <td class="px-6 py-4">
                    {employee.postcode}
                </td>
        </tr>
      );

    return(
        <>
        <Navbar/>
        <div className="bg-hero-pattern">
            <EmployeeHeading/>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Surname
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                DOB
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Join Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Phone No
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Postcode
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {listEmployees}
                    </tbody>
                </table>
            </div>
        </div>
        <Footer/>
        </>
    );
}