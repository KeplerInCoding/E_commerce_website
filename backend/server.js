const app = require("./app");
const dotenv = require("dotenv");

//config
dotenv.config({path:"backend/config/config.env"});

app.listen(procss.env.PORT,()=>{
    console.log(`Server is working on http://localhosy:${process.env.PORT}`)
})