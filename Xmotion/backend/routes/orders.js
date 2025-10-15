const express = require('express');
const { createOrder, getTotalSales } = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/total', getTotalSales);

module.exports = router;