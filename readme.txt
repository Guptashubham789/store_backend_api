package.json : package.json similer to the pub.pec yml file.
index.js: index.js our entry point to the project and similer to the dart main.dart file

Boath are same:
-------------------
index.js
-------
app.get("/hello",(req,res)=>{
    res.send('Hello World');
});

hello.js - similer route
--------
const express=require('express');

const helloRoutes=express.Router();

helloRoutes.get('/hello',(req,res)=>{
    res.send("hello js file")
});
module.exports=helloRoutes;

index.js
--------
import express
then hello.js import
then app.use(var);

mongodb :
-----------
mongodb is nosql database that store data in flexible easy to use document.
mongodb similer to the firebase 

Model:
---------

Password hash/hide:
-------------------
1.install packgae (npm i bcryptjs);
2. go to auth.js (const bcrypt=require('bcryptjs');
)
3.     //genrate a salt with a cost factor of 10
        const salt=await bcrypt.genSalt(10);
        //hash the password using the genrated salt
        const hashedPassword =await bcrypt.hash(password,salt);
