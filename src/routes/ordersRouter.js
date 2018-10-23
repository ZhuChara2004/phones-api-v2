const express = require('express');
const validate = require('express-validation');
const axios = require('axios');

const { Order } = require('../models/order');
const orderValidation = require('../validation/order');

const router = express.Router();

router.get('/', (req, res) => {
  Order.find({}).exec((err, docs) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.json(docs);
  });
});

router.post('/', validate(orderValidation), async (req, res) => {
  const newOrder = new Order(req.body);
  const orderSum = 0;

  async function fetchPrice(order) {
    const promises = order.cart.map(async (el) => {
      const { data: { price } } = await axios.get(`${process.env.API_URL}/phones/${el.phoneId}`);
      return price * el.phoneCount;
    });
    return (await Promise.all(promises)).reduce((a, b) => a + b, 0);
  }

  async function buildOrder(sum, order) {
    return fetchPrice(order);
  }

  newOrder.orderSum = await buildOrder(orderSum, newOrder);

  newOrder.save((err, doc) => {
    if (err) return res.status(500).json({ message: err.message });
    // eslint-disable-next-line no-console
    console.log('Final order:', doc);
    return res.status(201).json(doc);
  });
});

router.get('/:id', (req, res) => {
  Order.findById(req.params.id, (err, doc) => {
    if (!doc) {
      res.status(404).json({ status: 'Not found' });
    } else {
      res.status(200).json(doc);
    }
  });
});

module.exports = router;
