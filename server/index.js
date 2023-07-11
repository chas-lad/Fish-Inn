const express = require("express");
const app = express();
const cors =  require("cors");

const login_routes = require('./routes/logins.js');
const employee_routes = require('./routes/employees.js')
const menu_routes = require('./routes/menu.js')



//middleware
app.use(cors());
app.use(express.json()); // req.body
app.use('/adminAccounts', login_routes)
app.use('/employees', employee_routes)
app.use('/menu', menu_routes)



app.listen(3000, () => {
    console.log("Server has started on port 3000")
});
