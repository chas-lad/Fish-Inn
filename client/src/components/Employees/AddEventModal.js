import { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import { Button } from "primereact/button";

export default function AddEventModal({isOpen, onClose, onEventAdded, change, employees}) {
    const [employeeName, setEmployeeName] = useState("")
    const [employeeIdToAdd, setEmployeeIdToAdd] = useState(0);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    
    const onSubmit = (event) => {
        event.preventDefault();
        
        onEventAdded({
            employeeIdToAdd,
            employeeName,
            start,
            end
        })
        onClose()
    }

    const handleClose = () => {
        onClose();
    }
    
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <select onChange={e => {
                            const employee = employees.find(({emp_id}) => emp_id == e.target.value);
                            const employeeName = employee.first_name + " " + employee.surname;
                            setEmployeeIdToAdd(employee.emp_id);
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

                <button className="text-white bg-indigo-500 rounded-sm m-4">Add Event</button>
            </form>
                <Button onClick={handleClose}>Close</Button>
        </Modal>
    )
}