 
/* Init Server  */
const express = require("express");
const cors = require("cors"); 
const connectDB = require("./connection/connectDB"); 
const mongoose = require('mongoose')
require("dotenv").config(); 
const port = process.env.PORT || 5000;
const app = express();

/* Set Middle wares  */
app.use(cors());
app.use(express.json());
 
// database connect
connectDB()


/* Use Routes  */
app.use('/api/v1/user', require("./router/user.router"));
app.use('/api/v1/product', require("./router/product.router"));


/* testing api  */
app.get("/", (req, res) => {
  res.send("Server is running");
});

 
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

module.exports = app;