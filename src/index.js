import "./styles.css";

/*
1.0
Koodi tällä hetkellä käyttää kaksi funktiota jossa toisessa se vaan poistaa vanhan datan.
muuten textin, adminin hoito tehdään samalla tavalla
Tämän voisi implementoidan helpommin käyttämällä samaa funktiota molempiin jaa tarkistaa
ennen sitä tarvitseeko mitään lisätehtäviä kuten vanhan datan poistaminen
kuvan lisäämiselle on tehty erillinen funktio joka toimii

2.0
- siivottu kuva ja admin omalle funktiolle
- lisättiin jokaiselle riville id (ei tällä hetkellä käytössä)
- added a data replacement function
- organized the code (doesn't make my eyes bleed)
*/

const button = document.getElementById("submit-data");

button.addEventListener("click", function () {
  const usrname = document.querySelector("#input-username");
  const tableBody = document.querySelectorAll("tr");

  // loop trought every row, check usrname, if match replace data, otherwise add
  for (let i = 1; i < tableBody.length; i++) {
    if (tableBody[i].children[0].innerHTML === usrname.value) {
      replaceOldData(tableBody[i]);
      return;
    }
  }

  addNewData();
});

// TASK 2 add new data to the table
function addNewData() {
  const query = document.querySelectorAll("form input");
  const tableBody = document.getElementById("table-body");
  const row = document.createElement("tr");

  // loopataan kaikki helpot text inputit
  for (let i = 0; i < 3; i++) {
    const cell = document.createElement("td");
    cell.appendChild(document.createTextNode(query[i].value));
    row.appendChild(cell);
  }

  //hoidetaat admin status ja kuva erikseen
  row.appendChild(makeAdmingElement());
  row.append(makeImageElement());

  row.id = getRowID();
  //console.log("uuden rowin id: " + row.id);

  tableBody.appendChild(row);
}

function makeAdmingElement() {
  const query = document.querySelector("#input-admin");
  const cell = document.createElement("td");

  if (query.checked) {
    cell.appendChild(document.createTextNode("X"));
  } else {
    cell.appendChild(document.createTextNode("-"));
  }

  return cell;
}

// TASK 3 painike joka tyhjentää taulun
document.getElementById("empty-table").addEventListener("click", function () {
  const tableBody = document.getElementById("table-body");

  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
});

// for funsies
function getRowID() {
  const tableBody = document.querySelectorAll("tr");
  const id = tableBody.length;

  return "row-" + id;
}

// TASK 4
function replaceOldData(row) {
  // get input and the row
  const query = document.querySelectorAll("form input");

  // create new data cells
  const email = document.createElement("td");
  const address = document.createElement("td");

  email.appendChild(document.createTextNode(query[1].value));
  address.appendChild(document.createTextNode(query[2].value));

  // replace old ones with new data
  row.replaceChild(email, row.children[1]);
  row.replaceChild(address, row.children[2]);
  row.replaceChild(makeAdmingElement(), row.children[3]);

  // TASK 5 kuva inputin hoitaminen
  if (row.children[4]) {
    row.replaceChild(makeImageElement(), row.children[4]);
  } else {
    row.append(makeImageElement());
  }
}

// TASK 5
function makeImageElement() {
  // TASK 5 kuva inputin hoitaminen
  const image = document.querySelector("#input-image");
  if (image.files.length === 0) {
    return document.createElement("img");
  }

  const imageElement = document.createElement("img");
  imageElement.src = URL.createObjectURL(image.files[0]);
  imageElement.width = 64;
  imageElement.height = 64;

  return imageElement;
}
