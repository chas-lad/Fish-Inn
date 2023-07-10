const express = require('express')
const router = express.Router()

const  { 
    getEmployees,
    getEmployee,
    getEmployeeSchedules,
    createEmployeeSchedule,
    deleteEmployeeSchedule
} = require('../controllers/employees.js')


// get all employee accounts
router.get("/", getEmployees);

// get all employee schedules
router.get("/schedules", getEmployeeSchedules);

// get an admin account
router.get("/:emp_id", getEmployee);

// get an admin account
router.post("/schedules/:emp_id", createEmployeeSchedule);

// get an admin account
router.delete("/schedules/:emp_id", deleteEmployeeSchedule);

module.exports = router;