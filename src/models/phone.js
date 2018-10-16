const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
  title: String,
  image: String,
  description: String,
  price: { type: Number, default: 0 },
}, { timestamps: true });

const Phone = mongoose.model('Phone', PhoneSchema);

module.exports.Phone = Phone;
