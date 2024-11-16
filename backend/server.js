const express= require("express");
const mongoose= require("mongoose");
const cors= require("cors");

const userRouter= require("./routes/users");
const exerciseRouter= require("./routes/exercise");

require("dotenv").config();

const app= express();
const port= process.env.PORT || 5000;

app.use(cors());
app.use(express.json())  //BodeParser

const uri= process.env.CONNECT_STRING;
mongoose.connect(uri);
const connection= mongoose.connection;
connection.once('open', ()=>{
    console.log("Connected to DB.")
})

app.use("/exercise", exerciseRouter);
app.use("/user", userRouter);

app.listen(port, ()=>{
    console.log(`Connected to the port: ${port}`)
})