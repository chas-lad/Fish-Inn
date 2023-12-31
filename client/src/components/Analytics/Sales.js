import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import RevenueBarChart from "./RevenueBarChart";


export default function Sales() {
    
    const [selectedRevenueOption, setSelectedRevenueOption] = useState('')
    const [yearlySales, setYearlySales] = useState([]);
    const [monthlySales, setMonthlySales] = useState([]);
    const [weeklySales, setWeeklySales] = useState([]);
    const [dailySales, setDailySales] = useState([]);
    const [bestSellingItems, setBestSellingItems] = useState([]);
    const [bestSellingItemsDOW, setBestSellingItemsDOW] = useState([]);
    const [averageOrderValue, setAverageOrderValue] = useState([]);
    const [averageOrderRating, setAverageOrderRating] = useState([]);



    useEffect(() => {
        fetchSalesData();
      }, []);
    
    const revenueOptions = ['Revenue By Year',
                     'Revenue By Month (for this current year)',
                     'Revenue By Week (for this current year)',
                     'Revenue By Day (for this current week)']

    const fetchSalesData = async () => {
        try {
            let response = await fetch(`http://localhost:3000/sales/yearlySales`);
            let jsonData = await response.json();
            setYearlySales(jsonData)
            console.log(yearlySales)
            response = await fetch(`http://localhost:3000/sales/monthlySales`);
            jsonData = await response.json();
            setMonthlySales(jsonData)

            response = await fetch(`http://localhost:3000/sales/weeklySales`);
            jsonData = await response.json();
            setWeeklySales(jsonData)

            response = await fetch(`http://localhost:3000/sales/dailySales`);
            jsonData = await response.json();
            setDailySales(jsonData)

            response = await fetch(`http://localhost:3000/sales/bestSellingItems`);
            jsonData = await response.json();
            setBestSellingItems(jsonData)

            response = await fetch(`http://localhost:3000/sales/bestSellingItemsDOW`);
            jsonData = await response.json();
            const newBestSellingItemsDOW = jsonData.map(item => {
            switch(item.day) {
                case '0':
                    return {
                        ...item,
                        day: 'Monday',
                        };
                case '1':
                    return {
                        ...item,
                        day: 'Tuesday',
                        };
                case '2':
                        return {
                        ...item,
                        day: 'Wednesday',
                        };
                case '3':
                        return {
                        ...item,
                        day: 'Thursday',
                        };
                case '4':
                        return {
                        ...item,
                        day: 'Friday',
                        };
                case '5':
                        return {
                        ...item,
                        day: 'Saturday',
                        };
                case '6':
                        return {
                        ...item,
                        day: 'Sunday',
                        };
                }
            });
            // Re-render with the new array
            setBestSellingItemsDOW(newBestSellingItemsDOW);
        

            response = await fetch(`http://localhost:3000/sales/averageOrderValue`);
            jsonData = await response.json();
            setAverageOrderValue(jsonData)

            response = await fetch(`http://localhost:3000/sales/averageOrderRating`);
            jsonData = await response.json();
            setAverageOrderRating(jsonData)

        } catch (err) {
            console.error(err.message);
        }
    };
    
    return(
        <>  

            <div className="flex justify-center w-full items-center">

                <div className="mb-40">
                    <div className="ml-10">
                        <Dropdown placeholder="Select a time period of revenue to view" className="mb-10"value={selectedRevenueOption} options={revenueOptions} onChange={(e) => setSelectedRevenueOption(e.value)}/>
                    </div>
                    
                    {selectedRevenueOption === '' || selectedRevenueOption === 'Revenue By Year' ? <RevenueBarChart dataKey='year' data={yearlySales}/> : <></>}
                    {selectedRevenueOption === 'Revenue By Month (for this current year)' && <RevenueBarChart dataKey='month' data={monthlySales}/>}
                    {selectedRevenueOption === 'Revenue By Week (for this current year)' && <RevenueBarChart dataKey='week' data={weeklySales}/>}
                    {selectedRevenueOption === 'Revenue By Day (for this current week)' && <RevenueBarChart dataKey='day' data={dailySales}/>}
                </div>
                <div className="text-center pr-20 ">
                        <h2>Best Selling Item(s) by the day of the week</h2>
                        <div className="text-xl font-nunito-regular text-left inline-block border-solid border-black border-4 rounded-lg p-10 bg-white">
                            {bestSellingItemsDOW.map(item => 
                                <div>
                                    <p>{item.day}: {item.item_name}  (total sold: {item.highest_quantity})</p>
                                </div>
                            )}
                        </div>
                </div>
            </div>

            <div className="flex justify-center w-full items-center mt-10">

                <div className="text-center pr-20 ">
                    <h2>Best Selling Item(s)</h2>
                    <div className="text-xl font-nunito-regular text-left inline-block border-solid border-black border-4 rounded-lg p-10 bg-white">
                        {bestSellingItems.map(item =>
                            <div key={item.item_id}>
                                <p>Item Name: {item.item_name}</p>
                                <p>Selling Price: {item.selling_price}</p>
                                <p>Total Sold: {item.total_sold}</p>
                            </div>
                            )}
                    </div>
                </div>

                <div className="text-center pr-20 ">
                    <h2>Average Order Value</h2>
                    <div className="text-xl font-nunito-regular text-left inline-block border-solid border-black border-4 rounded-lg p-10 bg-white">
                    {averageOrderValue.map(order => 
                        <div>
                            <p>£{order.average_order_value.toFixed(2)}</p>
                        </div>
                    )}
                    </div>
                </div>

                <div className="text-center pr-20 ">
                    <h2>Average Order Rating</h2>
                    <div className="text-xl font-nunito-regular text-left inline-block border-solid border-black border-4 rounded-lg p-10 bg-white">
                    {averageOrderRating.map(order => 
                        <div>
                            <p>{order.average_order_rating.substring(0,4)}</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            
    
        </>
    )
}