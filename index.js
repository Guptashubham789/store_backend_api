//import the express module
const express=require('express');
const  mongoose  = require('mongoose');
const authRouter=require('./routes/auth');
const bannerRouter=require('./routes/banner');
const categoryRouter=require('./routes/category');
const subCategoryRouter=require('./routes/sub_category');
const productRouter=require('./routes/product');
//Define the port number the server will listen on
const PORT=3000;

//creates an instance of an express application
//beacouse it gives us the starting point

const app=express();
//mongodb string
const DB="mongodb+srv://shubhamtech731159:R6rWZIDht1GduMBv@cluster0.hanqwnh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//middleware - to register route or to mount routes
app.use(express.json());
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);


mongoose.connect(DB).then(()=>{
    console.log('mongodb connected');
});



//start the server and listen on the specified port
app.listen(PORT,"0.0.0.0",function(){
    ///log the number
    console.log('server is running on port '+PORT)
});