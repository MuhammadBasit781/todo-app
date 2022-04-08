const router = require('express').Router();
const Users = require('../models/users');
const Addresses = require('../models/addresses');

router
    .route('/:userId')
    .get(async (req, res) => {
        const { userId } = req.params;
        const user = await Users.findById(userId).populate("addresses");
        res.send(user);
    })
    .delete((req, res) => {
        const { _id } = req.params;
        Users.deleteOne({ _id })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => res.status(400).send(err));
    })
    .put(async (req, res) => {
        const user = req.body;
        const { _id } = req.params;

        if (!user.name || !user.age || !user.gender) {
            return res.status(400).send("Name,Age or Gender is missing");
        }
        const updatedUser = await Users.replaceOne({ _id }, user);
        res.send(updatedUser);
    });

router
    .route('/')
    .get(async (req, res) => {
        const allUsers = await Users.find().populate("addresses");
        res.send(allUsers);
    })
    .post((req, res) => {
        const user = req.body;

        if (!user.name || !user.age || !user.gender) {
            return res.status(400).send("Name,Age or Gender is missing")
        }

        const newUser = new Users(user);
        const address = new Addresses({ name: req.body.address });

        newUser.addresses.push(address);
        address.save()
            .then(() => {
                return newUser.save();
            })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => res.status(400).send(err));
    });

router.post("/:userId/address", async (req, res) => {
    const { userId } = req.params;

    if (!req.body.name) {
        return res.status(400).send("Address Name is missing");
    }
    const user = await Users.findById(userId).populate("addresses");
    const address = new Addresses({ name: req.body.name });

    user.addresses.push(address);

    address.save()
        .then(() => {
            return user.save();
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => res.status(400).send(err));
});

module.exports = router;