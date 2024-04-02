const mongoose=require("mongoose");
const chat =require("./models/chat.js");

main().then(()=>{console.log("succesful");}).catch((err)=>{console.log(err);});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp")
}

let allchats=[
    {
        from:"neha",
        to:"priya",
        msg:"send notes",
        created_at:new Date()
    },
    {
        from:"iri",
        to:"piri",
        msg:"send pdf",
        created_at:new Date()
    },
    {
        from:"gori",
        to:"mori",
        msg:"send pages",
        created_at:new Date()
    },
    {
        from:"nori",
        to:"sori",
        msg:"send images",
        created_at:new Date()
    },
    {
        from:"isha",
        to:"wisha",
        msg:"send videos",
        created_at:new Date()
    },
    {
        from:"asa",
        to:"sasa",
        msg:"send photo",
        created_at:new Date()
    },
];

chat.insertMany(allchats);

