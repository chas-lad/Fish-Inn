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
            <h2>Most placed order customer</h2>
            {mostPlacedOrders.map(customer =>
                <div key={customer.customer_id}>
                    <p>{customer.first_name} {customer.surname}</p>
                    <p>{customer.email}</p>
                    <p>{customer.dob}</p>
                    <p>{customer.phone_no}</p>
                    <p>{customer.postcode}</p>
                </div>                
                )}

            <h2>Average Customer Age</h2>
            {averageCustomerAge.map(customer => 
                <div>
                    <p>{customer.avg_age.toFixed(2)} years old</p>
                </div>
            )} 
        </>
    )
    
}