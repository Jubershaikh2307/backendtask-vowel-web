const mongoose = require('mongoose');

//                 country,
// street,
// city,
// state,
// pincode

const PlaceOrderSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

const PlaceOrderModel = mongoose.model('Cart', PlaceOrderSchema);

module.exports = PlaceOrderModel