const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    addresses: [{
        ref: 'Addresses',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }]
});

module.exports = new mongoose.model("Users", UsersSchema);