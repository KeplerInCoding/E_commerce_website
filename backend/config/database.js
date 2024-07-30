const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load config
dotenv.config({ path: "backend/config/config.env" });

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  });
};

module.exports = connectDatabase;
