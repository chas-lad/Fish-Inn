const express = require('express')
const router = express.Router()

const  { 
    createAdminAccount,
    getAdminAccounts,
    getAdminAccount,
    updateAdminAccountDetails,
    deleteAdminAccount
} = require('../controllers/logins.js')

// create an admin account
router.post("/", createAdminAccount)

// get all admin accounts
router.get("/", getAdminAccounts);
  
// get an admin account
router.get("/:user_name", getAdminAccount);

// update an admin account name
router.put("/:user_name", updateAdminAccountDetails);

// delete an admin account
router.delete("/:user_name", deleteAdminAccount);

module.exports = router;