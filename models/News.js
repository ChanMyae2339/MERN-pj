const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,   
        required: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: Array,
        required: true
        },
},{ timestamps: true });
const News = mongoose.model('News', newsSchema);
module.exports = News;