const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },    
    images: [String]
}, { timestamps: true })

const DataModel = mongoose.model('Product', DataSchema);

module.exports = DataModel