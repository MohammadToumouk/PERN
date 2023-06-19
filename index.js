const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("./db");


app.use(cors());
app.use(express.json());

/* Routes */

/* Create todo */

app.post('/todos', async(req,res) => {
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

/* get a todo */

/* update a todo */

/* delete a todo */



app.listen(5000, () =>{
console.log('Hello Motherfuckers Welcome on Server ')
});