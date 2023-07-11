import React from 'react'

import { BsFillPencilFill } from"react-icons/bs"

export const Table = ({items, editItem}) => {


    const listItems = items.map(item =>
        <tr key={item.item_id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.item_name}
                </th>
                <td class="px-6 py-4">
                    £ {(item.selling_price).toFixed(2)}
                </td>
                <td class="px-6 py-4">
                    {item.on_menu ? 'Yes' : 'NO' }
                </td>
                <td>
                    <span>
                        <BsFillPencilFill onClick={()=>editItem(item.item_id)}/>
                    </span>
                </td>
        </tr>)


  return (
    <div>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Available on menu today?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>
        </div>
  )
}
