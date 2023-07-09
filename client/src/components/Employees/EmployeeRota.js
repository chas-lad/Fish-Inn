import { useState, useRef, useEffect} from "react";

import Navbar from "./../Main/Navbar";
import Footer from "./../Main/Footer";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"
// import dayGridPlugin from "@fullcalendar/daygrid"

import moment from 'moment'


import EmployeeHeading from "./EmployeeHeading";
import AddEventModal from "./AddEventModal";


export default function EmployeeRota(){
    const [employees, setEmployees] = useState([]);
    const [addEventModalOpen, setAddEventModalOpen] = useState(false);
    const [selectEventModalOpen, setSelectEventModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [selectedEmployeeID, setSelectedEmployeeID] = useState(null)
    const calendarRef = useRef(null);


    useEffect(() => {
        fetchEmployees();
      }, []);
    

    const fetchEmployees = async () => {
        try {
            const response = await fetch(`http://localhost:3000/employees`);
            const jsonData = await response.json();

            setEmployees(jsonData)

        } catch (err) {
            console.error(err.message);
        }
    };

    const handleEmployeeState = newEmployeeID => {
        setSelectedEmployeeID(newEmployeeID);
    }

    // Function to manipulate the Event Object directly. An 'Event Object' is a JS object that is used to store event info.
    // We get hold of the components ref and call the getApi() method on this component to get access to the calendars events.
    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        console.log(selectedEmployeeID)
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.employeeName,
        })
    }

    async function handleEventAdd(data) {
        try {        
        
            const emp_id = selectedEmployeeID
            const start_date_time = (data.event.startStr).substring(0,19)
            const end_date_time = (data.event.endStr).substring(0,19)
            console.log(start_date_time)
            console.log(end_date_time)

            const body = {  emp_id,
                            start_date_time,
                            end_date_time};
            const response = await fetch(`http://localhost:3000/employees/schedules/${emp_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            
            // if(jsonData.rowCount === 1)
            // {
            //     setUserCreated(1)
            // }
          
        } catch (err) {
          console.error(err.message);
        }
    }

    async function handleDatesSet(data) {
        const response = await fetch("http://localhost:3000/employees/schedules");
        const jsonData = await response.json();
        const tempArrayOfSchedules = [];
        jsonData.map((schedule) => {
            tempArrayOfSchedules.push({
                start:  moment(schedule.start_date_time).toDate(),
                end: moment(schedule.end_date_time).toDate(),
                title: (schedule.first_name + " " + schedule.surname)
            })
        })
        console.log(jsonData)
        console.log(tempArrayOfSchedules);
        setEvents(tempArrayOfSchedules);
    }


    return (
        <>
            <Navbar/>
            <div id="employeeModal" className="bg-hero-pattern">
                <EmployeeHeading/>

                <section>

                <button onClick={()=> setAddEventModalOpen(true)}>Add Event</button>
                <div style={{position:"relative", zIndex: 0}}>
                    <FullCalendar
                        ref={calendarRef}
                        events={events}
                        eventAdd={event => handleEventAdd(event)}
                        plugins={[ timeGridPlugin ]}
                        initialView="timeGridWeek"
                        displayEventEnd= {true}
                        slotDuration='00:30:00'
                        selectable={true}
                        // eventClick={(info) => handleEventSelect(info)}
                        editable={true}
                        datesSet = {(date) => handleDatesSet(date)}
                    />
                </div>

                <AddEventModal isOpen={addEventModalOpen} onClose={() => setAddEventModalOpen(false)} onEventAdded={event => onEventAdded(event)} change={handleEmployeeState} employees={employees}/>
                </section>

            </div>
            <Footer/>
        </>
    )
};