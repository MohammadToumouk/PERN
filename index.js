const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("./db");
const userRouter =  require('./routes/users');
const orderRouter = require('./routes/orders');


app.use(cors());
app.use(express.json());



app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

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

app.get('/todos', async(req,res) => {
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



app.listen(5000, () =>{
console.log('Hello Motherfuckers Welcome on Server ')
});