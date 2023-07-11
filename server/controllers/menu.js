const pool = require("../db");

const getItems = (async (req, res) => {
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

const getItem = (async (req, res) => {
    try {
      const { item_id } = req.params;
      const item = await pool.query(
        `
        SELECT
            *
        FROM
            items
        WHERE item_id = $1
        `, 
        [item_id]);

      if(item.rowCount === 0){
        res.json({
            "error": "404",
            "detail": "item does not exist, ensure that you are using the correct item_id"
        });
      }
      else{
        res.json(item.rows[0])
      }
      
    } catch (err) {
      console.error(err.message);
    }
  });

const createItem = (async (req,res)=>{
    try{
        const { item_name, selling_price, on_menu } = req.body; 
        const newItem = await pool.query(
            `
            INSERT INTO
                items
            ( 
              item_id,
              item_name,
              selling_price,
              on_menu
            ) 
            VALUES
            (
                (SELECT setval(pg_get_serial_sequence('items', 'item_id'), coalesce(max(item_id)+1, 1), false) FROM items),
                $1,
                $2,
                $3
            )
            RETURNING 
                *
             `
            ,
            [ item_name, selling_price, on_menu ]);
        res.json(newItem);
        console.log(req.body);
    }
    catch (err) {
        console.error(err.message);
    }
  });

  const deleteItem = (async (req,res)=>{
    try{
        const { item_id } = req.params;
        const deletedItem = await pool.query(
            `
            DELETE FROM
              items
            WHERE
              item_id = $1
            `
            ,
            [item_id]);
        res.json(deletedItem);
        console.log(req.body);
    }
    catch (err) {
        console.error(err.message);
    }
  });

  const updateItem = (async (req, res) => {
    try {
      const { item_id } = req.params;
      const { item_name, selling_price, on_menu} = req.body;
      const updatedItem = await pool.query(
        `
        UPDATE 
            items
        SET    
            item_name = $2,
            selling_price = $3,
            on_menu = $4
        WHERE
            item_id = $1
        `,
        [item_id, item_name, selling_price, on_menu]);
  
      res.json("Details have been updated");
    } catch (err) {
      console.error(err.message);
    }
  });

module.exports =  {
    getItems,
    getItem,
    createItem,
    deleteItem,
    updateItem
  };