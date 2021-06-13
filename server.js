const express = require('express');
const app = express();
const mongoose = require('mongoose');
// var app = express.app();
const connection_url = 'mongodb+srv://admin:BoAoAuyCcujHi0Ln@cluster0.qni0g.mongodb.net/NarutoDB?retryWrites=true&w=majority';
// app.use(app);

mongoose.connect(connection_url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
const nameSchema = mongoose.Schema({
    name:String,
    score:Number,
    difficulty:Number
})
const Users = mongoose.model("user",nameSchema);

// Generating random numbers to display the questions and options
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/",(req,res,next)=>{
    res.render("login");
})
app.get("/api/easy",(req,res,next)=>{
    res.sendFile(__dirname+"/easy.json");
})
app.post("/quizAnswers",(req,res)=>{
  console.log(req.body);
  
})
app.post("/",(req,res,next)=>{
    const nameInp = req.body.PlayerName;
    const diff = req.body.difficulty;
    const num = 12*Math.floor(Math.random())+1;
    let qs = "";
    if(diff===1){
        qs = easyQs[num]
    }
    if(res.statusCode==404){
        res.render("error404");
    }
    else{
    if(diff>=1 && diff<=3){
        const newName = new Users({
            name:nameInp,
            score:0,
            difficulty:diff
        })
        // newName.save();
        res.render("easyQuiz.ejs",{
            Username:nameInp,
            Difficulty:diff
        });
    }
    else if(diff<1 && diff>3){
        res.render("error");
    }
}
})
// app.post("/quizAnswers",(req,res)=>{
//   res.send("Your answers have been recorded. Thanks for giving the quiz");
// })
app.listen(process.env.port|| 4000);
