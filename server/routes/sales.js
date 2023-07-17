const express = require('express')
const router = express.Router()

const  { 
    getYearlySales,
    getMonthlySales,
    getWeeklySales,
    getDailySales,
    getBestSellingItems,
    getBestSellingItemsByDayOfWeek,
    getAverageOrderValue,
    getAverageOrderRating
} = require('../controllers/sales.js')


// get sales by year
router.get("/yearlySales", getYearlySales);

// get sales by month for this current year
router.get("/monthlySales", getMonthlySales);

// get sales by week for this current year
router.get("/weeklySales", getWeeklySales);

// get sales by day for this current week
router.get("/dailySales", getDailySales);

// get the best selling item(s) on the menu (since the very first order placed)
router.get("/bestSellingItems", getBestSellingItems);

// get best selling item(s) for each day of the week (since the very first order placed)
router.get("/bestSellingItemsDOW", getBestSellingItemsByDayOfWeek);

// get the average order value (since the very first order placed)
router.get("/averageOrderValue", getAverageOrderValue);

// get the average order rating (since the very first order placed)
router.get("/averageOrderRating", getAverageOrderRating);

module.exports = router;