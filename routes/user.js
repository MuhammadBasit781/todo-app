const router = require('express').Router();
const { response } = require('express');
const Users = require('../models/users');
const Addresses = require('../models/addresses');

router.post("/user", (req, res) => {
    const user = req.body;
    console.log(req.body, 'req.body');

    if (!user.name || !user.age || !user.gender) {
        return res.status(400).send("Name,Age or Gender is missing")
    }

    const newUser = new Users(user);
    const address = new Addresses({ name: req.body.address });

    newUser.addresses.push(address)

    address.save()
        .then(() => {
            return newUser.save();
        })
        .then((data) => {
            console.log("Succesfully added User!");
            res.send(data);
        })
        .catch((err) => console.log(err));
})

    .delete("/user/:_id", (req, res) => {
        const { _id } = req.params;
        // console.log('---->',req.params)
        // console.log('---->',req.query)
        Users.deleteOne({ _id })
            .then((data) => {
                console.log("Deleted User Successfully!")
                res.send("data");
            })
            .catch((err) => console.log(err));
    })

    .put("/user/:_id", async (req, res) => {
        const user = req.body;
        const { _id } = req.params;
        if (!user.name || !user.age || !user.gender) {
            return res.status(400).send("Name,Age or Gender is missing")
        }
        const updatedUser = await Users.replaceOne({ _id }, req.body);

        console.log("Updated Succesfully");
        res.send(updatedUser);

    });

module.exports = router;