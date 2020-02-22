// const m = require('./tables.js');
// jsonTable = m.jsonTable;
const xhttp = new XMLHttpRequest();

xhttp.open("GET", `http://localhost:3000/recievedTable`, false);
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
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);

	// Add some text to the new cells:
	obj=jsonTable[i]['_id'];
	cell1.innerHTML = jsonTable[i]['uid'];
	cell2.innerHTML = jsonTable[i]['qty'];
	cell3.innerHTML = jsonTable[i]['category']; 
	cell4.innerHTML = jsonTable[i]['description'];
	cell5.innerHTML = jsonTable[i]['address'];
	cell6.innerHTML = "<a href='/i_approve?id="+obj+"'>Approve</a>";

}
