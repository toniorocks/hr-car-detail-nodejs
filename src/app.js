const express = require("express");
const carsRouter = require("./routers/cars");
require("./mongoose/db/mongoose");
const bodyParser = require('body-parser')

//setting up the server
const app = express();

//setting up the app middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(carsRouter);

module.exports = app;