import { useState, useRef, useEffect} from "react";

import Navbar from "./../Main/Navbar";
import Footer from "./../Main/Footer";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"
// import dayGridPlugin from "@fullcalendar/daygrid"

import moment from 'moment'


import EmployeeHeading from "./EmployeeHeading";
import AddEventModal from "./AddEventModal";
import SelectEventModal from "./SelectEventModal";


export default function EmployeeRota(){
    const [employees, setEmployees] = useState([]);
    const [addEventModalOpen, setAddEventModalOpen] = useState(false);
    const [selectEventModalOpen, setSelectEventModalOpen] = useState(false);
    const [selectedEventInfo, setSelectedEventInfo] = useState();
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
    // This function adds an event/schedule directly to our calendar API
    // NOTE it is important to add the event/scehdule directly to the current mounted calendar component
    // as well as the database. This is because we only pull all schedules from our database when our calendar component
    // is first mounted
    // firing .addEvent() in this function causes the eventAdd prop's function to be fired in the Calendar

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        
        calendarApi.addEvent({
            id: (event.employeeIdToAdd).toString() + moment(event.start).format('YYYY-MM-DD'),
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.employeeName
        })
    }

    // Add event/schedule to our database
    async function handleEventAdd(data) {
        try {        
        
            const emp_id = selectedEmployeeID
            const start_date_time = (data.event.startStr).substring(0,19)
            const end_date_time = (data.event.endStr).substring(0,19)

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

    // Pull all events/schedules from our database to populate our schedule
    async function handleDatesSet(data) {
        const response = await fetch("http://localhost:3000/employees/schedules");
        const jsonData = await response.json();
        const tempArrayOfSchedules = [];
        jsonData.map((schedule) => {
            tempArrayOfSchedules.push({
                id: (schedule.emp_id).toString() + (schedule.start_date_time).substring(0,10),
                start:  moment(schedule.start_date_time).toDate(),
                end: moment(schedule.end_date_time).toDate(),
                title: (schedule.first_name + " " + schedule.surname),
                extendedProps: {
                    emp_id: schedule.emp_id.toString()
                  }
            })
        })
        setEvents(tempArrayOfSchedules);
    }

    // Handle what should happen when we click on an event/schedule 
    const handleEventSelect = info => {
        setSelectEventModalOpen(true);
        setSelectedEventInfo(info.event)
    }

    // delete from the calendar object via API
    // firing .remove() in this function causes the eventRemove prop's function to be fired in the Calendar
    const onEventDeleted = (event) => {
        let calendarApi = calendarRef.current.getApi();
        let eventToRemove = calendarApi.getEventById(event.id)
        eventToRemove.remove();
    };

    // delete from our database
    async function handleEventDelete(data) {
        try {        
        
        let emp_id = Number((data.event.id).substring(0,1));
        let start_date_time = (data.event.startStr).substring(0,19)
        const body = { start_date_time };
        const response = await fetch(`http://localhost:3000/employees/schedules/${emp_id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
        const jsonData = await response.json();
        } catch (err) {
          console.error(err.message);
        }
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
                        eventRemove={event => handleEventDelete(event)}
                        plugins={[ timeGridPlugin ]}
                        initialView="timeGridWeek"
                        displayEventEnd= {true}
                        slotDuration='00:30:00'
                        selectable={true}
                        eventClick={(info) => handleEventSelect(info)}
                        editable={true}
                        datesSet = {(date) => handleDatesSet(date)}
                    />
                </div>

                <AddEventModal isOpen={addEventModalOpen} onClose={() => setAddEventModalOpen(false)} onEventAdded={event => onEventAdded(event)} change={handleEmployeeState} employees={employees}/>
                <SelectEventModal isOpen={selectEventModalOpen} onClose={() => setSelectEventModalOpen(false)} eventInfo={selectedEventInfo} onEventDeleted={onEventDeleted}/>

                </section>

            </div>
            <Footer/>
        </>
    )
};