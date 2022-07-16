
const button = document.querySelectorAll(".quickView");

var modalScreen = document.getElementById("theModal");

var span = document.getElementsByClassName("close")[0];

button.onclick = function() {
    console.log("it worked");
}


function logConsole() {
    modalScreen.style.display = "block";
    console.log("itworked");
  }

span.onclick = function() {
    modalScreen.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalScreen) {
        modalScreen.style.display = "none";
    }
}