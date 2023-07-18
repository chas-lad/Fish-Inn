import {useEffect, useState} from 'react'

export default function Customers() {

    const [mostPlacedOrders, setMostPlacedOrders] = useState([]);
    const [averageCustomerAge, setAverageCustomerAge] = useState([]);


    useEffect(() => {
        fetchCustomerData();
      }, []);

    const fetchCustomerData = async () => {
        try {
            let response = await fetch(`http://localhost:3000/customers/mostPlacedOrderCustomers`);
            let jsonData = await response.json();
            setMostPlacedOrders(jsonData)
            response = await fetch(`http://localhost:3000/customers/averageCustomerAge`);
            jsonData = await response.json();
            setAverageCustomerAge(jsonData)

        } catch (err) {
            console.error(err.message);
        }
    };

    console.log(averageCustomerAge)

    return(
        <>
        <div className="flex justify-center w-full items-center mt-10">
            <div className="text-center pr-20 ">
            {mostPlacedOrders.length > 1 ? <h2>Customers who have placed the most orders</h2>
                                        : <h2>Customer who has placed the most orders</h2>}
                <div className="text-xl font-nunito-regular text-left inline-block border-solid border-black border-4 rounded-lg p-10 bg-white">
                    {mostPlacedOrders.map(customer =>
                        <div key={customer.customer_id}>
                            <p>Name:          {customer.first_name} {customer.surname}</p>
                            <p>Email:         {customer.email}</p>
                            <p>Age:           {(customer.age).years}</p>
                            <p>Join Date:     {customer.join_date.substring(0, 10)}</p>
                            <p>Phone No:      {customer.phone_no}</p>
                            <p>Postcode:      {customer.postcode}</p>
                            <p>Orders Placed: {customer.orders_placed}</p>
                        </div>                
                        )}
                </div>
            </div>

            <div className="text-center pr-20">
            <h2>Average Customer Age</h2>
                <div className="text-xl font-nunito-regular text-left inline-block border-solid border-black border-4 rounded-lg p-10 bg-white">
                {averageCustomerAge.map(customer => 
            <p>{customer.avg_age.toFixed(2)} years old</p>
            )} 
                </div>
            </div>
        </div>

        </>
    )
    
}