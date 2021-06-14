var count=0;

async function fetchData(){
  const response = await fetch('/api/scoreboard');
  let data = await response.json();
  let nDocs = data.length;

    let tableBody = document.getElementById("tableBody");

    for(let i=0;i<nDocs;i++){
      let row = tableBody.insertRow(count);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      cell1.innerHTML = data[count].name;
      cell2.innerHTML = data[count].difficulty;
      cell3.innerHTML = data[count].score;
       count++;

}
}
fetchData();
