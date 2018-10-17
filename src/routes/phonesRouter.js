const express = require('express');

const router = express.Router();

const { Phone } = require('../models/phone');

router.get('/', (req, res) => {
  Phone.find({}).exec((err, phones) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.json(phones);
  });
});

router.post('/', (req, res) => {
  const phone = new Phone(req.body);
  phone.save((err, doc) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(201).json(doc);
  });
});

router.get('/:id', (req, res) => {
  Phone.findById(req.params.id, (err, doc) => {
    if (!doc) {
      res.status(404).json({ status: 'Not found' });
    } else {
      res.status(200).json(doc);
    }
  });
});

router.put('/:id', (req, res) => {
  Phone.findById(req.params.id, (err, doc) => {
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
  Phone.findById(req.params.id, (err, doc) => {
    if (!doc) {
      res.status(404).json({ status: 'Not found' });
    } else {
      doc.remove((error) => {
        if (error) return res.status(500).json({ message: error.message });
        return res.status(200).json(doc);
      });
    }
  });
});

module.exports = router;
