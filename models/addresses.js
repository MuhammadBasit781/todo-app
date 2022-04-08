const mongoose = require("mongoose");

const AddressesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model("Addresses", AddressesSchema);