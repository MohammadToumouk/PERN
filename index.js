const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("./db");
const userRouter =  require('./routes/users');
const orderRouter = require('./routes/orders');
const todosRouter = require('./routes/todos');


app.use(cors());
app.use(express.json());



app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/todos", todosRouter);




app.listen(5000, () =>{
console.log('Hello Motherfuckers Welcome on Server ')
});