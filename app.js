require("dotenv").config()
const express = require('express');
const ejs = require('ejs');
const fast2sms = require("fast-two-sms"); 
const app=express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.get("/",(req,res)=>{
    res.render("index");
});

app.post("/sendOTP",async(req,res)=>
{
    let otp='';
for(let i=0;i<6;i++){
    otp+=Math.floor(Math.random()*10);
}
const your_otp=otp;
var options = {authorization : process.env.API_KEY, message : 'YOUR_OTP_HERE'+otp ,  numbers : [req.body.number]} ;
const response=await fast2sms.sendMessage(options);
// console.log(your_otp);
res.send(response);

})
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})