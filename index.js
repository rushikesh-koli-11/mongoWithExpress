const express=require("express");
const app = express();
const path = require("path");
const mongoose=require("mongoose");
const chat =require("./models/chat.js");
const methodOverride=require("method-override");

main().catch((err)=>{console.log(err);});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp")
}


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//index route

app.get("/chats",async (req,res)=>{
    let chats= await chat.find();
    res.render("index.ejs",{chats});
});

//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//create route
app.post("/chats",(req,res)=>{
    let {from ,to,msg}=req.body;
    let newChat =new chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat.save().then(()=>{console.log("chat saved")}).catch((err)=>{console.log(err)});
    res.send("working");
});

//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat =await chats.findById(id);
    res.render("edit.ejs",{chat});
});

//update route
app.put("/chats/:id",(req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    let updatedchat =chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true,new:true});
    res.redirect("/chats");
});

//delete route
app.delete("/cahts/:id",async (req,res)=>{
    let {id}=req.params;
    let Deletedchat= await chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

app.get("/",(req,res)=>{
    res.send("working root");
});

app.listen(8080,()=>{
    console.log("app listing");
});