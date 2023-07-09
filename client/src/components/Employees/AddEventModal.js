import { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import { Dropdown } from 'primereact/dropdown'

export default function AddEventModal({isOpen, onClose, onEventAdded, change, employees}) {
    // const [employeeID, setEmployeeID] = useState()
    const [employeeName, setEmployeeName] = useState("")
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    

    const onSubmit = (event) => {
        event.preventDefault();
        
        //console.log(employeeID)
        // console.log(start)
        // console.log(end)

        // Getting the employee name from the ID
        //console.log(employeeID)
        // const employee = employees?.find((x) => x.emp_id === employeeID)
        // console.log(employee)
        // const employeeName = employee.first_name + employee.surname
        onEventAdded({
            employeeName,
            start,
            end
        })
        onClose()
    }
    
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                {/* <Dropdown value={employeeID} onChange={e => setEmployeeID(e.target.value)} options={employees} optionLabel="name" placeholder="Select an employee" className="w-full md:w-14rem" /> */}
                <select onChange={e => {
                            const employee = employees.find(({emp_id}) => emp_id == e.target.value)
                            const employeeName = employee.first_name + " " + employee.surname
                            setEmployeeName(employeeName);
                            change(e.target.value);
                            }}
                >
                    {employees
                        ? employees.map((employee) => {
                                return(
                                    // NOTE value is what is provided to e.target.value
                                    <option key={employee.emp_id} value={employee.emp_id}> 
                                        {employee.first_name} {employee.surname}
                                    </option>
                                );
                            })
                        : 'No current employees'}
                </select>

                <div>
                    <label>Start Datetime</label>
                    <Datetime value={start} onChange={date => setStart(date)} />
                </div>

                <div>
                    <label>End Datetime</label>
                    <Datetime value={end} onChange={date => setEnd(date)} />
                </div>

                <button>Add Event</button>
            </form>
        </Modal>
    )
}