const express = require('express')
const router = express.Router()

const  { 
    getMostPlacedOrderCustomer,
    getAverageCustomerAge
} = require('../controllers/customers.js')


// get details about the customer(s) who have placed the most orders
router.get("/mostPlacedOrders", getMostPlacedOrderCustomer);

// get the average age of customers
router.get("/averageCustomerAge", getAverageCustomerAge);


module.exports = router;