const express = require('express');

const router = express.Router();

const { User } = require('../models/user');
const { Order } = require('../models/order');

router.get('/', (req, res) => {
  User.find({}).exec((err, docs) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json(docs);
  });
});

router.post('/', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(201).json(doc);
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (!doc) {
      res.status(404).json({ status: 'Not found' });
    } else {
      res.status(200).json(doc);
    }
  });
});

router.put('/:id', (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (!doc) {
      res.status(404).json({ status: 'Not found' });
    } else {
      doc.set(req.body);
      doc.save((error, updated) => {
        if (error) return res.status(500).json({ message: error.message });
        return res.status(200).json(updated);
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (!doc) {
      res.status(404).json({ status: 'Not found' });
    } else {
      Order.deleteMany({ userId: doc.id }, (error) => {
        if (error) return res.status(500).json({ message: error.message });
        return null;
      });

      doc.remove((error) => {
        if (error) return res.status(500).json({ message: error.message });
        return res.status(200).json(doc);
      });
    }
  });
});

router.get('/:id/orders', (req, res) => {
  Order.find({ userId: req.params.id }, (err, docs) => {
    if (!docs) {
      res.status(404).json({ status: 'Not found' });
    } else {
      res.status(200).json({ docs });
    }
  });
});

module.exports = router;
