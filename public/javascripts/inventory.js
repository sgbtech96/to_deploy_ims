// const m = require('./tables.js');
// jsonTable = m.jsonTable;
const xhttp = new XMLHttpRequest();

xhttp.open("GET", `http://localhost:3000/inventoryTable`, false);
xhttp.send();

const jsonTable = JSON.parse(xhttp.responseText);
console.log("7u77y7y7");
console.log(jsonTable);
p=90;
var table = document.getElementById("myTable");

for(i=0;i<jsonTable.length;i++){

  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(0);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);


  // Add some text to the new cells:
  cell1.innerHTML = jsonTable[i]['uid'];
  cell2.innerHTML = jsonTable[i]['qty'];
  cell3.innerHTML = jsonTable[i]['category']; 

}