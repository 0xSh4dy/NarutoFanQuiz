const container = document.querySelector(".mainCont");
const btn = document.getElementById("btn");
btn.addEventListener("click",()=>{
    btn.style.display="none";
    container.style.display = "block";
})