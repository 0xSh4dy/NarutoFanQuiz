const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
var easyAnswers = ['1','3','2','3','1','3','4','3','2','1','2','1'];
var uName;
var uDiff;
var uID;
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
app.post("/",(req,res,next)=>{

    const nameInp = req.body.PlayerName;
    const diff = req.body.difficulty;
    uName = nameInp;
    uDiff = diff;
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
        newName.save((err,data)=>{
          uID = data.id;
        });
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
app.get("/api/easy",(req,res,next)=>{
    res.sendFile(__dirname+"/easy.json");
})
app.post("/quizAnswers",(req,res)=>{
  console.log(uID);
  let questionOrder = req.body.QuesOrder;
  let answerOrder = req.body.AnsOrder;
  let score=0;
  for(let i=0;i<answerOrder.length;i++){
    let actualAnswer = easyAnswers[questionOrder[i]-1];
    if(actualAnswer===answerOrder[i]){
      score++;
    }
  }

  const updateDocument = async()=>{
    try{
      const result =  await Users.updateOne({_id:"60c5d6ffa5c0b010aafb038f"},
      {$set:{
        score:120
      }});
    }
    catch(err){
      console.log(err);
    }

  }
  updateDocument();
  console.log(score);

})
app.get("/results",(req,res)=>{

})

// app.post("/quizAnswers",(req,res)=>{
//   res.send("Your answers have been recorded. Thanks for giving the quiz");
// })
app.listen(process.env.port|| 4000);
