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

// get an employee account
router.get("/:emp_id", getEmployee);

// create an employee schedule
router.post("/schedules/:emp_id", createEmployeeSchedule);

// delete an employee schedule
router.delete("/schedules/:emp_id", deleteEmployeeSchedule);

module.exports = router;