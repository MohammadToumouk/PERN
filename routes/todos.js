const express = require('express');
const pool = require('../db')
const todosRouter = express.Router();

/* Routes */

/* Create todo */

todosRouter.post('/', async(req,res) => {
    try {
     const {description} = req.body;
     const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",
     [description]
     );
     console.log(newTodo.rows)

     res.json(newTodo.rows[0])
        
    } catch (error) {
        console.log(error)
        res.status(404).send("falssssse ")
    }
})


/* get all todos */

todosRouter.get('/', async(req,res) => {
    try {
      const {rows} =  await pool.query("SELECT * FROM todo");
      res.send(rows);
    } catch (error) {
        console.log(error)
    }
})

/* get a todo */

/* update a todo */

/* delete a todo */

module.exports = todosRouter;