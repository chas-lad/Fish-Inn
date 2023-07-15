import { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import { Dropdown } from 'primereact/dropdown'
import { Button } from "primereact/button";

export default function SelectEventModal({isOpen, onClose, eventInfo, onEventDeleted}) {

    const [employeeName, setEmployeeName] = useState("")
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    

    const handleDelete = () => {
        onEventDeleted(eventInfo);
        
        onClose();
    }
    const handleClose = () => {
        onClose();
    }
    
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            
            <h1>{eventInfo && eventInfo.title}</h1>
            <p>Shift Date: {eventInfo && (eventInfo.startStr).substring(0,10)}</p>
            <p>Shift Start Time: {eventInfo && (eventInfo.startStr).substring(11,16)}</p>
            <p>Shift End Time: {eventInfo && (eventInfo.endStr).substring(11,16)}</p>
    
            <Button onClick={handleDelete}>Delete Shift</Button>
            <Button onClick={handleClose}>Close</Button>
        
        </Modal>
    )
}