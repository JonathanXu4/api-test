const mongoose = require('mongoose');

let Schema = mongoose.Schema;

// model, must change
let FriendSchema = new Schema({
    Name: String,
    Author: String,
    ISBN: String,
    Price: Number
});

module.exports = mongoose.model('Friend', FriendSchema);

