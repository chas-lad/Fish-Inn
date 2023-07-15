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
                    {item.on_menu ? 'Yes' : 'No' }
                </td>
                <td>
                    <span>
                        <BsFillPencilFill onClick={()=>editItem(item.item_id)}/>
                    </span>
                </td>
        </tr>)


  return (
    <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope="col" class="px-6 py-3">Item Name</th>
                        <th scope="col" class="px-6 py-3">Price</th>
                        <th scope="col" class="px-6 py-3">Available on menu today?</th>
                        <th scope="col" class="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>
        </div>
  )
}
