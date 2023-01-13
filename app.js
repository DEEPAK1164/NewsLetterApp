//jshint esversion: 6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
// app.use(express.static("public"));
app.use('*/css',express.static('public/css'));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
//key
//c5069c6fae24d325dd8e735d224bcd4d-us8
//unique id
//4dfd6a4076
app.post("/",function(req,res)
{
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    console.log(firstName+lastName+email);
     const data={
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME: lastName
            }
    }
    const jsonData=JSON.stringify(data);
    console.log(jsonData);
     const url="https://us8.api.mailchimp.com/3.0/lists/4dfd6a4076/members"
    const options={
        method:"POST",
        auth:"deepak:c5069c6fae24d325dd8e735d224bcd4d-us8"
    }
    const request=https.request(url,options,function(response){
if(response.statusCode===200)
{
    res.sendFile(__dirname+"/success.html");
}
else{
    res.sendFile(__dirname+"/failure.html");
}
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })
   request.write(jsonData);
    request.end();  
    //res.send(firstName+lastName+email);
});

app.post("/failure",function(req,res){
res.redirect("/");
})



app.listen(3000,function(){
    console.log("server is runnning on port 3000");
});
