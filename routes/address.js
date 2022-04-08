const router = require('express').Router();
const Addresses = require('../models/addresses');
const Users = require('../models/users');

router
    .route('/:_id')
    .delete((req, res) => {
        const { _id } = req.params;
        Addresses.deleteOne({ _id })
            .then((data) => {
                res.send("Deleted Address Successfully!");
            })
            .catch((err) => console.log(err));
    })
    .put(async (req, res) => {
        const address = req.body;
        const { _id } = req.params;
        if (!address.name) {
            return res.status(400).send("Address Name is missing")
        }
        const updatedAddress = await Addresses.replaceOne({ _id }, req.body);
        res.send(updatedAddress);
    });

module.exports = router;