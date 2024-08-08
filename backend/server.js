const path = require("path");
const dotenv = require("dotenv");
const app = require("./app");
const connectDatabase = require("./config/database");


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