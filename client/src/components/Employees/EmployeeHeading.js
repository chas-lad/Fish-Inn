import { Link } from "react-router-dom"

export default function EmployeeHeading() {


    return(
        <>
        <h1>Employees</h1>
            <div className="flex flex-row items-center justify-center">
                <Link to="/employeeList" className="pr-10">
                    <button class="bg-teal-600 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Employee List
                    </button>
                </Link>
                <Link to="/employeeRota">
                    <button class="bg-teal-600 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Employee Rota
                    </button>
                </Link>
            </div>
        </>
    )
}