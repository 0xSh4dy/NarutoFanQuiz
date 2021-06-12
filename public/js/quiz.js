let arr = [0,0,0,0,0,0,0,0,0,0,0,0];
let cnt=1;
async function getData(){
    const response = await fetch("/api/easy");
    const dat = await response.json();
    let btn = document.getElementById("nextQues");
    let ans = document.getElementById("Answer");
    function updateContent(){
        var n= generateRand();
        if(arrFull()){
            btn.style.display = "none";
        }
        ans.style.visibility="visible";
        let ques = document.getElementById("ques");
        let option1 = document.getElementById("option1");
        let option2 = document.getElementById("option2");
        let option3 = document.getElementById("option3");
        let option4 = document.getElementById("option4");
        ques.innerHTML =`Question${cnt}: `+dat[n].Question;
        cnt++;
        option1.innerHTML = "Option1: "+dat[n].Option1;
        option2.innerHTML = "Option2: "+dat[n].Option2;
        option3.innerHTML = "Option3: "+dat[n].Option3;
        option4.innerHTML = "Option4: "+dat[n].Option4;
    }
    btn.addEventListener("click",updateContent);
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
    count+=1;
    if(count===12){
        return true;
    }
    else{
        return false;
    }
}

