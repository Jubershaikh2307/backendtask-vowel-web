const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    quantity: { type: Number, default: 1 },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel