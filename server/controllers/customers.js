const pool = require("../db");


const getMostPlacedOrderCustomer = (async (req, res) => {
    try {
      const allItems = await pool.query(
        `
        SELECT
            *
        FROM
            items
        `);
      res.json(allItems.rows);
    } catch (err) {
      console.error(err.message);
    }
});

const getAverageCustomerAge = (async (req, res) => {
    try {
      const allItems = await pool.query(
        `
        SELECT
            *
        FROM
            items
        `);
      res.json(allItems.rows);
    } catch (err) {
      console.error(err.message);
    }
});


module.exports =  {
    getMostPlacedOrderCustomer,
    getAverageCustomerAge
  };