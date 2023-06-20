const express = require('express');
const pool = require("../db")

const orderRouter = express.Router();

/* Get All Orders */

orderRouter.get('/', async(req,res) => {
    try {
        
        const allOrders = await pool.query('SELECT * FROM orders;');
        res.send(allOrders.rows)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
});

/* get order by ID */

orderRouter.get('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const order = await pool.query('SELECT * FROM orders WHERE id = $1;',
        [id]);
        res.send(order.rows)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
});


/* Creating an order */

orderRouter.post('/', async(req,res) => {
    try {
        const {price, date, user_id} = req.body;
        const newOrder = await pool.query('INSERT INTO orders (price, date, user_id) VALUES ($1,$2,$3) RETURNING *',
        [price, date, user_id]);
        res.send(newOrder.rows)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
});

/* Updating an order */

orderRouter.put('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const {price, date, user_id} = req.body;
        const updatedOrder = await pool.query('UPDATE orders SET price = $1, date = $2, user_id = $3 WHERE id = $4 ',
        [price,date,user_id, id]);
        res.send(updatedOrder.rows)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
});

/* Deleting an order */

orderRouter.delete('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query('DELETE FROM orders WHERE id = $1',
        [id]);
        res.send(rows)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})


module.exports = orderRouter;