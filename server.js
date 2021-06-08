const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connection_url = 'mongodb+srv://admin:BoAoAuyCcujHi0Ln@cluster0.qni0g.mongodb.net/NarutoDB?retryWrites=true&w=majority';
mongoose.connect(connection_url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
const nameSchema = mongoose.Schema({
    name:String,
    score:Number,
    difficulty:Number
})
const Users = mongoose.model("user",nameSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/",(req,res)=>{
    res.render("login");
})
app.post("/",(req,res)=>{
    const nameInp = req.body.PlayerName;
    const diff = req.body.difficulty;
    if(diff>=1 && diff<=3){
        const newName = new Users({
            name:nameInp,
            score:0,
            difficulty:diff
        })
        newName.save();
        res.render("quiz.ejs");
    }
    else{
        res.render("error");
    }
})
app.listen(process.env.port|| 4000);