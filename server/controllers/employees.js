const pool = require("../db");


const getEmployees = (async (req, res) => {
    try {
      const allEmployees = await pool.query(
        `
        SELECT
            *
        FROM
            employees
        `);
      res.json(allEmployees.rows);
    } catch (err) {
      console.error(err.message);
    }
});

const getEmployee = (async (req, res) => {
  try {
    const { emp_id } = req.params;
    const employee = await pool.query(
      `
      SELECT
          *
      FROM
          employees
      WHERE emp_id = $1
      `, 
      [emp_id]);
    console.log(employee)
    if(employee.rowCount === 0){
      res.json({
          "error": "404",
          "detail": "Employee does not exist, ensure that you are using the correct emp_id"
      });
    }
    else{
      res.json(employee.rows[0])
    }
    
  } catch (err) {
    console.error(err.message);
  }
});

const getEmployeeSchedules = (async (req, res) => {
  try {
    const employeeSchedules = await pool.query(
      `
      SELECT
          e.emp_id,
          e.first_name,
          e.surname,
          s.start_date_time,
          s.end_date_time
      FROM
          employees AS e
      INNER JOIN
          schedule AS s
      ON
          e.emp_id = s.emp_id
      `);
    res.json(employeeSchedules.rows);
  } catch (err) {
    console.error(err.message);
  }
});


const createEmployeeSchedule = (async (req,res)=>{
  try{
      const { emp_id } = req.params;
      console.log(emp_id)
      const { start_date_time, end_date_time } = req.body; 
      const newEmployeeSchedule = await pool.query(
          `
          INSERT INTO
              schedule
          (
            emp_id,   
            start_date_time, 
            end_date_time   
          ) 
          VALUES
          (
              $1,
              $2,
              $3
          )
          RETURNING 
              *
           `
          ,
          [emp_id, start_date_time, end_date_time]);
      res.json(newEmployeeSchedule);
      console.log(req.body);
  }
  catch (err) {
      console.error(err.message);
  }
});

module.exports =  {
  getEmployees,
  getEmployee,
  getEmployeeSchedules,
  createEmployeeSchedule
};