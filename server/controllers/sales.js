const pool = require("../db");

const getYearlySales = (async (req, res) => {
    try {

      const allItems = await pool.query(
        `
        SELECT
            EXTRACT('Year' FROM total_prices.order_timestamp) AS year,
            SUM(total_prices.total_price) AS revenue
        FROM
            (SELECT
                o.order_timestamp,
                (oi.quantity * i.selling_price) AS total_price
            FROM
                orders o
            INNER JOIN
                order_items oi
            ON
                o.order_id = oi.order_id
            INNER JOIN
                items i
            ON
                oi.item_id = i.item_id) AS total_prices
        GROUP BY
            EXTRACT('Year' FROM total_prices.order_timestamp)

        `);
      res.json(allItems.rows);
    } catch (err) {
      console.error(err.message);
    }
});

const getMonthlySales = (async (req, res) => {

    const firstDateOfYear = new Date(new Date().getFullYear(), 0, 1);
    const lastDateOfYear = new Date(new Date().getFullYear(), 11, 31);

    try {
      const allItems = await pool.query(
        `
        SELECT
            EXTRACT('Month' FROM total_prices.order_timestamp) AS month,
            SUM(total_prices.total_price) AS revenue
        FROM
            (SELECT
                o.order_timestamp,
                (oi.quantity * i.selling_price) AS total_price
            FROM
                orders o
            INNER JOIN
                order_items oi
            ON
                o.order_id = oi.order_id
            INNER JOIN
                items i
            ON
                oi.item_id = i.item_id
            WHERE
                o.order_timestamp BETWEEN $1 AND $2) AS total_prices
        GROUP BY
            EXTRACT('Month' FROM total_prices.order_timestamp)
        `,[firstDateOfYear, lastDateOfYear]);
      res.json(allItems.rows);
    } catch (err) {
      console.error(err.message);
    }
});

const getWeeklySales = (async (req, res) => {
    try {

      const firstDateOfYear = new Date(new Date().getFullYear(), 0, 1);
      const lastDateOfYear = new Date(new Date().getFullYear(), 11, 31);

      const allItems = await pool.query(
        `
        SELECT
            EXTRACT('Week' FROM total_prices.order_timestamp) AS week,
            SUM(total_prices.total_price) AS revenue
        FROM
            (SELECT
                o.order_timestamp,
                (oi.quantity * i.selling_price) AS total_price
            FROM
                orders o
            INNER JOIN
                order_items oi
            ON
                o.order_id = oi.order_id
            INNER JOIN
                items i
            ON
                oi.item_id = i.item_id
            WHERE
                o.order_timestamp BETWEEN $1 AND $2) AS total_prices
        GROUP BY
            EXTRACT('Week' FROM total_prices.order_timestamp)
        `,[firstDateOfYear, lastDateOfYear]);
      res.json(allItems.rows);
    } catch (err) {
      console.error(err.message);
    }
});

const getDailySales = (async (req, res) => {
    try {
      var curr = new Date; // get current date
      var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      var last = first + 6; // last day is the first day + 6
        
      var firstDayOfWeek = new Date(curr.setDate(first)).toUTCString();
      var lastDayOfWeek = new Date(curr.setDate(last)).toUTCString();
      
      const allItems = await pool.query(
        `
        SELECT
            EXTRACT('Day' FROM total_prices.order_timestamp) AS day,
            SUM(total_prices.total_price) AS revenue
        FROM
            (SELECT
                o.order_timestamp,
                (oi.quantity * i.selling_price) AS total_price
            FROM
                orders o
            INNER JOIN
                order_items oi
            ON
                o.order_id = oi.order_id
            INNER JOIN
                items i
            ON
                oi.item_id = i.item_id
            WHERE
                o.order_timestamp BETWEEN $1 AND $2) AS total_prices
        GROUP BY
            EXTRACT('Day' FROM total_prices.order_timestamp)
        `,[firstDayOfWeek, lastDayOfWeek]);
      res.json(allItems.rows);
    } catch (err) {
      console.error(err.message);
    }
});

const getBestSellingItems = (async (req, res) => {
    try {
      const allItems = await pool.query(
        `
        SELECT
            i.item_id,
            i.item_name,
            i.selling_price,
            COUNT(oi.quantity) AS total_sold
        FROM
            items i
        INNER JOIN
            order_items oi
        ON
            i.item_id = oi.item_id
        GROUP BY 
            i.item_id
        ORDER BY
            total_sold DESC
        FETCH FIRST 1 ROWS WITH TIES
        `);
      res.json(allItems.rows);
    } catch (err) {
      console.error(err.message);
    }
});

const getBestSellingItemsByDayOfWeek = (async (req, res) => {
    try {
      const allItems = await pool.query(
        `
        SELECT
            a.day,
            a.highest_quantity,
            b.item_id,
            i.item_name
        FROM
        (
        -- This shows the highest selling quantity of a product for each day of the week
        SELECT
            day,
            MAX(total_amount_of_item_sold_on_this_dow) AS highest_quantity
        FROM
            (
            -- This shows for each day of the week the total amount of each item that has been sold
            SELECT
                oi.item_id,
                SUM(oi.quantity) AS total_amount_of_item_sold_on_this_dow,
                EXTRACT('dow' from o.order_timestamp) AS day
            FROM
                orders o
            INNER JOIN
                order_items oi
            ON
                o.order_id = oi.order_id
            GROUP BY
                EXTRACT('dow' from o.order_timestamp),
                oi.item_id) AS item_totals_for_each_dow
        GROUP BY
            day
        ) AS a
        INNER JOIN
            (
            -- This shows for each day of the week the total amount of each item that has been sold
            SELECT
                oi.item_id,
                SUM(oi.quantity) AS total_amount_of_item_sold_on_this_dow,
                EXTRACT('dow' from o.order_timestamp) AS day
            FROM
                orders o
            INNER JOIN
                order_items oi
            ON
                o.order_id = oi.order_id
            GROUP BY
                EXTRACT('dow' from o.order_timestamp),
                oi.item_id) AS b
        ON
            a.day = b.day
        INNER JOIN 
            items i
        ON
            b.item_id = i.item_id
        WHERE
            a.highest_quantity = b.total_amount_of_item_sold_on_this_dow
        ORDER BY
            a.day ASC
        
        `);
      res.json(allItems.rows);
    } catch (err) {
      console.error(err.message);
    }
});

const getAverageOrderValue = (async (req, res) => {
    try {
      const allItems = await pool.query(
        `
        SELECT
            AVG(total_price) AS average_order_value
        FROM
            (SELECT
                oi.order_id,
                SUM(oi.quantity * i.selling_price) AS total_price
            FROM
                order_items oi
            INNER JOIN
                items i
            ON
                oi.item_id = i.item_id
            GROUP BY
                oi.order_id) AS total_price_per_order
        
        `);
      res.json(allItems.rows);
    } catch (err) {
      console.error(err.message);
    }
});

const getAverageOrderRating = (async (req, res) => {
    try {
      const allItems = await pool.query(
        `
        SELECT
            AVG(orders.review_star_rating) AS average_order_rating
        FROM
            orders
        `);
      res.json(allItems.rows);
    } catch (err) {
      console.error(err.message);
    }
});


module.exports =  {
    getYearlySales,
    getMonthlySales,
    getWeeklySales,
    getDailySales,
    getBestSellingItems,
    getBestSellingItemsByDayOfWeek,
    getAverageOrderValue,
    getAverageOrderRating
  };