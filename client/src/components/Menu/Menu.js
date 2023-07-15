import { useState, useEffect } from "react";
import Navbar from "./../Main/Navbar";
import Footer from "./../Main/Footer";
import { Table } from "./Table";
import { EventModal } from "./EventModal";


export default function Menu(){

    const [modalOpen, setModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [itemToEdit, setItemToEdit] = useState(null);

    const fetchItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/menu`);
            const jsonData = await response.json();
            setItems(jsonData)

        } catch (err) {
            console.error(err.message);
        }
    };

    const handleEditItem = (item_id) => {
        setItemToEdit(item_id)
        setModalOpen(true)
    }

    // editing or adding a new item to db
    const handleSubmit = async (newItem) => {
        try {
            
            // adding a new item to db
            if(itemToEdit === null){
                let item_name = newItem.item_name;
                let selling_price = Number(newItem.selling_price);
                let on_menu = newItem.on_menu;

                const body = { item_name,
                            selling_price,
                            on_menu
                            };
                const response = await fetch(`http://localhost:3000/menu`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                    });

                const jsonData = await response.json();
            
            }
            //editing an item in the db
            else{

                let item_name = newItem.item_name;
                let selling_price = Number(newItem.selling_price);
                let on_menu = newItem.on_menu;

                const body = { item_name,
                    selling_price,
                    on_menu
                };
                const response = await fetch(`http://localhost:3000/menu/${itemToEdit}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                const jsonData = await response.json();
            }

            handleClose()
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleClose = () => {
        // If I'm closing the add item modal
        if(itemToEdit === null){
            setModalOpen(false)
        } 
        // If im closing the edit item modal (itemToEdit won't be null)
        else{ 
            setModalOpen(false)
            setItemToEdit(null)
        }
    }

    useEffect(() => {
        fetchItems();
      }, [ [], handleClose]);

    return(
        <>
        <Navbar/>
        <div className="bg-hero-pattern">

        <h1>Menu</h1>
        <Table items={items} editItem={handleEditItem}/>
        <button className='className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5"' onClick={() => setModalOpen(true)}>Add</button>
        <EventModal isOpen={modalOpen} closeModal={() => handleClose} onSubmit={handleSubmit} defaultValue={itemToEdit !== null && items.filter( (item) => (item.item_id == itemToEdit))[0] }/>

        </div>
        <Footer/>
        </>
    );
}