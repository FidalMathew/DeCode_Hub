const express=require('express')
const dotenv=require('dotenv')
const app=express()
app.listen(process.env.PORT,()=>{
    console.log("Running")
})