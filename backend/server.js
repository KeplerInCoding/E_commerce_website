const path = require("path");
const dotenv = require("dotenv");
const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require('cloudinary');

//HAndling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// console.log(heloo);

// Config
dotenv.config({ path: path.resolve(__dirname, 'config/config.env') });



const PORT = process.env.PORT || 4000;

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// console.log("Cloudinary config:", {
//   cloud_name: cloudinary.config().cloud_name,
//   api_key: cloudinary.config().api_key,
//   api_secret: cloudinary.config().api_secret,
// });


const server = app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});

//server unhandled promise rejections (suppose u entered wrong URI in config file)
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});