import React from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
export const EventModal = ({isOpen, closeModal, onSubmit, defaultValue}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
    item_name: "",
    selling_price: 0,
    on_menu: true
  })
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if(formState.item_name && formState.selling_price && formState.on_menu){
      setErrors("")
      return true;
    }
    else{
      let errorFields = [];
      for(const [key,value] of Object.entries(formState)) {
        if(!value){
          errorFields.push(key)
        }
      }
      setErrors(errorFields.join(", "))
      return false;
    }
  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!validateForm()){
      return
    } 
    
    onSubmit(formState);
    closeModal();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <form>
          <div>
            <label htmlFor="item_name">Item Name</label>
            <input placeholder={formState.item_name} name="item_name" value={formState.item_name} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="selling_price">Price</label>
            <input type="number" min="0" step="0.01" name="selling_price" value={formState.selling_price} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="on_menu">Available on menu today?</label>
            <select name="on_menu" value={formState.on_menu} onChange={handleChange}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
          </div>
          {errors && <div>{`Please include: ${errors}`}</div>}
          <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5' type="submit" onClick={handleSubmit}>Submit</button>
      </form>
          <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5' onClick={closeModal()}>Close</button>
    </Modal>
    
  )
}
