const express=require("express");
const {connection}=require("./db");
const {userrouter}=require("./routes/user.routes");
const {movierouter}=require("./routes/movies.route")
const {authenticator}=require("./middlewares/authentication.middleware")
const cors=require("cors")
require("dotenv").config()


const app= express();

app.use(express.json())
app.use(cors())

app.use("/user",userrouter);
app.use(authenticator);
app.use("/movie",movierouter)

app.listen(process.env.port,async()=>{
    await connection;
    console.log(`Server running at ${process.env.port}`)
})