const express = require('express')
const router = express.Router()

const  { 
    getMostPlacedOrderCustomer,
    getAverageCustomerAge
} = require('../controllers/customers.js')


// get details about the customer who has placed the most orders
router.get("/mostPlacedOrders", getMostPlacedOrderCustomer);

// get the average age of customers
router.get("/", getAverageCustomerAge);


module.exports = router;