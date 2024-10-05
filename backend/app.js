// app.js
const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const path = require('path');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  }));

// Config
if(process.env.NODE_ENV!=="PRODUCTION"){
  dotenv.config({ path: 'backend/config/config.env'});
}

// Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware for error
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname, "..frontend/build")));


app.get("*", (req,res)=>{
  res.sendFile(path.resolve(__dirname, "..frontend/build/index.html"));
})

module.exports = app;
