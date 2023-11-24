const mongoose = require("mongoose");
require('dotenv').config();
const databaseurl = process.env.DATABASE_URL

mongoose.connect(databaseurl, {
    // useNewUrlParser: true,
})
.then(() => {
    console.log("database connected sucessfully");
})
.catch((error) => {
    console.log("database is not able to connect",error);
})