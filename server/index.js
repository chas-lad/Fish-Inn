const express = require("express");
const app = express();
const cors =  require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); // req.body


//ROUTES

// create an admin account
app.post("/adminAccounts", async (req,res)=>{
    try{
        const { firstName, surname, email, DOB } = req.body; // object destructuring
        const newAdminAccount = await pool.query(
            `
            INSERT INTO
                adminAccounts
            (
                firstName,
                surname,
                email,
                DOB
            ) 
            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )
            RETURNING 
                *
             `
            ,
            [firstName, surname, email, DOB ]);
        res.json(newAdminAccount.rows[0]);
        console.log(req.body);
    }
    catch (err) {
        console.error(err.message);
    }
})
// get all admin accounts
app.get("/adminAccounts", async (req, res) => {
    try {
      const allAdminAccounts = await pool.query(
        `
        SELECT
            *
        FROM
            adminAccounts
        `);
      res.json(allAdminAccounts.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
// get an admin account
app.get("/adminAccounts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const adminAccount = await pool.query(
        `
        SELECT
            *
        FROM
            adminAccounts
        WHERE adminAccountsID = $1
        `, 
        [id]);
  
      res.json(adminAccount.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

// update an admin account name
app.put("/adminAccounts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName } = req.body;
      const updateAdminAccountName = await pool.query(
        `
        UPDATE 
            adminAccounts
        SET 
            firstName = $1
        WHERE
            adminAccountsID = $2
        `,
        [firstName, id]);
  
      res.json("Admin Account Name was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

// delete an admin account
app.delete("/adminAccounts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteAdminAccount = await pool.query(
        `
        DELETE FROM
            adminAccounts
        WHERE
            adminAccountsID = $1
        `, 
        [id]);

      res.json("Admin account was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(3000, () => {
    console.log("Server has started on port 3000")
});
