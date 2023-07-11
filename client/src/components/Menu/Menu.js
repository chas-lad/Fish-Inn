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

    // adding a new item to db
    const handleSubmit = async (newItem) => {
        try {

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

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        fetchItems();
      }, [ [], handleSubmit]);

    return(
        <>
        <Navbar/>
        <div className="bg-hero-pattern">

        <h1>Menu</h1>
        <Table items={items} editItem={handleEditItem}/>
        <button className='mb-40' onClick={() => setModalOpen(true)}>Add</button>
        <EventModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} onSubmit={handleSubmit} defaultValue={itemToEdit !== null && items.filter( (item) => (item.item_id == itemToEdit))[0] }/>

        </div>
        <Footer/>
        </>
    );
}