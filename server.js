const express = require('express')
const cors = require('cors');
const updateDriverStatus = require('./controllers/updateDriverStatus');
const { connectToMongoDB } = require('./databases');
require("dotenv").config();

//check this
connectToMongoDB()
const app = express()
const PORT = 5000
app.use(express.json())
app.use(cors())

app.post('/updateDriver',updateDriverStatus)

app.use('/',(req,res)=>{
    res.status(200).json({message:'status healthy'})
})

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})