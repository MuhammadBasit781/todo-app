const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3000;

mongoose.connect("mongodb://localhost/users_express", {
    useNewUrlParser: true,
    useunifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static("public"));

app.use('/users', require("./routes/users"));
app.use('/address', require("./routes/address"));

app.listen(PORT, () => console.log(`server started listening on port:${PORT}`));