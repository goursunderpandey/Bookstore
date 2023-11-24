const express = require("express");
require('dotenv').config();

const app = express();
const cors = require("cors")
app.use(cors())
PORT = process.env.PORT || 5000
require("../server/Database/Connection.jsx")
const AddBook = require("../server/Routes/Router.jsx");
app.use(AddBook);
const Auth = require("./Routes/Auth.jsx");
app.use(Auth);
app.listen(PORT , () => {
    console.log(`server is running on ${PORT}`);
})