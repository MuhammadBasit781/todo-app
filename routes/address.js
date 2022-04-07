const router = require('express').Router();
const { response } = require('express');
const Addresses = require('../models/addresses');
const Users = require('../models/users');

router.delete("/address/:_id/", (req, res) => {
    const { _id } = req.params;
    console.log(req.params);
    // console.log('---->',req.params)
    // console.log('---->',req.query)
    Addresses.deleteOne({ _id })
        .then((data) => {
            console.log("Deleted Address Successfully!")
            res.send("data");
        })
        .catch((err) => console.log(err));
})

    .put("/address/:_id/", async (req, res) => {
        const address = req.body;
        const { _id } = req.params;
        if (!address.name) {
            return res.status(400).send("Address Name is missing")
        }
        const updatedAddress = await Addresses.replaceOne({ _id }, req.body);

        console.log("Updated Succesfully");
        res.send(updatedAddress);

    })
    .post("/user/:userId/address", async(req, res) => {
          const {userId}=req.params
        if (!req.body.addressName ) {
            return res.status(400).send("Address Name is missing")
        }
        const user=await Users.findById(userId).populate("addresses");
        console.log(user,'user');
        const address = new Addresses({ name: req.body.addressName });

        user.addresses.push(address)

        address.save()
            .then(() => {
                return user.save();
            })
            .then((data) => {
                console.log("Succesfully Address added!");
                res.send(data);
            })
            .catch((err) => console.log(err));
    });
module.exports = router;