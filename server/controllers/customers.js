const pool = require("../db");


const getMostPlacedOrderCustomer = (async (req, res) => {
    try {
      const allItems = await pool.query(
        `
        SELECT 
          *
        FROM
          customers c
        INNER JOIN
          (SELECT
            c.customer_id,
            COUNT(c.customer_id) AS orders_placed
          FROM
            customers c
          INNER JOIN
            orders o
          ON
            c.customer_id = o.customer_id
          GROUP BY 
            c.customer_id
          ORDER BY
            COUNT(c.customer_id) DESC
          FETCH FIRST 1 ROWS WITH TIES) AS top_customer
        ON
          c.customer_id = top_customer.customer_id
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
            AVG(DATE_PART('year', CURRENT_TIMESTAMP) - DATE_PART('year', customers.dob)) AS avg_age
        FROM
            customers
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