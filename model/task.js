const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: String },
    name: { type: String, required: true },
    done: { type: Boolean }
});

module.exports = mongoose.model('task', userSchema);