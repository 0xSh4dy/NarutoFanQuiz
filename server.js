const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const easyAnswers = ['1','3','2','3','1','3','4','3','2','1','2','1'];
const hardAnswers = ['4','4','2','3','4','1','2','1','2','3','4','2'];
var uName;
var uDiff;
var uID;
var uScore;
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

    if(diff==1 || diff==2){
        const newName = new Users({
            name:nameInp,
            score:0,
            difficulty:diff
        })
        newName.save((err,data)=>{
          uID = data.id;
        });
        if(diff==1){
        res.render("easyQuiz",{
            Username:nameInp,
            Difficulty:diff
        });
        }
        else if(diff==2){
          res.render("hardQuiz",{
              Username:nameInp,
              Difficulty:diff
          });
        }
        res.render("hardQuiz.ejs");
        if(diff<1 || diff>2){
        res.render("error");
      }
}
});
app.get("/api/easy",(req,res)=>{
    res.sendFile(__dirname+"/easy.json");
})
app.get("/api/hard",(req,res)=>{
  res.sendFile(__dirname+"/hard.json");
})
app.post("/quizAnswers",(req,res)=>{

  let questionOrder = req.body.QuesOrder;
  let answerOrder = req.body.AnsOrder;
  let score=0;

  for(let i=0;i<answerOrder.length;i++){
    let actualAnswer;
    if(uDiff===1){
    actualAnswer = easyAnswers[questionOrder[i]-1];
    }
    else if(uDiff===2){
      actualAnswer = hardAnswers[questionOrder[i]-1];
    }
    if(actualAnswer===answerOrder[i]){
      score++;
    }
  }
  uScore = score;
  const updateDocument = async()=>{
    try{
      const result =  await Users.updateOne({_id:uID},
      {$set:{
        score:score
      }});
    }
    catch(err){
      console.log(err);
    }

  }
  updateDocument();

})
app.get("/results",(req,res)=>{
  res.send("Your score is "+uScore+" out of 12");
})

// app.post("/quizAnswers",(req,res)=>{
//   res.send("Your answers have been recorded. Thanks for giving the quiz");
// })
app.listen(process.env.port|| 4000);
