const express = require('express')
const router = express.Router()

const  { 
    getItems,
    getItem,
    createItem,
    deleteItem,
    updateItem
} = require('../controllers/menu.js')


// get all menu items
router.get("/", getItems);

// get a menu item
router.get("/:item_id", getItem);

// create a menu item
router.post("/", createItem);

// delete an admin account
router.delete("/:item_id", deleteItem);

// update an admin account
router.put("/:item_id", updateItem);

module.exports = router;