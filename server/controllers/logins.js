const pool = require("../db");

const createAdminAccount = (async (req,res)=>{
    try{
        const { user_name, first_name, surname, dob, email, password } = req.body; // object destructuring
        const newAdminAccount = await pool.query(
            `
            INSERT INTO
                admin_accounts
            (
                user_name,
                first_name,
                surname,
                dob,
                email,
                password
            ) 
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )
            RETURNING 
                *
             `
            ,
            [user_name, first_name, surname, dob, email, password]);
        res.json(newAdminAccount);
    }
    catch (err) {
        console.error(err.message);
    }
});


const getAdminAccounts = (async (req, res) => {
    try {
      const allAdminAccounts = await pool.query(
        `
        SELECT
            *
        FROM
            admin_accounts
        `);
      res.json(allAdminAccounts.rows);
    } catch (err) {
      console.error(err.message);
    }
});

const getAdminAccount = (async (req, res) => {
    try {
      const { user_name } = req.params;
      const adminAccount = await pool.query(
        `
        SELECT
            *
        FROM
            admin_accounts
        WHERE user_name = $1
        `, 
        [user_name]);
      if(adminAccount.rowCount === 0){
        res.json({
            "error": "404",
            "detail": "Username does not exist, ensure that you are using the correct username"
        });
      }
      else{
        res.json(adminAccount.rows[0])
      }
      
    } catch (err) {
      console.error(err.message);
    }
  });

  const updateAdminAccountDetails = (async (req, res) => {
    try {
      const { user_name } = req.params;
      const { firstNameToSend, surnameToSend, emailToSend} = req.body;
      const updateAdminAccountName = await pool.query(
        `
        UPDATE 
            admin_accounts
        SET 
            first_name = $2,
            surname = $3,
            email = $4
        WHERE
            user_name = $1
        `,
        [user_name, firstNameToSend, surnameToSend, emailToSend]);
  
      res.json("Details have been updated");
    } catch (err) {
      console.error(err.message);
    }
  });


  const deleteAdminAccount = (async (req, res) => {
    try {
      const { user_name } = req.params;
      const deletedAdminAccount = await pool.query(
        `
        DELETE FROM
            admin_accounts
        WHERE
            user_name = $1
        `, 
        [user_name]);

      res.json("Admin account was deleted!");
      
    } catch (err) {
      console.error(err.message);
    }
  });


module.exports =  {
    createAdminAccount,
    getAdminAccounts,
    getAdminAccount,
    updateAdminAccountDetails,
    deleteAdminAccount
};
