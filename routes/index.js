const router = require("express").Router()
const Users=require("../models/users");


router.get("/",async(req,res)=>{
    const allUsers=await Users.find().populate("addresses");
    res.send(allUsers);
})
.get("/user/:userId",async(req,res)=>{

    const { userId } = req.params;
    const user=await Users.findById(userId).populate("addresses");
    res.send(user);
})


module.exports=router;