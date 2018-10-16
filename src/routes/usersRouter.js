const express = require('express');
const router = express.Router();

const User = require('../models/user').User;
const Order = require('../models/order').Order;

router.get('/', (req, res) => {
  User.find({}).exec((err, docs) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(docs);
  })
});

router.post('/', (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json(doc);
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (!doc) {
      res.status(404).json({ status: 'Not found' })
    } else {
      res.status(200).json(doc);
    }
  });
});

router.put('/:id', (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (!doc) {
      res.status(404).json({ status: 'Not found' })
    } else {
      doc.set(req.body);
      doc.save((err, updated) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(updated);
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (!doc) {
      res.status(404).json({ status: 'Not found' })
    } else {
      Order.deleteMany({ userId: doc._id }, (err) => {
        if (err) return res.status(500).json({ message: err.message });
      });

      doc.remove((err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(doc)
      });
    }
  });
});

router.get('/:id/orders', (req, res) => {
  Order.find({ userId: req.params.id }, (err, docs) => {
    debugger;
    if (!docs) {
      res.status(404).json({ status: 'Not found' })
    } else {
      res.status(200).json({docs})
    }
  });
});

module.exports = router;
