function changeText() {
  var textsArray = [
    "Change",
    "Changing",
    "Changed",
    "Not cháńgíńg",
    "Chaaaaaaange",
  ];
  var number = getRandomNumberBetween(0, textsArray.length - 1);
  console.log("Index: ", number);
  document.getElementById("heading").innerHTML = textsArray[number];
}
function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getSum() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;

  fetch(`http://localhost:3000/add?num1=${num1}&num2=${num2}`)
    .then((response) => response.text())
    .then((result) => {
      document.getElementById("sum").textContent = result;
    });
}
