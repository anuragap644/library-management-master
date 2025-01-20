const express = require('express');
const app=express();

const cookieParser = require('cookie-parser');
const path=require('path');
require("dotenv").config();

const db= require('./config/mongoose-connection');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const transcationRouter = require("./routes/transcationRouter");
const booksRouter = require("./routes/booksRouter");
const index = require("./routes/index");
app.get('/',(req,res)=>{
    res.render('index');
});
app.use('/',index);
app.use("/users",userRouter);
app.use("/books",booksRouter);
app.use("/transcation",transcationRouter);
app.use("/admin",adminRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
