const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const { json } = require('express');

const app=express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
})


app.post("/",function(req,res)
{
    const fname=req.body.Firstname;
    const lname=req.body.Secondname;
    const email=req.body.email;
   
    const client = require("@mailchimp/mailchimp_marketing");

    client.setConfig({
      apiKey:"39e1e6422ac0d1296d72f5146c09f0ec-us21",
      server: "us21",
    });
    const run = async () => {
        const response = await client.lists.batchListMembers("a0371b5588", {
          members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname,
            }
          }],
        });
        const errors=response.error_count;
        if(errors===0)
        {
          res.sendFile(__dirname+"/success.html");
        }
        else
        {
          res.sendFile(__dirname+"/failure.html");
        }
    };
   run();
})
app.post("/failure",function(req,res)
{
  res.redirect("/")
})
app.listen(process.env.PORT||3000,function () { 
    console.log("Server Started");
 })









//  39e1e6422ac0d1296d72f5146c09f0ec-us21