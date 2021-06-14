var arr = [0,0,0,0,0,0,0,0,0,0,0,0];
var answers = [];
var questionOrder = [];
var cnt=1;
var ques = document.getElementById("ques");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");
var btn = document.getElementById("nextQues");
var submitBtn = document.getElementById("submit");
var userAnswer = document.getElementById("Answer");
var options = document.querySelector(".options");
var showResults = document.getElementById("showResults");
var scoreBoard = document.getElementById("scoreF");

async function getData(){
    const response = await fetch("/api/hard");
    const dat = await response.json();
    function updateContent(){
        btn.innerHTML = "Next";
        count+=1;
        if(count<=12){
        var n= generateRand();

        questionOrder.push(n+1);
        userAnswer.style.visibility="visible";

        ques.innerHTML =`Question${cnt}: `+dat[n].Question;
        cnt++;
        option1.innerHTML = "Option1: "+dat[n].Option1;
        option2.innerHTML = "Option2: "+dat[n].Option2;
        option3.innerHTML = "Option3: "+dat[n].Option3;
        option4.innerHTML = "Option4: "+dat[n].Option4;
        if(questionOrder.length===1){
          answers.push("");
        }
        else{
        answers.push(userAnswer.value);
        userAnswer.value="";
        }

    }
    else if(count===13){
      ques.innerHTML = "You have answered all the questions";
      answers.push(userAnswer.value);

      btn.style.display = "none";
      options.style.visibility = "hidden";
      userAnswer.style.display="none";
    }

}
    btn.addEventListener("click",updateContent);
    submitBtn.addEventListener("click",onClickingSubmit);

}
getData();

function generateRand(){

    let num = Math.floor((arr.length)*Math.random());

    if(arr[num]===0){
        arr[num]++;
    return num;
}
else{
    return generateRand();
}
}
let count=0;
function arrFull(){


    if(count===13){
        return true;
    }
    else{
        return false;
    }
}
function onClickingSubmit(){
    options.innerHTML = "";
    userAnswer.innerHTML ="";
    ques.innerHTML = "Quiz Submitted!";
    answers.splice(0,1);
    showResults.style.display = "block";
    submitBtn.style.display = "none";
    btn.style.display = "none";
    fetch('/quizAnswers', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({QuesOrder:questionOrder,AnsOrder:answers})

}).then((res)=>{
    console.log(res);
});
}

showResults.addEventListener("click",showResult)
async function showResult(){
  showResults.style.display = "none";
  scoreBoard.style.display= "block";
  const res = await fetch('/results');
  const dat = await res.text();
  ques.innerHTML = dat;
}
