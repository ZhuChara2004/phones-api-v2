const express = require('express');
const router = express.Router();

const Phone = require('../models/phone').Phone;

router.get('/', (req, res) => {
  Phone.find({}).exec((err, phones) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(phones);
  })
});

router.post('/', (req, res) => {
  console.log(req.body);
  const phone = new Phone(req.body);
  phone.save((err, phone) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201);
    res.json(phone);
  });
});

router.get('/:id', (req, res) => {
  Phone.findById(req.params.id, (err, doc) => {
    if (!doc) {
      res.status(404).json({ status: 'Not found' })
    } else {
      res.status(200).json(doc);
    }
  });
});

router.put('/:id', (req, res) => {
  Phone.findById(req.params.id, (err, doc) => {
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
  Phone.findById(req.params.id, (err, doc) => {
    if (!doc) {
      res.status(404).json({ status: 'Not found' })
    } else {
      doc.remove((err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(doc)
      });
    }
  });
});

module.exports = router;
