const mongoose = require('mongoose');

const schema = new mongoose.Schema({}, { timestamps: true, strict: false });

module.exports = Chat = mongoose.model('chat', schema);
