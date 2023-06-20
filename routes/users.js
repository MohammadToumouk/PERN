const express = require('express');
const pool = require("../db")

const userRouter = express.Router();

/* Get All Users */

userRouter.get('/', async(req,res) => {
    try {
        
        const allUsers = await pool.query('SELECT * FROM users;');
        res.send(allUsers.rows)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
});

/* get user by ID */

userRouter.get('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const user = await pool.query('SELECT * FROM users WHERE id = $1;',
        [id]);
        res.send(user.rows)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
});

/* get user Orders */

userRouter.get('/:id/orders', async (req, res) => {
    try {
      const { id } = req.params;
      const userAndOrders = await pool.query(
        'SELECT users.*, orders.* FROM users JOIN orders ON users.id = orders.user_id WHERE users.id = $1;',
        [id]
      );
      res.json(userAndOrders.rows[0].price);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });
  


/* Creating a User */

userRouter.post('/', async(req,res) => {
    try {
        const {first_name, last_name, age} = req.body;
        const newUser = await pool.query('INSERT INTO users (first_name, last_name, age) VALUES ($1,$2,$3) RETURNING *',
        [first_name,last_name,age]);
        res.send(newUser.rows)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
});

/* Updating a user */

userRouter.put('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const {first_name, last_name, age} = req.body;
        const updatedUser = await pool.query('UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 ',
        [first_name,last_name,age, id]);
        res.send(updatedUser.rows)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
});

/* Deleting a user */

userRouter.delete('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query('DELETE FROM users WHERE id = $1',
        [id]);
        res.send(rows)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})


module.exports = userRouter;