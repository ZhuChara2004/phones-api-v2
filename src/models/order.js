const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  userId: String,
  cart: [
    {
      phoneId: String,
      phoneCount: Number,
    },
  ],
  orderSum: { type: Number, default: 0 },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports.Order = Order;
