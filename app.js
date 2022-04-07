const express = require("express");
const mongoose=require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')


const app=express();
mongoose.connect("mongodb://localhost/users_express",{
    useNewUrlParser:true,
    useunifiedTopology:true,
});

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.use(express.static("public"));
app.set("view engine","ejs");

app.use(require("./routes/index"))
app.use(require("./routes/user"))
app.use(require("./routes/address"))


app.listen(3000,()=>console.log("server started listening on port:3000"))