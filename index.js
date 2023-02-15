const express = require('express');
const cors = require('cors');

const user = require('./Routes/User.routes');
const connection = require('./config/db');
const product = require('./Routes/Data.routes');
const cart = require('./Routes/Cart.routes');

const app = express()

let PORT = 3001

app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send({"greeting":"Welcome"})
})

app.use("/user",user)

app.use("/product",product)

app.use("/cart",cart)

app.listen(PORT,()=>{
    try{
        connection
        console.log("Connected To mongo Database");
    } catch (error) {
        console.log(error);        
    }
    
    console.log("Server Running at "+PORT);
})

