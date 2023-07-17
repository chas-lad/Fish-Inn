import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label } from 'recharts'

export default function RevenueBarChart({dataKey, data}) {
    
    return(
        <>
            { data.length == 0 ? <h2>No data for this figure!</h2> :
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={dataKey} >
                    <Label style={{
                            fill: "#319795"
                            }}
                            value={dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}
                            position="center"/>
                </XAxis>
                <YAxis>
                    <Label style={{
                            fill: "#319795"
                            }}
                            angle={270}
                            value="Revenue (£)"
                            position='center'/>
                </YAxis>
                <Tooltip />
                <Bar dataKey="revenue" fill="#319795" />
            </BarChart> }
        </>
    );

}